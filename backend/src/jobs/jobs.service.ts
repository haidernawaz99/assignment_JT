import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interfaces/job.interface';
import { JobCreateInput } from './interfaces/job.createInput';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { GetJobInputParams } from './interfaces/jobs.getJobParams';
import { JobPagination } from './interfaces/job.pagination.interface';

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

  async find(input: GetJobInputParams): Promise<Job[]> {
    console.log(input);

    if (input?.category && input?.limit && input?.skip) {
      return await this.jobModel
        .find({ category: input.category })
        .limit(input.limit)
        // .skip((input.skip - 1) * 20) // (input.skip - 1) corrects for the fact that the first page is page 1, not page 0. 20 is the number of items per page.
        .skip(input.skip) // (input.skip - 1) corrects for the fact that the first page is page 1, not page 0. 20 is the number of items per page.

        .sort({ createdAt: -1 });
    }

    if (input?.category && input?.limit) {
      console.log('HIII2');

      return await this.jobModel
        .find({ category: input.category })
        .limit(input.limit)
        .sort({ createdAt: -1 });
    }
    if (input?.category) {
      console.log('HIII3');

      return await this.jobModel
        .find({ category: input.category })
        .sort({ createdAt: -1 });
    }

    if (input?.limit) {
      console.log('HIII4');

      return await this.jobModel
        .find()
        .limit(input.limit)
        .sort({ createdAt: -1 });
    }

    return await this.jobModel.find().sort({ createdAt: -1 });
  }

  async pagination(input: GetJobInputParams): Promise<JobPagination> {
    console.log(input);

    const job = await this.jobModel
      .find({ category: input.category })
      .limit(input.limit)
      // .skip((input.skip - 1) * 20) // (input.skip - 1) corrects for the fact that the first page is page 1, not page 0. 20 is the number of items per page.
      .skip(input.skip) // (input.skip - 1) corrects for the fact that the first page is page 1, not page 0. 20 is the number of items per page.

      .sort({ createdAt: -1 });

    const jobCount = await this.jobModel
      .find({ category: input.category })
      .countDocuments();

    return { jobCount, job };
  }
}
