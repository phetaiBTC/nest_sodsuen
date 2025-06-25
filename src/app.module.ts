import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmPlugin } from './common/plugin/typeOrm.plugin';
import { UsersModule } from './modules/users/users.module';
import { DistrictModule } from './modules/district/district.module';
import { ProvinceModule } from './modules/province/province.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), TypeOrmPlugin, UsersModule, DistrictModule, ProvinceModule, AuthModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
