import api from '../utils/api';

/**
 * Service for video-related API calls
 */
export const getVideos = async (params = {}) => {
  const response = await api.get('/video', { params });
  return response.data;
};

export const getVideoById = async (id) => {
  const response = await api.get(`/video/${id}`);
  return response.data;
};

export const uploadVideo = async (formData) => {
  const response = await api.post('/video', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateVideo = async (id, videoData) => {
  const response = await api.put(`/video/${id}`, videoData);
  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await api.delete(`/video/${id}`);
  return response.data;
};

export const likeVideo = async (id) => {
  const response = await api.put(`/video/${id}/like`);
  return response.data;
};

export const dislikeVideo = async (id) => {
  const response = await api.put(`/video/${id}/dislike`);
  return response.data;
};