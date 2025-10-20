import React, { useState } from "react";
import { useCourses } from "../context/CourseContext";
import { useAuth } from "../context/AuthContext";

export default function InstructorDashboard() {
  const { addCourse, courses, loadCourses } = useCourses();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // instructor must be logged in as instructor (backend RBAC will verify)
      const payload = { ...form };
      await addCourse(payload);
      alert("Course created.");
      setForm({ title: "", description: "", category: "" });
      await loadCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Instructor Dashboard</h2>
      <p>Welcome, {user?.name}. Create a new course below.</p>

      <form onSubmit={handleCreate} style={{ maxWidth: 600 }}>
        <div>
          <input
            placeholder="Course title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div>
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">Create Course</button>
        </div>
      </form>

      <hr />
      <h3>Your Courses</h3>
      <ul>
        {(courses || [])
          .filter((c) => c.instructor_name === user?.name || c.instructor_id === user?.id)
          .map((c) => (
            <li key={c.id}>
              <strong>{c.title}</strong> — {c.category}
            </li>
          ))}
      </ul>
    </div>
  );
}
