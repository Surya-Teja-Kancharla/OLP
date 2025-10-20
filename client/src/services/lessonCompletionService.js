import api from "./api";

// Mark a lesson as completed
export const markLessonCompleted = async (lesson_id) => {
  const res = await api.post("/lesson-completion", { lesson_id });
  return res.data;
};

// Fetch all completed lessons for a course
export const getCompletedLessons = async (courseId) => {
  const res = await api.get(`/lesson-completion/${courseId}`);
  return res.data.completedLessons;
};
