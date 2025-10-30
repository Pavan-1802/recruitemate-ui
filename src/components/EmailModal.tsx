import { useState } from "react";
import {
  Mail,
  CheckCircle,
  XCircle,
  Send,
  X,
  FileText,
  Sparkle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function EmailModal({
  onClose,
  onSend,
  mailType,
}: {
  onClose: () => void;
  onSend: (email: { subject: string; body: string }) => void;
  mailType: string;
}) {
  const isAcceptance = mailType === "acceptance";

  const [subject, setSubject] = useState(
    isAcceptance
      ? "Congratulations on Your Acceptance!"
      : "Update on Your Application Status"
  );
  const [body, setBody] = useState(
    isAcceptance
      ? "We are thrilled to inform you that your application has been shortlisted for this position. We will reach out soon to discuss the next steps. Welcome aboard!\n\nBest regards,\nRecruitment Team"
      : "We wanted to provide you with an update regarding your application. We have reviewed your application. Unfortunately we will not be moving forward with your application at this time.\n\nBest regards,\nRecruitment Team"
  );
  const [loading, setLoading] = useState(false);

  const subjectIsEmpty = subject.trim().length === 0;
  const bodyIsEmpty = body.trim().length === 0;

  const generateEmailContent = async (e: React.FormEvent) => {
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
          prompt: `Generate a ${mailType} email for a job application. Use these phrases or keywords: ${body}. Don't include any dearing or hi, hello and those kinds of stuff. Just the main content of the email.`,
        }),
      }
    );

    if (!response.ok) {
      toast.error("Failed to generate Job Description");
      setLoading(false);
      throw new Error("Failed to generate job description");
    } else {
      const data = await response.json();
      setBody(data.text);
      toast.success("Job Description generated successfully");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-md bg-slate-50 ${
                isAcceptance ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isAcceptance ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <XCircle className="w-6 h-6" />
              )}
            </div>
            <div>
              <h2
                id="email-modal-title"
                className="text-lg font-semibold text-slate-800 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-slate-600" />
                Send {mailType} Email
              </h2>
              <p className="text-sm text-slate-500">
                Personalize your message before sending
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close email modal"
            className="rounded-md p-2 hover:bg-slate-100 transition"
            title="Close"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-slate-500" />
            <label htmlFor="subject" className="sr-only">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border border-slate-100 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Email subject"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400">
              {body.length} characters
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
            <p className="text-sm text-slate-700 mb-2">Dear Candidate,</p>
            <label htmlFor="body" className="sr-only">
              Email body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-transparent min-h-[200px] resize-y focus:outline-none text-sm text-slate-700"
            />
            <div className="mt-3 text-xs text-slate-400 italic">
              Tip: keep it concise and professional.
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Preview will be sent as plain text.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-4 py-2 rounded-md hover:bg-slate-200 transition"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>

            <button
              onClick={() => {
                onSend({ subject, body });
                onClose();
              }}
              disabled={subjectIsEmpty || bodyIsEmpty}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-white transition ${
                subjectIsEmpty || bodyIsEmpty
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-slate-800 hover:bg-slate-900"
              }`}
            >
              <Send className="w-4 h-4" />
              Send
            </button>

            <button disabled={loading} onClick={generateEmailContent} className="px-4 py-2 bg-blue-500 rounded-md text-white flex items-center gap-2 hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <Sparkle className="w-4 h-4 inline-block" />
                </>
              )}
              <span>Generate Email Content</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
