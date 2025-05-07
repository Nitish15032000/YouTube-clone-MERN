import { useEffect, useState } from 'react';
import VideoCard from '../components/video/VideoCard';
import { getVideos } from '../services/videoService';
import Spinner from '../components/common/Spinner';

/**
 * Home page displaying a grid of video cards
 */
const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Videos grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;