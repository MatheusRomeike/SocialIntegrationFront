import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/shared/services/http-base.service';

@Injectable({
  providedIn: 'root',
})
export class PublishService {
  constructor(private httpClient: HttpBaseService) {}

  async publish(data) {
    await this.httpClient.post('publish/publish', data);
  }
}
