import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import VideoPlayer from '../components/video/VideoPlayer';
import CommentsList from '../components/comments/CommentsList';
import Loader from '../components/ui/Loader';

const VideoPage = () => {
  
  // Get video ID from URL params
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Authentication context
  const { user } = useAuth();
  
  // Component state
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch video data when component mounts or ID changes
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/video/${id}`);
        const videoData = response.data;
        
        setVideo(videoData);
        
        // Check if current user has liked/disliked/subscribed
        if (user) {
          setIsLiked(videoData.likes.includes(user._id));
          setIsDisliked(videoData.dislikes.includes(user._id));
          setIsSubscribed(videoData.uploader?.subscribers?.includes(user._id) || false);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch video');
        // Redirect to home page if video not found
        if (err.response?.status === 404) {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideo();
  }, [id, user, navigate]);

  // Handle video like action
  const handleLike = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    try {
      await axios.put(`/video/${id}/like`);
      
      // Optimistically update UI
      const updatedVideo = { ...video };
      
      if (isLiked) {
        // Remove like if already liked
        updatedVideo.likes = updatedVideo.likes.filter(uid => uid !== user._id);
      } else {
        // Add like
        updatedVideo.likes.push(user._id);
        
        // Remove dislike if exists
        if (isDisliked) {
          updatedVideo.dislikes = updatedVideo.dislikes.filter(uid => uid !== user._id);
          setIsDisliked(false);
        }
      }
      
      setVideo(updatedVideo);
      setIsLiked(!isLiked);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to like video');
    }
  };

  // Handle video dislike action
  const handleDislike = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    try {
      await axios.put(`/video/${id}/dislike`);
      
      // Optimistically update UI
      const updatedVideo = { ...video };
      
      if (isDisliked) {
        // Remove dislike if already disliked
        updatedVideo.dislikes = updatedVideo.dislikes.filter(uid => uid !== user._id);
      } else {
        // Add dislike
        updatedVideo.dislikes.push(user._id);
        
        // Remove like if exists
        if (isLiked) {
          updatedVideo.likes = updatedVideo.likes.filter(uid => uid !== user._id);
          setIsLiked(false);
        }
      }
      
      setVideo(updatedVideo);
      setIsDisliked(!isDisliked);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to dislike video');
    }
  };

  // Handle channel subscription
  const handleSubscribe = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    try {
      await axios.post(`/user/subscribe/${video.uploader._id}`);
      
      // Optimistically update UI
      const updatedVideo = { ...video };
      if (isSubscribed) {
        updatedVideo.uploader.subscribers = 
          updatedVideo.uploader.subscribers.filter(uid => uid !== user._id);
      } else {
        updatedVideo.uploader.subscribers.push(user._id);
      }
      
      setVideo(updatedVideo);
      setIsSubscribed(!isSubscribed);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update subscription');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Video Player Section */}
      <div className="w-full aspect-video mb-6">
        <VideoPlayer videoUrl={video.videoUrl} />
      </div>
      
      {/* Video Info Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
        
        {/* Video Stats */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>{video.views.toLocaleString()} views</span>
          <span>•</span>
          <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
        </div>
        
        {/* Video Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              isLiked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
            aria-label="Like video"
          >
            <span>👍</span>
            <span>{video.likes.length}</span>
          </button>
          
          <button 
            onClick={handleDislike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              isDisliked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
            aria-label="Dislike video"
          >
            <span>👎</span>
            <span>{video.dislikes.length}</span>
          </button>
          
          <button 
            className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100"
            aria-label="Share video"
          >
            <span>↗️</span>
            <span>Share</span>
          </button>
        </div>
        
        {/* Channel Info */}
        <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img 
              src={video.uploader?.avatar || '/default-avatar.png'} 
              alt={video.uploader?.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <Link 
                to={`/channel/${video.uploader?._id}`}
                className="font-medium text-gray-900 hover:text-blue-600"
              >
                {video.uploader?.username}
              </Link>
              <p className="text-sm text-gray-600">
                {video.uploader?.subscribers?.length?.toLocaleString() || 0} subscribers
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleSubscribe}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              isSubscribed 
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
        
        {/* Video Description */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-800 whitespace-pre-wrap">{video.description}</p>
        </div>
      </div>
      
      {/* Comments Section */}
      <div className="mt-8">
        <CommentsList 
          videoId={video._id} 
          initialComments={video.comments} 
        />
      </div>
    </div>
  );
};

export default VideoPage;