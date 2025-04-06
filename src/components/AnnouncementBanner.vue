<template>
  <div v-if="showBanner" class="announcement-banner">
    <div class="banner-content">
      <div class="banner-icon">
        <i class="icon-megaphone"></i>
      </div>
      <div class="banner-text">
        <h3>{{ latestAnnouncement.title }}</h3>
        <p>{{ latestAnnouncement.content }}</p>
      </div>
      <button class="close-btn" @click="closeBanner">
        <i class="icon-close"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '../stores/dataStore'

const dataStore = useDataStore()
const showBanner = ref(false)

const latestAnnouncement = computed(() => {
  const announcements = dataStore.getLatestAnnouncements(1)
  return announcements.length > 0 ? announcements[0] : null
})

const closeBanner = () => {
  showBanner.value = false
  localStorage.setItem('lastAnnouncementId', latestAnnouncement.value.id)
}

onMounted(() => {
  if (latestAnnouncement.value) {
    const lastSeenId = localStorage.getItem('lastAnnouncementId')
    const announcementDate = new Date(latestAnnouncement.value.date)
    const now = new Date()
    const hoursSinceAnnouncement = (now - announcementDate) / (1000 * 60 * 60)

    if (lastSeenId !== latestAnnouncement.value.id.toString() && hoursSinceAnnouncement <= 24) {
      showBanner.value = true
    }
  }
})
</script>

<style scoped>
.announcement-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  z-index: 1000;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.5s ease-out;
}

.banner-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.banner-icon {
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-text {
  flex: 1;
}

.banner-text h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-family: 'Montserrat', sans-serif;
}

.banner-text p {
  font-size: 1rem;
  opacity: 0.9;
  font-family: 'Inter', sans-serif;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .banner-text h3 {
    font-size: 1.1rem;
  }

  .banner-text p {
 