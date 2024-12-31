import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ProductSec2',
  title: 'Product Page below Section',
  type: 'document',
  fields: [
    defineField({
      name: 'instagramImages',
      title: 'Images for Instagram',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter Heading',
      type: 'string',
    }),
    defineField({
      name: 'newsletterPlaceholder',
      title: 'Newsletter Placeholder',
      type: 'string',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
    }),
  ],
});
