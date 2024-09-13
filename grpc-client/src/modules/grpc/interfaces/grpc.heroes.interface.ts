import { Observable } from 'rxjs';
import {
  HeroDto,
  CreateHeroRequestDto,
  UpdateHeroRequestDto,
  HeroByIdDto,
  DeleteHeroResponseDto,
  ListHeroesResponseDto,
} from '../../heroes/dto/heroes.dto';

export interface IHeroesService {
  findOne(data: HeroByIdDto): Observable<HeroDto>;
  createHero(data: CreateHeroRequestDto): Observable<HeroDto>;
  updateHero(data: UpdateHeroRequestDto): Observable<HeroDto>;
  deleteHero(data: HeroByIdDto): Observable<DeleteHeroResponseDto>;
  listHeroes(data: any): Observable<ListHeroesResponseDto>;
}
