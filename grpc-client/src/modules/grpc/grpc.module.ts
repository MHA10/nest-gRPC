import { Module } from '@nestjs/common';
import { HeroesClientService } from './services/grpc.heroes.service';

@Module({
  providers: [HeroesClientService],
  exports: [HeroesClientService],
})
export class GrpcModule {}
