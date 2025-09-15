import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
    private users: {
      id: string;
      name: string;
      email: string;
      password: string;
      createdAt: Date;
      role: string;
    }[] = [];
    

    findAll() {
        return this.users;
    }

    create(userData: CreateUserDto) {
        const newUser = {
            id: uuidv4(),
            ...userData,
            createdAt: new Date(),
            role: 'user',
        };
        this.users.push(newUser);
        return newUser;

    }

    findByEmail(email: string) {
        return this.users.find(user => user.email === email);
    }
}
