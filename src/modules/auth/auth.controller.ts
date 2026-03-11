import { Controller, Get, HttpCode, Post, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { UtilService } from '../../common/services/util.service';
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    private readonly utilSvc: UtilService,
  ) {}
  // POST /register 201
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verifica credenciales de usuario y genera un JWT' })
  public async login(@Body() auth: AuthDto): Promise<any> {
    const { username, password } = auth;
    //TODO: Verificar usuario y contraseña
    const user = await this.authSvc.getUserByUsername(username);
    if (!user) {
      throw new Error('El usuario y/o constraseña es incorrecto');
    }
    if (await this.utilSvc.checkPassword(password, user.password!)) {
      //Obtener información a enviar (payload)
      const { password,...payload } = user;

      //Gererar token de acceso po 60s
      const jwt = await this.utilSvc.generarJWT(payload);
      // FIXME: Generar refresh token por 7d
        return { access_token: jwt, refresh_token: ''};
    } else {
      throw new Error('El usuario y/o constraseña es incorrecto');
    }
  }

  @Get('me')
  @ApiOperation({ summary: 'Extraer el ID del usuario desde el token y busca la información '})
  public getMe(): string {
    return this.authSvc.getMe();
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
