import api from "./api";

export const enrollCourse = async (courseId) => {
  const res = await api.post("/enrollments", { course_id: courseId });
  return res.data.data;
};

export const getMyEnrollments = async () => {
  const res = await api.get("/enrollments/me");
  return res.data.data;
};

export const updateProgress = async (courseId, progress) => {
  const res = await api.put("/enrollments/progress", {
    course_id: courseId,
    progress,
  });
  return res.data.data;
};
