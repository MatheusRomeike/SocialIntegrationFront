import { Component, type OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-root',
  templateUrl: './login-root.component.html',
  styleUrl: './login-root.component.scss',
})
export class LoginRootComponent implements OnInit {
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    if (this.form.valid) {
      console.log('Login');
    }
  }
}
