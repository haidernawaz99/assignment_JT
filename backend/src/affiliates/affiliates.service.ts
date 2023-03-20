import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Affiliate } from './interfaces/affiliate.interface';
import { CreateAffiliateInputParams } from '../affiliates/interfaces/affiliate.getCreateAffiliateInput';
import { GetAllAffiliatesInputParams } from '../affiliates/interfaces/affiliate.getAllAffiliatesInput';
import { ApproveAffiliatesInputParams } from '../affiliates/interfaces/admin.approveAffiliatesInput';
import { auth } from 'env/nodeMailerCredentials';
import { GetJobAffiliatesInputParams } from '../affiliates/interfaces/affiliate.getJobsInput';
import { GetJobAffiliatesInputParamsREST } from './interfaces/affiliate.getJobsInputREST';
import { DeleteAffiliatesInputParams } from '../affiliates/interfaces/admin.deleteAffiliateInput';
import { DisableAffiliatesInputParams } from '../affiliates/interfaces/admin.disableAffiliateInput';
import { EnableAffiliatesInputParams } from '../affiliates/interfaces/admin.enableAffiliateInput';
import { v4 as uuidv4 } from 'uuid';
import { Job } from 'src/jobs/interfaces/job.interface';
import { GetJobInputParams } from 'src/jobs/interfaces/job.getJobInput';
import { JobsService } from 'src/jobs/jobs.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

@Injectable()
export class AffiliatesService {
  constructor(
    @InjectModel('Affiliate') private affiliateModel: Model<Affiliate>,
    private readonly jobService: JobsService,
  ) {}

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
    const result = await this.jobService.find({
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

  async disableAffiliate(
    input: DisableAffiliatesInputParams,
  ): Promise<Affiliate[]> {
    return await this.affiliateModel.findByIdAndUpdate(
      input.id,
      {
        status: 'Disabled',
      },
      { new: true },
    );
  }

  async enableAffiliate(
    input: EnableAffiliatesInputParams,
  ): Promise<Affiliate[]> {
    return await this.affiliateModel.findByIdAndUpdate(
      input.id,
      {
        status: 'Enabled',
      },
      { new: true },
    );
  }
}
