import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentRequest = createParamDecorator(
  (_data, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }

    // GraphQL Request
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  },
);
