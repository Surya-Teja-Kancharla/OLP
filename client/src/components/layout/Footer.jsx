import { useAuth } from "../../context/AuthContext";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const { user } = useAuth();

  const handleProtectedLink = (e, path) => {
    if (!user) {
      e.preventDefault();
      alert("Please log in to access this page.");
    } else {
      window.location.href = path;
    }
  };

  return (
    <footer className="bg-secondary text-gray-100 mt-10 border-t border-gray-700/30">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-lg font-semibold tracking-wide text-white">
            🎓 Online Learning Platform
          </h2>
          <p className="text-sm text-gray-400">
            Empowering students and instructors through digital learning.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <a
            href="#"
            onClick={(e) => handleProtectedLink(e, "/courses")}
            className="hover:text-primary text-sm transition"
          >
            Courses
          </a>
          <a
            href="#"
            onClick={(e) => handleProtectedLink(e, "/forum")}
            className="hover:text-primary text-sm transition"
          >
            Forum
          </a>
        </div>

        {/* Social Media */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-400 border-t border-gray-700/30 py-3">
        © {new Date().getFullYear()} OLP | All Rights Reserved
      </div>
    </footer>
  );
}
