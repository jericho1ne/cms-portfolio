export default defineEventHandler(async (event) => {
  deleteCookie(event, '__preview_mode')

  return { message: 'Draft mode is disabled' }
})
