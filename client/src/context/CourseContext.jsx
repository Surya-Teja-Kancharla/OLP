import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCourses,
  createCourse,
  getCourseById,
  deleteCourse,
  updateCourse,
} from "../services/courseService";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoadingCourses(true);
      const data = await fetchCourses();
      setCourses(data || []);
    } catch (err) {
      console.error("Failed loading courses", err?.response?.data || err);
    } finally {
      setLoadingCourses(false);
    }
  };

  const addCourse = async (payload) => {
    const newCourse = await createCourse(payload);
    // refresh list
    await loadCourses();
    return newCourse;
  };

  const removeCourse = async (id) => {
    await deleteCourse(id);
    await loadCourses();
  };

  const editCourse = async (id, payload) => {
    const updated = await updateCourse(id, payload);
    await loadCourses();
    return updated;
  };

  const getCourse = async (id) => {
    return await getCourseById(id);
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        loadingCourses,
        loadCourses,
        addCourse,
        removeCourse,
        editCourse,
        getCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
