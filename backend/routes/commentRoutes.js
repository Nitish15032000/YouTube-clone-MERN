import express from 'express';
import {
  addComment,
  updateComment,
  deleteComment,
  likeComment
} from '../controllers/commentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/:videoId').post(protect, addComment);
router
  .route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);
router.route('/:id/like').put(protect, likeComment);

export default router;