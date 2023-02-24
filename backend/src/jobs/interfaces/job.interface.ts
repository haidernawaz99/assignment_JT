import { Date, Document } from 'mongoose';
export interface Job extends Document {
  readonly id: string;
  readonly company: string;
  readonly position: string;
  readonly location: string;
  readonly jobDescription: string;
  readonly howToApply: string;
  readonly public: boolean;
  readonly email: string;
  readonly url: string;
  readonly logo: string;
  readonly type: string;
  readonly category: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
