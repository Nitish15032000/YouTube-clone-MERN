import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/axios';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentsList = ({ videoId, initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  // Handle adding a new comment
  const handleCommentAdded = (newComment) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };

  // Handle updating a comment
  const handleCommentUpdated = (commentId, updatedText) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment._id === commentId
          ? { ...comment, text: updatedText }
          : comment
      )
    );
  };

  // Handle deleting a comment
  const handleCommentDeleted = async (commentId) => {
    try {
      await axios.delete(`/comment/${commentId}`);
      setComments(prevComments => 
        prevComments.filter(comment => comment._id !== commentId)
      );
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">
        {comments.length} Comments
      </h2>

      {/* Comment Form */}
      {user ? (
        <CommentForm 
          videoId={videoId} 
          onCommentAdded={handleCommentAdded} 
        />
      ) : (
        <p className="text-gray-600">
          Please <a href="/auth" className="text-blue-600 hover:underline">sign in</a> to comment
        </p>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map(comment => (
          <Comment
            key={comment._id}
            comment={comment}
            onDelete={handleCommentDeleted}
            onUpdate={handleCommentUpdated}
          />
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default CommentsList;