import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import VideoCard from '../components/video/VideoCard';
import Loader from '../components/ui/Loader';

const ChannelPage = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const [channelRes, videosRes] = await Promise.all([
          axios.get(`/channel/${id}`),
          axios.get(`/video?channelId=${id}`)
        ]);
        setChannel(channelRes.data);
        setVideos(videosRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch channel');
      } finally {
        setLoading(false);
      }
    };
    fetchChannel();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Channel Banner */}
        <div className="w-full h-48 md:h-64 relative rounded-lg overflow-hidden">
          <img 
            src={channel.channelBanner || '/default-banner.jpg'} 
            alt={channel.channelName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Channel Info */}
        <div className="flex items-start space-x-6 p-4">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={channel.owner?.avatar || '/default-avatar.png'} 
              alt={channel.channelName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {channel.channelName}
            </h1>
            <p className="text-gray-600 mt-2">
              {channel.subscribers.toLocaleString()} subscribers
            </p>
            <p className="text-gray-700 mt-4 max-w-2xl">
              {channel.description}
            </p>
          </div>
        </div>

        {/* Videos Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map(video => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;