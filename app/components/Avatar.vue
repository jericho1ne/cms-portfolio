<script setup lang="ts">
interface Props {
  name: string
  picture: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center">
    <img
      :src="picture"
      :alt="name"
      style="width: 48px; height: 48px; border-radius: 9999px; margin-right: 1rem;"
    />
    <span style="font-size: 1.25rem; font-weight: 700;">{{ name }}</span>
  </div>
</template>
