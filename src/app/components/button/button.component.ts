import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [type]="type"
      class="rounded-md border border-slate-200 bg-green-500 px-4 py-2 hover:bg-green-400 focus:ring focus:ring-green-300 disabled:border-green-900 disabled:bg-green-800 disabled:text-slate-400 dark:bg-green-500 dark:text-gray-800 {{
        classExtend
      }}"
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
