import { Injectable } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(private jwtService: JwtService){}
    login(credenciales: LoginAuthDto){
        let payload={email:"raul.paez@outlook.com", id:1}
        const token= this.jwtService.sign(payload)
        return {token:token}; 
    }
}