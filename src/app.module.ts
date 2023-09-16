import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeModule } from './anime/anime.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_anime',
      autoLoadEntities : true,
      synchronize: true,
    }),
    AnimeModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development' || '.env.production' || '.env.development.local',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
