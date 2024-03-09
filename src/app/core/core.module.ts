import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// import { ResponsiveModule } from 'ngx-responsive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
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
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
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
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    InputCheckboxComponent,
    InputDatePickerComponent,
    InputSelectOptionComponent,
    InputTextComponent,
    ConfirmationDialogComponent,
  ],
})
export class CoreModule {}
