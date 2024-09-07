import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app.config.module';
import { GrpcModule } from './modules/grpc/grpc.module';
import { HeroesModule } from './modules/heroes/heroes.module';

@Module({
  imports: [AppConfigModule, GrpcModule, HeroesModule],
})
export class AppModule {}
