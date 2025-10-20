import React, { useState } from "react";
import { useCourses } from "../context/CourseContext";
import { useAuth } from "../context/AuthContext";
import { PlusCircle, BookOpen } from "lucide-react";

export default function InstructorDashboard() {
  const { addCourse, courses, loadCourses } = useCourses();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", description: "", category: "" });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await addCourse(form);
      alert("Course created successfully!");
      setForm({ title: "", description: "", category: "" });
      await loadCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Instructor Dashboard
      </h1>
      <p className="text-gray-600 mb-6">
        Welcome, {user?.name}! Create and manage your courses.
      </p>

      {/* Create course form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <PlusCircle className="text-primary w-5 h-5" /> Create a New Course
        </h2>
        <form onSubmit={handleCreate} className="space-y-4 max-w-lg">
          <input
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary"
            placeholder="Course title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary"
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows="3"
          />
          <input
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Create Course
          </button>
        </form>
      </div>

      {/* Instructor’s course list */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Courses</h2>
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses created yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses
              .filter(
                (c) =>
                  c.instructor_name === user?.name ||
                  c.instructor_id === user?.id
              )
              .map((c) => (
                <div
                  key={c.id}
                  className="bg-white shadow-sm hover:shadow-md rounded-lg p-4 flex flex-col justify-between transition"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <BookOpen className="text-primary w-5 h-5" />
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {c.category || "Uncategorized"}
                    </p>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
