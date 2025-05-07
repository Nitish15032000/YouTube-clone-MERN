import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '../../services/videoService';
import { useAuth } from '../../context/AuthContext';

/**
 * Page for uploading new videos
 */
const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Entertainment');
  const [tags, setTags] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!user) {
      setError('You must be logged in to upload videos');
      return;
    }

    if (!videoFile || !thumbnailFile) {
      setError('Please select both video and thumbnail files');
      return;
    }

    if (!user.channels?.length) {
      setError('You need to create a channel first');
      return;
    }

    setLoading(true);
    setError('');

    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('channel', user.channels[0]); // Use first channel
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);

    try {
      const video = await uploadVideo(formData);
      navigate(`/video/${video._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-900 text-red-200 rounded">
          {error}
        </div>
      )}

      {/* Upload form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File uploads */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Video File</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files[0])}
                className="w-full"
                required
              />
            </div>
          </div>
          
          {/* Video info */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2"
                required
                maxLength="100"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 h-24"
                maxLength="5000"
              />
            </div>
          </div>
        </div>
        
        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2"
            >
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Gaming">Gaming</option>
              <option value="Music">Music</option>
              <option value="News">News</option>
              <option value="Sports">Sports</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2"
              placeholder="tech, tutorial, webdev"
            />
          </div>
        </div>
        
        {/* Submit button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary rounded font-medium hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;