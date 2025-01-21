const homeourprodgrid = {
    name: 'HomeSection4',
    title: 'HomePage Section4',
    type: 'document',
    fields: [
      {
        name: 'Title_HomeSection4',
        title: 'Title of this section',
        type: 'string',
      },
      {
        name: 'products',
        title: 'Featured Products',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'product',
            title: 'Product Details',
            fields: [
              {
                name: 'productDescription',
                title: 'Product Description',
                type: 'string',
              },
              {
                name: 'newPrice',
                title: 'New Price',
                type: 'number',
              },
              {
                name: 'oldPrice',
                title: 'Old Price',
                type: 'number',
              },
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: {
                  hotspot: true,
                },
              },
              {
                name: 'badge',
                title: 'Badge',
                type: 'string',
                options: {
                  list: [
                    { title: 'New', value: 'New' },
                    { title: 'Sale', value: 'Sale' },
                  ],
                  layout: 'radio',
                },
              },
            ],
          },
        ],
      },
    ],
  };
  export default homeourprodgrid;