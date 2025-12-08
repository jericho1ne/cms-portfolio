<script setup lang="ts">
import type { ProjectExtended } from '~/types'

const route = useRoute()
const { isPreview } = useContentfulPreview()

const { data: project } = await useAsyncData<ProjectExtended>(
  `project-${route.params.slug}`,
  () => $fetch(`/api/projects/${route.params.slug}`, {
    query: { preview: isPreview.value }
  })
)

// Set page title
useHead({
  title: project.value?.title ? `${project.value.title} - Mihai Peteu` : 'Project - Mihai Peteu'
})
</script>

<template>
  <div class="container">
    <div class="project-page">
      <NuxtLink to="/" class="back-link">
        Home
      </NuxtLink>

      <article v-if="project">
        <h1 class="project-title">
          {{ project.title }}
        </h1>

        <!-- Technology stack badges -->
        <div v-if="project.techTags?.length" class="tech-tags">
          <span
            v-for="(tag, index) in project.techTags"
            :key="index"
            class="tech-tag"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Project Description / Body Content -->
        <div v-if="project.bodyContent" class="prose">
          <RichTextRenderer :content="project.bodyContent" />
        </div>

        <!-- Demo Video -->
        <Video
          v-if="project.demoVideo"
          :title="project.demoVideo.title"
          :url="project.demoVideo.url"
        />

        <!-- External Project Link -->
        <NuxtLink
          v-if="project.externalUrl"
          :to="project.externalUrl"
          class="external-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Project Demo
        </NuxtLink>

        <!-- Hero image -->
        <div class="hero-image-wrapper">
          <CoverImage
            :title="project.title"
            :url="project.heroImage.url"
          />
        </div>
      </article>
    </div>
  </div>
</template>
