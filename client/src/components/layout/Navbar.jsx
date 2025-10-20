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

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-semibold cursor-pointer tracking-wide"
        >
          🎓 OLP
        </h1>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>

        {/* Nav links */}
        <div
          className={`${
            open ? "block" : "hidden"
          } md:flex md:space-x-6 items-center`}
        >
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
              <Link to="/courses" className="hover:text-gray-200">Courses</Link>
              <Link to="/enrolled" className="hover:text-gray-200">My Courses</Link>
              <Link to="/forum" className="hover:text-gray-200">Forum</Link>
              {user.role === "instructor" && (
                <Link to="/instructor" className="hover:text-gray-200">Instructor</Link>
              )}
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-gray-200">Admin</Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-white text-primary px-3 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/signup" className="hover:text-gray-200">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
