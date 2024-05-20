import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/shared/services/http-base.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private httpClient: HttpBaseService) {}

  async getSocialMediasAsync() {
    return (await this.httpClient.get('socialMedia')).data;
  }

  async getAccountsAsync() {
    return (await this.httpClient.get('account')).data;
  }
}
