import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideoById } from '../../services/videoService';
import VideoPlayer from '../../components/video/VideoPlayer';
import VideoSuggestions from '../../components/video/VideoSuggestions';
import CommentSection from '../../components/video/CommentSection';
import Spinner from '../../components/common/Spinner';

/**
 * Page for watching a video with comments and suggestions
 */
const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch video data when id changes
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideoById(id);
        setVideo(data);
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!video) {
    return <div className="text-center py-10">Video not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main video content */}
        <div className="lg:w-2/3">
          <VideoPlayer video={video} />
          <CommentSection videoId={video._id} />
        </div>
        
        {/* Suggested videos */}
        <div className="lg:w-1/3">
          <VideoSuggestions currentVideoId={video._id} />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;