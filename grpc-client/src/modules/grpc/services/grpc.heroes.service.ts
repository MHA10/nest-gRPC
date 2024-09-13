import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  HeroDto,
  CreateHeroRequestDto,
  UpdateHeroRequestDto,
  HeroByIdDto,
  DeleteHeroResponseDto,
  ListHeroesResponseDto,
} from '../../heroes/dto/heroes.dto';
import { grpcConfig } from '../../../config/grpc.config';
import { IHeroesService } from '../interfaces/grpc.heroes.interface';

@Injectable()
export class HeroesClientService implements OnModuleInit {
  @Client(grpcConfig)
  private client: ClientGrpc;

  private heroesService: IHeroesService;

  /**
   * Initializes the HeroesClientService by retrieving the HeroesService from the gRPC client.
   * This method is called when the module is initialized.
   *
   * @memberof HeroesClientService
   */
  onModuleInit() {
    this.heroesService =
      this.client.getService<IHeroesService>('HeroesService');
  }

  /**
   * Retrieves a single hero by its unique identifier.
   *
   * @param {HeroByIdDto} data - The data object containing the hero's unique identifier.
   * @returns {Observable<HeroDto>} - An observable that emits the hero's data if found, or an empty observable if the hero does not exist.
   */
  findOne(data: HeroByIdDto): Observable<HeroDto> {
    return this.heroesService.findOne(data);
  }

  /**
   * Creates a new hero in the system.
   *
   * @param {CreateHeroRequestDto} data - The data object containing the hero's information to be created.
   * @returns {Observable<HeroDto>} - An observable that emits the newly created hero's data if successful, or an error if the creation fails.
   */
  createHero(data: CreateHeroRequestDto): Observable<HeroDto> {
    return this.heroesService.createHero(data);
  }

  /**
   * Updates an existing hero in the system.
   *
   * @param {UpdateHeroRequestDto} data - The data object containing the hero's updated information.
   * @property {number} id - The unique identifier of the hero to be updated.
   * @property {string} name - The new name of the hero.
   * @returns {Observable<HeroDto>} - An observable that emits the updated hero's data if successful, or an error if the update fails.
   */
  updateHero(data: UpdateHeroRequestDto): Observable<HeroDto> {
    return this.heroesService.updateHero(data);
  }

  /**
   * Deletes a hero from the system by its unique identifier.
   *
   * @param {HeroByIdDto} data - The data object containing the hero's unique identifier.
   * @returns {Observable<DeleteHeroResponseDto>} - An observable that emits a response indicating the success or failure of the deletion operation.
   */
  deleteHero(data: HeroByIdDto): Observable<DeleteHeroResponseDto> {
    return this.heroesService.deleteHero(data);
  }

  /**
   * Retrieves a list of heroes from the system.
   *
   * @param {any} data - An optional data object that can be used to filter or sort the heroes. The format of this data object is determined by the specific implementation of the HeroesService.
   * @returns {Observable<ListHeroesResponseDto>} - An observable that emits a ListHeroesResponseDto object containing an array of HeroDto objects representing the heroes in the system, along with metadata such as the total number of heroes and the current page of results.
   */
  listHeroes(data: any): Observable<ListHeroesResponseDto> {
    return this.heroesService.listHeroes(data);
  }
}
