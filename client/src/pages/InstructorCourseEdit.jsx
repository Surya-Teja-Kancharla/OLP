import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { addCourseContent, fetchCourseContents } from "../services/courseContentService";
import { toast } from "react-toastify";

export default function InstructorCourseEdit() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [contents, setContents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    type: "video",
    url: "",
    duration: "",
  });

  useEffect(() => {
    loadCourse();
    loadContents();
  }, [id]);

  const loadCourse = async () => {
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data.course || res.data.data?.course);
    } catch {
      toast.error("Failed to load course.");
    }
  };

  const loadContents = async () => {
    const data = await fetchCourseContents(id);
    setContents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.url) return toast.error("Title and URL are required.");
    const data = { ...form, course_id: id };
    const newContent = await addCourseContent(data);
    if (newContent) {
      setContents((prev) => [...prev, newContent]);
      setForm({ title: "", type: "video", url: "", duration: "" });
    }
  };

  if (!course) return <p className="text-center mt-12 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-2">
        Edit Course - {course.title}
      </h1>
      <p className="text-gray-600 mb-6">{course.description}</p>

      {/* Existing Contents */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
        <h2 className="text-lg font-semibold mb-3">Current Course Content</h2>
        {contents.length === 0 ? (
          <p className="text-gray-500">No content added yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {contents.map((item) => (
              <li key={item.id} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.type.toUpperCase()}</p>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  Open
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add New Content */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Course Content</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Content Title"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
          </select>

          <input
            type="text"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="Video or PDF URL"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            placeholder="Duration (optional)"
            className="w-full border px-3 py-2 rounded"
          />

          <button
            type="submit"
            className="bg-primary text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Content
          </button>
        </form>
      </div>
    </div>
  );
}
