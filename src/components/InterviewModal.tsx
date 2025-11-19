import type { Interview } from "../../types";
import { useState } from "react";
import { Clock, FileText, AlertCircle, X, Save } from "lucide-react";
import { formatTimeForInput } from "../../utils";

export default function InterviewModal({
  interview: initialInterview,
  onSave,
  onClose,
}: {
  interview?: Interview;
  onSave: (interview: Interview) => void;
  onClose: () => void;
}) {
  const [interview, setInterview] = useState<Interview>(
    initialInterview || {
      id: "",
      candidate_id: "",
      start_time: "",
      duration: "",
      reminder: 0,
      link: "",
      created_at: new Date().toISOString(),
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInterview({ ...interview, [name]: value });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-slate-900">
            {initialInterview ? "Edit Interview" : "Schedule Interview"}
          </h1>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="start_time" className="flex items-center gap-2 text-sm font-medium text-slate-900 mb-2">
              <Clock className="w-4 h-4 text-slate-600" />
              Start Time
            </label>
            <input
              type="datetime-local"
              name="start_time"
              value={formatTimeForInput(interview.start_time)}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent sm:text-sm transition-all"
            />
          </div>
          <div>
            <label htmlFor="duration" className="flex items-center gap-2 text-sm font-medium text-slate-900 mb-2">
              <AlertCircle className="w-4 h-4 text-slate-600" />
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={interview.duration}
              onChange={handleChange}
              placeholder="e.g., 60"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent sm:text-sm transition-all"
            />
          </div>
          <div>
            <label htmlFor="link" className="flex items-center gap-2 text-sm font-medium text-slate-900 mb-2">
              <FileText className="w-4 h-4 text-slate-600" />
              Meet Link
            </label>
            <input
              type="text"
              name="link"
              value={interview.link}
              onChange={handleChange}
              placeholder="Paste your meeting link here..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent sm:text-sm transition-all resize-none"
            />
          </div>
          <div>
            <label htmlFor="reminder" className="flex items-center gap-2 text-sm font-medium text-slate-900 mb-2">
              <AlertCircle className="w-4 h-4 text-slate-600" />
              Reminder Before (minutes)
            </label>
            <input
              type="number"
              name="reminder"
              value={interview.reminder}
              onChange={handleChange}
              placeholder="e.g., 15"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent sm:text-sm transition-all"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-7">
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(interview)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
