import { useEffect, useState } from "react";
import { getForumPosts, createPost, upvotePost } from "../services/forumService";
import ForumComposer from "../components/forum/ForumComposer";
import ForumList from "../components/forum/ForumList";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [courseId, setCourseId] = useState(1); // Example

  const loadPosts = async () => {
    try {
      const data = await getForumPosts(courseId);
      setPosts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load forum posts.");
    }
  };

  const handleSubmit = async (content) => {
    await createPost(courseId, content);
    loadPosts();
  };

  const handleReply = async (parentId, content) => {
    await createPost(courseId, content, parentId);
    loadPosts();
  };

  const handleUpvote = async (id) => {
    await upvotePost(id);
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, [courseId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Discussion Forum (Course {courseId})
      </h1>

      <ForumComposer onSubmit={handleSubmit} />

      <ForumList
        posts={posts}
        onUpvote={handleUpvote}
        onReply={handleReply}
      />
    </div>
  );
}
