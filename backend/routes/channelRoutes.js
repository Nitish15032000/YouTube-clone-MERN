import express from 'express';
import {
  createChannel,
  getChannelById,
  updateChannel,
  deleteChannel
} from '../controllers/channelController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, createChannel);
router
  .route('/:id')
  .get(getChannelById)
  .put(protect, updateChannel)
  .delete(protect, deleteChannel);

export default router;