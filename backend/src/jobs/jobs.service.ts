/* eslint-disable @typescript-eslint/no-var-requires */
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interfaces/job.interface';
import { JobCreateInput } from './dtos/job.createInput';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { GetJobPaginationInputParams } from './dtos/job.getJobInputPagination';
import { JobPagination } from './interfaces/job.pagination.interface';
import { GetJobInputParams } from './dtos/job.getJobInput';
import { v4 as uuidv4 } from 'uuid';
import { JobUpdateInput } from './dtos/job.updateInput';
import { JobExtendInput } from './dtos/job.extendInput';
import { DeleteJobInputParams } from './dtos/job.deleteJobInput';
import { GetJobPaginationAdminInputParams } from './dtos/admin.getJobInputPagination';
import { getExtensionPeriodFS } from 'common/utils/extension-period';
import { getCategoriesFS } from 'common/utils/manage-categories';

@Injectable()
export class JobsService {
  constructor(@InjectModel('Job') private jobModel: Model<Job>) {}

  async create(jobInput: JobCreateInput): Promise<Job> {
    // if the user has uploaded an image (logo) then dump it to the filesystem
    const editToken = uuidv4();
    const expiresAt = Date.now() + (await getExtensionPeriodFS());

    // make custom url lowercase (case insensitive)
    jobInput.url = jobInput.url.toLowerCase();

    if (jobInput?.image) {
      console.log(jobInput.image);
      const { createReadStream, filename } = await jobInput?.image;
      jobInput.logo = filename || null; //save the filename to the database (if exists)
      const createdJob = new this.jobModel({
        ...jobInput,
        editToken,
        expiresAt,
      });

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
    const createdJob = new this.jobModel({ ...jobInput, editToken, expiresAt });
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
      //Get jobs from each category since categories are now dynamic,
      //and return them in a single array
      if (input.categories[0] === 'all') {
        const currentCategories = await this.getCategories();

        for (let i = 0; i < currentCategories.length; i++) {
          const res = await this.jobModel
            .find({ category: currentCategories[i].category })
            .limit(input.limit)
            .sort({ createdAt: -1 });
          jobs.push(res);
        }
      } else {
        // get jobs exlusive to the categories selected
        for (let i = 0; i < input.categories.length; i++) {
          const res = await this.jobModel
            .find({ category: input.categories[i] })
            .limit(input.limit)
            .sort({ createdAt: -1 });
          jobs.push(res);
        }
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

    if (input?.id) {
      console.log('HI ID');

      const res = await this.jobModel.findById(input.id);
      return [res];
    }

    if (input?.editToken) {
      console.log('HI editToken');
      const res = await this.jobModel.findOne({ editToken: input.editToken });
      return [res];
    }

    if (input?.customURL) {
      console.log('Hi, custom URL!', input.customURL);
      const res = await this.jobModel.findOne({
        url: new RegExp(`^${input.customURL}$`, 'i'), // <-- case insensitive search
      });
      return [res];
    }

    return await this.jobModel.find().sort({ createdAt: -1 });
  }

  async unqiueEmail(input: GetJobInputParams): Promise<Job | null> {
    if (input?.customURL) {
      console.log('Hi, custom URL!', input.customURL);
      const res = await this.jobModel.findOne({
        url: new RegExp(`^${input.customURL}$`, 'i'), // <-- case insensitive search
      });
      console.log(res);
      return res;
    }
  }

  async pagination(input: GetJobPaginationInputParams): Promise<JobPagination> {
    console.log(input);

    let job;
    let jobCount;

    // if category is not specified (like Admin Dashboard)
    // TODO: Remove the admin exception, since a seperate route has been provided

    if (input?.category) {
      job = await this.jobModel
        .find({ category: input.category })
        .limit(input.limit)
        // .skip((input.skip - 1) * 20) // (input.skip - 1) corrects for the fact that the first page is page 1, not page 0. 20 is the number of items per page.
        .skip(input.skip)

        .sort({ createdAt: -1 });

      jobCount = await this.jobModel
        .find({ category: input.category })
        .countDocuments();
    } else {
      job = await this.jobModel
        .find()
        .limit(input.limit)
        // .skip((input.skip - 1) * 20) // (input.skip - 1) corrects for the fact that the first page is page 1, not page 0. 20 is the number of items per page.
        .skip(input.skip)

        .sort({ createdAt: -1 });

      jobCount = await this.jobModel.find().countDocuments();
    }

    console.log({ job, jobCount });
    return { jobCount, job };
  }
  async update(jobUpdate: JobUpdateInput): Promise<Job> {
    console.log('UPDATE');
    console.log(jobUpdate);
    console.log('Update');

    // make custom url lowercase (case insensitive)
    jobUpdate.url = jobUpdate.url.toLowerCase();

    // if the user has uploaded a **NEW** image (logo) then dump it to the filesystem
    if (jobUpdate?.image) {
      console.log(jobUpdate.image);
      const { createReadStream, filename } = await jobUpdate?.image;
      jobUpdate.logo = filename || null; //save the filename to the database (if exists)

      return new Promise(async (resolve) =>
        createReadStream()
          .pipe(
            createWriteStream(join(process.cwd(), `./src/upload/${filename}`)),
          )
          .on('finish', () =>
            resolve(
              this.jobModel.findOneAndUpdate(
                { editToken: jobUpdate.editToken },
                jobUpdate,
                { new: true },
              ),
            ),
          )
          .on('error', () => {
            new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
          }),
      );
    }

    // if the user has NOT uploaded an image (logo)

    jobUpdate.logo = null;
    const updatedJob = await this.jobModel.findOneAndUpdate(
      { editToken: jobUpdate.editToken },
      jobUpdate,
      { new: true },
    );
    return updatedJob;
  }

  async extendExpiresAt(jobExtend: JobExtendInput): Promise<Job> {
    const newExpiresAt = Date.now() + (await getExtensionPeriodFS());

    //read the configuration file to see how the extension period (in days)
    const updatedJob = await this.jobModel.findOneAndUpdate(
      { editToken: jobExtend.editToken },
      { expiresAt: newExpiresAt },
      { new: true },
    );
    return updatedJob;
  }

  async deleteJob(input: DeleteJobInputParams): Promise<Job> {
    return await this.jobModel.findByIdAndDelete(input.id);
  }

  async paginationAdmin(
    input: GetJobPaginationAdminInputParams,
  ): Promise<JobPagination> {
    const job = await this.jobModel
      .find()
      .select('+editToken')
      .limit(input.limit)
      // .skip((input.skip - 1) * 20) // (input.skip - 1) corrects for the fact that the first page is page 1, not page 0. 20 is the number of items per page.
      .skip(input.skip)

      .sort({ createdAt: -1 });

    const jobCount = await this.jobModel.find().countDocuments();
    console.log({ job, jobCount });
    return { jobCount, job };
  }

  async getCategories(): Promise<[{ category: string; index: number }]> {
    return await getCategoriesFS(); //
  }
}
