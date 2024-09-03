import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app.config.module';
import { GrpcModule } from './modules/grpc/grpc.module';

@Module({
  imports: [AppConfigModule, GrpcModule],
})
export class AppModule {}
