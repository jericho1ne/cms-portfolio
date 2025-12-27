<script setup lang="ts">
import type { Project } from '~/types'

interface Props {
  project: Project
}

defineProps<Props>()
</script>

<template>
  <div class="project-card">
    <div class="project-card-image">
      <CoverImage
        :title="project.title"
        :slug="project.slug"
        :url="project.heroImage.url"
        is-thumbnail
      />
    </div>
    <div class="project-card-content">
      <h3 class="project-card-title">
        <NuxtLink :to="`/p/${project.slug}`">
          {{ project.title }}
        </NuxtLink>
      </h3>
      <p class="project-card-description">{{ project.description }}</p>
    </div>
  </div>
</template>
