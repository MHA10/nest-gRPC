import { join } from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcConfig: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(__dirname, '../../src/modules/grpc/protos/hero.proto'),
    url: `${process.env.GRPC_SERVER_HOST ?? 'localhost'}:${process.env.GRPC_SERVER_PORT ?? '5000'}`,
  },
};
