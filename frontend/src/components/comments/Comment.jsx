import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../api/axios';

const Comment = ({ comment, onDelete, onUpdate }) => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    try {
      await axios.put(`/comment/${comment._id}`, { text: editedText });
      onUpdate(comment._id, editedText);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update comment');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex items-center space-x-3 mb-3">
        <img 
          src={comment.user?.avatar || '/default-avatar.png'} 
          alt={comment.user?.username}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-medium text-gray-700">{comment.user?.username}</span>
      </div>
      
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          />
          <div className="flex space-x-2">
            <button 
              onClick={handleUpdate}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-600">{comment.text}</p>
          {user?._id === comment.user?._id && (
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(comment._id)}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Comment;