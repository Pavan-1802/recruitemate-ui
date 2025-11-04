import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { Plus, Users, Mail, CheckCircle, FileText } from "lucide-react";
import ResumeModal from "../components/ResumeModal";
import type { Candidate } from "../../types";
import toast from "react-hot-toast";
import CandidatesTable from "../components/CandidatesTable";
import ConfirmationModal from "../components/ConfirmationModal";
import EmailModal from "../components/EmailModal";
import PaginationControls from "../components/PaginationControls";

const LIMIT = 10;

export default function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [candidateToDelete, setCandidateToDelete] = useState<Candidate | null>(
    null
  );
  const [emailModalOpen, setEmailModalOpen] = useState({
    open: false,
    type: "",
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

  useEffect(() => {
    if (!id) return; 

    const fetchCandidates = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/candidates/${id}?page=${currentPage}&limit=${LIMIT}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch data");
        }
        setCandidates(data.candidates);
        setJobTitle(data.jobTitle);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error("Failed to fetch candidates");
        setCandidates([]);
        setTotalPages(0);
      }
    };

    fetchCandidates();
  }, [id, currentPage]);

  const handleStatusChange = async (candidateId: string, newStatus: string) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_APP_API_BASE_URL
      }/candidates/status/${candidateId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );
    if (response.ok) {
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === candidateId ? { ...c, status: newStatus } : c
        )
      );
      toast.success("Candidate status updated");
    } else {
      toast.error("Failed to update candidate status");
    }
  };

  const handleDeleteCandidate = async (candidateId: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/candidates/${candidateId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
      toast.success("Candidate deleted");
    } else {
      toast.error("Failed to delete candidate");
    }
  };

  const sendMail = async (email: { subject: string; body: string }) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/emails/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: id,
          subject: email.subject,
          body: email.body,
          status:
            emailModalOpen.type === "acceptance" ? "accepted" : "rejected",
        }),
      }
    );
    if (response.ok) {
      toast.success("Email sent successfully");
    } else {
      toast.error("Failed to send email");
    }
  };

  const handleDeleteClick = (candidate: Candidate) => {
    setCandidateToDelete(candidate);
  };

  const handleViewResume = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-slate-900 rounded-xl text-white">
              <Users size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Candidates</h1>
              <p className="text-slate-600 mt-1">
                Managing candidates for{" "}
                <span className="font-semibold">{jobTitle}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/upload-candidates/${id}`}
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus size={20} />
              Add Candidates
            </Link>

            <button
              onClick={() =>
                setEmailModalOpen({ open: true, type: "acceptance" })
              }
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <CheckCircle size={20} />
              Send Acceptance Email
            </button>

            <button
              onClick={() =>
                setEmailModalOpen({ open: true, type: "rejection" })
              }
              className="flex items-center gap-2 bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Mail size={20} />
              Send Update Email
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <CandidatesTable
            candidates={candidates}
            onViewResume={handleViewResume}
            onDeleteClick={handleDeleteClick}
            onStatusChange={handleStatusChange}
          />

          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}

          {candidates.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-slate-100 rounded-full">
                  <FileText size={48} className="text-slate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No candidates found
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Add candidates to get started with your recruitment process.
                  </p>
                  <Link
                    to={`/upload-candidates/${id}`}
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Plus size={20} />
                    Add Your First Candidate
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedCandidate && (
        <ResumeModal
          onClose={() => setSelectedCandidate(null)}
          resume={selectedCandidate.resume}
        />
      )}
      {candidateToDelete && (
        <ConfirmationModal
          message={`Are you sure you want to delete ${candidateToDelete.name}? This action cannot be undone.`}
          onConfirm={() => {
            handleDeleteCandidate(candidateToDelete.id);
            setCandidateToDelete(null);
          }}
          onCancel={() => setCandidateToDelete(null)}
        />
      )}
      {emailModalOpen.open && (
        <EmailModal
          mailType={emailModalOpen.type}
          onClose={() => setEmailModalOpen({ open: false, type: "" })}
          onSend={(email) => {
            sendMail(email);
          }}
        />
      )}
    </div>
  );
}
