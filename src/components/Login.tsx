import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Mail, Lock } from "lucide-react";

export default function Login({ toggleForm }: { toggleForm: (action:string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      if (response.status === 401) {
        toast.error("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Welcome back
          </h1>
          <p className="text-slate-600">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={()=>toggleForm('forgot-password')}
              type="button"
              className="text-sm font-medium text-slate-900 hover:text-slate-700"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-colors"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <button
              onClick={() => toggleForm("signup")}
              className="font-medium text-slate-900 hover:text-slate-700"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}