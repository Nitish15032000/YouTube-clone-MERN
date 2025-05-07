import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    videoUrl: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: true
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    tags: [String],
    category: {
      type: String,
      enum: ['Education', 'Entertainment', 'Gaming', 'Music', 'News', 'Sports', 'Technology'],
      default: 'Entertainment'
    }
  },
  {
    timestamps: true
  }
);

const Video = mongoose.model('Video', videoSchema);

export default Video;