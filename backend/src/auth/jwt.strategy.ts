import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecretKey } from 'env/jwtSecret.constants';
import { sign } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
// The validate() method deserves some discussion.
// For the jwt-strategy, Passport first verifies the JWT's signature and decodes the JSON.
// It then invokes our validate() method passing the decoded JSON as its single parameter.
// Based on the way JWT signing works, we're guaranteed that we're receiving a valid token that we have previously signed and issued to a valid user.

// As a result of all this, our response to the validate() callback is trivial: we simply return an object containing the userId and username properties.
// Recall again that Passport will build a user object based on the return value of our validate() method, and attach it as a property on the Request object.

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecretKey,
    });
  }

  async validate(payload: any) {
    //TODO: This is also the place we may decide to do further token validation, such as looking up the userId in a list of revoked tokens, enabling us to perform token revocation.

    // Add a new token to be returned to the user

    return {
      id: payload.sub,
      username: payload.username,
      accessToken: this.jwtService.sign({ username: payload.username }),
      expirationAccessToken: payload.exp * 1000,
    };
  }
}
