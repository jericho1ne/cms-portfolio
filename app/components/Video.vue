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
