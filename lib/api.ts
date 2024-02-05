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
    description
    url
  }
  techTags
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

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.portfolioItemCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
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

  return extractPost(entry);
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

  return extractPostEntries(entries);
}

export async function getSinglePost(
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

  return { post: extractPost(singleEntry) }
}
