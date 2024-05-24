import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-network-card',
  templateUrl: './social-network-card.component.html',
  styleUrl: './social-network-card.component.scss',
})
export class SocialNetworkCardComponent implements OnInit {
  @Input() data;
  imageData: string | ArrayBuffer = '';

  constructor() {}

  ngOnInit(): void {
    if (this.data.account) {
      const byteCharacters = atob(this.data.account.profilePicture);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result;
      };
      reader.readAsDataURL(blob);
    }
  }

  openConfiguration() {
    let url = '';
    if (this.data.account) {
      url = `${location.origin}/accounts/disconnect/${this.data.name}`;
    } else {
      let configuration = this.data.socialMediaConfiguration;
      url = `${configuration.authorizationUrl}?client_id=${configuration.clientId}&redirect_uri=${configuration.redirectUri}&response_type=${configuration.responseType}&scope=${configuration.scope}${configuration.extraUrlInfo}`;
    }
    return url;
  }
}
