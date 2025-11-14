import { useEffect, useState } from "react";
import type { onHoldResume, Resume } from "../../types";
import ResumeCard from "../components/ResumeCard";
import ResumeModal from "../components/ResumeModal";
import { toast } from "react-hot-toast";

export default function OnHold() {
  const [onHoldResumes, setOnHoldResumes] = useState<onHoldResume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const fetchOnHoldResumes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/resumes`, // unchanged
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch on-hold resumes");
      }
      const data = await response.json();
      setOnHoldResumes(data.resumes);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOnHoldResumes();
  }, []);

  const jobTitles = Array.from(
    new Set(onHoldResumes.map((resume) => resume.job_title))
  );

  const onChangeStatus = async (resumeId: string, status: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/resumes/status/${resumeId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to accept resume");
      }
      toast.success(`Resume ${status} successfully`);
      setOnHoldResumes((prevResumes) =>
        prevResumes.filter((resume) => resume.id !== resumeId)
      );
    } catch (error) {
      toast.error("Failed to update resume status");
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        On-Hold Resumes
      </h1>
      {onHoldResumes.length === 0 ? (
        <p className="text-slate-600">No on-hold resumes found.</p>
      ) : (
        <ul>
          {jobTitles.map((title) => (
            <li key={title} className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 pl-2 border-l-4 border-slate-700">
                {title}
              </h2>
              <ul className="flex gap-4">
                {onHoldResumes
                  .filter((resume) => resume.job_title === title)
                  .map((filteredResume) => (
                    <ResumeCard
                      key={filteredResume.id}
                      resume={filteredResume}
                      onSelect={() => setSelectedResume(filteredResume.resume)}
                      onChangeStatus={onChangeStatus}
                    />
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      {selectedResume && (
        <ResumeModal
          resume={selectedResume}
          onClose={() => setSelectedResume(null)}
        />
      )}
    </div>
  );
}
