import api from "./api";

// ✅ Mark a lesson as completed
export const markLessonCompleted = async (lesson_id) => {
  const res = await api.post("/lesson-completion", { lesson_id });
  return res.data; // includes progress + total info
};

// ✅ Fetch all completed lessons + progress for a course
export const getCompletedLessons = async (courseId) => {
  const res = await api.get(`/lesson-completion/${courseId}`);
  return {
    completedLessons: res.data.completedLessons || [],
    progress: res.data.progress || 0,
  };
};
