import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';

export const grpcConfig: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(__dirname, '../../src/modules/grpc/protos/hero.proto'),
    url: `${process.env.GRPC_SERVER_HOST ?? 'localhost'}:${process.env.GRPC_SERVER_PORT ?? '5000'}`,
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};
