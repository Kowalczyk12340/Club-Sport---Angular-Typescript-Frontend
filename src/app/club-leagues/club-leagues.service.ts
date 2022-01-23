import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clubLeaguesCreationDto, clubLeaguesDto } from './club-leagues.model';

@Injectable({
  providedIn: 'root',
})
export class ClubLeagueService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/clubLeagues';

  public get(): Observable<clubLeaguesDto[]> {
    return this.http.get<clubLeaguesDto[]>(this.apiUrl);
  }

  public getById(id: number): Observable<clubLeaguesDto> {
    return this.http.get<clubLeaguesDto>(`${this.apiUrl}/${id}`);
  }

  public create(clubLeagueDto: clubLeaguesCreationDto) {
    return this.http.post(this.apiUrl, clubLeagueDto);
  }

  public edit(id: number, clubLeagueDto: clubLeaguesCreationDto) {
    return this.http.put(`${this.apiUrl}/${id}`, clubLeagueDto);
  }

  public delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
