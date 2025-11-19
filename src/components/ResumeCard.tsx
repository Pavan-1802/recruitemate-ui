import type { Resume } from "../../types";

export default function ResumeCard({
  resume,
  onSelect,
  onChangeStatus,
}: {
  resume: Resume;
  onSelect: () => void;
  onChangeStatus: (resumeId: string, status: string) => void;
}) {
  return (
    <div className="bg-white rounded-r-xl shadow-md hover:shadow-lg transition-shadow p-6 mb-4 border-l-4 border-slate-700 sm:w-1/2 md:w-1/3 lg:w-1/4 ">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            {resume.name}
          </h3>
          <p className="text-sm text-slate-500">{resume.email}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <span className="text-xs font-semibold bg-slate-700 text-white px-3 py-1.5 rounded-full">
            {resume.score}
          </span>
        </div>
      </div>
      <div className="text-sm text-slate-600 mb-4 flex gap-4">
        <button className="bg-green-600 p-2 rounded-lg font-semibold border-1 text-white" onClick={() => onChangeStatus(resume.id, "accepted")}>Accept</button>
        <button className="bg-red-600 p-2 rounded-lg font-semibold border-1 text-white" onClick={() => onChangeStatus(resume.id, "rejected")}>Reject</button>
      </div>
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={onSelect}
          className="w-full px-4 py-2.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 active:scale-98 transition-all shadow-sm hover:shadow-md"
        >
          View Resume →
        </button>
      </div>
    </div>
  );
}
