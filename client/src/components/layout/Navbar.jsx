import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardPath =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "instructor"
      ? "/instructor"
      : "/student";

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <nav className="bg-primary text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-semibold cursor-pointer tracking-wide"
        >
          🎓 OLP
        </h1>

        {/* Mobile Toggle */}
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
          } md:flex md:space-x-6 items-center absolute md:static top-14 left-0 right-0 md:bg-transparent bg-primary md:p-0 p-4`}
        >
          {user ? (
            <>
              <Link
                to={dashboardPath}
                className={`block md:inline py-2 md:py-0 transition ${
                  isActive(dashboardPath)
                    ? "text-yellow-300 font-semibold"
                    : "hover:text-gray-200"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/courses"
                className={`block md:inline py-2 md:py-0 transition ${
                  isActive("/courses")
                    ? "text-yellow-300 font-semibold"
                    : "hover:text-gray-200"
                }`}
              >
                Courses
              </Link>
              
              <Link
                to="/forum"
                className={`block md:inline py-2 md:py-0 transition ${
                  isActive("/forum")
                    ? "text-yellow-300 font-semibold"
                    : "hover:text-gray-200"
                }`}
              >
                Forum
              </Link>

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
                className={`block md:inline py-2 md:py-0 ${
                  isActive("/login")
                    ? "text-yellow-300 font-semibold"
                    : "hover:text-gray-200"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`block md:inline py-2 md:py-0 ${
                  isActive("/signup")
                    ? "text-yellow-300 font-semibold"
                    : "hover:text-gray-200"
                }`}
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
