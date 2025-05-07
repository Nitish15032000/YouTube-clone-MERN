import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

const addComment = async (req, res) => {
  const { text } = req.body;

  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      res.status(404);
      throw new Error('Video not found');
    }

    const comment = await Comment.create({
      text,
      user: req.user._id,
      video: video._id
    });

    video.comments.push(comment._id);
    await video.save();

    const populatedComment = await Comment.findById(comment._id).populate(
      'user',
      'username avatar'
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  const { text } = req.body;

  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this comment');
    }

    comment.text = text || comment.text;
    const updatedComment = await comment.save();

    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this comment');
    }

    // Remove comment from video's comments array
    await Video.findByIdAndUpdate(comment.video, {
      $pull: { comments: comment._id }
    });

    await comment.remove();
    res.json({ message: 'Comment removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    if (comment.likes.includes(req.user._id)) {
      comment.likes = comment.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      comment.likes.push(req.user._id);
    }

    await comment.save();
    res.json({ likes: comment.likes.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { addComment, updateComment, deleteComment, likeComment };