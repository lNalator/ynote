import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RoleModule } from 'src/modules/role.module';
import { UserModule } from 'src/modules/user.module';

@Module({
  imports: [RoleModule, UserModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
