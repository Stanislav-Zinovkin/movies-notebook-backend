import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {id: 1, name: 'Stas'},
        {id: 2, name: 'Olha'},
        {id: 3, name: 'Stark'},
        {id: 4, name: 'Shani'},
    ];

    findAll() {
        return this.users;
    }

    create(userData: {name: string}) {
        const newUser = {
            id: this.users.length + 1,
            ...userData,
        };
        this.users.push(newUser);
        return newUser;

    }
}
