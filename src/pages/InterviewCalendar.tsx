import { useEffect, useState, useMemo } from "react";
import type { Interview } from "../../types";
import { detectInterviewOverlaps, formatDateTime, formatInterviewTime } from "../../utils";
import ConfirmationModal from "../components/ConfirmationModal";
import InterviewModal from "../components/InterviewModal";
import InterviewStats from "../components/InterviewStats";
import ConflictBanner from "../components/ConflictBanner";
import FilterTabs from "../components/FilterTabs";
import EmptyState from "../components/EmptyState";
import InterviewCard from "../components/InterviewCard";

type FilterType = "all" | "today" | "upcoming" | "conflicts";

export default function InterviewCalendar() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [interviewToDelete, setInterviewToDelete] = useState<Interview | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const detectOverlaps = useMemo(() => detectInterviewOverlaps(interviews), [interviews]);

  const hasOverlaps = detectOverlaps.overlappingIds.size > 0;

  const getConflictingInterviews = (interviewId: string): Interview[] => {
    const conflictIds = detectOverlaps.overlappingPairs.get(interviewId) || [];
    return interviews.filter((int) => conflictIds.includes(int.id));
  };

  const fetchInterviews = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/interviews`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setInterviews(data);
    } else {
      console.error("Failed to fetch interviews");
    }
  };

  const cancelInterview = async (interviewId: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/interviews/${interviewId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setInterviews((prev) => prev.filter((int) => int.id !== interviewId));
      setInterviewToDelete(null);
    } else {
      console.error("Failed to delete interview");
    }
  };

  const rescheduleInterview = async (interview: Interview) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/interviews/${interview.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            startTime: interview.start_time,
            duration: interview.duration,
            reminder: interview.reminder,
            link: interview.link,
          }),
        }
      );
      if (response.ok) {
        setSelectedInterview(null);
        fetchInterviews();
      } else {
        console.error("Failed to reschedule interview");
      }
    } catch (error) {
      console.error("Error rescheduling interview:", error);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const filteredInterviews = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (filter) {
      case "today":
        return interviews.filter((int) => {
          const intDate = new Date(int.start_time);
          const intDay = new Date(
            intDate.getFullYear(),
            intDate.getMonth(),
            intDate.getDate()
          );
          return intDay.getTime() === today.getTime();
        });
      case "upcoming":
        return interviews.filter((int) => new Date(int.start_time) >= now);
      case "conflicts":
        return interviews.filter((int) =>
          detectOverlaps.overlappingIds.has(int.id)
        );
      default:
        return interviews;
    }
  }, [interviews, filter, detectOverlaps]);

  const sortedInterviews = useMemo(() => {
    return [...filteredInterviews].sort(
      (a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );
  }, [filteredInterviews]);

  const upcomingCount = useMemo(
    () => interviews.filter((int) => new Date(int.start_time) >= new Date()).length,
    [interviews]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Interview Schedule
        </h1>
        <p className="text-slate-600">
          Manage and track all your scheduled interviews
        </p>
      </div>

      <InterviewStats
        totalInterviews={interviews.length}
        upcomingCount={upcomingCount}
        conflictsCount={detectOverlaps.overlappingIds.size}
        hasConflicts={hasOverlaps}
      />

      {hasOverlaps && (
        <ConflictBanner
          conflictsCount={detectOverlaps.overlappingIds.size}
          onViewConflicts={() => setFilter("conflicts")}
        />
      )}

      <FilterTabs
        activeFilter={filter}
        conflictsBadgeCount={detectOverlaps.overlappingIds.size}
        onFilterChange={setFilter}
      />

      {sortedInterviews.length === 0 ? (
        <EmptyState filter={filter} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {sortedInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              isOverlapping={detectOverlaps.overlappingIds.has(interview.id)}
              conflictingInterviews={getConflictingInterviews(interview.id)}
              onReschedule={setSelectedInterview}
              onCancel={setInterviewToDelete}
            />
          ))}
        </div>
      )}

      {interviewToDelete && (
        <ConfirmationModal
          message={`Are you sure you want to cancel the interview "${
            interviewToDelete.title
          }" scheduled on ${formatDateTime(
            interviewToDelete.start_time
          )} at ${formatInterviewTime(
            interviewToDelete.start_time
          )}? This action cannot be undone.`}
          onConfirm={() => cancelInterview(interviewToDelete.id)}
          onCancel={() => setInterviewToDelete(null)}
        />
      )}

      {selectedInterview && (
        <InterviewModal
          interview={selectedInterview}
          onClose={() => setSelectedInterview(null)}
          onSave={rescheduleInterview}
        />
      )}
    </div>
  );
}
