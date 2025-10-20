import api from "./api";

export const getForumPosts = async (courseId) => {
  const res = await api.get(`/forum?course_id=${courseId}`);
  return res.data.data;
};

export const createPost = async (courseId, content, parent_id = null) => {
  const res = await api.post("/forum", { course_id: courseId, content, parent_id });
  return res.data.data;
};

export const upvotePost = async (id) => {
  const res = await api.post(`/forum/${id}/upvote`);
  return res.data.data;
};
