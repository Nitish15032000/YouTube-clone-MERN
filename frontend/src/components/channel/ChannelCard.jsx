import { Link } from 'react-router-dom';

const ChannelCard = ({ channel }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/channel/${channel._id}`} className="block">
        {/* Channel Banner */}
        <div className="h-32 w-full overflow-hidden">
          <img 
            src={channel.channelBanner || '/default-banner.jpg'} 
            alt={channel.channelName}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Channel Info */}
        <div className="p-4 flex items-center space-x-4">
          <img 
            src={channel.owner?.avatar || '/default-avatar.png'} 
            alt={channel.channelName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {channel.channelName}
            </h3>
            <p className="text-sm text-gray-600">
              {channel.subscribers} subscribers
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChannelCard;