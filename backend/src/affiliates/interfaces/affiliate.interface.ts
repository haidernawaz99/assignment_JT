import { Date, Document } from 'mongoose';
export interface Affiliate extends Document {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly siteURL: string;
  readonly status: string;
  readonly affiliateToken: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
