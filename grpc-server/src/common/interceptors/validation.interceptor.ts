import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { DTO_CLASS_KEY } from '../decorators/dto-class.decorator';
import { formatValidationErrors } from '../../utils/validation.utils';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  /**
   * Intercepts the request and validates the input data against the associated DTO class.
   * If validation fails, it throws an RpcException with the validation errors.
   *
   * @param context - The ExecutionContext containing the request information.
   * @param next - The CallHandler to be executed after validation.
   *
   * @returns An Observable of the response after validation and handling.
   */
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const ctx = context.switchToRpc();
    const data = ctx.getData();
    const handler = context.getHandler();
    const dtoClass = this.getDtoClass(handler);

    if (dtoClass) {
      const dtoInstance = plainToInstance(dtoClass, data);
      const errors = await validate(dtoInstance);
      if (errors.length > 0) {
        const formattedErrors = formatValidationErrors(errors);
        console.error(
          '🚀 ~ ValidationInterceptor ~ formattedErrors:',
          formattedErrors,
        );
        throw new RpcException({
          code: status.INVALID_ARGUMENT,
          message: `Validation failed: ${JSON.stringify(formattedErrors, null, 2)}`,
          details: formattedErrors,
        });
      }
    }

    return next.handle();
  }

  /**
   * Retrieves the DTO class associated with the given handler function.
   *
   * @param handler - The function to retrieve the DTO class for.
   *
   * @returns The DTO class associated with the given handler function, or `null` if no DTO class is found.
   */
  private getDtoClass(handler: Function): any {
    return this.reflector.get<any>(DTO_CLASS_KEY, handler);
  }
}
