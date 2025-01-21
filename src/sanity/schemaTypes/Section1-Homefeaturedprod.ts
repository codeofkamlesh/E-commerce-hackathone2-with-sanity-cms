const homefeatured = {
    name: 'HomeSection1',
    title: 'HomePage Section1',
    type: 'document',
    fields: [
      {
        name: 'Title_HomeSection1',
        title: 'Title of this section',
        type: 'string',
      },
      {
        name: 'products',  // Array of products
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
                name: 'oldPrice',
                title: 'Old Price',
                type: 'number',
              },
              {
                name: 'newPrice',
                title: 'New Price',
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
                    { title: 'Sales', value: 'Sales' },
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
export default homefeatured;