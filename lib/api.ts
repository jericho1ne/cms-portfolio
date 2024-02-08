import axios from 'axios';

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
`;

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
`;

const COLLECTION_NAME = 'portfolioItemCollection'

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    },
  ).then((response) => response.json());
}

function extractProject(fetchResponse: any): any {
  return fetchResponse?.data?.portfolioItemCollection?.items?.[0];
}

function extractProjectEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.portfolioItemCollection?.items;
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      ${ COLLECTION_NAME }(where: { slug: "${ slug }" }, preview: true, limit: 1) {
        items {
          ${ ITEM_FIELDS }
        }
      }
    }`,
    true,
  )
  
  return extractProject(entry);
}

export async function getAllProjects(isDraftMode: boolean = false): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      ${ COLLECTION_NAME }(where: { slug_exists: true }, order: date_DESC, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${ ITEM_FIELDS }
        }
      }
    }`,
    isDraftMode,
  );

  return extractProjectEntries(entries);
}

export async function getSingleProject(
  slug: string,
  preview: boolean = false,
): Promise<any> {
  const singleEntry = await fetchGraphQL(
    `query {
      ${ COLLECTION_NAME }(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${ ITEM_FIELDS_EXTENDED }
        }
      }
    }`,
    preview,
  );

  return extractProject(singleEntry)
}

export async function getMediaAsset (assetId: string, preview: boolean = false): Promise<any> {
  const accessToken = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN
    
  const baseUrl = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}`

  const mediaAsset = await axios.get(`${baseUrl}/environments/master/assets/${assetId}?access_token=${accessToken}`)
    .then(res => res.data.fields)
    
  return mediaAsset
}
