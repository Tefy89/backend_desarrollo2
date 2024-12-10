import { Body, Controller, Post } from "@nestjs/common";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('register')
    registerUser(@Body()userObj: RegisterAuthDto){
        console.log(userObj);
        return userObj;
    }

    @Post('login')
    login(@Body() credenciales: LoginAuthDto){
        return this.authService.login(credenciales)
    }
}