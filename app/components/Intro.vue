<script setup lang="ts">
import { GITHUB_URL, LINKEDIN_URL } from '~/utils/constants'
</script>

<template>
  <section class="intro">
    <div class="intro-text">
      <h1 class="intro-title">
        Mihai Peteu
      </h1>
      <h2 class="intro-subtitle">
        Front end software engineer, cyclist, coffee enthusiast.
      </h2>
    </div>
    <div class="intro-links">
      <NuxtLink
        :to="LINKEDIN_URL"
        class="intro-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </NuxtLink>
      <NuxtLink
        :to="GITHUB_URL"
        class="intro-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </NuxtLink>
    </div>
  </section>
</template>
