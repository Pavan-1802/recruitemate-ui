import { useEffect, useState } from "react";
import type { Job } from "../../types";
import JobCard from "../components/JobCard";
import JobFormModal from "../components/JobFormModal";
import { Briefcase, Plus } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_BASE_URL}/jobs`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        toast.error("Failed to fetch jobs.");
      }
    };
    fetchJobs();
  }, []);

  const handleEditClick = async (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedJob(null);
    setIsModalOpen(true);
  };

  const handleEditOrCreate = async (updatedJob: Job) => {
    if (!updatedJob.id) {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedJob),
        }
      );
      if (response.ok) {
        const newJob = await response.json();
        setJobs((prevJobs) => [...prevJobs, newJob]);
        setIsModalOpen(false);
      } else {
        toast.error("Failed to create job.");
      }
    } else {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/jobs/${updatedJob.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedJob),
        }
      );
      if (response.ok) {
        const updatedJobData = await response.json();
        setJobs((prevJobs) =>
          prevJobs.map((j) => (j.id === updatedJobData.id ? updatedJobData : j))
        );
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update job.");
      }
    }
  };

  const handleDelete = async (jobId: string) => {
    console.log("Deleting job with ID:", jobId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/jobs/${jobId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "DELETE",
        }
      );
      if (response.ok) {
        setJobs((prevJobs) => prevJobs.filter((j) => j.id !== jobId));
        setIsModalOpen(false);
        setJobToDelete(null);
        toast.success("Job deleted successfully.");
      } else {
        toast.error("Failed to delete job.");
        
      }
    } catch (error) {
      toast.error("Failed to delete job.");
    }
  };

  const handleDeleteClick = (jobId: string) => {
    setJobToDelete(jobId);
  };

  return (
    <div className="bg-slate-100">
      <div>
        <div className="max-w-7xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Jobs</h1>
              <p className="mt-1 text-sm text-slate-600">
                Manage and track all your job postings
              </p>
            </div>
            <button
              onClick={handleCreateClick}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 text-white font-medium rounded-md hover:bg-slate-800 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span>Create Job</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl p-6">
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
              <Briefcase className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No jobs yet
            </h3>
            <p className="text-slate-600 mb-6">
              Get started by creating your first job posting
            </p>
            <button
              onClick={handleCreateClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 text-white font-medium rounded-md hover:bg-slate-800 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Job
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <JobFormModal
          job={selectedJob}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleEditOrCreate}
        />
      )}
      {jobToDelete && (
        <ConfirmationModal
          message="Are you sure you want to delete this job?"
          onConfirm={() => handleDelete(jobToDelete!)}
          onCancel={() => setJobToDelete(null)}
        />
      )}
    </div>
  );
}
