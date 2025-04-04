<template>
  <div class="profile-portfolio">
    <div class="profile-header">
      <div class="profile-info">
        <div class="profile-icon">
          <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <h1>{{ profile.name }}</h1>
        <p class="role">{{ profile.role }}</p>
        <p class="bio">{{ profile.bio }}</p>
        <a :href="profile.instagram" target="_blank" class="social-link">
          <font-awesome-icon :icon="['fab', 'instagram']" />
          <span>Follow on Instagram</span>
        </a>
      </div>
    </div>

    <div class="photos-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo-card">
        <div class="photo-info">
          <h3>{{ photo.title }}</h3>
          <div class="photo-meta">
            <span class="date">{{ formatDate(photo.date) }}</span>
            <span class="aircraft">{{ photo.aircraft }}</span>
            <span class="airline">{{ photo.airline }}</span>
          </div>
          <p class="description">{{ photo.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProfilePhotos, getAllProfiles } from '@/data/database';

const route = useRoute();
const profile = ref({});
const photos = ref([]);

onMounted(() => {
  const profileId = parseInt(route.params.id);
  const allProfiles = getAllProfiles();
  const foundProfile = allProfiles.find(p => p.id === profileId);
  
  if (foundProfile) {
    profile.value = foundProfile;
    photos.value = getProfilePhotos(profileId);
  }
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>

<style scoped>
.profile-portfolio {
  padding: var(--spacing-xl) 0;
}

.profile-header {
  text-align: center;
  padding: var(--spacing-xl) 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
  backdrop-filter: blur(5px);
  margin-bottom: var(--spacing-xl);
}

.profile-icon {
  width: 150px;
  height: 150px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
  font-size: 4rem;
  color: var(--white);
}

.profile-header h1 {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  color: var(--white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.profile-header .role {
  color: var(--primary-light);
  font-weight: 500;
  margin-bottom: var(--spacing-md);
  font-size: 1.25rem;
}

.profile-header .bio {
  max-width: 600px;
  margin: 0 auto var(--spacing-md);
  color: var(--white);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

.social-link:hover {
  color: var(--primary-light);
  transform: translateY(-2px);
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  padding: 0 var(--spacing-md);
}

.photo-card {
  background: rgba(0, 0, 0, 0.8);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.photo-info h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
  color: var(--white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.photo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.photo-meta span {
  color: var(--primary-light);
  font-size: 0.9rem;
}

.photo-info .description {
  color: var(--white);
  opacity: 0.9;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
</style> 