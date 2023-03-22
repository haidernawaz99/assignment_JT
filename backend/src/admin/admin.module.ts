import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  providers: [
    AdminService,
    AdminResolver,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: JwtAuthGuard,
    // }, // This is protecting ALL the Modules in the Project
  ],
})
export class AdminModule {}
