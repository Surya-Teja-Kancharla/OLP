import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    logout?.(); // Clear stale session if present
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-12">
        <div className="max-w-2xl">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-primary">
            Learn. Build. Grow.
          </h1>

          {/* Subtext */}
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            A modern Online Learning Platform: browse courses, enroll, take
            quizzes, and participate in course discussions.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/courses")}
              className="px-6 py-2.5 rounded-md font-semibold text-white bg-primary transition-all duration-200 shadow-md hover:shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
            >
              Browse Courses
            </button>

            <button
              onClick={handleGetStarted}
              className="px-6 py-2.5 rounded-md font-semibold text-white bg-primary transition-all duration-200 shadow-md hover:shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
