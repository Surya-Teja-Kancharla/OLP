import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { enrollCourse, updateProgress } from "../services/enrollmentService";
import Layout from "../components/layout/Layout";
import api from "../services/api";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCourseById(id);
        // Expected: { course: {...}, contents: [...] } or similar
        setCourse(res.course || res);
        setContents(res.contents || []);
      } catch {
        alert("Failed to load course.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await enrollCourse(Number(id));
      alert("Enrolled");
    } catch (err) {
      alert("Failed to enroll");
    }
  };

  const handleMarkComplete = async (contentId) => {
    try {
      // Call backend to mark lesson done and get new progress
      await api.post(`/enrollments/complete`, { course_id: id, content_id: contentId });
      const latest = await api.get(`/enrollments/me`);
      // (Optionally update UI; here we reload)
      alert("Marked complete. Progress updated.");
    } catch {
      alert("Failed to update progress.");
    }
  };

  if (loading) return <Layout><div className="p-6 text-gray-600">Loading...</div></Layout>;
  if (!course) return <Layout><div className="p-6">Course not found.</div></Layout>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-600 mb-4">{course.description}</p>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold mb-3">Lessons</h3>
            {contents.length === 0 && <p className="text-gray-500">No content yet.</p>}
            <ul className="space-y-3">
              {contents.map((c) => (
                <li key={c.id} className="border p-3 rounded flex justify-between items-center">
                  <div>
                    <div className="font-medium">{c.title || c.url}</div>
                    <div className="text-sm text-gray-500">{c.type} • {c.duration || ""}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.type === "video" ? (
                      <a href={`/player?course=${id}&content=${c.id}`} className="text-primary hover:underline">Play</a>
                    ) : (
                      c.url && <a className="text-primary hover:underline" href={c.url} target="_blank" rel="noreferrer">Download</a>
                    )}
                    <button className="text-sm px-3 py-1 border rounded" onClick={() => handleMarkComplete(c.id)}>
                      Mark complete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:w-1/3 bg-white rounded-lg shadow-sm p-4">
            <h4 className="font-semibold mb-2">Resources</h4>
            <p className="text-sm text-gray-600 mb-3">Downloadable materials and quick stats appear here.</p>
            <button className="w-full bg-primary text-white py-2 rounded" onClick={handleEnroll}>
              Enroll in this course
            </button>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
