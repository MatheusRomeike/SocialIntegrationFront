/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpBaseService {
  constructor(private httpClient: HttpClient) {}

  get(url: string) {
    return firstValueFrom(
      this.httpClient.get(`${environment.apiUrl}/api/${url}`)
    ) as any;
  }

  getById(url: string, id: number) {
    return firstValueFrom(
      this.httpClient.get(`${environment.apiUrl}/api/${url}/${id}`)
    );
  }

  post(url: string, body: any) {
    return firstValueFrom(
      this.httpClient.post(`${environment.apiUrl}/api/${url}`, body)
    );
  }

  put(url: string, body: any) {
    return firstValueFrom(
      this.httpClient.put(`${environment.apiUrl}/api/${url}`, body)
    );
  }

  delete(url: string, id: number) {
    return firstValueFrom(
      this.httpClient.delete(`${environment.apiUrl}/api/${url}/${id}`)
    );
  }
}
