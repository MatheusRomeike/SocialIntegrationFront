import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  async postTwitter() {
    const response = await firstValueFrom(
      this.http.post(
        'https://api.twitter.com/2/tweets',
        {
          text: 'Are you excited for the weekend?',

          poll: {
            options: ['Yes', 'Maybe', 'No'],
            duration_minutes: 120,
          },
        },
        {
          headers: {
            Authorization:
              'Bearer AAAAAAAAAAAAAAAAAAAAAC%2BdrwEAAAAAq5hPQDJqcxLC2fytzn1LISgl7ZQ%3DvsCu1LI0taJKy3Hwil6UPC3M86EOhcmVn0k9JfXMlV3fOEBGRB',
          },
        }
      )
    );
    console.log(response);
  }
}
