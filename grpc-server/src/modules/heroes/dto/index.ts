import { IsInt, IsString, IsBoolean, IsPositive } from 'class-validator';

export class HeroDto {
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  name: string;
}

export class HeroByIdDto {
  @IsInt()
  @IsPositive()
  id: number;
}

export class CreateHeroRequestDto {
  @IsString()
  name: string; // For creating a hero, we only need the name
}

export class UpdateHeroRequestDto {
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  name: string; // For updating, we need both the id and the new name
}

export class ListHeroesResponseDto {
  heroes: HeroDto[]; // The response will be an array of heroes
}

export class DeleteHeroResponseDto {
  @IsBoolean()
  success: boolean; // To indicate whether the deletion was successful
}
