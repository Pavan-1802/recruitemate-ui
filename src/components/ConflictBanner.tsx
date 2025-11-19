import { AlertTriangle } from "lucide-react";

interface ConflictBannerProps {
  conflictsCount: number;
  onViewConflicts: () => void;
}

export default function ConflictBanner({
  conflictsCount,
  onViewConflicts,
}: ConflictBannerProps) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-red-50 border-l-4 border-amber-500 rounded-lg p-5 mb-6 shadow-sm">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-bold text-amber-900 mb-1 text-lg">
            ⚠️ Schedule Conflicts Detected
          </h3>
          <p className="text-sm text-amber-800 mb-2">
            You have {conflictsCount} interview{conflictsCount > 1 ? "s" : ""}{" "}
            with overlapping time slots. Please reschedule to avoid conflicts.
          </p>
          <button
            onClick={onViewConflicts}
            className="text-sm font-semibold text-amber-700 hover:text-amber-900 underline"
          >
            View Conflicts Only →
          </button>
        </div>
      </div>
    </div>
  );
}
