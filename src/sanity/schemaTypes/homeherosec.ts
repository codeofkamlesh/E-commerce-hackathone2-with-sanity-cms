// sanity/schemas/herosec.ts
export default {
    name: 'herosec',
    title: 'HomePage Hero Section',
    type: 'document',
    fields: [
      {
        name: 'welcomeText',
        title: 'Welcome Text',
        type: 'string',
      },
      {
        name: 'mainTitle',
        title: 'Main Title',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
    ],
  };
