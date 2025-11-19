import { useState, useEffect, useMemo } from "react";
import type { Resume, ResumeFile, Interview } from "../../types";
import ResumeModal from "../components/ResumeModal";
import InterviewModal from "../components/InterviewModal";
import CandidateCard from "../components/CandidateCard";
import ScheduleInterviewsEmpty from "../components/ScheduleInterviewsEmpty";
import ScheduleInterviewsHeader from "../components/ScheduleInterviewsHeader";
import toast from "react-hot-toast";

export default function ScheduleInterviews() {
  const [acceptedCandidates, setAcceptedCandidates] = useState<Resume[]>([]);
  const [viewingResume, setViewingResume] = useState<ResumeFile | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Resume | null>(null);
  const fetchAcceptedCandidates = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/interviews/accepted`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setAcceptedCandidates(data);
    } else {
      toast.error("Failed to fetch accepted resumes");
    }
  };

  const scheduleInterview = async (interview: Interview) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/interviews`,
      {
        method: "POST",
        body: JSON.stringify({
          candidateId: selectedCandidate?.id,
          startTime: interview.start_time,
          duration: interview.duration,
          link: interview.link,
          reminder: interview.reminder,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      toast.success("Interview scheduled successfully");
      fetchAcceptedCandidates();
      setSelectedCandidate(null);
    } else {
      toast.error("Failed to schedule interview");
    }
  };

  const handleViewResume = (candidate: Resume) => {
    setViewingResume(candidate.resume);
  };

  const handleScheduleInterview = (candidate: Resume) => {
    setSelectedCandidate(candidate);
  };

  const scheduledCount = useMemo(
    () => acceptedCandidates.filter((c) => c.status === "interview scheduled").length,
    [acceptedCandidates]
  );

  useEffect(() => {
    fetchAcceptedCandidates();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-6">
      <div className="mx-auto">
        <ScheduleInterviewsHeader
          totalCandidates={acceptedCandidates.length}
          scheduledCount={scheduledCount}
        />

        {acceptedCandidates.length === 0 ? (
          <ScheduleInterviewsEmpty />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {acceptedCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onViewResume={handleViewResume}
                onScheduleInterview={handleScheduleInterview}
              />
            ))}
          </div>
        )}
      </div>

      {viewingResume && (
        <ResumeModal
          resume={viewingResume}
          onClose={() => setViewingResume(null)}
        />
      )}

      {selectedCandidate && (
        <InterviewModal
          onClose={() => setSelectedCandidate(null)}
          onSave={scheduleInterview}
        />
      )}
    </div>
  );
}
