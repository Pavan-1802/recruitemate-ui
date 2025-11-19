import type { Candidate } from "../../types";
import { FileText, Trash2 } from "lucide-react";

interface CandidatesTableProps {
  candidates: Candidate[];
  onViewResume: (candidate: Candidate) => void;
  onDeleteClick: (candidate: Candidate) => void;
  onStatusChange: (candidateId: string, newStatus: string) => void;
}

export default function CandidatesTable({
  candidates,
  onViewResume,
  onDeleteClick,
  onStatusChange,
}: CandidatesTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-slate-100 border-b border-slate-200">
          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
            Name
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
            Email
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
            Score
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
            Status
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
            Resume
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate, index) => (
          <tr
            key={candidate.id}
            className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
              index === candidates.length - 1 ? "border-b-0" : ""
            }`}
          >
            <td className="px-6 py-4 text-sm text-slate-900 font-medium">
              {candidate.name}
            </td>
            <td className="px-6 py-4 text-sm text-slate-600">
              {candidate.email}
            </td>
            <td className="px-6 py-4 text-sm text-slate-900 font-semibold">
              {candidate.score}%
            </td>
            <td className="px-6 py-4">
              {candidate.status === "interview scheduled" ? (
                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full">
                  Interview Scheduled
                </span>
              ) : (
                <select
                  value={candidate.status}
                  onChange={(e) => onStatusChange(candidate.id, e.target.value)}
                  className={`rounded-md text-sm font-medium border-0 cursor-pointer ${
                    candidate.status === "accepted"
                      ? "text-green-800"
                      : candidate.status === "rejected"
                      ? "text-red-800"
                      : "text-yellow-800"
                  }`}
                >
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="on hold">On Hold</option>
                </select>
              )}
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => onViewResume(candidate)}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
              >
                <FileText size={18} />
                <span className="text-sm font-medium">View</span>
              </button>
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => onDeleteClick(candidate)}
                className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 size={18} />
                <span className="text-sm font-medium">Delete</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
