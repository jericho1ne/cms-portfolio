export function useContentfulPreview() {
  const previewCookie = useCookie('__preview_mode')

  const isPreview = computed(() => previewCookie.value === 'true')

  const enablePreview = () => {
    previewCookie.value = 'true'
  }

  const disablePreview = () => {
    previewCookie.value = null
  }

  return {
    isPreview,
    enablePreview,
    disablePreview
  }
}
