import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConnectUserDto } from './dto/connectUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto): any {
    return this.userService.createUser(userData);
  }

  @Post('/auth')
  @UsePipes(new ValidationPipe())
  connect(@Body() userInfo: ConnectUserDto): string {
    return this.userService.connect(userInfo);
  }
}
