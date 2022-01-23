import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { playerCreationDto, playerDto, playersClubDto } from './players.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/players';

  get(page: number, recordsPerPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<playerDto[]>(this.apiUrl, {
      observe: 'response',
      params,
    });
  }

  getById(id: number): Observable<playerDto> {
    return this.http.get<playerDto>(`${this.apiUrl}/${id}`);
  }

  searchByName(name: string): Observable<playersClubDto[]> {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<playersClubDto[]>(
      `${this.apiUrl}/searchByName`,
      JSON.stringify(name),
      { headers }
    );
  }

  create(player: playerCreationDto) {
    const formData = this.buildFormData(player);
    return this.http.post(this.apiUrl, formData);
  }

  edit(id: number, player: playerCreationDto) {
    const formData = this.buildFormData(player);
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private buildFormData(player: playerCreationDto): FormData {
    const formData = new FormData();

    formData.append('name', player.name);

    if (player.biography) {
      formData.append('biography', player.biography);
    }

    if (player.dateOfBirth) {
      formData.append('dateOfBirth', formatDateFormData(player.dateOfBirth));
    }

    if (player.picture) {
      formData.append('picture', player.picture);
    }

    return formData;
  }
}
