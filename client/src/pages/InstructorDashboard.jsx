import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Import Toastify

export default function InstructorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadCourses() {
    try {
      const res = await api.get("/courses");
      setCourses(res.data.data || []);
    } catch (err) {
      console.error("loadCourses error:", err?.response?.data || err.message || err);
      setCourses([]);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.title) return toast.error("Title is required");
    setCreating(true);

    try {
      const res = await api.post("/courses", form);
      setForm({ title: "", description: "", category: "" });
      await loadCourses();
      toast.success(`🎉 Course "${res.data.data.title}" created successfully!`);
    } catch (err) {
      console.error("Create course failed:", err?.response?.data || err.message);
      toast.error(err?.response?.data?.message || "Failed to create course");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Instructor Dashboard</h1>

      {/* Centered Create Course Form */}
      <div className="flex justify-center mb-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
            <form onSubmit={handleCreate} className="space-y-3">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Course title"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Category (optional)"
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short description (optional)"
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  {creating ? "Creating..." : "Create Course"}
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ title: "", description: "", category: "" })}
                  className="px-4 py-2 border rounded"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
