export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const preview = query.preview === 'true'

  const projects = await getAllProjects(preview)

  return projects
})
