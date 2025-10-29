import { useState } from "react";
import {
  Mail,
  CheckCircle,
  XCircle,
  Send,
  X,
  FileText,
} from "lucide-react";

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

  const subjectIsEmpty = subject.trim().length === 0;
  const bodyIsEmpty = body.trim().length === 0;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden">
        {/* Header */}
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

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Recipient preview */}

          {/* Subject */}
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

          {/* Rich-ish toolbar (visual only) */}
          <div className="flex items-center justify-between">
           
            <div className="text-xs text-slate-400">
              {body.length} characters
            </div>
          </div>

          {/* Greeting + body */}
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

        {/* Footer actions */}
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
          </div>
        </div>
      </div>
    </div>
  );
}