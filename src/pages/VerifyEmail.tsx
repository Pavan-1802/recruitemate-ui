import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { CheckCircle, AlertCircle, Loader2, Briefcase } from "lucide-react";

export default function VerifyEmail() {
  const { token } = useParams<{ token: string }>();
  const [message, setMessage] = useState({ type: "", content: "" });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/auth/verify-email/${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      if (response.ok) {
        setMessage({
          type: "success",
          content: "Email verified successfully. Redirecting to login...",
        });
        setTimeout(() => {
          navigate("/auth");
        }, 2000);
      } else {
        setMessage({
          type: "error",
          content:
            "Email verification failed. The token may be invalid or expired.",
        });
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          {/* Logo/Header */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-slate-900 text-center mb-2">
            Email Verification
          </h1>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-12 w-12 text-slate-400 animate-spin mb-4" />
              <p className="text-slate-600 text-center">
                Verifying your email address...
              </p>
            </div>
          )}

          {/* Success/Error Message */}
          {!isLoading && message.content && (
            <div className="mt-6">
              <div
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p
                    className={`text-sm font-medium ${
                      message.type === "success"
                        ? "text-green-900"
                        : "text-red-900"
                    }`}
                  >
                    {message.type === "success"
                      ? "Verification Successful"
                      : "Verification Failed"}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      message.type === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              </div>

              {/* Error actions */}
              {message.type === "error" && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate("/auth")}
                    className="text-sm font-medium text-slate-900 hover:text-slate-700"
                  >
                    Return to login page
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          © 2025 RecruitMate. All rights reserved.
        </p>
      </div>
    </div>
  );
}