import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PublishService } from '../publish.service';

@Component({
  selector: 'app-accounts-publish-root',
  templateUrl: './accounts-publish-root.component.html',
  styleUrls: ['./accounts-publish-root.component.scss'],
})
export class AccountsPublishRootComponent {
  form: FormGroup;

  constructor(private publishService: PublishService) {
    this.form = new FormGroup(
      {
        text: new FormControl('texto de teste de publicação galera, teste.', [
          Validators.required,
        ]),
        x: new FormControl(false),
        instagram: new FormControl(false),
      },
      { validators: this.atLeastOneCheckedValidator(['x', 'instagram']) }
    );
  }

  async onSubmit() {
    await this.publishService.publish(this.form.value);
  }

  atLeastOneCheckedValidator(checkedFields: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const isChecked = checkedFields.some(
        (field) => control.get(field)?.value
      );
      return isChecked ? null : { atLeastOneChecked: true };
    };
  }
}
