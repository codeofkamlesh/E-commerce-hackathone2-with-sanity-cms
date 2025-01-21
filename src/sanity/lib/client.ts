import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Define a more general type for the image source
type SanityImageSource = { _type: "image"; asset: { _ref: string } };

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2024-12-28",
  useCdn: false, // For development and real-time updates, set this to `false`
  token: process.env.SANITY_PREVIEW_TOKEN,
});

const builder = imageUrlBuilder(client);

// Specify the correct type for `source`
export const urlFor = (source: SanityImageSource) => builder.image(source);
