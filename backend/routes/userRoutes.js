import express from 'express';
import { updateUserProfile, subscribeChannel } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/profile').put(protect, updateUserProfile);
router.route('/subscribe/:channelId').post(protect, subscribeChannel);

export default router;