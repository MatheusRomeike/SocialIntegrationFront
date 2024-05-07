import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-instagram-preview',
  templateUrl: './instagram-preview.component.html',
  styleUrl: './instagram-preview.component.scss',
})
export class InstagramPreviewComponent {
  @Input() imageFiles;
  @Input() textContent: string = '';
  currentIndex = 0;

  getPreviewUrl(): string {
    if (this.imageFiles.length === 0) {
      return '';
    }
    return URL.createObjectURL(this.imageFiles[this.currentIndex]);
  }

  previousImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.imageFiles.length) % this.imageFiles.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.imageFiles.length;
  }
}
