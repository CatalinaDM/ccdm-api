import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilService {
  constructor(private readonly jwtSvc: JwtService) {}

  // Función para validar si una cadena es un hash bcrypt
  public async hash(text: string): Promise<string> {
    return await bcrypt.hash(text, 10);
  }
  public async checkPassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }

  public async generarJWT(
    payload: any,
    expiresIn: any = '60s',
  ): Promise<string> {
    return await this.jwtSvc.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: expiresIn,
    });
  }

  public async getPlayload(jwt: string): Promise<any> {
    return await this.jwtSvc.verifyAsync(jwt, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
