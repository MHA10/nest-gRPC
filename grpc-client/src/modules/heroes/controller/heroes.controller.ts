import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { HeroesClientService } from '../../grpc/services/grpc.heroes.service';
import {
  CreateHeroRequestDto,
  UpdateHeroRequestDto,
  HeroDto,
  DeleteHeroResponseDto,
  ListHeroesResponseDto,
} from '../dto/heroes.dto';
import { handleGrpcError } from 'src/modules/grpc/utils/grpc.utils';
import { lastValueFrom } from 'rxjs';

@Controller('/heroes')
export class HeroesController {
  constructor(private readonly grpcClientService: HeroesClientService) {}

  /**
   * List all heroes.
   *
   * @returns {Promise<ListHeroesResponseDto>} - The list of all heroes.
   */
  @Get()
  async listHeroes(): Promise<ListHeroesResponseDto> {
    try {
      const heroes = await lastValueFrom(this.grpcClientService.listHeroes({}));
      return heroes;
    } catch (error) {
      console.error('🚀 ~ HeroesController ~ listHeroes ~ error:', error);
      handleGrpcError(error);
    }
  }

  /**
   * Get a hero by ID.
   *
   * @param {number} id - The ID of the hero.
   * @returns {Promise<HeroDto>} - The hero object.
   */
  @Get(':id')
  async getHero(@Param('id') id: number): Promise<HeroDto> {
    try {
      const hero = await lastValueFrom(
        this.grpcClientService.findOne({ id: Number(id) }),
      );
      return hero;
    } catch (error) {
      console.error('🚀 ~ HeroesController ~ getHero ~ error:', error);
      handleGrpcError(error);
    }
  }

  /**
   * Create a new hero.
   *
   * @param {CreateHeroRequestDto} data - The request body to create a new hero.
   * @returns {Promise<HeroDto>} - The newly created hero.
   */
  @Post()
  async createHero(@Body() data: CreateHeroRequestDto): Promise<HeroDto> {
    try {
      const newHero = await lastValueFrom(
        this.grpcClientService.createHero(data),
      );
      return newHero;
    } catch (error) {
      console.error('🚀 ~ HeroesController ~ createHero ~ error:', error);
      handleGrpcError(error);
    }
  }

  /**
   * Update a hero by ID.
   *
   * @param {number} id - The ID of the hero.
   * @param {UpdateHeroRequestDto} data - The request body to update the hero.
   * @returns {Promise<HeroDto>} - The updated hero object.
   */
  @Put(':id')
  async updateHero(
    @Param('id') id: number,
    @Body() data: UpdateHeroRequestDto,
  ): Promise<HeroDto> {
    try {
      const updatedHero = await lastValueFrom(
        this.grpcClientService.updateHero({ id: Number(id), name: data.name }),
      );
      return updatedHero;
    } catch (error) {
      console.error('🚀 ~ HeroesController ~ updateHero ~ error:', error);
      handleGrpcError(error);
    }
  }

  /**
   * Delete a hero by ID.
   *
   * @param {number} id - The ID of the hero.
   * @returns {Promise<DeleteHeroResponseDto>} - The result of the deletion.
   */
  @Delete(':id')
  async deleteHero(@Param('id') id: number): Promise<DeleteHeroResponseDto> {
    try {
      const result = await lastValueFrom(
        this.grpcClientService.deleteHero({ id: Number(id) }),
      );
      return result;
    } catch (error) {
      console.error('🚀 ~ HeroesController ~ deleteHero ~ error:', error);
      handleGrpcError(error);
    }
  }
}
