import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserModule } from './user/user.module';
import { databaseProviders } from './database/database.providers';
import { DatabaseModule } from './database/database.module';
import { UserService } from './user/user.service';

@Module({
  imports: [GraphQLModule.forRoot({}), UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, UserService, ...databaseProviders],
})
export class AppModule {}
