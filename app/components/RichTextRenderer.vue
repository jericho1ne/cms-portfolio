<script setup lang="ts">
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import type { Document, Block, Inline, Text } from '@contentful/rich-text-types'

interface Props {
  content: {
    json: Document
    links?: {
      assets?: {
        block?: Array<{
          sys: { id: string }
          url: string
          description: string
        }>
      }
    }
  }
}

const props = defineProps<Props>()
const { isPreview } = useContentfulPreview()

// Cache for fetched assets
const assetCache = ref<Record<string, any>>({})

// Fetch asset data
async function fetchAsset(id: string) {
  if (assetCache.value[id]) {
    return assetCache.value[id]
  }

  try {
    const asset = await $fetch(`/api/assets/${id}`, {
      query: { preview: isPreview.value }
    })
    assetCache.value[id] = asset
    return asset
  } catch {
    return null
  }
}

// Check if node is text
function isText(node: Block | Inline | Text): node is Text {
  return node.nodeType === 'text'
}

// Render a node recursively
function renderNode(node: Block | Inline | Text, index: number): any {
  if (isText(node)) {
    return node.value
  }

  const children = node.content?.map((child, i) => renderNode(child, i)) || []

  switch (node.nodeType) {
    case BLOCKS.PARAGRAPH:
      return h('p', { key: index }, children)
    case BLOCKS.HEADING_1:
      return h('h1', { key: index }, children)
    case BLOCKS.HEADING_2:
      return h('h2', { key: index }, children)
    case BLOCKS.HEADING_3:
      return h('h3', { key: index }, children)
    case BLOCKS.HEADING_4:
      return h('h4', { key: index }, children)
    case BLOCKS.HEADING_5:
      return h('h5', { key: index }, children)
    case BLOCKS.HEADING_6:
      return h('h6', { key: index }, children)
    case BLOCKS.UL_LIST:
      return h('ul', { key: index }, children)
    case BLOCKS.OL_LIST:
      return h('ol', { key: index }, children)
    case BLOCKS.LIST_ITEM:
      return h('li', { key: index }, children)
    case BLOCKS.QUOTE:
      return h('blockquote', { key: index }, children)
    case BLOCKS.HR:
      return h('hr', { key: index })
    case BLOCKS.EMBEDDED_ASSET:
      return h(RichTextAsset, {
        key: index,
        id: node.data?.target?.sys?.id,
        assets: props.content?.links?.assets?.block
      })
    case INLINES.HYPERLINK:
      return h('a', {
        key: index,
        href: node.data?.uri,
        target: '_blank',
        rel: 'noopener noreferrer'
      }, children)
    default:
      return h('span', { key: index }, children)
  }
}

// Rich text asset component
const RichTextAsset = defineComponent({
  props: {
    id: String,
    assets: Array
  },
  async setup(props) {
    const asset = ref<any>(null)

    // Try to find in provided assets first
    const foundAsset = (props.assets as any[])?.find(a => a.sys.id === props.id)

    if (foundAsset) {
      asset.value = { file: { url: foundAsset.url }, description: foundAsset.description }
    } else if (props.id) {
      // Fetch from API if not found
      asset.value = await fetchAsset(props.id)
    }

    return () => {
      if (asset.value?.file?.url) {
        return h('img', {
          src: asset.value.file.url,
          alt: asset.value.description || '',
          style: 'width: 100%; height: auto;'
        })
      }
      return null
    }
  }
})
</script>

<template>
  <div class="prose">
    <component
      :is="() => content.json.content.map((node, index) => renderNode(node, index))"
    />
  </div>
</template>
