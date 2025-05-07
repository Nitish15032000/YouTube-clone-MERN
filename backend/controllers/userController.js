import User from '../models/User.js';
import Channel from '../models/Channel.js';

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

const subscribeChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      res.status(404);
      throw new Error('Channel not found');
    }

    const user = await User.findById(req.user._id);
    if (user.subscribedChannels.includes(channelId)) {
      user.subscribedChannels = user.subscribedChannels.filter(
        id => id.toString() !== channelId.toString()
      );
      channel.subscribers -= 1;
    } else {
      user.subscribedChannels.push(channelId);
      channel.subscribers += 1;
    }

    await user.save();
    await channel.save();

    res.json({ subscribedChannels: user.subscribedChannels });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { updateUserProfile, subscribeChannel };