import { playersClubDto } from '../players/players.model';
import { nationalityDto } from '../nationalities/nationalities.model';
import { clubLeaguesDto } from '../club-leagues/club-leagues.model';
import { coachesClubDto } from '../coaches/coaches.model';

export interface clubCreationDto {
  clubName: string;
  summary: string;
  poster: File;
  hasOwnStadium: boolean;
  releaseDate: Date;
  description: string;
  nationalitiesIds: number[];
  clubLeaguesIds: number[];
  players: playersClubDto[];
  coaches: coachesClubDto[];
}

export interface clubDto {
  id: number;
  clubName: string;
  summary: string;
  poster: string;
  hasOwnStadium: boolean;
  releaseDate: Date;
  description: string;
  nationalities: nationalityDto[];
  clubLeagues: clubLeaguesDto[];
  players: playersClubDto[];
  coaches: coachesClubDto[];
  averageVote: number;
  userVote: number;
}

export interface ClubPostGetDto {
  nationalities: nationalityDto[];
  clubLeagues: clubLeaguesDto[];
}

export interface ClubPutGetDto {
  club: clubDto;
  selectedNationalities: nationalityDto[];
  nonSelectedNationalities: nationalityDto[];
  selectedClubLeagues: clubLeaguesDto[];
  nonSelectedClubLeagues: clubLeaguesDto[];
  players: playersClubDto[];
  coaches: coachesClubDto[];
}

export interface homeDto {
  hasOwnStadium: clubDto[];
  upcomingReleases: clubDto[];
}
