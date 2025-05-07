import { abbreviateNumber } from 'js-abbreviation-number';
import { formatDistanceToNow } from 'date-fns';

/**
 * Format number to abbreviated string (e.g. 1000 -> 1K)
 */
export const formatNumber = (num) => {
  return abbreviateNumber(num);
};

/**
 * Format date to relative time (e.g. "2 days ago")
 */
export const formatDate = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

/**
 * Format duration in seconds to MM:SS
 */
export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};