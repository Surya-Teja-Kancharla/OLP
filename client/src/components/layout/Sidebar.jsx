import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Home, BookOpen, MessageSquare, User, LogOut, BarChart } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/enrolled", label: "My Enrollments", icon: BarChart },
  { to: "/forum", label: "Forum", icon: MessageSquare },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg border-r">
      <div className="p-4 text-2xl font-bold text-indigo-600">OLP</div>

      <nav className="flex-1 p-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center px-4 py-2 mt-2 text-gray-700 rounded-lg transition ${
              pathname === to ? "bg-indigo-100 text-indigo-600 font-semibold" : "hover:bg-gray-100"
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t flex flex-col space-y-2">
        {user && (
          <div className="text-sm text-gray-600">
            Logged in as <br />
            <span className="font-semibold">{user.name}</span>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 mt-2"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
