import api from "./api";

// Fetch quiz for a specific course + lesson
export const fetchQuiz = async (courseId, lessonId) => {
  const res = await api.get(`/quizzes/${courseId}/${lessonId}`);
  return res.data;
};

// Submit quiz answers
export const submitQuiz = async (courseId, lessonId, answers) => {
  const res = await api.post(`/quizzes/${courseId}/${lessonId}/submit`, { answers });
  return res.data;
};
