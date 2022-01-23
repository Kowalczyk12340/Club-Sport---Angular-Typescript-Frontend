import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { nationalityCreationDto, nationalityDto } from './nationalities.model';

@Injectable({
  providedIn: 'root',
})
export class NationalitiesService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/nationalities';

  getAll(): Observable<nationalityDto[]> {
    return this.http.get<nationalityDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<nationalityDto> {
    return this.http.get<nationalityDto>(`${this.apiUrl}/${id}`);
  }

  create(nationality: nationalityCreationDto) {
    return this.http.post(this.apiUrl, nationality);
  }

  edit(id: number, nationality: nationalityCreationDto) {
    return this.http.put(`${this.apiUrl}/${id}`, nationality);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
