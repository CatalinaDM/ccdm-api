import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { databaseProvider } from 'src/common/providers/database.provider';
import { PrismaService } from 'src/prisma.service';
import { UtilService } from 'src/common/services/util.service';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, databaseProvider[0], PrismaService, UtilService],
})
export class UserModule {}
