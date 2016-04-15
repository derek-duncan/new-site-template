import mongoose, { Schema } from 'mongoose';
import { merge } from 'lodash';
import baseSchema from './base-schema.js';

const UserSchema = new Schema(merge({}, baseSchema, {
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}));

UserSchema.virtual('fullname').get(function() {
  return `${this.fname} ${this.lname}`;
});

UserSchema.pre('save', function presave(next) {
  this.updated_at = Date.now();
  return next();
});

export default mongoose.model('User', UserSchema);
