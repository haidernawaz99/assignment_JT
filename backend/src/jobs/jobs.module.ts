import { Module } from '@nestjs/common';
import { JobSchema } from './schemas/job.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { ConfigSchema } from 'src/admin/schema/config.schema';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Job', schema: JobSchema },
      { name: 'Config', schema: ConfigSchema },
    ]),
    AdminModule,
  ],
  providers: [JobsResolver, JobsService],
  exports: [JobsService],
})
export class JobsModule {}
