import api from "./api";

/**
 * ✅ Fetch all available courses (safe version)
 * Ensures you always return an array even if backend response changes.
 */
export const fetchCourses = async () => {
  const res = await api.get("/courses");
  const data = res.data?.data;
  return Array.isArray(data) ? data : [];
};

/**
 * ✅ Fetch a single course with its lessons/content
 * Always returns a valid object + array.
 */
export const getCourseById = async (id) => {
  const res = await api.get(`/courses/${id}`);
  const { course, contents } = res.data || {};
  return {
    course: course || {},
    contents: Array.isArray(contents) ? contents : [],
  };
};

/**
 * ✅ Create a new course
 */
export const createCourse = async (data) => {
  const res = await api.post("/courses", data);
  return res.data;
};

/**
 * ✅ Update existing course
 */
export const updateCourse = async (id, data) => {
  const res = await api.put(`/courses/${id}`, data);
  return res.data;
};

/**
 * ✅ Delete a course by ID
 */
export const deleteCourse = async (id) => {
  const res = await api.delete(`/courses/${id}`);
  return res.data;
};
