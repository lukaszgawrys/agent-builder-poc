import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramComponent } from './diagram/diagram.component';
import { BitMenuOverlayService } from './menu/bit-menu-overlay.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DiagramComponent],
  template: `
    <div
      style="height:48px;display:flex;align-items:center;gap:12px;padding:0 16px;border-bottom:1px solid #e5e7eb;"
    >
      <button (click)="add()">+ Add Node</button>
    </div>
    <div style="height:calc(100vh - 48px)">
      <app-diagram (openBitMenu)="onMenu($event)" #diagram></app-diagram>
    </div>
  `,
})
export class AppComponent {
  @ViewChild('diagram') diagram!: DiagramComponent;

  constructor(private menu: BitMenuOverlayService) {}

  add(): void {
    const id = crypto.randomUUID();
    this.diagram.addBitNode(
      {
        id,
        titleText: 'Demo Node',
        previewSummary: 'Minimal PoC',
        reachable: true,
        invalid: false,
        highlighted: false,
        chips: [
          { color: '#4798b4', label: '1' },
          { color: '#e24f30', label: '2' },
          { color: '#465b84', label: '3' },
          { color: '#999999', label: '4' }, // shows the >3 chip
        ],
      },
      { x: 120 + Math.random() * 220, y: 100 + Math.random() * 160 }
    );
  }

  onMenu(e: { id: string; anchor: DOMRect }): void {
    this.menu.open(e.anchor, e.id, (result) => {
      alert(`${result.action} on ${result.nodeId}`);
    });
  }
}
