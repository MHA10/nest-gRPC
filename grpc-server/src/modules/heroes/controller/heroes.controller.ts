import { Metadata, ServerUnaryCall, status } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  HeroDto,
  HeroByIdDto,
  CreateHeroRequestDto,
  UpdateHeroRequestDto,
  ListHeroesResponseDto,
  DeleteHeroResponseDto,
} from '../dto/heroes.dto';
import { DtoClass } from '../../../common/decorators/dto-class.decorator';
import { ErrorHandler } from '../../../utils/error-handler.utils';

@Controller()
export class HeroesController {
  private heroes = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  /**
   * Lists all heroes.
   *
   * @param {any} data - Any additional data that may be required for the request.
   * @param {Metadata} metadata - Additional metadata for the request.
   * @param {ServerUnaryCall<any, any>} call - The gRPC call object.
   * @returns {ListHeroesResponseDto} - An object containing an array of all heroes.
   */
  @GrpcMethod('HeroesService', 'ListHeroes')
  listHeroes(
    data: any,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): ListHeroesResponseDto {
    try {
      return { heroes: this.heroes }; // Return all heroes
    } catch (error) {
      console.error('🚀 ~ HeroesController ~ error:', error);
      if (error instanceof RpcException) {
        // Re-throw RpcExceptions if they are already handled
        throw error;
      }
      ErrorHandler.handleInternalError('Failed to list heroes');
    }
  }

  /**
   * Finds a hero by its ID.
   *
   * @param {HeroById} data - The ID of the hero to find.
   * @param {Metadata} metadata - Additional metadata for the request.
   * @param {ServerUnaryCall<any, any>} call - The gRPC call object.
   * @returns {HeroDto} - The hero object if found, otherwise throws an error.
   * @throws {RpcException} - Throws an RpcException if the hero with the given ID is not found.
   */
  @GrpcMethod('HeroesService', 'FindOne')
  @DtoClass(HeroByIdDto)
  findOne(
    data: HeroByIdDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): HeroDto {
    try {
      const hero = this.heroes.find(({ id }) => id === data.id);
      if (!hero) {
        ErrorHandler.handleNotFoundError(data.id, 'Hero');
      }
      return hero;
    } catch (error) {
      console.error('🚀 ~ HeroesController ~ error:', error);
      if (error instanceof RpcException) {
        // Re-throw RpcExceptions if they are already handled
        throw error;
      }
      ErrorHandler.handleInternalError('Failed to find hero');
    }
  }

  /**
   * Creates a new hero.
   *
   * @param {CreateHeroRequest} data - The request object containing the name of the new hero.
   * @param {Metadata} metadata - Additional metadata for the request.
   * @param {ServerUnaryCall<any, any>} call - The gRPC call object.
   * @returns {HeroDto} - The newly created hero object with an assigned ID and the provided name.
   */
  @GrpcMethod('HeroesService', 'CreateHero')
  @DtoClass(CreateHeroRequestDto)
  createHero(
    data: CreateHeroRequestDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): HeroDto {
    try {
      const newHero = {
        id: this.heroes.length + 1, // Basic ID assignment
        name: data.name,
      };
      this.heroes.push(newHero);
      return newHero;
    } catch (error) {
      console.error('🚀 ~ HeroesController ~ error:', error);
      if (error instanceof RpcException) {
        // Re-throw RpcExceptions if they are already handled
        throw error;
      }
      ErrorHandler.handleInternalError('Failed to create hero');
    }
  }

  /**
   * Updates the name of a hero by its ID.
   *
   * @param {UpdateHeroRequest} data - The request object containing the new name for the hero.
   * @param {Metadata} metadata - Additional metadata for the request.
   * @param {ServerUnaryCall<any, any>} call - The gRPC call object.
   * @returns {HeroDto} - The updated hero object with the new name.
   * @throws {RpcException} - Throws an RpcException if the hero with the given ID is not found.
   */
  @GrpcMethod('HeroesService', 'UpdateHero')
  @DtoClass(UpdateHeroRequestDto)
  updateHero(
    data: UpdateHeroRequestDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): HeroDto {
    try {
      const hero = this.heroes.find(({ id }) => id === data.id);
      if (!hero) {
        ErrorHandler.handleNotFoundError(data.id, 'Hero');
      }
      hero.name = data.name; // Update hero name
      return hero;
    } catch (error) {
      console.error('🚀 ~ HeroesController ~ error:', error);
      if (error instanceof RpcException) {
        // Re-throw RpcExceptions if they are already handled
        throw error;
      }
      ErrorHandler.handleInternalError('Failed to update hero');
    }
  }

  /**
   * Deletes a hero by its ID.
   *
   * @param {HeroById} data - The ID of the hero to delete.
   * @param {Metadata} metadata - Additional metadata for the request.
   * @param {ServerUnaryCall<any, any>} call - The gRPC call object.
   * @returns {DeleteHeroResponseDto} - An object indicating the success of the deletion operation.
   * @throws {RpcException} - Throws an RpcException if the hero with the given ID is not found.
   */
  @GrpcMethod('HeroesService', 'DeleteHero')
  @DtoClass(HeroByIdDto)
  deleteHero(
    data: HeroByIdDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): DeleteHeroResponseDto {
    try {
      const heroIndex = this.heroes.findIndex(({ id }) => id === data.id);
      if (heroIndex === -1) {
        ErrorHandler.handleNotFoundError(data.id, 'Hero');
      }
      this.heroes.splice(heroIndex, 1); // Remove hero from the array
      return { success: true };
    } catch (error) {
      console.error('🚀 ~ HeroesController ~ error:', error);
      if (error instanceof RpcException) {
        // Re-throw RpcExceptions if they are already handled
        throw error;
      }
      ErrorHandler.handleInternalError('Failed to delete hero');
    }
  }
}
