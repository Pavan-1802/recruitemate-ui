import type { Interview } from "../../types";
import {
  Video,
  Calendar,
  AlertTriangle,
  Clock,
  User,
  ExternalLink,
  Edit,
  Trash,
} from "lucide-react";
import { formatDateTime, formatInterviewTime, getEndTime } from "../../utils";

interface InterviewCardProps {
  interview: Interview;
  isOverlapping: boolean;
  conflictingInterviews: Interview[];
  onReschedule: (interview: Interview) => void;
  onCancel: (interview: Interview) => void;
}

export default function InterviewCard({
  interview,
  isOverlapping,
  conflictingInterviews,
  onReschedule,
  onCancel,
}: InterviewCardProps) {
  const startDate = new Date(interview.start_time);
  const isPast = startDate < new Date();

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
        isOverlapping
          ? "border-amber-400 bg-gradient-to-br from-white to-amber-50"
          : isPast
          ? "border-slate-200 opacity-60"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div
        className={`p-5 ${
          isOverlapping
            ? "bg-gradient-to-r from-amber-500 to-orange-500"
            : isPast
            ? "bg-slate-400"
            : "bg-gradient-to-r from-slate-700 to-slate-600"
        } text-white`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-5 h-5" />
              <h3 className="text-xl font-bold">{interview.title}</h3>
            </div>
            {interview.name && (
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <User className="w-4 h-4" />
                <span>{interview.name}</span>
              </div>
            )}
          </div>
          {isOverlapping && (
            <div className="bg-red-600 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-bold">CONFLICT</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Date</p>
              <p className="text-sm font-semibold text-slate-800">
                {formatDateTime(interview.start_time)} •{" "}
                {startDate.toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Time</p>
              <p className="text-sm font-semibold text-slate-800">
                {formatInterviewTime(interview.start_time)} -{" "}
                {getEndTime(interview.start_time, interview.duration)}
                <span className="text-slate-500 ml-2">
                  ({interview.duration} min)
                </span>
              </p>
            </div>
          </div>
        </div>

        {isOverlapping && (
          <div className="bg-amber-100 border border-amber-300 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-900 mb-1">
                  Overlaps with {conflictingInterviews.length} other interview
                  {conflictingInterviews.length > 1 ? "s" : ""}:
                </p>
                <ul className="text-xs text-amber-800 space-y-1">
                  {conflictingInterviews.map((conf) => (
                    <li key={conf.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                      <span className="font-medium">{conf.title}</span>
                      <span className="text-amber-600">
                        at {formatInterviewTime(conf.start_time)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-slate-200">
          {interview.link && (
            <a
              href={interview.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Join Meeting
            </a>
          )}
          <button
            onClick={() => onReschedule(interview)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 font-medium rounded-lg transition-colors shadow-sm ${
              isOverlapping
                ? "bg-amber-600 text-white hover:bg-amber-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Edit className="w-4 h-4" />
            {isOverlapping ? "Resolve Conflict" : "Reschedule"}
          </button>
          <button
            onClick={() => onCancel(interview)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 font-medium rounded-lg transition-colors shadow-sm bg-red-600 text-white hover:bg-red-700"
          >
            <Trash className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
