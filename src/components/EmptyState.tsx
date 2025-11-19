import { Calendar } from "lucide-react";

interface EmptyStateProps {
  filter: "all" | "today" | "upcoming" | "conflicts";
}

export default function EmptyState({ filter }: EmptyStateProps) {
  const getMessage = () => {
    switch (filter) {
      case "conflicts":
        return "No scheduling conflicts detected";
      case "today":
        return "No interviews scheduled for today";
      case "upcoming":
        return "No upcoming interviews scheduled";
      default:
        return "You don't have any interviews scheduled";
    }
  };

  return (
    <div className="text-center py-20">
      <div className="bg-white rounded-full p-6 w-24 h-24 mx-auto mb-4 shadow-sm">
        <Calendar className="w-12 h-12 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-700 mb-2">
        No Interviews Found
      </h3>
      <p className="text-slate-500">{getMessage()}</p>
    </div>
  );
}
