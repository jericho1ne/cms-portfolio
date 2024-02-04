const ITEM_FIELDS = `
  slug
  title
  description
  heroImage {
    title
    description
    contentType
    fileName
    size
    url
    width
    height
  }
  techTags
  externalUrl
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
      next: { tags: ["posts"] },
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

export async function getAllProjects(isDraftMode: boolean): Promise<any[]> {
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

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean,
): Promise<any> {
  const singleEntry = await fetchGraphQL(
    `query {
      ${ COLLECTION_NAME }(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${ ITEM_FIELDS }
        }
      }
    }`,
    preview,
  );

  const entries = await fetchGraphQL(
    `query {
      ${ COLLECTION_NAME }(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${ ITEM_FIELDS }
        }
      }
    }`,
    preview,
  );

  return {
    post: extractPost(singleEntry),
    morePosts: extractPostEntries(entries),
  };
}
