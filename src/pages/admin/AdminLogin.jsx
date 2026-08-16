import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginAdmin } from "../../firebase/auth";
import { firebaseConfigured } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await loginAdmin(email, password);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <h1 className="mb-1 text-2xl font-semibold text-navy-800">Admin Login</h1>
      <p className="mb-8 text-sm text-navy-500">Manage the Shakti Arts catalog.</p>

      {!firebaseConfigured && (
        <div className="mb-6 rounded-md bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Firebase isn't configured yet. Add your Firebase project keys to <code>.env</code> to
          enable the admin panel — see the README for setup steps.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-700">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!firebaseConfigured}
            className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none disabled:bg-navy-50"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-700">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!firebaseConfigured}
            className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none disabled:bg-navy-50"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={!firebaseConfigured || submitting}
          className="btn btn-dark w-full"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
