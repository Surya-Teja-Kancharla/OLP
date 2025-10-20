import api from "./api";

// ✅ Mark as complete
export const markLessonComplete = async (lessonId) => {
  const res = await api.post(`/player/complete/${lessonId}`);
  return res.data;
};

// 🔄 Unmark as complete
export const unmarkLessonComplete = async (lessonId) => {
  const res = await api.delete(`/player/complete/${lessonId}`);
  return res.data;
};

// 📥 Get completed lessons
export const getCompletedLessons = async () => {
  const res = await api.get(`/player/completed`);
  return res.data.completed || [];
};
