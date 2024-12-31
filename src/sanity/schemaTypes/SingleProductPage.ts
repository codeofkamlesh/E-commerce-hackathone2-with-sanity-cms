import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'Singleproductpage',
  title: 'Single Product Page',
  type: 'document',
  fields: [
    // Featured Product Section Fields
    defineField({
      name: 'featuredProduct',
      title: 'Featured Product',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Product Name',
          type: 'string',
        }),
        defineField({
          name: 'price',
          title: 'Price',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'image',
          title: 'Product Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    // Featured Products Section Fields
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Product Name',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Product Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'altText',
              title: 'Image Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
});
