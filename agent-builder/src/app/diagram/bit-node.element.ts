import { dia } from '@joint/core';

export const BitNode = dia.Element.define(
  'app.BitNode',
  {
    size: { width: 240, height: 120 },
    attrs: {
      body: {
        width: 240,
        height: 120,
        rx: 10,
        ry: 10,
        fill: '#fff',
        stroke: '#39424e',
        'stroke-width': 1.5,
        'data-node-id': '',
      },
      stateFrame: {
        width: 240,
        height: 120,
        rx: 10,
        ry: 10,
        fill: 'none',
        stroke: 'transparent',
        'stroke-width': 3,
      },

      title: {
        x: 12,
        y: 26,
        'font-size': 14,
        'font-weight': 600,
        fill: '#1f2937',
        text: '',
        'data-node-id': '',
      },
      preview: { x: 12, y: 50, 'font-size': 12, fill: '#4b5563', text: '' },
      chip1: {
        x: 12,
        y: 74,
        width: 28,
        height: 18,
        rx: 4,
        ry: 4,
        fill: '#6B7280',
        display: 'none',
      },
      chip1t: {
        x: 26,
        y: 87,
        'font-size': 10,
        'text-anchor': 'middle',
        fill: '#fff',
        text: '',
        display: 'none',
      },

      chip2: {
        x: 48,
        y: 74,
        width: 28,
        height: 18,
        rx: 4,
        ry: 4,
        fill: '#6B7280',
        display: 'none',
      },
      chip2t: {
        x: 62,
        y: 87,
        'font-size': 10,
        'text-anchor': 'middle',
        fill: '#fff',
        text: '',
        display: 'none',
      },

      chip3: {
        x: 84,
        y: 74,
        width: 28,
        height: 18,
        rx: 4,
        ry: 4,
        fill: '#6B7280',
        display: 'none',
      },
      chip3t: {
        x: 98,
        y: 87,
        'font-size': 10,
        'text-anchor': 'middle',
        fill: '#fff',
        text: '',
        display: 'none',
      },

      chipMore: {
        x: 120,
        y: 74,
        width: 32,
        height: 18,
        rx: 4,
        ry: 4,
        fill: '#6B7280',
        display: 'none',
      },
      chipMoreT: {
        x: 136,
        y: 87,
        'font-size': 10,
        'text-anchor': 'middle',
        fill: '#fff',
        text: '>3',
        display: 'none',
      },

      menuGlyph: {
        x: 212,
        y: 24,
        'font-size': 18,
        fill: '#6b7280',
        text: '⋮',
        cursor: 'pointer',
        'data-role': 'menu',
        'data-node-id': '',
      },
    },
    ports: {
      groups: {
        in: {
          position: 'left',
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#6b7280',
              'stroke-width': 2,
              fill: '#fff',
            },
          },
          markup: [{ tagName: 'circle', selector: 'circle' }],
        },
        out: {
          position: 'right',
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#6b7280',
              'stroke-width': 2,
              fill: '#fff',
            },
          },
          markup: [{ tagName: 'circle', selector: 'circle' }],
        },
      },
    },
  },
  {
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'rect', selector: 'stateFrame' },
      { tagName: 'text', selector: 'title' },
      { tagName: 'text', selector: 'preview' },

      { tagName: 'rect', selector: 'chip1' },
      { tagName: 'text', selector: 'chip1t' },
      { tagName: 'rect', selector: 'chip2' },
      { tagName: 'text', selector: 'chip2t' },
      { tagName: 'rect', selector: 'chip3' },
      { tagName: 'text', selector: 'chip3t' },
      { tagName: 'rect', selector: 'chipMore' },
      { tagName: 'text', selector: 'chipMoreT' },

      { tagName: 'text', selector: 'menuGlyph' },
    ],
  }
);
