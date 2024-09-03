import { Module } from '@nestjs/common';
import { HeroesController } from './controller/heroes.controller';

@Module({
  imports: [],
  providers: [HeroesController],
})
export class HeroesModule {}
