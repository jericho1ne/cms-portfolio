const ITEM_FIELDS = `
  slug
  title
  description
  heroImage {
    title
    description
    url
  }
  techTags
`

const ITEM_FIELDS_EXTENDED = `
  slug
  title
  description
  externalUrl
  techTags
  bodyContent {
    json
  }
  heroImage {
    title
    description
    url
  }
  demoVideo {
    title
    contentType
    fileName
    description
    url
  }
`

const COLLECTION_NAME = 'portfolioItemCollection'

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  const config = useRuntimeConfig()

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${config.contentfulSpaceId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? config.contentfulPreviewAccessToken
            : config.contentfulAccessToken
        }`
      },
      body: JSON.stringify({ query })
    }
  )

  return response.json()
}

function extractProject(fetchResponse: any): any {
  return fetchResponse?.data?.portfolioItemCollection?.items?.[0]
}

function extractProjectEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.portfolioItemCollection?.items
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      ${COLLECTION_NAME}(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${ITEM_FIELDS}
        }
      }
    }`,
    true
  )

  return extractProject(entry)
}

export async function getAllProjects(isDraftMode = false): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      ${COLLECTION_NAME}(where: { slug_exists: true }, order: date_DESC, preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          ${ITEM_FIELDS}
        }
      }
    }`,
    isDraftMode
  )

  return extractProjectEntries(entries)
}

export async function getSingleProject(
  slug: string,
  preview = false
): Promise<any> {
  const singleEntry = await fetchGraphQL(
    `query {
      ${COLLECTION_NAME}(where: { slug: "${slug}" }, preview: ${
        preview ? 'true' : 'false'
      }, limit: 1) {
        items {
          ${ITEM_FIELDS_EXTENDED}
        }
      }
    }`,
    preview
  )

  return extractProject(singleEntry)
}

export async function getMediaAsset(
  assetId: string,
  preview = false
): Promise<any> {
  const config = useRuntimeConfig()
  const accessToken = preview
    ? config.contentfulPreviewAccessToken
    : config.contentfulAccessToken

  const baseUrl = `https://cdn.contentful.com/spaces/${config.contentfulSpaceId}`

  const response = await fetch(
    `${baseUrl}/environments/master/assets/${assetId}?access_token=${accessToken}`
  )
  const data = await response.json()

  return data.fields
}
