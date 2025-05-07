import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelById } from '../../services/channelService';
import VideoCard from '../../components/video/VideoCard';
import Spinner from '../../components/common/Spinner';

/**
 * Page displaying a channel's content
 */
const ChannelPage = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch channel data when id changes
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const data = await getChannelById(id);
        setChannel(data);
      } catch (error) {
        console.error('Error fetching channel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!channel) {
    return <div className="text-center py-10">Channel not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Channel banner */}
      <div className="mb-8">
        <div className="relative h-48 bg-dark-700 rounded-lg overflow-hidden">
          {channel.channelBanner && (
            <img 
              src={channel.channelBanner} 
              alt={channel.channelName}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        {/* Channel info */}
        <div className="flex items-center mt-4">
          <div className="w-20 h-20 rounded-full bg-dark-600 overflow-hidden mr-4">
            {channel.owner?.avatar && (
              <img 
                src={channel.owner.avatar} 
                alt={channel.channelName}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">{channel.channelName}</h1>
            <p className="text-gray-400">
              {abbreviateNumber(channel.subscribers)} subscribers
            </p>
          </div>
        </div>
        
        {/* Channel description */}
        <p className="mt-4 text-gray-300">{channel.description}</p>
      </div>
      
      {/* Channel videos */}
      <h2 className="text-xl font-semibold mb-4">Videos</h2>
      
      {channel.videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {channel.videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No videos uploaded yet</p>
      )}
    </div>
  );
};

export default ChannelPage;