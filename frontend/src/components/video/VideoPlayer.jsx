import { useEffect, useRef } from 'react';
import { likeVideo, dislikeVideo } from '../../services/videoService';
import { useAuth } from '../../context/AuthContext';

/**
 * Component for video playback and interaction
 */
const VideoPlayer = ({ video }) => {
  const videoRef = useRef(null);
  const { user } = useAuth();

  // Initialize video player
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video]);

  // Handle like action
  const handleLike = async () => {
    if (!user) return;
    try {
      await likeVideo(video._id);
      // In a real app, you would update the video data in the parent component
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  // Handle dislike action
  const handleDislike = async () => {
    if (!user) return;
    try {
      await dislikeVideo(video._id);
      // In a real app, you would update the video data in the parent component
    } catch (error) {
      console.error('Error disliking video:', error);
    }
  };

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
      {/* Video element */}
      <video
        ref={videoRef}
        controls
        className="w-full h-full"
        poster={video.thumbnailUrl}
      >
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video actions */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <h1 className="text-xl font-bold">{video.title}</h1>
          <p className="text-gray-400 text-sm mt-1">
            {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-primary"
          >
            <span>👍</span>
            <span>{video.likes}</span>
          </button>
          <button 
            onClick={handleDislike}
            className="flex items-center gap-1 hover:text-primary"
          >
            <span>👎</span>
            <span>{video.dislikes}</span>
          </button>
        </div>
      </div>
      
      {/* Channel info */}
      <div className="flex items-center mt-4 p-3 bg-dark-800 rounded-lg">
        <div className="w-12 h-12 rounded-full bg-dark-700 overflow-hidden mr-3">
          {video.channel?.avatar && (
            <img 
              src={video.channel.avatar} 
              alt={video.channel.channelName}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <h3 className="font-medium">{video.channel?.channelName}</h3>
          <p className="text-gray-400 text-sm">
            {abbreviateNumber(video.channel?.subscribers || 0)} subscribers
          </p>
        </div>
        <button className="ml-auto px-4 py-1 bg-primary rounded-full text-sm font-medium">
          Subscribe
        </button>
      </div>
      
      {/* Video description */}
      <div className="mt-4 p-3 bg-dark-800 rounded-lg">
        <p className="whitespace-pre-line">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;