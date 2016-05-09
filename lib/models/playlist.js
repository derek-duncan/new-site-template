import mongoose, { Schema } from 'mongoose';
import { merge } from 'lodash';
import baseSchema from './base-schema.js';

const PlaylistSchema = new Schema(merge({}, baseSchema, {
  creator: {
    type: String,
    ref: 'User',
  },
  label: {
    type: String,
  },
}));

PlaylistSchema.pre('save', function presave(next) {
  this.updated_at = Date.now();
  return next();
});

export default mongoose.model('Playlist', PlaylistSchema);
