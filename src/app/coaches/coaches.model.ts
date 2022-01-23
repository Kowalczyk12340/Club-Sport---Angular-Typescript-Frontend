export interface coachCreationDto {
  name: string;
  dateOfBirth: Date;
  picture: File;
  biography: string;
}

export interface coachDto {
  id: number;
  name: string;
  dateOfBirth: Date;
  picture: string;
  biography: string;
}

export interface coachesClubDto {
  id: number;
  name: string;
  license: string;
  picture: string;
}
