import api from "./api";

// Fetch quiz for a course
export const fetchQuiz = async (courseId) => {
  const res = await api.get(`/quizzes/${courseId}`);
  return res.data;
};

// Submit quiz answers
export const submitQuiz = async (courseId, answers) => {
  const res = await api.post(`/quizzes/${courseId}/submit`, { answers });
  return res.data;
};
