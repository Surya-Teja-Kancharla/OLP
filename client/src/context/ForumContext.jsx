import React, { createContext, useContext, useState } from "react";
import { getForumPosts, createPost, upvotePost } from "../services/forumService";

const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async (courseId) => {
    try {
      setLoading(true);
      const data = await getForumPosts(courseId);
      setPosts(data || []);
    } catch (err) {
      console.error("Failed to load forum posts", err);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (courseId, content, parent_id = null) => {
    const p = await createPost(courseId, content, parent_id);
    await loadPosts(courseId);
    return p;
  };

  const vote = async (id, courseId) => {
    await upvotePost(id);
    await loadPosts(courseId);
  };

  return (
    <ForumContext.Provider value={{ posts, loading, loadPosts, addPost, vote }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForum = () => useContext(ForumContext);
