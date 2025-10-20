import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-primary">
                Learn. Build. Grow.
              </h1>
              <p className="text-gray-700 mb-6">
                A modern Online Learning Platform — browse courses, enroll, take
                quizzes, and participate in course discussions.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/courses")}
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  Browse Courses
                </button>

                <button
                  onClick={() => (user ? navigate("/student") : navigate("/login"))}
                  className="border border-primary text-primary px-4 py-2 rounded-md"
                >
                  Get Started
                </button>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-2">Quick Links</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>
                    <Link to="/courses" className="hover:underline">All Courses</Link>
                  </li>
                  <li>
                    <Link to="/forum" className="hover:underline">Discussion Forum</Link>
                  </li>
                  <li>
                    <Link to="/quiz" className="hover:underline">Submit Quiz</Link>
                  </li>
                </ul>
              </div>
            </div>

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
