import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { JobReturn } from './job.return';

@ObjectType()
export class AdminConfigReturn {
  @Field(() => Float)
  days: number;
}
