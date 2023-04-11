import { Document } from 'mongoose';
export interface Config extends Document {
  readonly key: string;
  readonly value: string;
}
