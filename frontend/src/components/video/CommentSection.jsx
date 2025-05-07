import { useState, useEffect } from 'react';
import { addComment, getComments } from '../../services/commentService';
import { useAuth } from '../../context/AuthContext';
import Comment from './Comment';

/**
 * Component for displaying and adding comments
 */
const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch comments when videoId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(videoId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  // Handle comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      const comment = await addComment(videoId, newComment);
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading comments...</div>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
      
      {/* Comment input (only for authenticated users) */}
      {user && (
        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center">
              {user.username.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-transparent border-b border-dark-600 pb-1 focus:outline-none focus:border-white"
            />
          </div>
        </form>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-400">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;