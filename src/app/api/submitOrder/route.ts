import { createClient } from "@sanity/client";

// Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN,  // Ensure this token has write permissions
  useCdn: false,  // Disable CDN for write operations
  apiVersion: "2024-12-28", // Add the latest API version
});

// The API handler for the POST request
export async function POST(request: Request) {
  const formData = await request.json();

  try {
    // Create a new order document in Sanity
    const result = await client.create({
      _type: "order",  // Ensure 'order' is the correct document type in your schema
      ...formData,  // Spread the form data into the new document
    });

    // Return a success response
    return new Response(
      JSON.stringify({ success: true, result }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: unknown) {
    // Improved error handling
    if (error instanceof Error) {
      console.error("Error creating order:", error);  // Log the error for debugging
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message || "An unexpected error occurred",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Fallback for unexpected errors
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
