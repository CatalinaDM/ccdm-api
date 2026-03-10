import { Controller, Get, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    private readonly jwtSvc: JwtService,
  ) {}
  // POST /register 201
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verifica credenciales de usuario y genera un JWT' })
  public login(@Body() auth: AuthDto): string {
    const { username, password } = auth;
    const jwt = await this.jwtSvc.signAsync(auth, { secret: process.env.JWT_SECRET_KEY });
//TODO: Verificar usuario y contraseña
//TODO: Obtener la información a enviar 
//TODO: 
//TODO:

    //return this.authSvc.logIn();
    return jwt;
  }
  @Get('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  public register(): string {
    return this.authSvc.register();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Recibe un Refresh Token, valida que no hay expirado y entrga un nuevo Access Token' })
  public refreshToken(): string {
    return this.authSvc.refreshToken();
  }
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Invalida los tokens en el ldo del servidor y limpia las cookies' })
  public logOut(): string {
    return this.authSvc.logOut();
  }
}
