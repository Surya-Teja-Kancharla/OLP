import api from "./api";

export const submitQuiz = async (quizId, answers) => {
  const res = await api.post("/quizzes/submit", { quiz_id: quizId, answers });
  return res.data.data;
};
