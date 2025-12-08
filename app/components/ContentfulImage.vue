<script setup lang="ts">
interface Props {
  src: string
  width?: number
  height?: number
  quality?: number
  alt: string
}

const props = withDefaults(defineProps<Props>(), {
  quality: 75,
  width: 1200,
  height: 800
})

const imageUrl = computed(() => {
  return `${props.src}?w=${props.width}&q=${props.quality}`
})
</script>

<template>
  <img
    :src="imageUrl"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
  />
</template>
