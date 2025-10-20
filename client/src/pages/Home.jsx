import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Always send user to login first (clear session if needed)
    logout?.(); // optional — clear stale auth token if present
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-8 py-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Section */}
            <div>
              <h1 className="text-4xl font-bold mb-4 text-primary">
                Learn. Build. Grow.
              </h1>
              <p className="text-gray-700 mb-6">
                A modern Online Learning Platform — browse courses, enroll, take
                quizzes, and participate in course discussions.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/courses")}
                  className="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition"
                >
                  Browse Courses
                </button>

                {/* ✅ Fixed Button Visibility & Behavior */}
                <button
                  onClick={handleGetStarted}
                  className="border border-primary text-primary px-5 py-2 rounded-md font-medium hover:bg-primary hover:text-white transition"
                >
                  Get Started
                </button>
              </div>

              {/* Quick Links */}
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Quick Links</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>
                    <Link to="/courses" className="hover:underline">
                      All Courses
                    </Link>
                  </li>
                  <li>
                    <Link to="/forum" className="hover:underline">
                      Discussion Forum
                    </Link>
                  </li>
                  <li>
                    <Link to="/quiz" className="hover:underline">
                      Submit Quiz
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold mb-3">Featured course</h4>
              <p className="text-sm text-gray-600">
                Prototypical content preview — replace with a nice hero image or carousel.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
