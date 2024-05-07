import {
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: '[input-file]',
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true,
    },
  ],
})
export class InputFileComponent implements OnInit, ControlValueAccessor {
  constructor(
    private toastrService: ToastrService,
    private modalService: NgbModal,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
    private translateService: TranslateService
  ) {}

  private onChange = (value: any) => {};
  private onTouched = () => {};

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('imageModal') imageModal!: ElementRef;
  @Input() maxFiles = 1;
  @Input() files = [];
  @Input() label;
  @Input() id;
  @Input() formControlName = '';
  @Output() filesChange = new EventEmitter<File[]>();
  @Input() fileClick = false;
  currentFile: File | null = null;
  inputSemConfirmar = 0;
  accept = 'image/*';
  formControl: AbstractControl | null = null;
  isDisabled = false;

  get required(): boolean {
    if (!this.formControl?.validator) return false;

    const validator = this.formControl!!.validator({} as AbstractControl);

    if (validator && validator['required']) {
      return true;
    }

    return false;
  }

  ngOnInit(): void {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.formControl = this.controlContainer!!.control!!.get(
          this.formControlName
        );
      } else {
        console.warn(
          'Missing FormControlName directive from host element of the component'
        );
      }
    }
  }

  addFiles(files: File[]) {
    const totalFiles = this.files.length + files.length;
    if (totalFiles <= this.maxFiles) {
      if (this.accept === 'image/*') this.inputSemConfirmar += files.length;
      this.files = this.files.concat(files);
    } else {
      files = files.slice(0, this.maxFiles - this.files.length);
      if (this.accept === 'image/*') this.inputSemConfirmar += files.length;
      this.files = this.files.concat(
        files.slice(0, this.maxFiles - this.files.length)
      );

      let message = this.translateService.instant('Max_Files_Reached');
      message = message.replace('{maxFiles}', this.maxFiles.toString());

      this.toastrService.warning(message);
    }
    this.fileInput.nativeElement.value = '';
  }

  onFileSelected(event: any) {
    const selectedFiles = Array.from(event.target.files || []) as File[];
    this.addFiles(selectedFiles);
  }

  removeFile(file: File) {
    this.files = this.files.filter((f) => f !== file);
    this.fileInput.nativeElement.value = '';
    if (this.inputSemConfirmar > 0) {
      this.inputSemConfirmar -= 1;
    }
    this.onChange(this.files);
  }

  getPreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = Array.from(event.dataTransfer?.files || []);
    this.addFiles(droppedFiles);
  }

  confirmarInput() {
    if (this.accept === 'image/*') this.inputSemConfirmar -= 1;
    this.onChange(this.files);
  }

  openImageModal(file: any) {
    if (this.accept !== 'image/*') return;
    this.currentFile = file;
    this.modalService.open(this.imageModal, { size: 'lg' });
  }

  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.files = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
