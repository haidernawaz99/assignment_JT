import { Module } from '@nestjs/common';
import { JobSchema } from './interfaces/jobs.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }])],
  providers: [JobsResolver, JobsService],
})
export class JobsModule {}