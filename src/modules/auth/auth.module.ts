import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports:[JwtModule.register({
        secret:"CODIGO_SECRETO",
        signOptions:{expiresIn: '12h'}
    })],
    controllers:[AuthController],
    providers:[AuthService, JwtStrategy],
    
})
export class AuthModule {}



