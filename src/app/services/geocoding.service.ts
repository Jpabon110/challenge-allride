import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {

  constructor(private http: HttpClient) {}

  getCoordinates(address: string): Observable<any> {
    const url = `${environment.geocodingUrl}?address=${encodeURIComponent(address)}&key=${environment.googleMapsApiKey}`;
    return this.http.get(url);
  }
}
