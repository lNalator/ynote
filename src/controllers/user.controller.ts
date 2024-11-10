import { Controller, Get, Param, Body, Delete, Post } from '@nestjs/common';
import { ApiAcceptedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { CreateUserDto } from 'src/resources/createUser.ressource';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @ApiAcceptedResponse({ type: CreateUserDto })
  @ApiResponse({ type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
