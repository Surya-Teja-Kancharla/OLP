import { useEffect, useState } from "react";
import { getMyEnrollments } from "../services/enrollmentService";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const data = await getMyEnrollments();
        setEnrollments(data || []);
      } catch (err) {
        console.error("Failed to load enrollments:", err);
        alert("Failed to load your courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadEnrollments();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading your dashboard...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-primary mb-6">My Courses</h1>

      {/* If no enrollments */}
      {enrollments.length === 0 ? (
        <p className="text-gray-600 text-center">
          You are not enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrollments.map((e) => (
            <div
              key={e.course_id}
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300"
            >
              {/* Course Header */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {e.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {e.description || "No description available"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="text-xl font-bold text-gray-900">
                    {e.progress || 0}%
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="h-2 bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${e.progress || 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="mt-5">
                <button
                  className="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={() => navigate(`/player/${e.course_id}`)}
                >
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
