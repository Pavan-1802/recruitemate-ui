import { Calendar, Users } from "lucide-react";

export default function ScheduleInterviewsEmpty() {
  return (
    <div className="text-center py-20">
      <div className="relative inline-flex items-center justify-center mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full blur-xl opacity-50" />
        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-full p-8 shadow-lg">
          <Calendar className="w-16 h-16 text-slate-400" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
            <Users className="w-6 h-6 text-slate-500" />
          </div>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-3">
        No Candidates Available
      </h3>
      <p className="text-slate-600 text-lg max-w-md mx-auto">
        There are no accepted candidates to schedule interviews with at the moment.
      </p>
      
      <div className="mt-8 inline-flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-lg">
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
        Waiting for candidate approvals
      </div>
    </div>
  );
}
