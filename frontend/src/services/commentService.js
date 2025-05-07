import api from '../utils/api';

/**
 * Service for comment-related API calls
 */
export const getComments = async (videoId) => {
  const response = await api.get(`/comment/${videoId}`);
  return response.data;
};

export const addComment = async (videoId, text) => {
  const response = await api.post(`/comment/${videoId}`, { text });
  return response.data;
};

export const updateComment = async (commentId, text) => {
  const response = await api.put(`/comment/${commentId}`, { text });
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comment/${commentId}`);
  return response.data;
};

export const likeComment = async (commentId) => {
  const response = await api.put(`/comment/${commentId}/like`);
  return response.data;
};