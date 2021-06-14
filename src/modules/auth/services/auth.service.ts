import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Token } from '../dto/Token';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  public getToken(userId: number) {
    return this.jwt.sign({ userId });
  }

  public getTokenResponse(token: string): Token {
    return { access_token: token, token_type: 'bearer' };
  }

  public async verifyPassword(incoming: string, password: string) {
    return await bcrypt.compare(incoming, password);
  }
}
