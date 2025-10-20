import { useState } from "react";
import { ThumbsUp, MessageSquare } from "lucide-react";
import ForumComposer from "./ForumComposer";

export default function ForumPostCard({ post, onUpvote, onReply }) {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-3 border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-800 font-medium">
            {post.author || "Anonymous"}
          </p>
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

      {/* Action buttons */}
      <div className="flex gap-4 text-sm text-gray-500 mt-2">
        <button
          onClick={() => setShowReplyBox(!showReplyBox)}
          className="flex items-center gap-1 hover:text-indigo-600"
        >
          <MessageSquare size={14} /> Reply
        </button>
      </div>

      {/* Reply box */}
      {showReplyBox && (
        <div className="mt-3 ml-6">
          <ForumComposer
            onSubmit={(content) => {
              onReply(post.id, content);
              setShowReplyBox(false);
            }}
          />
        </div>
      )}

      {/* Child replies */}
      {post.replies && post.replies.length > 0 && (
        <div className="ml-6 mt-3 border-l border-gray-200 pl-3">
          {post.replies.map((reply) => (
            <ForumPostCard
              key={reply.id}
              post={reply}
              onUpvote={onUpvote}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}
