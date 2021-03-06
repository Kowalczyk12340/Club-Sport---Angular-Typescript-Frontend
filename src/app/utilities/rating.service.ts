import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/ratings';

  public rate(clubId: number, rating: number) {
    return this.http.post(this.apiUrl, { clubId, rating });
  }
}
