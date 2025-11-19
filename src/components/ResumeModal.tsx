import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { ResumeFile } from "../../types";
import { bufferToBase64 } from "../../utils";

interface ResumeModalProps {
  onClose: () => void;
  resume: ResumeFile | null;
}

export default function ResumeModal({ onClose, resume }: ResumeModalProps) {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    if (resume?.data) {
      const base64 = bufferToBase64(resume.data);
      const url = `data:application/pdf;base64,${base64}`;
      setPdfUrl(url);
    }
  }, [resume]);

  return (
    <div className="fixed inset-0 bg-slate-900 z-100 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 px-6 py-3 flex items-center justify-between shadow-lg">
        <h2 className="text-lg font-semibold text-white">Resume Preview</h2>
        <button
          onClick={onClose}
          className="text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg p-2 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 bg-slate-800">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title="Resume Preview"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-400 text-lg">Loading resume...</p>
          </div>
        )}
      </div>
    </div>
  );
}