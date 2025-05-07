import { upload } from '../config/cloudinary.js';

const uploadVideo = upload.single('video');
const uploadThumbnail = upload.single('thumbnail');

export { uploadVideo, uploadThumbnail };