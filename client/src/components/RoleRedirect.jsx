import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRedirect() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (user.role === "admin") navigate("/admin", { replace: true });
    else if (user.role === "instructor") navigate("/instructor", { replace: true });
    else navigate("/student", { replace: true });
  }, [user, loading, navigate]);

  return <div className="p-6 text-gray-600">Redirecting...</div>;
}
