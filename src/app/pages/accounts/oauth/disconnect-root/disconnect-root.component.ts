import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../accounts.service';

@Component({
  selector: 'app-disconnect-root',
  templateUrl: './disconnect-root.component.html',
  styleUrl: './disconnect-root.component.scss',
})
export class DisconnectRootComponent implements OnInit {
  socialMediaName;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountsService: AccountsService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.socialMediaName =
      this.activatedRoute.snapshot.paramMap.get('socialMediaName');
    if (this.socialMediaName) {
      let retorno = await this.accountsService.disconnectAsync(
        this.socialMediaName
      );
      if (retorno) this.router.navigate(['/accounts/configuration']);
    }
  }
}
