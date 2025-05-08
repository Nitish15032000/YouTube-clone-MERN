import { useState, useEffect } from 'react';
import axios from '../api/axios';
import VideoCard from '../components/video/VideoCard';
import FilterButtons from '../components/video/FilterButtons';
import Loader from '../components/ui/Loader';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/video?filter=${filter}`);
        setVideos(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [filter]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <FilterButtons activeFilter={filter} onFilterChange={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {videos.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;