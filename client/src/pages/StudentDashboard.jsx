import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { getMyEnrollments } from "../services/enrollmentService";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyEnrollments();
        setEnrollments(data || []);
      } catch {
        alert("Failed to load enrollments.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Layout><div className="p-6 text-gray-600">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">My Courses</h1>

        {enrollments.length === 0 ? (
          <p className="text-gray-600">You are not enrolled in any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((e) => (
              <div key={e.course_id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{e.title}</h3>
                    <p className="text-sm text-gray-600">{e.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Progress</p>
                    <p className="text-xl font-bold">{e.progress || 0}%</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div className="h-2 rounded bg-primary" style={{ width: `${e.progress || 0}%` }} />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="bg-primary text-white px-3 py-1 rounded" onClick={() => navigate(`/courses/${e.course_id}`)}>
                    Continue Learning
                  </button>
                  <button className="border px-3 py-1 rounded" onClick={() => navigate(`/courses/${e.course_id}`)}>
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
