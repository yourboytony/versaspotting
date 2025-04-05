<template>
  <div class="portfolio">
    <section class="portfolio-header">
      <h1>Our Portfolio</h1>
      <p>Explore our collection of aviation photography</p>
    </section>

    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Loading profiles...</p>
    </div>

    <section v-else class="portfolio-grid">
      <div v-for="profile in profiles" :key="profile.id" class="profile-card" @click="openModal(profile)">
        <div class="profile-icon">
          <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <h3>{{ profile.name }}</h3>
        <p>{{ profile.role }}</p>
        <div class="profile-stats">
          <span>{{ profile.photos?.length || 0 }} Photos</span>
        </div>
      </div>
    </section>

    <div class="modal" v-if="selectedProfile" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ selectedProfile.name }}</h2>
          <p>{{ selectedProfile.role }}</p>
          <button class="close-btn" @click="closeModal">
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
        </div>
        <div class="modal-body">
          <div v-if="!selectedProfile.photos?.length" class="no-photos">
            <font-awesome-icon :icon="['fas', 'camera']" />
            <p>No photos available yet</p>
          </div>
          <div v-else class="photos-grid">
            <div v-for="photo in selectedProfile.photos" :key="photo.id" class="photo-item">
              <img :src="photo.imageUrl" :alt="photo.caption" @click="openPhoto(photo)" />
              <div class="photo-info">
                <h3>{{ photo.caption }}</h3>
                <p>{{ photo.location }}</p>
                <span class="photo-date">{{ formatDate(photo.timestamp) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="photo-modal" v-if="selectedPhoto" @click.self="closePhotoModal">
      <div class="photo-modal-content">
        <button class="close-btn" @click="closePhotoModal">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
        <img :src="selectedPhoto.imageUrl" :alt="selectedPhoto.caption" />
        <div class="photo-details">
          <h3>{{ selectedPhoto.caption }}</h3>
          <p>{{ selectedPhoto.location }}</p>
          <span class="photo-date">{{ formatDate(selectedPhoto.timestamp) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllProfiles } from '@/data/database';

const profiles = ref([]);
const selectedProfile = ref(null);
const selectedPhoto = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    profiles.value = await getAllProfiles();
  } catch (error) {
    console.error('Error loading profiles:', error);
  } finally {
    isLoading.value = false;
  }
});

const openModal = (profile) => {
  selectedProfile.value = profile;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedProfile.value = null;
  document.body.style.overflow = '';
};

const openPhoto = (photo) => {
  selectedPhoto.value = photo;
};

const closePhotoModal = () => {
  selectedPhoto.value = null;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped>
.portfolio {
  min-height: 100vh;
  padding: var(--spacing-xl) 0;
}

.portfolio-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: 0 var(--spacing-md);
}

.portfolio-header h1 {
  font-size: 3rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.portfolio-header p {
  font-size: 1.25rem;
  color: var(--white);
  opacity: 0.9;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.profile-card {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  transition: var(--transition);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-color);
}

.profile-icon {
  width: 80px;
  height: 80px;
  background-color: rgba(132, 155, 85, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
  font-size: 2rem;
  color: var(--primary-color);
}

.profile-card h3 {
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-sm);
}

.profile-card p {
  color: var(--white);
  opacity: 0.9;
  margin-bottom: var(--spacing-md);
}

.profile-stats {
  color: var(--primary-color);
  font-weight: 600;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  padding: var(--spacing-xl);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.modal-header h2 {
  font-size: 2rem;
  color: var(--white);
  margin-bottom: var(--spacing-sm);
}

.modal-header p {
  color: var(--white);
  opacity: 0.9;
}

.close-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
  transition: var(--transition);
  padding: var(--spacing-sm);
}

.close-btn:hover {
  color: var(--primary-color);
  transform: rotate(90deg);
}

.modal-body {
  padding: var(--spacing-xl);
}

.no-photos {
  text-align: center;
  padding: var(--spacing-xl);
}

.no-photos .fa-camera {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.no-photos p {
  color: var(--white);
  opacity: 0.9;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
  padding: var(--spacing-md);
}

.photo-item {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: var(--transition);
  cursor: pointer;
}

.photo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.photo-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.photo-item img:hover {
  transform: scale(1.02);
}

.photo-info {
  padding: var(--spacing-md);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}

.photo-info h3 {
  color: var(--white);
  margin-bottom: var(--spacing-xs);
}

.photo-info p {
  color: var(--white);
  opacity: 0.8;
  margin-bottom: var(--spacing-xs);
}

.photo-date {
  color: var(--primary-color);
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .portfolio-header h1 {
    font-size: 2.5rem;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95%;
  }
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: var(--spacing-md);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.photo-modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
}

.photo-modal-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.photo-details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: var(--spacing-md);
  color: var(--white);
}

.photo-details h3 {
  margin-bottom: var(--spacing-xs);
}

.photo-details p {
  opacity: 0.8;
  margin-bottom: var(--spacing-xs);
}

.photo-details .photo-date {
  color: var(--primary-color);
}

.photo-modal-content .close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
  transition: var(--transition);
  padding: var(--spacing-sm);
}

.photo-modal-content .close-btn:hover {
  color: var(--primary-color);
  transform: rotate(90deg);
}
</style> 