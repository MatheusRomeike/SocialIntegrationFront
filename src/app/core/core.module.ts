import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { ResponsiveModule } from 'ngx-responsive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { BaseCustomInputComponent } from './components/base-custom-input/base-custom-input.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { InputDatePickerComponent } from './components/input-date-picker/input-date-picker.component';
import { InputSelectOptionComponent } from './components/input-select-option/input-select-option.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel.menu.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
  ],
  declarations: [
    SidenavComponent,
    DefaultLayoutComponent,
    SublevelMenuComponent,
    InputCheckboxComponent,
    InputDatePickerComponent,
    InputSelectOptionComponent,
    InputTextComponent,
    ConfirmationDialogComponent,
    BaseCustomInputComponent,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InputCheckboxComponent,
    InputDatePickerComponent,
    InputSelectOptionComponent,
    InputTextComponent,
    ConfirmationDialogComponent,
    BaseCustomInputComponent,
    DefaultLayoutComponent,
    NgbModule,
  ],
})
export class CoreModule {}
