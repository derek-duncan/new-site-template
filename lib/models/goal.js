import mongoose, { Schema } from 'mongoose';
import { merge } from 'lodash';
import baseSchema from './base-schema.js';

const GoalSchema = new Schema(merge({}, baseSchema, {
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    ref: 'User',
  },
  participents: [{
    type: String,
    ref: 'User',
  }],
  followers: [{
    type: String,
    ref: 'User',
  }],
}));

GoalSchema.pre('save', function presave(next) {
  this.updated_at = Date.now();
  return next();
});

export default mongoose.model('Goal', GoalSchema);
