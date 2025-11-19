import type { Resume } from "../../types";
import { Calendar, FileText, Mail, Briefcase } from "lucide-react";

interface CandidateCardProps {
  candidate: Resume;
  onViewResume: (candidate: Resume) => void;
  onScheduleInterview: (candidate: Resume) => void;
}

export default function CandidateCard({
  candidate,
  onViewResume,
  onScheduleInterview,
}: CandidateCardProps) {

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{candidate.name}</h2>

            <div className="flex items-center gap-2 text-white/90 mt-1">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">{candidate.job_title}</span>
            </div>

            <div className="flex items-center gap-2 text-white/90 mt-3">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{candidate.email}</span>
            </div>
          </div>

          <div className="flex flex-col items-center bg-white/10 rounded-lg px-4 py-2 border border-white/20">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs text-white/80 font-medium">Score</span>
            </div>
            <span className="text-xl font-bold text-white">{candidate.score}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex gap-3">
          <button
            onClick={() => onViewResume(candidate)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition"
          >
            <FileText className="w-5 h-5" />
            <span>View Resume</span>
          </button>

          <button
            onClick={() => onScheduleInterview(candidate)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-lg transition ${
              "bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:shadow-md"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule Interview</span>
          </button>
        </div>
      </div>
    </div>
  );
}
