import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/services/user.service';
import { RoleService } from 'src/services/role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const role = await this.roleService.findOne(user.roleId);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.prenom,
      email: user.email,
      role: role.name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
