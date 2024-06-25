import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button
      class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800  shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 disabled:border-green-900 disabled:bg-green-800 disabled:text-slate-400 disabled:shadow-none disabled:hover:bg-green-800  {{
        classExtend
      }}"
      [type]="type"
      [disabled]="disabled"
      (click)="onClickButton($event)"
    >
      {{ label }}
    </button>
  `,
  styles: ``,
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() classExtend!: string;
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  onClickButton(event: any): any {
    this.onClick.emit(event);
  }
}
