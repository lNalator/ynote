import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  database: 'ynote',
  storage: './src/database/ynote.sqlite',
  logging: console.log,
  autoLoadModels: true,
  synchronize: true,
  
};