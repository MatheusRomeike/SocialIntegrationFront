import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-instagram-preview',
  templateUrl: './instagram-preview.component.html',
  styleUrl: './instagram-preview.component.scss',
})
export class InstagramPreviewComponent {
  @Input() imageSrc: string = '';
  @Input() textContent: string = '';
}
