import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username }).lean();
  }
}
