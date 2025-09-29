import { Injectable } from '@angular/core';
import {
  Overlay,
  OverlayRef,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BitNodeMenuComponent } from './bit-node-menu.component';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 8, offsetY: 8 },
  { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -8, offsetY: 8 },
];

@Injectable({ providedIn: 'root' })
export class BitMenuOverlayService {
  private ref: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  open(
    anchorRect: DOMRect,
    nodeId: string,
    onAction: (evt: { nodeId: string; action: any }) => void
  ): void {
    this.close();

    const origin = { x: anchorRect.left, y: anchorRect.top };

    const strategy: FlexibleConnectedPositionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions(POSITIONS)
      .withFlexibleDimensions(false)
      .withPush(false);

    this.ref = this.overlay.create({
      positionStrategy: strategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const compRef = this.ref.attach(new ComponentPortal(BitNodeMenuComponent));
    compRef.instance.nodeId = nodeId;
    compRef.instance.action.subscribe((evt) => {
      onAction(evt);
      this.close();
    });

    this.ref.backdropClick().subscribe(() => this.close());
  }

  close(): void {
    if (this.ref) {
      this.ref.dispose();
      this.ref = null;
    }
  }
}
