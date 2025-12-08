<script setup lang="ts">
interface Props {
  title: string
  url: string
  slug?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="cover-image-wrapper">
    <NuxtLink v-if="slug" :to="`/p/${slug}`" :aria-label="title">
      <ContentfulImage
        :alt="`Cover Image for ${title}`"
        :width="1200"
        :height="800"
        class="cover-image clickable"
        :src="url"
      />
    </NuxtLink>
    <ContentfulImage
      v-else
      :alt="`Cover Image for ${title}`"
      :width="1200"
      :height="800"
      class="cover-image"
      :src="url"
    />
  </div>
</template>
