import api from "./api";

// ✅ Enroll a student in a course
export const enrollCourse = async (courseId) => {
  try {
    const res = await api.post("/enrollments", { course_id: courseId });
    return res.data;
  } catch (err) {
    console.error("❌ Enrollment failed:", err);
    throw err.response?.data || { message: "Enrollment failed" };
  }
};

// ✅ Fetch logged-in student’s enrollments
export const getMyEnrollments = async () => {
  try {
    const res = await api.get("/enrollments/me");
    return res.data.data;
  } catch (err) {
    console.error("❌ Failed to fetch enrollments:", err);
    return [];
  }
};

// ✅ Update course progress (used after marking lessons complete)
export const updateProgress = async (courseId, progress) => {
  try {
    const res = await api.put("/enrollments/progress", {
      course_id: courseId,
      progress,
    });
    return res.data.data;
  } catch (err) {
    console.error("❌ Failed to update progress:", err);
    return null;
  }
};
