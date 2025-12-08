<script setup lang="ts">
import type { Project } from '~/types'

interface Props {
  items: Project[]
}

defineProps<Props>()
</script>

<template>
  <section>
    <div class="projects-grid">
      <ProjectPreview
        v-for="item in items"
        :key="item.slug"
        :project="item"
      />
    </div>
  </section>
</template>
