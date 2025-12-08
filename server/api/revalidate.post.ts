export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const headers = getHeaders(event)

  const secret = headers['x-vercel-reval-key']

  if (secret !== config.contentfulRevalidateSecret) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid secret'
    })
  }

  // In Nuxt, you can trigger revalidation through various means
  // depending on your deployment platform
  // For Vercel/Netlify, you may need to use their specific APIs

  return {
    revalidated: true,
    now: Date.now()
  }
})
