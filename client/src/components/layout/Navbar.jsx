import { Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

  // 🔄 Apply dark/light theme globally
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardPath =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "instructor"
      ? "/instructor/dashboard"
      : "/student/dashboard";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary text-white dark:bg-gray-900 dark:text-gray-100 shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 sm:px-6">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-semibold cursor-pointer tracking-wide flex items-center gap-1"
        >
          🎓 <span>OLP</span>
        </h1>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-blue-600 dark:hover:bg-gray-800 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to={dashboardPath}
                className="hover:text-gray-200 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white dark:bg-gray-700 dark:text-gray-100 text-primary px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200 transition">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-200 transition">
                Sign Up
              </Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 text-sm bg-white dark:bg-gray-700 text-primary dark:text-yellow-300 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4" /> Light
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" /> Dark
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-primary dark:bg-gray-800 text-white px-6 py-4 space-y-4 shadow-lg animate-slideDown">
          {user ? (
            <>
              <Link
                to={dashboardPath}
                onClick={() => setMenuOpen(false)}
                className="block hover:text-gray-200 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left bg-white dark:bg-gray-700 dark:text-gray-100 text-primary px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-gray-200 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Dark Mode toggle inside dropdown */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 text-sm bg-white dark:bg-gray-700 text-primary dark:text-yellow-300 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4" /> Light
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" /> Dark
              </>
            )}
          </button>
        </div>
      )}
    </nav>
  );
}
