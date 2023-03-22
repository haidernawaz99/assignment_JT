import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AffiliatesResolver } from './affiliates.resolver';
import { AffiliatesService } from './affiliates.service';
import { AffiliateSchema } from './schemas/affiliate.schema';
import { JobsModule } from 'src/jobs/jobs.module';
import { AffiliatesController } from './affiliates.controller';

@Module({
  providers: [AffiliatesResolver, AffiliatesService],
  imports: [
    MongooseModule.forFeature([{ name: 'Affiliate', schema: AffiliateSchema }]),
    JobsModule,
  ],
  controllers: [AffiliatesController],
})
export class AffiliatesModule {}
