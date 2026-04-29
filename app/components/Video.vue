<script setup lang="ts">
interface Props {
  url: string
  title: string
}

defineProps<Props>()
</script>

<template>
  <div class="video-wrapper">
    <video autoplay loop muted controls>
      <source :src="url" type="video/mp4" />
      <track
        :src="url"
        kind="subtitles"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<style lang="scss" scoped>
.video-wrapper {
  border: 1px solid var(--color-gray-900);
  border-radius: 16px;
  margin-bottom: 1rem;
  overflow: hidden;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }

  video {
    width: 100%;
    height: auto;
  }
}
</style>
