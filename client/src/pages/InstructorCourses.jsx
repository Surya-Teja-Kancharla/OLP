import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function InstructorCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const res = await api.get("/courses");
      const all = res.data.data || res.data || [];
      const mine = all.filter((c) => c.instructor_id === user.id);
      setCourses(mine);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">
          No courses found. Use “Create Course” in the dashboard.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-white shadow-sm rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {c.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Enrollments: {c.enrolled_count ?? 0}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/player/${c.id}`)}
                    className="px-3 py-1 border rounded hover:bg-gray-50"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/instructor/courses/${c.id}/edit`)}
                    className="px-3 py-1 bg-primary text-white rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
