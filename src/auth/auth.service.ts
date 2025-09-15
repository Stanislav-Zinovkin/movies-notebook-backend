import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/hash.util';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
    async validateUser( email: string, password: string) {
        const user = this.usersService.findByEmail(email);
        if (!user) return null;

        const isPasswordValid = await comparePassword(password, user.password);
        if(!isPasswordValid) return null;

        return user;
    }
    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id, email: user.email };
        return {access_token: this.jwtService.sign(payload) };
    }
}
