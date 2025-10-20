import { ThumbsUp } from "lucide-react";

export default function ForumPostCard({ post, onUpvote }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-3 border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-800 font-medium">{post.author || "Anonymous"}</p>
          <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">
            {post.content}
          </p>
        </div>
        <button
          onClick={() => onUpvote(post.id)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600"
        >
          <ThumbsUp size={16} /> {post.upvotes}
        </button>
      </div>
    </div>
  );
}
