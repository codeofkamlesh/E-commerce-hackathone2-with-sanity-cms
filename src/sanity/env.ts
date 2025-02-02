export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-28'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skVNhOhttaml776aDm5iubf0s4xiUqjiXzkjqsgbC5zKog0pCbm5pekAQ8XXfexJHiyAdX8ky24G0XHoKcNLXGzzxs9bgNZ1VLhq6iVBFKWneFo6FlpRuMoIkQhFIeNwevGbMuR5iXQOn4sd7ura3NirpHtNBRunJ7QF4v3BvdiIb7blnpsK",
  'Missing environment variable: NEXT_PUBLIC_SANITY_AUTH_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
