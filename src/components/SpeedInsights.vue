<template>
  <div class="speed-insights">
    <!-- Vercel Speed Insights will be injected here -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { injectSpeedInsights } from '@vercel/speed-insights';

onMounted(() => {
  // Initialize Speed Insights
  injectSpeedInsights();
});
</script>

<style scoped>
.speed-insights {
  display: none; /* Hide the component as it's only for analytics */
}
</style> 