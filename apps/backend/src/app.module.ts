import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import {
  DEFAULT_POSTGRES_DATABASE,
  DEFAULT_POSTGRES_PASSWORD,
  DEFAULT_POSTGRES_PORT,
  DEFAULT_POSTGRES_USERNAME,
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
} from './constants/env.constants';
import { TaskModule } from './modules/task/task.module';
import { WindModule } from './modules/wind/wind.module';

@Module({
  imports: [
    TaskModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(POSTGRES_HOST),
        port: configService.get(POSTGRES_PORT, DEFAULT_POSTGRES_PORT),
        username: configService.get(
          POSTGRES_USERNAME,
          DEFAULT_POSTGRES_USERNAME,
        ),
        password: configService.get(
          POSTGRES_PASSWORD,
          DEFAULT_POSTGRES_PASSWORD,
        ),
        database: configService.get(
          POSTGRES_DATABASE,
          DEFAULT_POSTGRES_DATABASE,
        ),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        retryAttempts: 10,
      }),
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    WindModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
