import { Component, type OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loading } from 'src/app/shared/decorators/loading.decorator';
import { AuthJwtService } from 'src/app/shared/services/auth-jwt.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-root',
  templateUrl: './login-root.component.html',
  styleUrl: './login-root.component.scss',
})
export class LoginRootComponent implements OnInit {
  form: FormGroup;

  constructor(
    private loginService: LoginService,
    private authService: AuthJwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.authService.removeToken();
  }

  @Loading(null, true)
  async loginAsync() {
    if (this.form.valid) {
      var data = (await this.loginService.loginAsync(this.form.value)) as any;
      this.authService.token = data.data.accessToken;
      this.router.navigate(['/dashboard']);
    }
  }
}
