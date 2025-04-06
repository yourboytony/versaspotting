<template>
  <div class="portfolio">
    <div class="portfolio-header">
      <h1>Our Photographers</h1>
      <p>Meet the talented photographers behind VERSA</p>
    </div>

    <div class="photographers-grid">
      <div v-for="photographer in photographers" :key="photographer.id" 
           class="photographer-card" @click="selectPhotographer(photographer)">
        <div class="photographer-image" :style="getBackgroundStyle(photographer.id)">
          <div class="overlay"></div>
        </div>
        <div class="photographer-info">
          <h2>{{ photographer.name }}</h2>
          <p class="specialty">{{ photographer.specialty }}</p>
          <p class="location">{{ photographer.location }}</p>
          <div class="photographer-stats">
            <span>{{ getPhotoCount(photographer.id) }} photos</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Photographer Modal -->
    <div v-if="selectedPhotographer" class="photographer-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">&times;</button>
        <div class="photographer-header">
          <div class="profile-image-container">
            <img :src="selectedPhotographer.avatar" :alt="selectedPhotographer.name" 
                 class="profile-image" @error="handleImageError">
          </div>
          <div class="photographer-details">
            <h2>{{ selectedPhotographer.name }}</h2>
            <p class="specialty">{{ selectedPhotographer.specialty }}</p>
            <p class="location">{{ selectedPhotographer.location }}</p>
            <p class="bio">{{ selectedPhotographer.bio }}</p>
          </div>
        </div>
        
        <div class="photos-grid">
          <div v-for="photo in photographerPhotos" :key="photo.id" class="photo-card">
            <img :src="photo.imageUrl" :alt="photo.title" @click="openPhoto(photo)" @error="handleImageError">
            <div class="photo-info">
              <h3>{{ photo.title }}</h3>
              <p>{{ photo.description }}</p>
              <div class="photo-meta">
                <span>{{ photo.camera }}</span>
                <span>{{ photo.lens }}</span>
                <span>{{ formatDate(photo.date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Photo Modal -->
    <div v-if="selectedPhoto" class="photo-modal" @click="selectedPhoto = null">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="selectedPhoto = null">&times;</button>
        <img :src="selectedPhoto.imageUrl" :alt="selectedPhoto.title" @error="handleImageError">
        <div class="photo-details">
          <h2>{{ selectedPhoto.title }}</h2>
          <p>{{ selectedPhoto.description }}</p>
          <div class="photo-meta">
            <span>{{ selectedPhoto.camera }}</span>
            <span>{{ selectedPhoto.lens }}</span>
            <span>{{ formatDate(selectedPhoto.date) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { useDataStore } from '../stores/dataStore'

const dataStore = useDataStore()
const selectedPhotographer = ref(null)
const selectedPhoto = ref(null)

const photographers = computed(() => {
  return dataStore.photographers.map(photographer => ({
    ...photographer,
    avatar: parseImageUrl(photographer.avatar)
  }))
})

const photographerPhotos = computed(() => {
  return dataStore.photos
    .filter(photo => photo.photographerId === selectedPhotographer.value?.id)
    .map(photo => ({
      ...photo,
      imageUrl: parseImageUrl(photo.imageUrl)
    }))
})

const getPhotoCount = (photographerId) => {
  return dataStore.photos.filter(photo => photo.photographerId === photographerId).length
}

const getBackgroundStyle = (photographerId) => {
  // Get a random photo from this photographer
  const photographerPhotos = dataStore.photos.filter(photo => photo.photographerId === photographerId)
  
  if (photographerPhotos.length > 0) {
    // Get a random photo
    const randomIndex = Math.floor(Math.random() * photographerPhotos.length)
    const randomPhoto = photographerPhotos[randomIndex]
    return {
      backgroundImage: `url(${parseImageUrl(randomPhoto.imageUrl)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }
  
  // Fallback to a gradient if no photos
  return {
    background: 'linear-gradient(135deg, #1a1a1a, #333333)'
  }
}

const selectPhotographer = (photographer) => {
  selectedPhotographer.value = photographer
}

const closeModal = () => {
  selectedPhotographer.value = null
}

const openPhoto = (photo) => {
  selectedPhoto.value = photo
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const parseImageUrl = (url) => {
  if (!url) return ''
  
  // Handle postimages.org URLs
  if (url.includes('postimages.org')) {
    // Extract the image ID from the URL
    const match = url.match(/\/\/(?:i\.)?postimg\.(?:cc|org)\/([^\/]+)/)
    if (match) {
      return `https://i.postimg.cc/${match[1]}/image.jpg`
    }
  }
  
  // Handle direct image URLs
  if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return url
  }
  
  return url
}

const handleImageError = (event) => {
  const img = event.target
  if (img.classList.contains('profile-image')) {
    img.src = 'https://via.placeholder.com/300x300?text=Profile+Image'
  } else {
    img.src = 'https://via.placeholder.com/600x400?text=Photo+Not+Found'
  }
}

onMounted(() => {
  gsap.from('.photographer-card', {
    scrollTrigger: {
      trigger: '.photographers-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.portfolio {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
}

.portfolio-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  background: rgba(0, 0, 0, 0.8);
  padding: 3rem;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid var(--primary-color);
}

.portfolio-header h1 {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(144, 153, 62, 0.5);
  letter-spacing: -0.5px;
  font-family: 'Montserrat', sans-serif;
}

.portfolio-header p {
  font-size: 1.3rem;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

.photographers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  position: relative;
}

.photographer-card {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid var(--primary-color);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.photographer-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.photographer-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
  background: rgba(0, 0, 0, 0.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7));
  z-index: 1;
}

.photographer-info {
  padding: 1.5rem;
  position: relative;
  z-index: 2;
}

.photographer-info h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.specialty {
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.location {
  color: #cccccc;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.photographer-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #ffffff;
  font-size: 0.9rem;
}

.photographer-modal {
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
  padding: 2rem;
  overflow-y: auto;
}

.modal-content {
  background: rgba(0, 0, 0, 0.95);
  border-radius: 30px;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--primary-color);
  transform: rotate(90deg);
}

.photographer-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-image-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary-color);
  flex-shrink: 0;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photographer-details {
  flex: 1;
}

.photographer-details h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.photographer-details .specialty {
  color: var(--primary-color);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.photographer-details .location {
  color: #cccccc;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.photographer-details .bio {
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.6;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.photo-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  aspect-ratio: 4/3;
}

.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.photo-card:hover img {
  transform: scale(1.1);
}

.photo-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.photo-card:hover .photo-info {
  transform: translateY(0);
}

.photo-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.photo-info p {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.photo-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #cccccc;
}

.photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 2rem;
}

.photo-modal .modal-content {
  max-width: 1000px;
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
}

.photo-modal img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
}

.photo-details {
  background: rgba(0, 0, 0, 0.8);
  padding: 1.5rem;
  border-radius: 0 0 10px 10px;
  margin-top: 1rem;
}

.photo-details h2 {
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.photo-details p {
  color: #cccccc;
  margin-bottom: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .portfolio {
    padding: 2rem 1rem;
  }
  
  .portfolio-header {
    padding: 2rem 1rem;
  }
  
  .portfolio-header h1 {
    font-size: 2.5rem;
  }
  
  .photographer-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-image-container {
    width: 120px;
    height: 120px;
  }
  
  .photographer-details h2 {
    font-size: 2rem;
  }
}
</style> 