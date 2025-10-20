import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ dynamic dashboard route based on user role
  const dashboardPath =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "instructor"
      ? "/instructor"
      : "/student";

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-semibold cursor-pointer tracking-wide"
        >
          🎓 OLP
        </h1>

        {/* Mobile toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            open ? "block" : "hidden"
          } md:flex md:space-x-6 items-center absolute md:static top-16 left-0 right-0 md:bg-transparent bg-primary md:shadow-none shadow-lg md:p-0 p-4`}
        >
          {user ? (
            <>
              <Link
                to={dashboardPath}
                className="block md:inline hover:text-gray-200 py-2 md:py-0"
              >
                Dashboard
              </Link>
              <Link
                to="/courses"
                className="block md:inline hover:text-gray-200 py-2 md:py-0"
              >
                Courses
              </Link>
              <Link
                to="/enrolled"
                className="block md:inline hover:text-gray-200 py-2 md:py-0"
              >
                My Courses
              </Link>
              <Link
                to="/forum"
                className="block md:inline hover:text-gray-200 py-2 md:py-0"
              >
                Forum
              </Link>

              {user.role === "instructor" && (
                <Link
                  to="/instructor"
                  className="block md:inline hover:text-gray-200 py-2 md:py-0"
                >
                  Instructor
                </Link>
              )}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="block md:inline hover:text-gray-200 py-2 md:py-0"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-white text-primary px-3 py-1 rounded hover:bg-gray-100 mt-2 md:mt-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block md:inline hover:text-gray-200 py-2 md:py-0"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block md:inline hover:text-gray-200 py-2 md:py-0"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
