export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const preview = query.preview === 'true'

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Asset ID is required'
    })
  }

  const asset = await getMediaAsset(id, preview)

  if (!asset) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Asset not found'
    })
  }

  return asset
})
