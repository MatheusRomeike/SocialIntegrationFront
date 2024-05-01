import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: ` <ng-content></ng-content> `,
})
export class IconComponent {
  @Input() isMaterialIcon = true;

  @HostBinding('class.material-icons')
  get isMaterialClass(): boolean {
    return this.isMaterialIcon; // Adiciona a classe 'material-icons' quando necessário
  }
}
