import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Loading } from 'src/app/shared/decorators/loading.decorator';
import { PublishService } from '../publish.service';

@Component({
  selector: 'app-accounts-publish-root',
  templateUrl: './accounts-publish-root.component.html',
  styleUrls: ['./accounts-publish-root.component.scss'],
})
export class AccountsPublishRootComponent {
  form: FormGroup;

  constructor(
    private publishService: PublishService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.form = new FormGroup(
      {
        text: new FormControl('', [Validators.required]),
        photos: new FormControl([]),
        x: new FormControl(false),
        instagram: new FormControl(false),
        facebook: new FormControl(false),
      },
      {
        validators: this.atLeastOneCheckedValidator([
          'x',
          'instagram',
          'facebook',
        ]),
      }
    );
  }

  @Loading()
  async onSubmit() {
    let data = {
      text: this.form.get('text').value,
      files: this.form.get('photos').value,
      socialMediaTypes: [],
    };

    if (this.form.get('x').value) data.socialMediaTypes.push(1);
    if (this.form.get('instagram').value) data.socialMediaTypes.push(2);
    if (this.form.get('facebook').value) data.socialMediaTypes.push(3);

    let result = await this.publishService.publish(data);
    console.log(result);
    if (result) {
      let message = this.translate.instant('PublishedSuccessfully');
      this.toastr.success(message);
    }
  }

  atLeastOneCheckedValidator(checkedFields: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const isChecked = checkedFields.some(
        (field) => control.get(field)?.value
      );
      return isChecked ? null : { atLeastOneChecked: true };
    };
  }

  getPreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }
}
