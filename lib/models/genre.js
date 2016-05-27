import mongoose, { Schema } from 'mongoose';
import { merge } from 'lodash';
import baseSchema from './_base-schema.js';

const GenreSchema = new Schema(merge({}, baseSchema, {
  creator: {
    type: String,
    ref: 'User',
  },
  label: {
    type: String,
  },
}));

GenreSchema.pre('save', function presave(next) {
  this.updated_at = Date.now();
  return next();
});

export default mongoose.model('Genre', GenreSchema);
