import { Injectable } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { hash } from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, @InjectRepository(User) private userRepository: Repository<User>) { }
    async funRegister(objUser: RegisterAuthDto) {
        const { password } = objUser
        // console.log("Antes: ", objUser)
        const plainToHash = await hash(password, 12)
        // console.log(plainToHash)

        objUser = { ...objUser, password: plainToHash }
        //console.log("Despues: ", objUser)

        return this.userRepository.save(objUser)
    }

    login(credenciales: LoginAuthDto) {
        let payload = { email: "admin@gmail.com", id: 1 }
        const token = this.jwtService.sign(payload)
        return { token: token };
    }
}