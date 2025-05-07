import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../context/AuthContext';

/**
 * Component for displaying a single comment
 */
const Comment = ({ comment }) => {
  const { user } = useAuth();

  return (
    <div className="flex gap-3">
      {/* User avatar */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-dark-700 overflow-hidden">
          {comment.user?.avatar && (
            <img 
              src={comment.user.avatar} 
              alt={comment.user.username}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      
      {/* Comment content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{comment.user?.username}</span>
          <span className="text-gray-400 text-sm">
            {formatDistanceToNow(new Date(comment.createdAt))} ago
          </span>
        </div>
        <p className="mt-1">{comment.text}</p>
        
        {/* Comment actions */}
        <div className="flex gap-4 mt-2 text-sm text-gray-400">
          <button className="hover:text-white">Like ({comment.likes})</button>
          <button className="hover:text-white">Reply</button>
          {user?._id === comment.user?._id && (
            <button className="hover:text-white">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;