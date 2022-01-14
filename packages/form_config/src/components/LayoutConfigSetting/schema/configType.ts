export default {
  type: 'object',
  properties: {
    panel: {
      type: 'object',
      properties: {
        leftPanel: {
          id: '/PanelType',
          type: 'object',
          properties: {
            collapsible: {
              type: 'boolean',
            },
            layout: {
              type: 'object',
              properties: {
                open: {
                  type: 'boolean',
                },
                width: {
                  type: 'number',
                },
              },
            },
          },
        },
        rightPanel: {
          $ref: '/PanelType',
        },
      },
    },
    canvas: {
      type: 'object',
      properties: {
        layout: {
          type: 'object',
          properties: {
            type: {
              oneOf: [
                {
                  type: 'string',
                  format: 'free',
                },
                {
                  type: 'string',
                  format: 'grid',
                },
              ],
            },
          },
        },
      },
    },
  },
};
