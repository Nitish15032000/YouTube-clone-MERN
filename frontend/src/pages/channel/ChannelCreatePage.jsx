import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChannel } from '../../services/channelService';
import { useAuth } from '../../context/AuthContext';

/**
 * Page for creating a new channel
 */
const ChannelCreatePage = () => {
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to create a channel');
      return;
    }

    if (!channelName.trim()) {
      setError('Channel name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const channel = await createChannel({
        channelName,
        description,
        owner: user._id
      });
      navigate(`/channel/${channel._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Channel creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create Channel</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900 text-red-200 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Channel Name</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2"
            required
            maxLength="50"
          />
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 h-32"
            maxLength="500"
          />
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary rounded font-medium hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Channel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChannelCreatePage;