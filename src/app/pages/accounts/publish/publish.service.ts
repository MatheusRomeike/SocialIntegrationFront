import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublishService {
  constructor(private httpClient: HttpClient) {}

  async publish(data) {
    await firstValueFrom(
      this.httpClient.post('https://localhost:5000/api/publish/publish', data)
    );
  }
}
