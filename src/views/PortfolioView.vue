<template>
  <div class="portfolio">
    <section class="portfolio-header">
      <h1>Our Portfolio</h1>
      <p>Explore our collection of aviation photography</p>
    </section>

    <section class="portfolio-grid">
      <div v-for="profile in profiles" :key="profile.id" class="profile-card" @click="openModal(profile)">
        <div class="profile-icon">
          <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <h3>{{ profile.name }}</h3>
        <p>{{ profile.role }}</p>
        <div class="profile-stats">
          <span>{{ profile.photos.length }} Photos</span>
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
          <div v-if="selectedProfile.photos.length === 0" class="no-photos">
            <font-awesome-icon :icon="['fas', 'camera']" />
            <p>No photos available yet</p>
          </div>
          <div v-else class="photos-grid">
            <div v-for="photo in selectedProfile.photos" :key="photo.id" class="photo-item">
              <img :src="photo.imageUrl" :alt="photo.title" @click="openPhoto(photo)" />
              <div class="photo-info">
                <h3>{{ photo.title }}</h3>
                <p>{{ photo.description }}</p>
                <span class="photo-date">{{ formatDate(photo.date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add a new modal for full-size photo view -->
    <div class="photo-modal" v-if="selectedPhoto" @click.self="closePhotoModal">
      <div class="photo-modal-content">
        <button class="close-btn" @click="closePhotoModal">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
        <img :src="selectedPhoto.imageUrl" :alt="selectedPhoto.title" />
        <div class="photo-details">
          <h3>{{ selectedPhoto.title }}</h3>
          <p>{{ selectedPhoto.description }}</p>
          <span class="photo-date">{{ formatDate(selectedPhoto.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAllProfiles } from '@/data/database';

const profiles = ref(getAllProfiles());
const selectedProfile = ref(null);
const selectedPhoto = ref(null);

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
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
}

.portfolio-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  animation: fadeIn 0.5s ease-out;
}

.portfolio-header h1 {
  font-size: 3rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
}

.portfolio-header p {
  color: var(--white);
  opacity: 0.8;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  max-width: 600px;
  margin: 0 auto;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
  animation: fadeIn 0.5s ease-out;
}

.profile-card {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.profile-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-color);
}

.profile-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.profile-card:hover::before {
  transform: translateX(100%);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.profile-avatar {
  width: 60px;
  height: 60px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--white);
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-info h3 {
  color: var(--white);
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.profile-info p {
  color: var(--white);
  opacity: 0.7;
  margin: 0;
  font-size: 0.9rem;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.photo-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-item:hover img {
  transform: scale(1.1);
}

.photo-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.7));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-item:hover::after {
  opacity: 1;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
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
  padding: var(--spacing-sm);
  transition: var(--transition);
  opacity: 0.7;
  z-index: 1;
}

.close-btn:hover {
  color: #ff4444;
  opacity: 1;
  transform: scale(1.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
  
  .portfolio-header h1 {
    font-size: 2rem;
  }
  
  .profile-card {
    padding: var(--spacing-md);
  }
  
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}

.photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.photo-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-modal-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.photo-details {
  margin-top: var(--spacing-md);
  text-align: center;
  color: var(--white);
  max-width: 600px;
}

.photo-details h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
}

.photo-details p {
  margin-bottom: var(--spacing-sm);
  opacity: 0.9;
}

.photo-details .photo-date {
  font-size: 0.9rem;
  opacity: 0.7;
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