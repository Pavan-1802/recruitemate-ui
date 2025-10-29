import { Edit, Trash2, Users } from "lucide-react";
import type { Job } from "../../types";
import { formatDate } from "../../utils";
import { Link } from "react-router";

export default function JobCard({ 
  job,
  onEdit,
  onDelete,
}: { 
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (jobId: string) => void;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 mb-2 truncate">
            {job.title}
          </h3>
          {job.description && (
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">
              {job.description}
            </p>
          )}
          <p className="text-xs text-slate-500">
            Posted on: {formatDate(job.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          <Link
            to={`/candidates/${job.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            title="View Candidates"
          >
            <Users className="w-4 h-4" />
            <span>Candidates</span>
          </Link>
        
        <div className="flex-1"></div>
        
        {onEdit && (
          <button
            onClick={() => onEdit(job)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
            title="Edit Job"
          >
            <Edit className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        )}
        
        {onDelete && (
          <button
            onClick={() => onDelete(job.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
            title="Delete Job"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        )}
      </div>
    </div>
  );
}