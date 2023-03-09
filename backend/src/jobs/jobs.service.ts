/* eslint-disable @typescript-eslint/no-var-requires */
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interfaces/job.interface';
import { JobCreateInput } from './interfaces/job.createInput';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { GetJobPaginationInputParams } from './interfaces/job.getJobInputPagination';
import { JobPagination } from './interfaces/job.pagination.interface';
import { GetJobInputParams } from './interfaces/job.getJobInput';
import { v4 as uuidv4 } from 'uuid';
import { JobUpdateInput } from './interfaces/job.updateInput';
import { JobExtendInput } from './interfaces/job.extendInput';
import { GetAdminConfigInputParams } from './interfaces/admin.getAdminConfigInput';
import { AdminConfig } from './interfaces/admin.config.interface';
import { SetAdminConfigInputParams } from './interfaces/admin.setAdminConfigInput';
import { Affiliate } from './interfaces/affiliate.interface';
import { CreateAffiliateInputParams } from './interfaces/affiliate.getCreateAffiliateInput';
import { GetAllAffiliatesInputParams } from './interfaces/affiliate.getAllAffiliatesInput';
import { ApproveAffiliatesInputParams } from './interfaces/admin.approveAffiliatesInput';
import { auth } from 'env/nodeMailerCredentials';
import { GetJobAffiliatesInputParams } from './interfaces/affiliate.getJobsInput';
import { GetJobAffiliatesInputParamsREST } from './interfaces/affiliate.getJobsInputREST';
import { DeleteAffiliatesInputParams } from './interfaces/admin.deleteAffiliateInput';
const jsonfile = require('jsonfile');
const nodemailer = require('nodemailer');

@Injectable()
export class JobsService {
  constructor(
    @InjectModel('Job') private jobModel: Model<Job>,
    @InjectModel('Affiliate') private affiliateModel: Model<Affiliate>,
  ) {}

  file = './src/jobs/jobsConfig.json';
  async getExtensionPeriod() {
    // read from File the extension period
    const expiresAtDays = await jsonfile
      .readFile(this.file)
      .then((obj) => {
        const expiresAtDays = 1000 * 60 * 60 * 24 * obj.days; // 1000ms * 60s * 60m * 24h * days
        return expiresAtDays;
      })
      .catch((error) => console.error(error));
    return expiresAtDays;
  }

  async create(jobInput: JobCreateInput): Promise<Job> {
    // if the user has uploaded an image (logo) then dump it to the filesystem
    const editToken = uuidv4();
    const expiresAt = Date.now() + (await this.getExtensionPeriod());
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
  async update(jobUpdate: JobUpdateInput): Promise<Job> {
    console.log('UPDATE');
    console.log(jobUpdate);
    console.log('Update');
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
    const newExpiresAt = Date.now() + (await this.getExtensionPeriod());

    //read the configuration file to see how the extension period (in days)
    const updatedJob = await this.jobModel.findOneAndUpdate(
      { editToken: jobExtend.editToken },
      { expiresAt: newExpiresAt },
      { new: true },
    );
    return updatedJob;
  }

  async getAdminConfig(input: GetAdminConfigInputParams): Promise<AdminConfig> {
    //TODO: Protect the route
    console.log(await this.getExtensionPeriod());
    return { days: (await this.getExtensionPeriod()) / 1000 / 60 / 60 / 24 };
  }

  async setAdminConfig(input: SetAdminConfigInputParams): Promise<AdminConfig> {
    //TODO: Protect the route

    const updatedConfig = { ...input };

    jsonfile.writeFileSync(this.file, updatedConfig);
    return { days: (await this.getExtensionPeriod()) / 1000 / 60 / 60 / 24 };
  }

  async createAffiliate(input: CreateAffiliateInputParams): Promise<Affiliate> {
    const createdAffiliate = new this.affiliateModel(input);
    return createdAffiliate.save();
  }

  async getAllAffiliates(
    input: GetAllAffiliatesInputParams,
  ): Promise<Affiliate[]> {
    return await this.affiliateModel.find().sort({ createdAt: -1 });
  }

  async approveAffiliate(
    input: ApproveAffiliatesInputParams,
  ): Promise<Affiliate> {
    const affiliateToken = uuidv4();

    const approvedAffiliate = await this.affiliateModel.findByIdAndUpdate(
      input.id,
      {
        status: 'Enabled',
        affiliateToken,
      },
      {
        new: true,
      },
    );

    const mail = nodemailer.createTransport({
      service: 'gmail',
      auth, //auth is an object with user and pass, being fetched from the /env/nodeMailerCredentials
    });

    const mailOptions = {
      from: 'plantdoctor321@gmail.com',
      to: approvedAffiliate.email,
      subject: 'Affiliate Approved- Jobeet',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <img src='https://i.imgur.com/LK9sucd.png' width="50" >
          <a href="" style="font-size:1.4em;color: lightblue;text-decoration:none;font-weight:600">&nbsp; Jobeet</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Jobeet. Here's your affiliate token 👇 </p>
        <h2 style="background: darkblue;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${affiliateToken}</h2>
        <p style="font-size:0.9em;">Regards,<br />Jobeet</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Jobeet</p>
          <p>JinTech, Islamabad</p>
          <p>44000</p>
        </div>
      </div>
    </div>`,
    };
    mail.sendMail(mailOptions, function (error, info) {
      if (error) {
        return 1;
      } else {
        return 0;
      }
    });
    return approvedAffiliate;
  }

  async getJobsAffiliate(
    input: GetJobAffiliatesInputParams | GetJobAffiliatesInputParamsREST,
  ): Promise<Job[] | HttpException> {
    console.log(`getJobsAffiliate`);
    console.log(input);
    const isAuthorized = await this.affiliateModel.findOne({
      affiliateToken: input.affiliateToken,
    });

    // this is basically check for status unapproved, as the Affiliate won't have a Afiliate Token until the Admin has approved it
    if (!isAuthorized) {
      const err = new HttpException(
        'Invalid Affiliate token',
        HttpStatus.BAD_REQUEST,
      );
      return err;
    }

    // check for status disabled
    if (isAuthorized.status !== 'Enabled') {
      const err = new HttpException(
        'Looks like the Admin has disabled your Access at this moment',
        HttpStatus.BAD_REQUEST,
      );
      return err;
    }
    const result = await this.find({
      categories: input.categories,
      limit: input.limit,
    } as GetJobInputParams);

    // sort the array by createdAt date object
    result.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return +b.createdAt - +a.createdAt;
    });

    return result.slice(0, input.limit);
  }

  async deleteAffiliate(
    input: DeleteAffiliatesInputParams,
  ): Promise<Affiliate[]> {
    return await this.affiliateModel.findByIdAndDelete(input.id);
  }
}
