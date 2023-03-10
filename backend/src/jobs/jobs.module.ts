import { Module } from '@nestjs/common';
import { JobSchema } from './interfaces/job.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { AffiliateSchema } from './interfaces/affiliate.schema';
import { AffiliateController } from './affiliate.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Job', schema: JobSchema },
      { name: 'Affiliate', schema: AffiliateSchema },
    ]),
  ],
  providers: [JobsResolver, JobsService, JwtStrategy],
  controllers: [AffiliateController],
})
export class JobsModule {}
