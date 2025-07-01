// src/database/data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../../modules/users/entities/user.entity';
import { Province } from '../../modules/province/entities/province.entity';
import { District } from '../../modules/district/entities/district.entity';
import { Role } from 'src/modules/roles/entities/role.entity';

config();
export const AppDataSource = new DataSource({
    type: 'mysql', // หรือ postgres, sqlite ฯลฯ
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User,Province,District,Role],
    synchronize: true,
});
