import { useEffect, useState } from "react";
import { getForumPosts, createPost, upvotePost } from "../services/forumService";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [courseId, setCourseId] = useState(1); // Default course ID for demo

  const loadPosts = async () => {
    try {
      const data = await getForumPosts(courseId);
      setPosts(data);
    } catch (err) {
      alert("Failed to load forum posts");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createPost(courseId, newPost);
      setNewPost("");
      loadPosts();
    } catch (err) {
      alert("Failed to post");
    }
  };

  const handleUpvote = async (id) => {
    try {
      await upvotePost(id);
      loadPosts();
    } catch {
      alert("Failed to upvote");
    }
  };

  useEffect(() => {
    loadPosts();
  }, [courseId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Discussion Forum (Course {courseId})</h2>

      <form onSubmit={handleCreate}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Ask a question..."
        />
        <br />
        <button type="submit">Post</button>
      </form>

      <hr />
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((p) => (
        <div key={p.id} style={{ borderBottom: "1px solid #ddd", margin: "10px 0" }}>
          <p>
            <b>{p.author}</b>: {p.content}
          </p>
          <p>Upvotes: {p.upvotes}</p>
          <button onClick={() => handleUpvote(p.id)}>Upvote</button>
        </div>
      ))}
    </div>
  );
}
