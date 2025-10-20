import { useEffect, useState } from "react";
import { getForumPosts, createPost, upvotePost } from "../services/forumService";
import ForumComposer from "../components/forum/ForumComposer";
import ForumList from "../components/forum/ForumList";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [courseId, setCourseId] = useState(1); // Default for demo

  // Load posts from backend
  const loadPosts = async () => {
    try {
      const data = await getForumPosts(courseId);
      setPosts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load forum posts.");
    }
  };

  // Handle creating a new post
  const handleSubmit = async (content) => {
    if (!content.trim()) return alert("Post cannot be empty.");
    try {
      await createPost(courseId, content);
      loadPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to create post.");
    }
  };

  // Handle upvoting
  const handleUpvote = async (id) => {
    try {
      await upvotePost(id);
      loadPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to upvote.");
    }
  };

  // Fetch posts when course changes
  useEffect(() => {
    loadPosts();
  }, [courseId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Discussion Forum (Course {courseId})
      </h1>

      {/* Post creation box */}
      <ForumComposer onSubmit={handleSubmit} />

      {/* List of posts */}
      <ForumList posts={posts} onUpvote={handleUpvote} />
    </div>
  );
}
