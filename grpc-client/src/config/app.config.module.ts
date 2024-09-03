import { Module } from '@nestjs/common';
import { NestConfigModule } from './nest.config.module';

@Module({
  imports: [NestConfigModule],
})
export class AppConfigModule {}
