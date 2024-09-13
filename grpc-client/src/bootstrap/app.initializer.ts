import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

/**
 * Initializes the Nest application for running as a gRPC microservice.
 *
 * @param AppModule The main module of the Nest application.
 * @param grpcConfig The configuration for the gRPC microservice.
 *
 * @returns A Promise that resolves when the application is successfully initialized and listening for incoming requests.
 */
export async function initializeApp(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
}
