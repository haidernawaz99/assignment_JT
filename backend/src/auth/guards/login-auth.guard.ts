import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class LoginAuthGuard extends AuthGuard('local') {
  // Override this method so it can be used in graphql
  // Passport by default uses the request object
  // But graphql doesn't work like HTTP, and thus has no request object
  // So, we're extracting the credentials from the graphql context, and thus create a request object, and pass it to the passport strategy
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    if (gqlReq) {
      const { loginCredentials } = ctx.getArgs();
      gqlReq.body.username = loginCredentials.username;
      gqlReq.body.password = loginCredentials.password;

      return gqlReq;
    }
    return context.switchToHttp().getRequest();
  }
}
