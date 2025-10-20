import ForumPostCard from "./ForumPostCard";

export default function ForumList({ posts, onUpvote, onReply }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No discussions yet. Be the first to start a conversation!
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <ForumPostCard
          key={post.id}
          post={post}
          onUpvote={onUpvote}
          onReply={onReply}
        />
      ))}
    </div>
  );
}
