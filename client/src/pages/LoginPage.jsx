import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login as apiLogin } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { enrollCourse } from "../services/enrollmentService";

export default function LoginPage() {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // pending action saved by CoursesPage: { action: 'enroll', courseId: 3 }
  const pending = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("pendingAction"));
    } catch {
      return null;
    }
  })();

  const finishPending = async (user) => {
    if (!pending) return;
    if (pending.action === "enroll") {
      try {
        await enrollCourse(pending.courseId);
        sessionStorage.removeItem("pendingAction");
        navigate(`/courses/${pending.courseId}`);
      } catch {
        // ignore
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiLogin({ email, password }); // returns { user, token }
      setAuth(res.user, res.token);
      // set axios header
      api.defaults.headers.common.Authorization = `Bearer ${res.token}`;

      // after login, perform pending action if any
      await finishPending(res.user);

      // route by role; if no pending action, redirect to role dashboard
      if (pending) return; // finishPending already navigated
      if (res.user.role === "admin") navigate("/admin");
      else if (res.user.role === "instructor") navigate("/instructor");
      else navigate("/student");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button className="w-full bg-primary text-white py-2 rounded" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
