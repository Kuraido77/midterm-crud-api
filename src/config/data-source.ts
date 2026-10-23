// src/config/data-source.ts
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Task } from '../entities/Task';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
   type: 'mysql',
   host: process.env.DB_HOST || 'localhost',
   port: parseInt(process.env.DB_PORT || '3306'),
   username: process.env.DB_USERNAME || process.env.DB_USER || 'root',
   password: process.env.DB_PASSWORD || '',
   database: process.env.DB_DATABASE || process.env.DB_NAME || 'midterm_api',
   entities: [User, Task],
   synchronize: process.env.NODE_ENV !== 'production',
   logging: process.env.NODE_ENV === 'development',
   migrations: [path.join(__dirname, '../migrations/*.{ts,js}')],
});