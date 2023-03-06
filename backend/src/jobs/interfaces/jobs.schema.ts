import * as mongoose from 'mongoose';

const stringAndRequired = {
  type: String,
  required: true,
};

export const JobSchema = new mongoose.Schema({
  company: stringAndRequired,
  position: stringAndRequired,
  location: stringAndRequired,
  jobDescription: stringAndRequired,
  howToApply: String,
  public: Boolean,
  email: stringAndRequired,
  url: String,
  logo: String,
  type: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time', 'Contract', 'Internship', 'Freelance'],
    message: '{VALUE} is not supported',
  },
  category: {
    type: String,
    required: true,
    enum: ['Design', 'Development', 'Product', 'Other'],
    message: '{VALUE} is not supported',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  editToken: stringAndRequired,
});
