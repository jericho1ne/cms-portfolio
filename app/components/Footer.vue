<script setup lang="ts">
import { REPO_URL } from '~/utils/constants'
</script>

<template>
  <footer class="footer">
    <div class="container">
      <h3 class="footer-content">
        This project's <a
          :href="REPO_URL"
          class="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >github repository</a>.
      </h3>
    </div>
  </footer>
</template>
