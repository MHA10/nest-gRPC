import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

export class ErrorHandler {
  /**
   * Handles a not found error by throwing an RpcException with the specified message.
   *
   * @param {number} id - The ID of the entity that was not found.
   * @param {string} entity - The type of entity that was not found.
   */
  static handleNotFoundError(id: number, entity: string): void {
    throw new RpcException({
      code: status.NOT_FOUND,
      message: `${entity} with ID ${id} not found`,
    });
  }

  /**
   * Handles an internal server error by throwing an RpcException with the specified message.
   *
   * This function is used to handle internal server errors and throw an RpcException with the appropriate status code and message.
   *
   * @param {string} message - The detailed message describing the internal server error.
   *
   * @returns {void} - This function does not return a value, instead it throws an RpcException.
   */
  static handleInternalError(message: string): void {
    throw new RpcException({
      code: status.INTERNAL,
      message,
    });
  }
}
