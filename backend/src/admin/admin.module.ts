import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigSchema } from './schema/config.schema';

@Module({
  providers: [
    AdminService,
    AdminResolver,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: JwtAuthGuard,
    // }, // This is protecting ALL the Modules in the Project
  ],
  imports: [
    MongooseModule.forFeature([{ name: 'Config', schema: ConfigSchema }]),
  ],
  exports: [AdminService],
})
export class AdminModule {}
