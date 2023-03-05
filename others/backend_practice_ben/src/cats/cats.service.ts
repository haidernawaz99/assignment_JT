import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { CatInput } from './inputs/cat.input';

// CreateCatDto  used to define the structure of the data to be returned from the server when querying for a list of cats.

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  async create(catInput: CatInput): Promise<Cat> {
    const createdCat = new this.catModel(catInput);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
