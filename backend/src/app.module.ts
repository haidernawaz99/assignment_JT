import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModule } from './jobs/jobs.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from './admin/admin.module';
import { AffiliatesModule } from './affiliates/affiliates.module';

@Module({
  imports: [
    CatsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', //for code first approach. Schema will be generated automatically from TS
    }),
    MongooseModule.forRoot('mongodb://localhost/assignment'),
    JobsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/../src/upload'),
    }),
    AuthModule,
    UsersModule,
    AdminModule,
    AffiliatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
