import api from "./api";
import { toast } from "react-toastify";

// ✅ Add new course content
export const addCourseContent = async (data) => {
  try {
    const res = await api.post("/course-content", data);
    if (res.data.success) {
      toast.success("📘 Content added successfully!");
      return res.data.data;
    } else {
      toast.error(res.data.message || "Failed to add content.");
    }
  } catch (err) {
    console.error("Add content error:", err);
    toast.error("Server error while adding content.");
  }
};

// ✅ Get all contents for a course
export const fetchCourseContents = async (courseId) => {
  try {
    const res = await api.get(`/course-content/${courseId}`);
    return res.data.data || [];
  } catch (err) {
    console.error("Fetch content error:", err);
    toast.error("Failed to load course content.");
    return [];
  }
};
