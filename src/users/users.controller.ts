import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.usersService.findAll();
    }
    @Post()
    createUser(@Body() userData: {name: string}){
        return this.usersService.create(userData);
    }
}
