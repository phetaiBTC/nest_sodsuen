import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
// import { TransactionModule } from "../transation/transition.module";

@Global()
@Module({
    imports: [
        // TransactionModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.getOrThrow('DB_HOST'),
                port: configService.getOrThrow('DB_PORT'),
                username: configService.getOrThrow('DB_USERNAME'),
                password: configService.getOrThrow('DB_PASSWORD'),
                database: configService.getOrThrow('DB_DATABASE'),
                synchronize: true,
                autoLoadEntities: true,
            }),
            
        })
    ],
    // exports: [TransactionModule]
})
export class TypeOrmPlugin{ }
