import { Module } from '@nestjs/common';
import { JobSchema } from './interfaces/job.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { AffiliateSchema } from './interfaces/affiliate.schema';
import { AffiliateController } from './affiliate.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Job', schema: JobSchema },
      { name: 'Affiliate', schema: AffiliateSchema },
    ]),
  ],
  providers: [JobsResolver, JobsService],
  controllers: [AffiliateController],
})
export class JobsModule {}
