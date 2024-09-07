import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '../app.module';
import { grpcConfig } from '../config/grpc.config';
import { ValidationInterceptor } from '../common/interceptors/validation.interceptor';

/**
 * Initializes the Nest application for running as a gRPC microservice.
 *
 * @param AppModule The main module of the Nest application.
 * @param grpcConfig The configuration for the gRPC microservice.
 *
 * @returns A Promise that resolves when the application is successfully initialized and listening for incoming requests.
 */
export async function initializeApp(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    grpcConfig,
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ValidationInterceptor(new Reflector()));

  await app.listen();
}
