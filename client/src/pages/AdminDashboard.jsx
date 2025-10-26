import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Users, BookOpen, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    loadUsers();
    loadCourses();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data || res.data);
    } catch {
      toast.error("Failed to load users (admin-only).");
    }
  };

  const loadCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data.data || []);
    } catch {
      toast.error("Failed to load courses.");
    }
  };

  const confirmDelete = (course) => {
    setCourseToDelete(course);
    setShowModal(true);
  };

  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;
    try {
      const res = await api.delete(`/courses/${courseToDelete.id}`);
      if (res.data.success) {
        setCourses((prev) => prev.filter((c) => c.id !== courseToDelete.id));
        toast.success(`🗑️ '${courseToDelete.title}' deleted successfully.`);
      } else {
        toast.error(res.data.message || "Failed to delete course.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete course.");
    } finally {
      setShowModal(false);
      setCourseToDelete(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Admin Dashboard</h1>

      {/* Users */}
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

      {/* Courses */}
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
                    <td className="py-2 px-3">{c.instructor_name || "Not Assigned"}</td>
                    <td className="py-2 px-3">{c.category || "—"}</td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => confirmDelete(c)}
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

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 text-sm mb-5">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{courseToDelete.title}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCourse}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
