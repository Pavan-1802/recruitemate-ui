import { useState, useEffect } from "react";
import { X, Sparkle } from "lucide-react";
import type { Job } from "../../types";
import { toast } from "react-hot-toast";

export default function JobFormModal({
  onClose,
  onSubmit,
  job,
}: {
  onClose: () => void;
  onSubmit: (job: Job) => Promise<void>;
  job: Job | null;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [threshold, setThreshold] = useState(70);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setThreshold(job.threshold);
    }
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: job ? job.id : "",
      title,
      description,
      threshold,
      createdAt: job ? job.createdAt : new Date(),
    });
  };

  const createDescription = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/ai/generate-text`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Generate a job description for a ${title} using these following keywords: ${description}`,
        }),
      }
    );

    if (!response.ok) {
      toast.error("Failed to generate Job Description");
      setLoading(false);
      throw new Error("Failed to generate job description");
    } else {
      const data = await response.json();
      setDescription(data.text);
      toast.success("Job Description generated successfully");
      setLoading(false);
    }
  };

  const isEditMode = job !== null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {isEditMode ? "Edit Job" : "Create New Job"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors"
              placeholder="e.g. Senior Software Engineer"
            />
          </div>

          <div>
            <label
              htmlFor="jobDescription"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors resize-none"
              placeholder="Describe the role, responsibilities, requirements..."
            />
          </div>

          <div>
            <label
              htmlFor="minimumThreshold"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Minimum Match Percentage
            </label>
            <input
              id="threshold"
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              required
              min={0}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors"
              placeholder="e.g. 75"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-slate-700 hover:bg-slate-800 rounded-md font-medium transition-colors"
            >
              {isEditMode ? "Update Job" : "Create Job"}
            </button>
            <button
              className="px-4 py-2 flex items-center gap-2 text-white bg-blue-500 rounded-md disabled:bg-gray-400 font-medium hover:bg-blue-600 transition-colors"
              disabled={loading}
              onClick={createDescription}
              title="Add keywords in the textbox for your job description and let AI generate it for you"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <Sparkle className="w-4 h-4 inline-block" />
                </>
              )}
              <span>Generate Description</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
