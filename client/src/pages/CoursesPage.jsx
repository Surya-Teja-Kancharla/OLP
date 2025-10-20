import { useEffect, useState } from "react";
import { fetchCourses } from "../services/courseService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data || []);
      } catch {
        alert("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleEnroll = (courseId) => {
    if (!token) {
      // save pending action, redirect to login
      sessionStorage.setItem("pendingAction", JSON.stringify({ action: "enroll", courseId }));
      navigate("/login");
      return;
    }
    // if token exists, call enroll API (enrollmentService)
    navigate(`/courses/${courseId}`);
  };

  if (loading) return <div className="p-6 text-gray-600">Loading courses...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div key={c.id} className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{c.description}</p>
            <div className="mt-4 flex gap-2">
              <button className="bg-primary text-white px-3 py-1 rounded" onClick={() => navigate(`/courses/${c.id}`)}>
                View
              </button>
              <button className="border border-primary text-primary px-3 py-1 rounded" onClick={() => handleEnroll(c.id)}>
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
