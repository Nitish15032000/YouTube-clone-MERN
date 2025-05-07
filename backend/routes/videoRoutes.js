import express from 'express';
import {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo
} from '../controllers/videoController.js';
import { protect } from '../middleware/auth.js';
import { uploadVideo, uploadThumbnail } from '../utils/upload.js';

const router = express.Router();

router.route('/').get(getVideos).post(
  protect,
  (req, res, next) => {
    uploadVideo(req, res, err => {
      if (err) return res.status(400).json({ message: 'Video upload failed' });
      uploadThumbnail(req, res, err => {
        if (err) return res.status(400).json({ message: 'Thumbnail upload failed' });
        next();
      });
    });
  },
  createVideo
);

router.route('/:id')
  .get(getVideoById)
  .put(protect, uploadThumbnail, updateVideo)
  .delete(protect, deleteVideo);

router.route('/:id/like').put(protect, likeVideo);
router.route('/:id/dislike').put(protect, dislikeVideo);

export default router;