import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  Post,
  BadRequestException,
  Put,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { CreateUserDto } from 'src/resources/createUser.ressource';
import { CreateUserEleveDto } from 'src/resources/createUserEleve.ressource';
import { CreateUserProfDto } from 'src/resources/createUserProf.ressource';
import { CreateUserAdminDto } from 'src/resources/createUserAdmin.ressource';
import { Role, Roles } from 'src/auth/decorators/role.decorator';

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

  // Route pour créer un admin
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @ApiResponse({ type: User })
  @Post('create-admin')
  async createUserAdmin(
    @Body() createUserAdminDto: CreateUserAdminDto,
  ): Promise<User> {
    return this.userService.createAdmin(createUserAdminDto);
  }

  // Route pour créer un professeur
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @ApiResponse({ type: User })
  @Post('create-prof')
  async createUserProf(
    @Body() createUserProfDto: CreateUserProfDto,
  ): Promise<User> {
    return this.userService.create(createUserProfDto as CreateUserDto);
  }

  // Route pour créer un élève
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @ApiResponse({ type: User })
  @Post('create-eleve')
  async createUserEleve(
    @Body() createUserEleveDto: CreateUserEleveDto,
  ): Promise<User> {
    if (createUserEleveDto.classesIds.length > 1)
      throw new BadRequestException('An eleve can only have one class');
    return this.userService.create(createUserEleveDto as CreateUserDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createUserDto: CreateUserDto,
  ): Promise<void> {
    return this.userService.update(id, createUserDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
