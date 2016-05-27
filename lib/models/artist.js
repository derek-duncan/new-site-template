import mongoose, { Schema } from 'mongoose';
import { merge } from 'lodash';
import baseSchema from './_base-schema.js';

const ArtistSchema = new Schema(merge({}, baseSchema, {
  creator: {
    type: String,
    ref: 'User',
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
}));

ArtistSchema.pre('save', function presave(next) {
  this.updated_at = Date.now();
  return next();
});

export default mongoose.model('Artist', ArtistSchema);
