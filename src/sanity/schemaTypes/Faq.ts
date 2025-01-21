// schemas/faqs.js
const faq = {
    name: "faq",
    title: "Frequently Asked Questions Page",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",

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

              },
              {
                name: "answer",
                title: "Answer",
                type: "text",

              },

            ],
          },
        ],
      },
    ],
  };
  export default faq;