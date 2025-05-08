import { Link } from 'react-router-dom';
// import { formatViews } from '../../../utils/helpers';

const VideoCard = ({ video }) => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/video/${video._id}`} className="block relative">
        <div className="aspect-w-16 aspect-h-9 relative">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="w-full h-full object-cover" 
          />
          <span className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">
            10:30
          </span>
        </div>
      </Link>
      
      <div className="p-3 flex">
        <Link to={`/channel/${video.channelId}`} className="flex-shrink-0 mr-3">
          <img 
            src={video.uploader?.avatar || '/default-avatar.png'} 
            alt={video.uploader?.username}
            className="w-9 h-9 rounded-full object-cover" 
          />
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link 
            to={`/video/${video._id}`}
            className="block text-base font-medium text-gray-900 truncate hover:text-blue-600"
          >
            {video.title}
          </Link>
          <Link 
            to={`/channel/${video.channelId}`}
            className="block text-sm text-gray-600 hover:text-gray-900 mt-1"
          >
            {video.uploader?.username}
          </Link>
          <div className="text-sm text-gray-500 mt-1">
            {formatViews(video.views)} views • {new Date(video.uploadDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;