import { dia } from '@joint/core';
import { BitNodeVM } from './bit-node.vm';

export function applyBitVM(node: dia.Element, vm: BitNodeVM): void {
  // stamp id onto elements for later retrieval via public event APIs
  node.attr('body/data-node-id', vm.id);
  node.attr('title/data-node-id', vm.id);
  node.attr('menuGlyph/data-node-id', vm.id);

  node.attr('title/text', vm.titleText);
  node.attr('preview/text', vm.previewSummary ?? '');

  node.attr('body/strokeDasharray', vm.reachable ? '' : '6,4');
  node.attr(
    'stateFrame/stroke',
    vm.invalid ? '#E11D48' : vm.highlighted ? '#22C55E' : 'transparent'
  );

  const chips = vm.chips ?? [];
  const show = (i: 1 | 2 | 3, on: boolean) => {
    node.attr(`chip${i}/display`, on ? 'block' : 'none');
    node.attr(`chip${i}t/display`, on ? 'block' : 'none');
  };

  show(1, !!chips[0]);
  show(2, !!chips[1]);
  show(3, !!chips[2]);

  if (chips[0]) {
    node.attr('chip1/fill', chips[0].color);
    node.attr('chip1t/text', chips[0].label);
  }
  if (chips[1]) {
    node.attr('chip2/fill', chips[1].color);
    node.attr('chip2t/text', chips[1].label);
  }
  if (chips[2]) {
    node.attr('chip3/fill', chips[2].color);
    node.attr('chip3t/text', chips[2].label);
  }

  const overflow = chips.length > 3;
  node.attr('chipMore/display', overflow ? 'block' : 'none');
  node.attr('chipMoreT/display', overflow ? 'block' : 'none');
}
