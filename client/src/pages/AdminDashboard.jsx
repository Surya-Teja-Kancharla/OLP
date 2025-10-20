import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../services/api";
import { useCourses } from "../context/CourseContext";
import { Users, BookOpen, Trash2 } from "lucide-react";

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
      setUsers(res.data.data || res.data);
    } catch {
      alert("Failed to load users (admin-only).");
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await removeCourse(id);
      alert("Course deleted successfully!");
    } catch {
      alert("Failed to delete course.");
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Admin Dashboard</h1>

        {/* Users Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Users className="text-primary w-5 h-5" /> Registered Users
          </h2>

          {users.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-2 px-3 text-left">Name</th>
                    <th className="py-2 px-3 text-left">Email</th>
                    <th className="py-2 px-3 text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-t">
                      <td className="py-2 px-3">{u.name}</td>
                      <td className="py-2 px-3">{u.email}</td>
                      <td className="py-2 px-3 capitalize">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Courses Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <BookOpen className="text-primary w-5 h-5" /> All Courses
          </h2>

          {courses.length === 0 ? (
            <p className="text-gray-500">No courses available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-2 px-3 text-left">Title</th>
                    <th className="py-2 px-3 text-left">Instructor</th>
                    <th className="py-2 px-3 text-left">Category</th>
                    <th className="py-2 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="py-2 px-3">{c.title}</td>
                      <td className="py-2 px-3">{c.instructor_name || "—"}</td>
                      <td className="py-2 px-3">{c.category}</td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => handleDeleteCourse(c.id)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1 justify-center"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
