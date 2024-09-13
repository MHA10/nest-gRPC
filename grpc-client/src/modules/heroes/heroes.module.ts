import { Module } from '@nestjs/common';
import {  HeroesController } from './controller/heroes.controller';
import { GrpcModule } from '../grpc/grpc.module';

@Module({
  imports: [GrpcModule],
  controllers: [HeroesController],
})
export class HeroesModule {}
