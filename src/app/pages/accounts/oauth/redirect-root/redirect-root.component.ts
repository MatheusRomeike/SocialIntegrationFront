import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../accounts.service';

@Component({
  selector: 'app-redirect-root',
  templateUrl: './redirect-root.component.html',
  styleUrl: './redirect-root.component.scss',
})
export class RedirectRootComponent implements OnInit {
  socialMediaName;
  code;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountsService: AccountsService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.socialMediaName =
      this.activatedRoute.snapshot.paramMap.get('socialMediaName');
    this.code = this.activatedRoute.snapshot.queryParams['code'];
    if (this.code) {
      let retorno = await this.accountsService.authenticateAsync(
        this.code,
        this.socialMediaName
      );
      if (retorno) this.router.navigate(['/accounts/configuration']);
    }
  }
}
