import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { ConfirmationDialogComponent } from './component/confirmation-dialog/confirmation-dialog.component';
import { IconComponent } from './component/icon/icon.component';
import { ImageCheckboxComponent } from './component/image-checkbox/image-checkbox.component';
import { InputCheckboxComponent } from './component/input-checkbox/input-checkbox.component';
import { InputDatePickerComponent } from './component/input-date-picker/input-date-picker.component';
import { InputFileComponent } from './component/input-file/input-file.component';
import { InputSelectOptionComponent } from './component/input-select-option/input-select-option.component';
import { InputTextComponent } from './component/input-text/input-text.component';
import { LoadingComponent } from './component/loading/loading.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { SublevelMenuComponent } from './component/sidenav/sublevel.menu.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { HttpBaseService } from './services/http-base.service';

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    SidenavComponent,
    SublevelMenuComponent,
    IconComponent,
    ImageCheckboxComponent,
    InputTextComponent,
    InputSelectOptionComponent,
    InputDatePickerComponent,
    InputCheckboxComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
    InputFileComponent,
  ],
  exports: [
    DefaultLayoutComponent,
    IconComponent,
    ImageCheckboxComponent,
    InputTextComponent,
    InputSelectOptionComponent,
    InputDatePickerComponent,
    InputCheckboxComponent,
    NgbModule,
    LoadingComponent,
    ToastNoAnimationModule,
    ConfirmationDialogComponent,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    NgxMaskDirective,
    NgxMaskPipe,
    InputFileComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    ToastNoAnimationModule.forRoot(),
    CommonModule,
    TranslateModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [HttpBaseService],
})
export class SharedModule {}
