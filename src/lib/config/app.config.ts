import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  isDev: process.env.NODE_ENV !== 'prod',
  port: parseInt(process.env.APP_PORT, 10) || 3001,
  apiKey: process.env.API_KEY || 'my-secret-key',
  database: {
    host: process.env.DATABASE_HOST || 'db',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    databaseName: process.env.DATABASE_NAME || 'postgres',
    ssl: process.env.DATABASE_EXIST_SSL || false,
  },
  jwt: {
    publicKey: process.env.JWT_PUBLIC_KEY,
    privateKey: process.env.JWT_PRIVATE_KEY,
    expiredTimer: process.env.JWT_EXPIRED_TIMER,
  },
}));
