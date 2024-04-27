import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { v4 as uuidv4 } from 'uuid';
import { applyColumn } from '../../utils/form-utils';

@Component({
  selector: '[input-text]',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  @ViewChild('input') input: ElementRef | undefined;
  @ContentChild('dropdownMenuItems')
  dropdownMenuItems: TemplateRef<any> | undefined;

  @Input() columnSize: number | string = 3;
  @Input() columnSizeMd: number | null | string = null;
  @Input() columnSizeLg: number | null | string = null;

  @Input() placeholder = '';
  @Input() className = '';
  @Input() label = '';
  @Input() id: string = uuidv4();
  @Input() type = 'text';
  @Input() formControlName = '';
  @Input() textArea = false;
  @Input() readOnly = false;
  @Input() icon = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() iconAction: () => void = () => {};
  @Input() showStatusIndicator = true;
  @Input() min: number | undefined = undefined;
  @Input() max: number | undefined = undefined;
  @Input() rows: number = 4;
  @Input() enabledFeedback = true;
  @Input() fontSize: string = '';
  @Input() mask: any;
  @Input() upperCase = false;
  @Input() maxlenght: number | undefined = undefined;

  @Output() onKeyDown = new EventEmitter();

  onChange: any = () => {};
  onTouched: any = () => {};

  @Input() disabled = false;
  @Input() value: any = '';
  formControl: AbstractControl | null = null;

  get required(): boolean {
    if (!this.formControl?.validator) return false;

    const validator = this.formControl!!.validator({} as AbstractControl);

    if (validator && validator['required']) {
      return true;
    }

    return false;
  }

  public get isValid(): boolean {
    return (
      this.formControl?.valid ||
      (this.formControl?.disabled && this.formControl?.value) ||
      (!this.required && this.formControl?.disabled)
    );
  }

  public get invalidFeedback(): string | undefined {
    if (!this.formControl?.validator) return undefined;

    if (!this.isValid && this.formControl?.touched && this.formControl.errors) {
      const validationMessages = [
        { required: this.translateService.instant('Required_Field') },
        { email: this.translateService.instant('Valid_Email') },
        { cpf: this.translateService.instant('Valid_Cpf') },
        { cnpj: this.translateService.instant('Valid_Cnpj') },
        { minlength: this.translateService.instant('Valid_Min_Length') },
        { maxlength: this.translateService.instant('Valid_Max_Length') },
        { min: this.translateService.instant('Valid_Min_Value') },
        { max: this.translateService.instant('Valid_Max_Value') },
        {
          senhaConfirmarSenha: this.translateService.instant(
            'Password_Must_Match'
          ),
        },
      ];

      //const formControlValidators = this.formControl?.validator!!({} as AbstractControl)
      //if (!formControlValidators) return undefined

      const validationMessage = validationMessages.filter((item) => {
        return item[Object.keys(this.formControl.errors)[0]];
      })[0] as any;

      let message = validationMessage[
        Object.keys(this.formControl.errors)[0]
      ] as string;

      const validationKeys = Object.keys(
        this.formControl.errors[Object.keys(this.formControl.errors)[0]]
      );
      validationKeys.forEach((key: string) => {
        const value =
          this.formControl.errors[Object.keys(this.formControl.errors)[0]][key];
        message = message.replace(`{${key}}`, value);
      });

      return message;
    }

    return undefined;
  }

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.formControl = this.controlContainer!!.control!!.get(
          this.formControlName
        );
        if (this.type === 'password') {
          this.icon = 'visibility_off';
          this.iconPosition = 'right';
          this.iconAction = this.togglePasswordVisibility.bind(this);
        }
      } else {
        console.warn(
          'Missing FormControlName directive from host element of the component'
        );
      }
    }
  }

  ngAfterViewInit(): void {
    applyColumn(this.id, this.columnSize, this.columnSizeMd, this.columnSizeLg);
  }

  focus() {
    this.input?.nativeElement.focus();
  }

  select() {
    this.input?.nativeElement.select();
  }

  updateValue(rawValue: any) {
    if (rawValue) {
      this.value = this.upperCase ? rawValue?.toUpperCase() : rawValue;
    }

    this.onKeyDown.emit(this.value);

    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  togglePasswordVisibility() {
    this.type = this.type === 'password' ? 'text' : 'password';
    this.icon = this.type === 'password' ? 'visibility_off' : 'visibility';
  }
}
