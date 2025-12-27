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
        <div v-if="project.tags" class="tech-tags">
          <span
            v-for="(tag, index) in project.tags.split(',').map(t => t.trim())"
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
          More Info
        </NuxtLink>

        <!-- Hero image -->
        <div class="hero-image-wrapper">
          <CoverImage
            :title="project.title"
            :url="project.heroImage.url"
          />
        </div>


        <!-- Image Gallery -->
        <div v-if="project.imageGalleryCollection?.items?.length" class="image-gallery">
          <div
            v-for="(image, index) in project.imageGalleryCollection.items"
            :key="index"
            class="gallery-item"
          >
            <NuxtImg
              :src="image.url"
              :alt="image.description || image.title"
              loading="lazy"
            />
          </div>
        </div>

      </article>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-page {
  padding-top: 2rem;
}

.back-link {
  display: inline-block;
  background-color: #f1f5f9;
  padding: 0.5rem;
  text-decoration: underline;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 2rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.25;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1.875rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }
}

.tech-tags {
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
}

.tech-tag {
  display: inline-block;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 1rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: #854d0e;
  background-color: #fefce8;
  border: 1px solid rgba(202, 138, 4, 0.2);
}

.prose {
  letter-spacing: -0.025em;
  font-size: 0.875rem;
  line-height: 1.75;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }

  :deep(p) {
    margin-bottom: 1rem;
  }

  :deep(img) {
    width: 100%;
    height: auto;
    margin: 1rem 0;
  }

  :deep(a) {
    color: #3b82f6;
    text-decoration: underline;

    &:hover {
      color: #1d4ed8;
      opacity: 1;
    }
  }
}

.external-link {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  color: white;
  background: linear-gradient(to bottom right, #9333ea, #3b82f6);
  font-weight: 700;
  letter-spacing: -0.05em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s ease-out,
    box-shadow 0.2s ease-out;

  &:hover {
    opacity: 1;
    background: linear-gradient(to bottom left, #9333ea, #3b82f6);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

.hero-image-wrapper {
  max-width: 42rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 4rem;
  }
}

.image-gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

.gallery-item {
  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
}
</style>