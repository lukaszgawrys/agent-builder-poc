import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type BitMenuAction = 'edit' | 'duplicate' | 'disconnect' | 'delete';

@Component({
  selector: 'app-bit-node-menu',
  imports: [CommonModule],
  template: `
    <div
      style="background:#fff;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,.15);padding:8px;display:grid;gap:4px;min-width:180px;"
    >
      <button type="button" (click)="emit('edit')">✏️ Edit</button>
      <button type="button" (click)="emit('duplicate')">📄 Duplicate</button>
      <button type="button" (click)="emit('disconnect')">🔌 Disconnect</button>
      <button type="button" (click)="emit('delete')">🗑️ Delete</button>
    </div>
  `,
})
export class BitNodeMenuComponent {
  @Input() nodeId = '';
  @Output() action = new EventEmitter<{ nodeId: string; action: BitMenuAction }>();
  emit(a: BitMenuAction): void {
    this.action.emit({ nodeId: this.nodeId, action: a });
  }
}
