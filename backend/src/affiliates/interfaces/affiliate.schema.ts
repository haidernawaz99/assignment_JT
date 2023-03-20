import * as mongoose from 'mongoose';

const stringAndRequired = {
  type: String,
  required: true,
};

export const AffiliateSchema = new mongoose.Schema({
  name: stringAndRequired,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  siteURL: stringAndRequired,
  affiliateToken: String,

  status: {
    type: String,
    required: true,
    enum: ['Unapproved', 'Disabled', 'Enabled'],
    message: '{VALUE} is not supported',
    default: 'Unapproved',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});
