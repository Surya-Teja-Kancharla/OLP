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
      const res = await apiLogin({ email, password });
      setAuth(res.user, res.token);
      api.defaults.headers.common.Authorization = `Bearer ${res.token}`;
      await finishPending(res.user);

      if (pending) return;
      if (res.user.role === "admin") navigate("/admin");
      else if (res.user.role === "instructor") navigate("/instructor");
      else navigate("/student");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Prefill helper for demo accounts
  const fillSample = (role) => {
    if (role === "admin") {
      setEmail("surya@gmail.com");
      setPassword("admin123");
    } else if (role === "instructor") {
      setEmail("rajesh@gmail.com");
      setPassword("instructor123");
    } else if (role === "student") {
      setEmail("aditya@gmail.com");
      setPassword("student123");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* ✅ Sample credentials section */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="font-semibold mb-2">Test Credentials</p>
          <div className="space-y-2">
            <button
              onClick={() => fillSample("admin")}
              className="w-full border border-gray-300 py-1 rounded hover:bg-gray-50"
            >
              👑 Admin — surya@gmail.com / admin123
            </button>
            <button
              onClick={() => fillSample("instructor")}
              className="w-full border border-gray-300 py-1 rounded hover:bg-gray-50"
            >
              📘 Instructor — rajesh@gmail.com / instructor123
            </button>
            <button
              onClick={() => fillSample("student")}
              className="w-full border border-gray-300 py-1 rounded hover:bg-gray-50"
            >
              🎓 Student — aditya@gmail.com / student123
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
