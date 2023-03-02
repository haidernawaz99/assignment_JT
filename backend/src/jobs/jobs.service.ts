import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interfaces/job.interface';
import { JobCreateInput } from './interfaces/job.createInput';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { GetJobPaginationInputParams } from './interfaces/jobs.getJobInputPagination';
import { JobPagination } from './interfaces/job.pagination.interface';
import { GetJobInputParams } from './interfaces/job.getJobInput';

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

    if (input?.categories && input?.limit && input?.skip) {
      return await this.jobModel

        .find({ category: { $in: input.categories } })
        .limit(input.limit)

        .skip(input.skip) // (input.skip - 1) corrects for the fact that the first page is page 1, not page 0. 20 is the number of items per page.

        .sort({ createdAt: -1 });
    }

    if (input?.categories && input?.limit) {
      console.log('HIII2');

      const jobs = [];
      for (let i = 0; i < input.categories.length; i++) {
        const res = await this.jobModel
          .find({ category: input.categories[i] })
          .limit(input.limit)
          .sort({ createdAt: -1 });
        jobs.push(res);
      }
      console.log(jobs);
      const jobsFlattened = jobs.flat();
      return jobsFlattened;
    }
    if (input?.categories) {
      console.log('HIII3');
      console.log(input.categories);

      if (input.categories.length === 1) {
        const result = await this.jobModel
          .find({ category: { $regex: input.categories[0], $options: 'i' } })
          .sort({ createdAt: -1 }); // i for case insensitive
        return result;
      }

      const result = this.jobModel
        .find({ category: { $in: input.categories } })
        .sort({ createdAt: -1 });
      return result;
    }

    // GLOBAL SEARCH STARTS

    if (input?.location) {
      console.log('HI location');

      return await this.jobModel
        .find({ location: { $regex: input.location, $options: 'i' } }) // i for case insensitive
        .sort({ createdAt: -1 });
    }

    if (input?.position) {
      console.log('HI position');

      return await this.jobModel
        .find({ position: { $regex: input.position, $options: 'i' } }) // i for case insensitive
        .sort({ createdAt: -1 });
    }

    if (input?.company) {
      console.log('HI position');

      return await this.jobModel
        .find({ company: { $regex: input.company, $options: 'i' } }) // i for case insensitive
        .sort({ createdAt: -1 });
    }

    // GLOBAL SEARCH ENDS

    if (input?.limit) {
      console.log('HIII4');

      const res = await this.jobModel
        .find()
        .limit(input.limit)
        .sort({ createdAt: -1 });
      console.log(res);

      return res;
    }

    return await this.jobModel.find().sort({ createdAt: -1 });
  }

  async pagination(input: GetJobPaginationInputParams): Promise<JobPagination> {
    console.log(input);

    const job = await this.jobModel
      .find({ category: input.category })
      .limit(input.limit)
      // .skip((input.skip - 1) * 20) // (input.skip - 1) corrects for the fact that the first page is page 1, not page 0. 20 is the number of items per page.
      .skip(input.skip)

      .sort({ createdAt: -1 });

    const jobCount = await this.jobModel
      .find({ category: input.category })
      .countDocuments();

    console.log({ job, jobCount });
    return { jobCount, job };
  }
}
