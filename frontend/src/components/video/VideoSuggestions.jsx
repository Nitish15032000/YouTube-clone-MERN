import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRelatedVideos } from '../../services/videoService';
import VideoCard from './VideoCard';
import Spinner from '../common/Spinner';

/**
 * VideoSuggestions component displays a list of related videos
 * @param {string} currentVideoId - The ID of the currently playing video
 */
const VideoSuggestions = ({ currentVideoId }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRelatedVideos = async () => {
      try {
        setLoading(true);
        const videos = await fetchRelatedVideos(currentVideoId);
        setRelatedVideos(videos);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching related videos:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentVideoId) {
      getRelatedVideos();
    }
  }, [currentVideoId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load suggestions. {error}
      </div>
    );
  }

  if (relatedVideos.length === 0) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-center p-4">
        No related videos found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold dark:text-white px-2">
        Up Next
      </h3>
      
      <div className="space-y-4">
        {relatedVideos.map((video) => (
          <Link 
            key={video._id} 
            to={`/video/${video._id}`}
            className="block"
          >
            <div className="flex gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
              {/* Thumbnail */}
              <div className="flex-shrink-0 relative w-40">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                  {video.duration}
                </span>
              </div>
              
              {/* Video info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2 dark:text-white">
                  {video.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {video.channel?.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoSuggestions;