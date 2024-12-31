import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutUs',
  title: 'About Us Page',
  type: 'document',
  fields: [
    // About Us Section
    defineField({
      name: 'aboutUsSection',
      title: 'About Us Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),

    // Brand Features Section
    defineField({
      name: 'brandFeatures',
      title: 'Middle Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
            }),
          ],
        },
      ],
    }),

    // Popular Products Section
    defineField({
      name: 'popularProducts',
      title: 'last images section  ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Product Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'name',
              title: 'Product Name',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Product Price',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
});
