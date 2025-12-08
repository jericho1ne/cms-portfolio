export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  const secret = query.secret as string
  const slug = query.slug as string

  if (secret !== config.contentfulPreviewSecret) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }

  const post = await getPreviewPostBySlug(slug)

  if (!post) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid slug'
    })
  }

  // Set preview cookie
  setCookie(event, '__preview_mode', 'true', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 // 1 hour
  })

  return sendRedirect(event, `/p/${post.slug}`)
})
