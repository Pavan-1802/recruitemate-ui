interface FilterTabsProps {
  activeFilter: "all" | "today" | "upcoming" | "conflicts";
  conflictsBadgeCount: number;
  onFilterChange: (filter: "all" | "today" | "upcoming" | "conflicts") => void;
}

export default function FilterTabs({
  activeFilter,
  conflictsBadgeCount,
  onFilterChange,
}: FilterTabsProps) {
  const tabs = [
    { key: "all" as const, label: "All Interviews" },
    { key: "today" as const, label: "Today" },
    { key: "upcoming" as const, label: "Upcoming" },
    { key: "conflicts" as const, label: "Conflicts", badge: conflictsBadgeCount },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-2 mb-6 inline-flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onFilterChange(tab.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-all relative ${
            activeFilter === tab.key
              ? "bg-slate-700 text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {tab.label}
          {tab.badge !== undefined && tab.badge > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
