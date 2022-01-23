import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { coachCreationDto, coachDto, coachesClubDto } from './coaches.model';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/coaches';

  get(page: number, recordsPerPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<coachDto[]>(this.apiUrl, {
      observe: 'response',
      params,
    });
  }

  getById(id: number): Observable<coachDto> {
    return this.http.get<coachDto>(`${this.apiUrl}/${id}`);
  }

  searchByName(name: string): Observable<coachesClubDto[]> {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<coachesClubDto[]>(
      `${this.apiUrl}/searchByName`,
      JSON.stringify(name),
      { headers }
    );
  }

  create(coach: coachCreationDto) {
    const formData = this.buildFormData(coach);
    return this.http.post(this.apiUrl, formData);
  }

  edit(id: number, coach: coachCreationDto) {
    const formData = this.buildFormData(coach);
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private buildFormData(coach: coachCreationDto): FormData {
    const formData = new FormData();

    formData.append('name', coach.name);

    if (coach.biography) {
      formData.append('biography', coach.biography);
    }

    if (coach.dateOfBirth) {
      formData.append('dateOfBirth', formatDateFormData(coach.dateOfBirth));
    }

    if (coach.picture) {
      formData.append('picture', coach.picture);
    }

    return formData;
  }
}
