<script setup lang="ts">
interface Props {
  title: string
  url: string
  slug?: string
  isThumbnail?: boolean
}

defineProps<Props>()
</script>

<template>
  <div :class="['cover-image-wrapper', { 'is-thumbnail': isThumbnail }]">
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

<style lang="scss" scoped>
.cover-image-wrapper {
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.35);

  &.is-thumbnail {
    border-radius: 0;
    box-shadow: none;
  }
}

.cover-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;

  &.clickable {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>