// context/CourseContext.js
import { createContext, useContext, useState } from "react";
import api from "../services/api";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  // ✅ Fetch all courses safely
  const loadCourses = async () => {
    try {
      const res = await api.get("/courses");
      console.log("Courses response:", res.data);

      // ✅ Normalize structure
      let data = res.data.data || res.data;
      if (Array.isArray(data)) {
        setCourses(data);
      } else if (data.courses) {
        setCourses(data.courses);
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
      setCourses([]);
    }
  };

  // ✅ Delete course from backend and state
  const removeCourse = async (id) => {
    await api.delete(`/courses/${id}`);
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CourseContext.Provider value={{ courses, loadCourses, removeCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
