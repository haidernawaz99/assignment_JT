import { Job } from './job.interface';

export interface JobPagination {
  job: Job[];
  jobCount: number;
}
