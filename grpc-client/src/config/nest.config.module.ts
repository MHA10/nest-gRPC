import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Need to call this before any module in which we need to use .env variables
  ],
})
export class NestConfigModule {}
