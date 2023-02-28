import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interfaces/job.interface';
import { JobCreateInput } from './interfaces/job.createInput';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { GetJobInputParams } from './interfaces/jobs.getJobParams';

// CreateCatDto  used to define the structure of the data to be returned from the server when querying for a list of cats.

@Injectable()
export class JobsService {
  constructor(@InjectModel('Job') private jobModel: Model<Job>) {}

  async create(jobInput: JobCreateInput): Promise<Job> {
    // if the user has uploaded an image (logo) then dump it to the filesystem
    if (jobInput?.image) {
      console.log(jobInput.image);
      const { createReadStream, filename } = await jobInput?.image;
      jobInput.logo = filename || null; //save the filename to the database (if exists)
      const createdJob = new this.jobModel(jobInput);

      return new Promise(async (resolve) =>
        createReadStream()
          .pipe(
            createWriteStream(join(process.cwd(), `./src/upload/${filename}`)),
          )
          .on('finish', () => resolve(createdJob.save()))
          .on('error', () => {
            new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
          }),
      );
    }

    // if the user has NOT uploaded an image (logo)
    const createdJob = new this.jobModel(jobInput);
    return createdJob.save();
  }

  async findAll(input: GetJobInputParams): Promise<Job[]> {
    console.log(input);
    if (input?.category && input?.limit) {
      return await this.jobModel
        .find({ category: input.category })
        .limit(input.limit)
        .sort({ createdAt: -1 });
    }
    if (input?.category) {
      return await this.jobModel
        .find({ category: input.category })
        .sort({ createdAt: -1 });
    }

    if (input?.limit) {
      return await this.jobModel
        .find()
        .limit(input.limit)
        .sort({ createdAt: -1 });
    }

    return await this.jobModel.find().sort({ createdAt: -1 });
  }
}
