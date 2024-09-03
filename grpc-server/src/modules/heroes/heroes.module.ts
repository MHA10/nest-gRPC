import { Module } from '@nestjs/common';
import { HeroesController } from './controller/heroes.controller';

@Module({
  imports: [],
  controllers: [HeroesController],
})
export class HeroesModule {}
