const hometopcateg = {
  name: 'HomeSection2',
  title: 'HomePage Section2',
  type: 'document',
  fields: [
    {
      name: 'Title_HomeSection2',
      title: 'Title of this section',
      type: 'string',
    },
    {
      name: 'products', // Array of products
      title: 'Product Categories',
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
              name: 'productQuantity',
              title: 'Product Quantity',
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
              name: 'href',
              title: 'Link (Href)',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
};
export default hometopcateg;