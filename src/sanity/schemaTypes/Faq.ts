// schemas/faqs.js
export default {
    name: "faq",
    title: "Frequently Asked Questions Page",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: "description",
        title: "Description",
        type: "text",
      },
      {
        name: "faqItems",
        title: "FAQ Items",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              {
                name: "question",
                title: "Question",
                type: "string",
                validation: (Rule: { required: () => any; }) => Rule.required(),
              },
              {
                name: "answer",
                title: "Answer",
                type: "text",
                validation: (Rule: { required: () => any; }) => Rule.required(),
              },
             
            ],
          },
        ],
      },
    ],
  };
