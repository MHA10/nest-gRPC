import { Module } from '@nestjs/common';
import { NestConfigModule } from './nest.config.module';
import { GrpcModule } from '../modules/grpc/grpc.module';
import { HeroesModule } from '../modules/heroes/heroes.module';

@Module({
  imports: [GrpcModule, HeroesModule, NestConfigModule],
})
export class AppConfigModule {}
