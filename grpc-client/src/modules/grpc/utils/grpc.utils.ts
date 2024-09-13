import { status } from '@grpc/grpc-js';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Handles a gRPC error by mapping the gRPC status code to an HTTP status code and throwing a new HttpException.
 * @param error The gRPC error object containing the status code and message.
 */
export const handleGrpcError = (error: any): void => {
  try {
    // Map gRPC status codes to HTTP status codes
    const statusCode = mapGrpcStatusToHttpStatus(error.code);
    throw new HttpException(error.message || 'An error occurred', statusCode);
  } catch (error) {
    console.error('🚀 ~ handleGrpcError ~ error:', error);
    throw error;
  }
};

/**
 * Maps a gRPC status code to an HTTP status code.
 * @param grpcStatusCode The gRPC status code to be mapped to an HTTP status code.
 * @returns The corresponding HTTP status code.
 */
const mapGrpcStatusToHttpStatus = (grpcStatusCode: number): HttpStatus => {
  try {
    switch (grpcStatusCode) {
      case status.NOT_FOUND:
        return HttpStatus.NOT_FOUND;
      case status.INVALID_ARGUMENT:
        return HttpStatus.BAD_REQUEST;
      case status.ALREADY_EXISTS:
        return HttpStatus.CONFLICT;
      // Add more mappings as needed
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  } catch (error) {
    console.error('🚀 ~ mapGrpcStatusToHttpStatus ~ error:', error);
    throw error;
  }
};
