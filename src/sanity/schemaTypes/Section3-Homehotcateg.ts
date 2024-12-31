export default {
  name: "HomeSection3",
  title: "HomePage Section3",
  type: "document",
  fields: [
    {
      name: "Title_HomeSection3",
      title: "Title of this section",
      type: "string",
    },
    {
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
};
