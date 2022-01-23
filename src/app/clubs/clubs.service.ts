import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import {
  homeDto,
  clubCreationDto,
  clubDto,
  ClubPostGetDto,
  ClubPutGetDto,
} from './clubs.model';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl + '/clubs';

  public getHomePageClubs(): Observable<homeDto> {
    return this.http.get<homeDto>(this.apiUrl);
  }

  public putGet(id: number): Observable<ClubPutGetDto> {
    return this.http.get<ClubPutGetDto>(`${this.apiUrl}/putget/${id}`);
  }

  public edit(id: number, clubCreationDto: clubCreationDto) {
    const formData = this.BuildFormData(clubCreationDto);
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  public getById(id: number): Observable<clubDto> {
    return this.http.get<clubDto>(`${this.apiUrl}/${id}`);
  }

  public filter(values: any): Observable<any> {
    const params = new HttpParams({ fromObject: values });
    return this.http.get<clubDto[]>(`${this.apiUrl}/filter`, {
      params,
      observe: 'response',
    });
  }

  public postGet(): Observable<ClubPostGetDto> {
    return this.http.get<ClubPostGetDto>(`${this.apiUrl}/postget`);
  }

  public create(clubCreationDto: clubCreationDto): Observable<number> {
    const formData = this.BuildFormData(clubCreationDto);
    return this.http.post<number>(this.apiUrl, formData);
  }

  public delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private BuildFormData(club: clubCreationDto): FormData {
    const formData = new FormData();

    formData.append('clubName', club.clubName);
    formData.append('summary', club.summary);
    formData.append('description', club.description);
    formData.append('hasOwnStadium', String(club.hasOwnStadium));
    if (club.releaseDate) {
      formData.append('releaseDate', formatDateFormData(club.releaseDate));
    }

    if (club.poster) {
      formData.append('poster', club.poster);
    }

    formData.append('nationalitiesIds', JSON.stringify(club.nationalitiesIds));
    formData.append('clubLeaguesIds', JSON.stringify(club.clubLeaguesIds));
    formData.append('players', JSON.stringify(club.players));
    formData.append('coaches', JSON.stringify(club.coaches));

    return formData;
  }
}
