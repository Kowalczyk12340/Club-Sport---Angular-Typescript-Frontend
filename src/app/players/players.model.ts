export interface playerCreationDto {
  name: string;
  dateOfBirth: Date;
  picture: File;
  biography: string;
}

export interface playerDto {
  id: number;
  name: string;
  dateOfBirth: Date;
  picture: string;
  biography: string;
}

export interface playersClubDto {
  id: number;
  name: string;
  position: string;
  picture: string;
}
