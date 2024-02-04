### Portfolio
A clone of the [Next.js + Contentful boiler plate](https://github.com/vercel/next.js/tree/canary/examples/cms-contentful), hosted on Netlify.


### Why
The Vue starter project was preferable, but the React starter had less opininated visual styling and better typography.

Upgrading from [an outdated repository](https://github.com/jericho1ne/react-portfolio) whose dependencies were considerably out of date.

### Developer Experience (DX)
- Vue over React any day of the week. But, it's good to see what I've been missing in React Land for the past couple of years.
- Not a huge fan of GraphQL, but the queries were easily updated to match my item schema. Contentful's [GraphQL playground](https://www.contentful.com/blog/graphql-tools-for-getting-started-with-contentful/#:~:text=1.%20Basic%20Contentful%20GraphQL%20API) was helpful in helping get over my severe dislike of this "query language".

### CMS setup

Contentful `portfolioItem` schema

```
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
```

#### Content model 

![[./__assets/contentful-schema.png]]


### What's next
- Still aiming to clean up the mess that tailwind left behind.