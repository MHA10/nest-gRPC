import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const grpcConfig: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(__dirname, '../../src/modules/grpc/protos/hero.proto'), // Adjust the path as needed
    url: 'localhost:5000',
  },
};
