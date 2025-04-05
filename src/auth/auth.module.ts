import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthStrategy } from './local.strategy';
import { PrismaService } from '../prisma.service';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    JwtModule.register({
      secret: 'jwtsecret',
      signOptions: { expiresIn: '7d' },
    }),UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, LocalAuthStrategy],
})
export class AuthModule {}