import api from '../utils/api';

/**
 * Service for channel-related API calls
 */
export const getChannelById = async (id) => {
  const response = await api.get(`/channel/${id}`);
  return response.data;
};

export const createChannel = async (channelData) => {
  const response = await api.post('/channel', channelData);
  return response.data;
};

export const updateChannel = async (id, channelData) => {
  const response = await api.put(`/channel/${id}`, channelData);
  return response.data;
};

export const deleteChannel = async (id) => {
  const response = await api.delete(`/channel/${id}`);
  return response.data;
};