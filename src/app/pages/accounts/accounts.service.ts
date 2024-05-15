import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/shared/services/http-base.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private httpClient: HttpBaseService) {}

  async getSocialNetworksAsync() {
    return (await this.httpClient.getAll('socialNetwork')).data;
  }

  async getSocialNetworksConfiguratedAsync() {
    return (await this.httpClient.getAll('socialNetwork/GetAllConfiguredAsync'))
      .data;
  }

  private readonly clientId = '2573196082854950';
  private readonly redirectUri = 'http://localhost:4200/oauth/callback';
  private readonly responseType = 'code';
  private readonly scope = 'public_content';

  initiateAuth() {
    const url = `https://api.instagram.com/oauth/authorize/?client_id=${
      this.clientId
    }&redirect_uri=${encodeURIComponent(this.redirectUri)}&response_type=${
      this.responseType
    }&scope=${this.scope}`;
    window.location.href = url;
  }
}
