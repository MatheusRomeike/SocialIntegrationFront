import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.scss'],
})
export class DashboardRootComponent implements OnInit {
  constructor(private helperService: HelperService) {}
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    });
  }
}
