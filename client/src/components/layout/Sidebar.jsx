import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Home, BookOpen, MessageSquare, LogOut, BarChart } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  const navItems = [
    { to: "/student", label: "Dashboard", icon: Home },
    { to: "/courses", label: "Courses", icon: BookOpen },
    // { to: "/enrolled", label: "My Enrollments", icon: BarChart },
    { to: "/forum", label: "Forum", icon: MessageSquare },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-sm">
      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center px-4 py-2 rounded-lg mb-1 transition-all duration-150 ${
              isActive(to)
                ? "bg-indigo-100 text-indigo-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-sm text-gray-600 bg-gray-50">
        {user && (
          <div>
            <p className="mb-1">
              Logged in as <br />
              <span className="font-semibold">{user.name}</span>
            </p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
