import {
  Controller,
  Get,
  Headers,
  HttpException,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  category,
  GetJobAffiliatesInputParamsREST,
} from './interfaces/affiliate.getJobsInputREST';
import { Job } from './interfaces/job.interface';
import { JobReturn } from './interfaces/job.return';
import { JobsService } from './jobs.service';

@Controller('/affiliate/getJobs')
export class AffiliateController {
  constructor(readonly jobService: JobsService) {}

  @Get()
  async getJobs(
    @Query() query: any,
    @Headers() headers: any,
  ): Promise<Job[] | HttpException> {
    const affiliateToken: string = headers.affiliatetoken;
    const categories: string = query?.categories;
    const limit: number = query?.limit;

    const categoriesArray: category[] = categories
      ?.replace(/\s/g, '')
      ?.split(',') as category[]; //remove all spaces and split by comma

    const input: GetJobAffiliatesInputParamsREST = {
      affiliateToken,
      categories: categoriesArray,
      limit,
    };

    const jobs = await this.jobService.getJobsAffiliate(input);

    // if user doesnt specify an edit token, jobs will be returned, which will be an HttpException. If user specifies an edit token, jobsWithoutEditToken will be returned, which will remove the edit token from the jobs.
    return jobs;
  }
}
