import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { entities } from './database/entities';

dotenv.config();

const getDatabaseSSLFromEnv = () => {
    if (process.env.DATABASE_SSL === 'true') {
        return {
            rejectUnauthorized: false,  // Optional: Allows self-signed certificates
            sslmode: 'require',         // Ensures SSL is used
        };
    }
    return undefined;
};

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: Object.values(entities),
    migrations: [],
    subscribers: [],
    ssl: getDatabaseSSLFromEnv(),  // Uses the sslmode configuration
});
