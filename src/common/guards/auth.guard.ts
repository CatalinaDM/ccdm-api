import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UtilService } from '../services/util.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly utilSvc: UtilService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //  const request = context.switchToHttp().getRequest<Request>();
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.utilSvc.getPlayload(token);
      request['user'] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
