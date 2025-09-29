import { dia } from '@joint/core';

export const DefaultLink = dia.Link.define(
  'app.DefaultLink',
  {
    attrs: {
      line: {
        connection: true, // <== tells Joint this path follows the connection
        stroke: '#a6b6b9',
        strokeWidth: 2,
        targetMarker: {
          type: 'path',
          d: 'M 10 -5 0 0 10 5 z',
          fill: '#a6b6b9',
        },
      },
    },
  },
  {
    markup: [
      {
        tagName: 'path',
        selector: 'line',
      },
    ],
  }
);
