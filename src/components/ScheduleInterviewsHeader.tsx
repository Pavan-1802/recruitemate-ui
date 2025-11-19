import { Calendar, Users } from "lucide-react";

interface ScheduleInterviewsHeaderProps {
  totalCandidates: number;
  scheduledCount: number;
}

export default function ScheduleInterviewsHeader({
  totalCandidates,
  scheduledCount,
}: ScheduleInterviewsHeaderProps) {
  const pendingCount = totalCandidates - scheduledCount;

  return (
    <div className="mb-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Schedule Interviews
          </h1>
          <p className="text-lg text-slate-600">
            Review accepted candidates and schedule interviews
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      {totalCandidates > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">
                  Total Candidates
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {totalCandidates}
                </p>
              </div>
              <div className="bg-blue-200 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">
                  Scheduled
                </p>
                <p className="text-3xl font-bold text-green-900">
                  {scheduledCount}
                </p>
              </div>
              <div className="bg-green-200 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700 mb-1">
                  Pending
                </p>
                <p className="text-3xl font-bold text-amber-900">
                  {pendingCount}
                </p>
              </div>
              <div className="bg-amber-200 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
