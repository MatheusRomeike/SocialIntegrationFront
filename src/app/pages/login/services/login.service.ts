import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/shared/services/http-base.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpBaseService) {}

  async loginAsync(data) {
    var response = await this.httpClient.post('user/loginAsync', data);
    return response;
  }
}
