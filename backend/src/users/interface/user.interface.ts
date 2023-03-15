import { Date, Document } from 'mongoose';
export interface User extends Document {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly isAdmin: boolean;
  readonly createdAt: Date;
}
