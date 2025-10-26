import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, MessageSquare } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  // role-aware routes
  const coursesPath = user?.role === "instructor" ? "/instructor/courses" : "/courses";

  const dashboardPath =
  user?.role === "admin"
    ? "/admin"
    : user?.role === "instructor"
    ? "/instructor"
    : "/student";

  const items = [
    { to: dashboardPath, label: "Dashboard", icon: Home },
    { to: coursesPath, label: "Courses", icon: BookOpen },
    { to: "/forum", label: "Forum", icon: MessageSquare },
  ];

  return (
    <aside className="w-60 bg-white shadow-md h-screen sticky top-0">
      <div className="p-4 text-lg font-bold border-b">OLP</div>
      <nav className="p-4 space-y-2">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-blue-50 ${isActive ? "bg-blue-100 font-semibold" : ""}`
            }
          >
            <it.icon className="w-5 h-5" />
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
