// /schemas/chairsCollection.js
export default {
    name: 'chairsCollection',
    title: 'Chairs Collection',
    type: 'document',
    fields: [
      {
        name: 'type',
        title: 'Type',
        type: 'string',
        options: {
          list: ['stoolChairs', 'comfortChairs', 'sofaCollection'],
        },
      },
      {
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'price', title: 'Price', type: 'number' },
              { name: 'image', title: 'Image', type: 'image' },
            ],
          },
        ],
      },
    ],
  };
