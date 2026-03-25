import {
  Controller,
  Get,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { UtilService } from '../../common/services/util.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AppException } from 'src/common/exceptions/app.exception';

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
      const { password, ...payload } = user;

      // FIXME: Generar refresh token por 7d
      const refresh = await this.utilSvc.generarJWT(payload, '7d');
      const hashRT = await this.utilSvc.hash(refresh);
      await this.authSvc.updateHash(payload.id, hashRT);

      //Gererar token de acceso po 1h
      payload.hash = hashRT;
      const jwt = await this.utilSvc.generarJWT(payload, '1h');

      return { access_token: jwt, refresh_token: hashRT };
    } else {
      throw new Error('El usuario y/o constraseña es incorrecto');
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Extraer el ID del usuario desde el token y busca la información ',
  })
  public getProfile(@Req() request: any) {
    const user = request['user'];
    return user;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      'Recibe un Refresh Token, valida que no hay expirado y entrga un nuevo Access Token',
  })
  public async refreshToken(@Req() request: any) {
    // TODO: Obtener el usuario en sesión
    const userSession = request['user'];
    const user = await this.authSvc.getUserById(userSession.id);
    if (!user || !user.hash)
      throw new AppException('Acceso denegado', HttpStatus.FORBIDDEN, '0');
    // TODO: Comparar el token recibido con el token guardado
    if (userSession.hash != user.hash)
      throw new AppException('Token inválido', HttpStatus.FORBIDDEN, '0');
    // TODO: Si el Token es valido se generan nuevos tokens
    return {
      token: '',
      refresh_token: '',
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Invalida los tokens en el lado del servidor y limpia las cookies',
  })
  public async logout(@Req() request: any) {
    const session = request['user'];
    const user = await this.authSvc.updateHash(session.id, null);
    return user;
  }
}
