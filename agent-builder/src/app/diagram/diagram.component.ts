import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { dia } from '@joint/core';
import { BitNode } from './bit-node.element';
import { BitNodeVM } from './bit-node.vm';
import { applyBitVM } from './bit-node.apply';
import { DefaultLink } from './default-link';

@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [CommonModule],
  template: `<div #paper style="width:100%;height:100%;"></div>`,
})
export class DiagramComponent implements OnInit, OnDestroy {
  @ViewChild('paper', { static: true }) paperRef!: ElementRef<HTMLDivElement>;

  @Output() openBitMenu = new EventEmitter<{ id: string; anchor: DOMRect }>();

  private graph!: dia.Graph;
  private paper!: dia.Paper;

  ngOnInit(): void {
    this.graph = new dia.Graph({}, { cellNamespace: dia });

    this.paper = new dia.Paper({
      el: this.paperRef.nativeElement,
      model: this.graph,
      width: '100%',
      height: '100%',
      gridSize: 10,
      async: true,
      defaultLink: () => new DefaultLink(),

      interactive: { linkMove: true },
      linkPinning: false, // prevent half-connected links
      snapLinks: true,
    });

    this.paper.on('element:pointerdown', (view: dia.CellView, evt: dia.Event) => {
      let target = view.getEventTarget(evt) as Element | null;
      while (target && target.getAttribute('data-role') !== 'menu') {
        target = target.parentElement;
      }
      if (target) {
        evt.stopPropagation();
        const nodeId = target.getAttribute('data-node-id') || '';
        const bbox = view.getBBox();
        const hostBox = (this.paper.el as HTMLElement).getBoundingClientRect();
        const anchor = new DOMRect(
          hostBox.left + bbox.x,
          hostBox.top + bbox.y,
          bbox.width,
          bbox.height
        );
        this.openBitMenu.emit({ id: nodeId, anchor });
      }
    });

    this.graph.on('add', (cell: dia.Cell) => {
      if (cell.isLink()) {
        console.log('Link added:', cell.id, (cell as dia.Link).toJSON());
      }
    });

    this.graph.on('remove', (cell: dia.Cell) => {
      if (cell.isLink()) {
        console.log('Link removed:', cell.id);
      }
    });

    this.graph.on('change:source change:target', (link: dia.Link) => {
      console.log('Link changed:', link.id, link.toJSON());
    });
  }

  ngOnDestroy(): void {
    this.paper.remove();
  }

  addBitNode(vm: BitNodeVM, position: { x: number; y: number }): dia.Element {
    const node = new BitNode();
    node.position(position.x, position.y);
    node.addTo(this.graph);

    // give it one in/out port
    node.addPorts([
      { group: 'in', id: 'in' },
      { group: 'out', id: 'out' },
    ]);

    applyBitVM(node, vm);
    return node;
  }
}
