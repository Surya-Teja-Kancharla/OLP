import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useCourses } from "../context/CourseContext";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const { courses, loadCourses, removeCourse } = useCourses();

  useEffect(() => {
    loadUsers();
    loadCourses();
    // eslint-disable-next-line
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");
      // API may return { data: users } or similar
      setUsers(res.data.data || res.data);
    } catch (err) {
      alert("Failed to load users (admin-only endpoint).");
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await removeCourse(id);
      alert("Course deleted");
    } catch (err) {
      alert("Failed to delete course");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Registered Users</h3>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((u) => (
              <li key={u.id}>
                {u.name} — {u.email} — <b>{u.role}</b>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>All Courses</h3>
        {courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          <ul>
            {courses.map((c) => (
              <li key={c.id} style={{ marginBottom: 8 }}>
                <strong>{c.title}</strong> by {c.instructor_name || "—"}
                <div>
                  <button onClick={() => handleDeleteCourse(c.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
