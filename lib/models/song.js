import mongoose, { Schema } from 'mongoose';
import { merge } from 'lodash';
import baseSchema from './_base-schema.js';

const SongSchema = new Schema(merge({}, baseSchema, {
  creator: {
    type: String,
    ref: 'User',
  },
  name: {
    type: String,
  },
  artist: {
    type: String,
  },
  duration: {
    type: Number,
  },
  genre: {
    type: String,
    ref: 'Genre',
  },
}));

SongSchema.pre('save', function presave(next) {
  this.updated_at = Date.now();
  return next();
});

export default mongoose.model('Song', SongSchema);
