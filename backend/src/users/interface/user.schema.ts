import * as mongoose from 'mongoose';

const stringAndRequired = {
  type: String,
  required: true,
};

export const UserSchema = new mongoose.Schema({
  username: { ...stringAndRequired, unique: true },
  password: stringAndRequired,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
