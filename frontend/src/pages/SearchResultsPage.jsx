import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getVideos } from '../services/videoService';
import VideoCard from '../components/video/VideoCard';
import Spinner from '../components/common/Spinner';

/**
 * Page displaying search results
 */
const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch videos based on search query
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos(query ? { search: query } : {});
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-6">
        Search Results for: "{query}"
      </h1>
      
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No videos found</p>
      )}
    </div>
  );
};

export default SearchResultsPage;