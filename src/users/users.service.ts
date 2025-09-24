import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../utils/hash.util';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    

    async findAll() {
        return this.prisma.user.findMany();
    }

    async create(userData: CreateUserDto) {
        const hashedPassword = await hashPassword( userData.password);
        return this.prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
                role: 'user', //default-role
            }
        });

    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }
}
