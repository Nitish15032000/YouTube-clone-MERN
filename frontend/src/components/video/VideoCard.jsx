import { abbreviateNumber } from 'js-abbreviation-number';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

/**
 * Component for displaying video thumbnail and basic info
 */
const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  // Format duration (seconds to MM:SS)
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="cursor-pointer"
      onClick={() => navigate(`/video/${video._id}`)}
    >
      {/* Thumbnail with duration */}
      <div className="relative pb-[56.25%] rounded-xl overflow-hidden bg-dark-700">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="absolute h-full w-full object-cover"
        />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 px-1 text-xs rounded">
          {formatDuration(video.duration)}
        </span>
      </div>
      
      {/* Video info */}
      <div className="flex mt-3">
        <div className="flex-shrink-0 mr-3">
          <div className="w-9 h-9 rounded-full bg-dark-600 overflow-hidden">
            {video.channel?.avatar && (
              <img 
                src={video.channel.avatar} 
                alt={video.channel.channelName}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <div>
          <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
          <p className="text-gray-400 text-xs mt-1">{video.channel?.channelName}</p>
          <p className="text-gray-400 text-xs">
            {abbreviateNumber(video.views)} views • {formatDistanceToNow(new Date(video.createdAt))} ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;