<template>
  <div v-if="loading" class="loading-state">
    <i class="fas fa-spinner fa-spin"></i>
    <p>Loading portfolio...</p>
  </div>

  <div v-else-if="photographer" class="photographer-portfolio">
    <div class="portfolio-header">
      <div class="photographer-info">
        <div class="photographer-avatar">
          <img :src="photographer.avatar || '/default-avatar.jpg'" :alt="photographer.name">
        </div>
        <div class="photographer-details">
          <h1>{{ photographer.name }}</h1>
          <p class="specialty">{{ photographer.specialty }}</p>
          <div class="stats">
            <span><i class="fas fa-camera"></i> {{ photographer.photoCount }} Photos</span>
            <span><i class="fas fa-map-marker-alt"></i> {{ photographer.location }}</span>
          </div>
          <div class="tags">
            <span v-for="tag in photographer.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="portfolio-content">
      <div v-if="photos.length > 0" class="photos-grid">
        <div 
          v-for="photo in photos" 
          :key="photo.id" 
          class="photo-card"
          @click="openPhotoModal(photo)"
        >
          <img :src="photo.url" :alt="photo.description">
          <div class="photo-overlay">
            <div class="photo-info">
              <p class="photo-title">{{ photo.title }}</p>
              <p class="photo-date">{{ formatDate(photo.dateCreated) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no-photos">
        <i class="fas fa-camera"></i>
        <p>No photos in portfolio yet.</p>
      </div>
    </div>

    <!-- Photo Modal -->
    <div v-if="selectedPhoto" class="photo-modal" @click="closePhotoModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closePhotoModal">
          <i class="fas fa-times"></i>
        </button>
        <img :src="selectedPhoto.url" :alt="selectedPhoto.description">
        <div class="modal-info">
          <h3>{{ selectedPhoto.title }}</h3>
          <p>{{ selectedPhoto.description }}</p>
          <p class="modal-date">{{ formatDate(selectedPhoto.dateCreated) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'

const route = useRoute()
const router = useRouter()
const store = useDataStore()
const photographer = ref(null)
const photos = ref([])
const selectedPhoto = ref(null)
const loading = ref(true)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const openPhotoModal = (photo) => {
  selectedPhoto.value = photo
  document.body.style.overflow = 'hidden'
}

const closePhotoModal = () => {
  selectedPhoto.value = null
  document.body.style.overflow = 'auto'
}

const loadPhotographerData = async (id) => {
  try {
    if (!store.isInitialized) {
      await store.initializeData()
    }

    // Get photographer data
    const photographerData = store.photographers.find(p => p.id === id)
    if (!photographerData) {
      router.push('/portfolio') // Redirect if photographer not found
      return
    }

    // Get photographer's photos
    const photographerPhotos = store.photos.filter(photo => photo.photographerId === id)
    
    // Format photographer data
    photographer.value = {
      ...photographerData,
      tags: [photographerData.specialty, photographerData.location].filter(Boolean),
      photoCount: photographerPhotos.length
    }

    // Format photos data
    photos.value = photographerPhotos.map(photo => ({
      ...photo,
      url: photo.imageUrl,
      title: photo.title || 'Untitled',
      description: photo.description || '',
      dateCreated: photo.date
    }))
  } catch (error) {
    console.error('Error loading photographer data:', error)
    router.push('/portfolio')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const photographerId = route.params.id
  await loadPhotographerData(photographerId)
})
</script>

<style scoped>
.photographer-portfolio {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.portfolio-header {
  margin-bottom: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
}

.photographer-info {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.photographer-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.1);
}

.photographer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photographer-details h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
}

.specialty {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}

.stats {
  display: flex;
  gap: 2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}

.stats span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: rgba(144, 153, 62, 0.2);
  color: #90993e;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.photo-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 3/2;
}

.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-card:hover img {
  transform: scale(1.05);
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.photo-info {
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.photo-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.photo-date {
  font-size: 0.9rem;
  opacity: 0.8;
}

.no-photos {
  text-align: center;
  padding: 4rem 0;
  color: rgba(255, 255, 255, 0.7);
}

.no-photos i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
}

.modal-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.close-button {
  position: absolute;
  top: -2rem;
  right: -2rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.close-button:hover {
  opacity: 1;
}

.modal-info {
  color: #fff;
  margin-top: 1rem;
}

.modal-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.modal-date {
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .photographer-portfolio {
    padding: 1rem;
  }

  .portfolio-header {
    padding: 1.5rem;
  }

  .photographer-info {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .photographer-avatar {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  .photographer-details h1 {
    font-size: 2rem;
  }

  .stats {
    justify-content: center;
  }

  .tags {
    justify-content: center;
  }

  .photos-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95vw;
  }

  .close-button {
    top: -3rem;
    right: 0;
  }
}

/* Add loading state styles */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: rgba(255, 255, 255, 0.7);
}

.loading-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
}
</style> 