import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  providers: [
    AdminService,
    AdminResolver,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: JwtAuthGuard,
    // }, // This is protecting ALL the Modules in the Project
  ],
  imports: [JobsModule],
})
export class AdminModule {}
