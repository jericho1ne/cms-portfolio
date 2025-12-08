<script setup lang="ts">
import type { Project } from '~/types'

const { isPreview } = useContentfulPreview()

const { data: projects } = await useAsyncData<Project[]>('projects', () =>
  $fetch('/api/projects', {
    query: { preview: isPreview.value }
  })
)
</script>

<template>
  <div class="container">
    <Intro />
    <MoreProjects v-if="projects" :items="projects" />
  </div>
</template>
