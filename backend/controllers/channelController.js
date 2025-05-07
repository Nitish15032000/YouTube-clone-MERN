import Channel from '../models/Channel.js';
import User from '../models/User.js';
import Video from '../models/Video.js';

const createChannel = async (req, res) => {
  const { channelName, description } = req.body;

  try {
    const channelExists = await Channel.findOne({ channelName });
    if (channelExists) {
      res.status(400);
      throw new Error('Channel name already exists');
    }

    const channel = await Channel.create({
      channelName,
      owner: req.user._id,
      description
    });

    // Add channel to user's channels array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { channels: channel._id }
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate('owner', 'username avatar')
      .populate('videos');

    if (!channel) {
      res.status(404);
      throw new Error('Channel not found');
    }

    res.json(channel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateChannel = async (req, res) => {
  const { channelName, description, channelBanner } = req.body;

  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      res.status(404);
      throw new Error('Channel not found');
    }

    if (channel.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this channel');
    }

    channel.channelName = channelName || channel.channelName;
    channel.description = description || channel.description;
    channel.channelBanner = channelBanner || channel.channelBanner;

    const updatedChannel = await channel.save();
    res.json(updatedChannel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      res.status(404);
      throw new Error('Channel not found');
    }

    if (channel.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this channel');
    }

    // Remove all videos associated with this channel
    await Video.deleteMany({ channel: channel._id });

    // Remove channel from user's channels array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { channels: channel._id }
    });

    await channel.remove();
    res.json({ message: 'Channel removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createChannel, getChannelById, updateChannel, deleteChannel };