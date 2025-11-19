import { Calendar, Clock, AlertTriangle } from "lucide-react";

interface InterviewStatsProps {
  totalInterviews: number;
  upcomingCount: number;
  conflictsCount: number;
  hasConflicts: boolean;
}

export default function InterviewStats({
  totalInterviews,
  upcomingCount,
  conflictsCount,
  hasConflicts,
}: InterviewStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 mb-1">Total Interviews</p>
            <p className="text-3xl font-bold text-slate-800">{totalInterviews}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 mb-1">Upcoming</p>
            <p className="text-3xl font-bold text-slate-800">{upcomingCount}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div
        className={`rounded-xl shadow-sm p-5 border ${
          hasConflicts
            ? "bg-amber-50 border-amber-300"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 mb-1">Conflicts</p>
            <p
              className={`text-3xl font-bold ${
                hasConflicts ? "text-amber-700" : "text-slate-800"
              }`}
            >
              {conflictsCount}
            </p>
          </div>
          <div
            className={`p-3 rounded-lg ${
              hasConflicts ? "bg-amber-200" : "bg-slate-100"
            }`}
          >
            <AlertTriangle
              className={`w-6 h-6 ${
                hasConflicts ? "text-amber-700" : "text-slate-400"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
