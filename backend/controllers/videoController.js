import Video from '../models/Video.js';
import Channel from '../models/Channel.js';
import Comment from '../models/Comment.js';
import { cloudinary } from '../config/cloudinary.js';

const getVideos = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { title: { $regex: req.query.search, $options: 'i' } },
            { description: { $regex: req.query.search, $options: 'i' } }
          ]
        }
      : {};

    const categoryFilter = req.query.category ? { category: req.query.category } : {};

    const videos = await Video.find({ ...keyword, ...categoryFilter })
      .populate('channel', 'channelName channelBanner')
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getVideoById = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('channel', 'channelName channelBanner subscribers')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username avatar'
        }
      });

    if (!video) {
      res.status(404);
      throw new Error('Video not found');
    }

    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createVideo = async (req, res) => {
  const { title, description, category, tags } = req.body;

  try {
    // Verify the user owns the channel
    const channel = await Channel.findById(req.body.channel);
    if (!channel) {
      res.status(404);
      throw new Error('Channel not found');
    }

    if (channel.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to add videos to this channel');
    }

    // Upload video and thumbnail to Cloudinary
    const videoResult = await cloudinary.uploader.upload(req.files.video[0].path, {
      resource_type: 'video'
    });
    const thumbnailResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path);

    const video = await Video.create({
      title,
      description,
      videoUrl: videoResult.secure_url,
      thumbnailUrl: thumbnailResult.secure_url,
      duration: videoResult.duration,
      channel: channel._id,
      category,
      tags: tags ? tags.split(',') : []
    });

    // Add video to channel's videos array
    channel.videos.push(video._id);
    await channel.save();

    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateVideo = async (req, res) => {
  const { title, description, category, tags } = req.body;

  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      res.status(404);
      throw new Error('Video not found');
    }

    // Verify the user owns the channel that owns the video
    const channel = await Channel.findById(video.channel);
    if (channel.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this video');
    }

    video.title = title || video.title;
    video.description = description || video.description;
    video.category = category || video.category;
    video.tags = tags ? tags.split(',') : video.tags;

    if (req.files?.thumbnail) {
      const thumbnailResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path);
      video.thumbnailUrl = thumbnailResult.secure_url;
    }

    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      res.status(404);
      throw new Error('Video not found');
    }

    // Verify the user owns the channel that owns the video
    const channel = await Channel.findById(video.channel);
    if (channel.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this video');
    }

    // Delete video and thumbnail from Cloudinary
    await cloudinary.uploader.destroy(video.videoUrl.split('/').pop().split('.')[0], {
      resource_type: 'video'
    });
    await cloudinary.uploader.destroy(video.thumbnailUrl.split('/').pop().split('.')[0]);

    // Remove all comments associated with this video
    await Comment.deleteMany({ video: video._id });

    // Remove video from channel's videos array
    await Channel.findByIdAndUpdate(channel._id, {
      $pull: { videos: video._id }
    });

    await video.remove();
    res.json({ message: 'Video removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      res.status(404);
      throw new Error('Video not found');
    }

    const isLiked = video.likes.includes(req.user._id);
    const isDisliked = video.dislikes.includes(req.user._id);

    if (isLiked) {
      video.likes = video.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      video.likes.push(req.user._id);
      if (isDisliked) {
        video.dislikes = video.dislikes.filter(
          id => id.toString() !== req.user._id.toString()
        );
      }
    }

    await video.save();
    res.json({ likes: video.likes.length, dislikes: video.dislikes.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      res.status(404);
      throw new Error('Video not found');
    }

    const isDisliked = video.dislikes.includes(req.user._id);
    const isLiked = video.likes.includes(req.user._id);

    if (isDisliked) {
      video.dislikes = video.dislikes.filter(
        id => id.toString() !== req.user._id.toString()
      );
    } else {
      video.dislikes.push(req.user._id);
      if (isLiked) {
        video.likes = video.likes.filter(id => id.toString() !== req.user._id.toString());
      }
    }

    await video.save();
    res.json({ likes: video.likes.length, dislikes: video.dislikes.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo
};