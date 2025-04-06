<template>
  <div class="photographer-portfolio">
    <div class="photographer-header" :style="getBackgroundStyle">
      <div class="overlay"></div>
      <div class="profile-section">
        <div class="profile-image">
          <img :src="photographer.avatar" :alt="photographer.name" @error="handleImageError">
        </div>
        <div class="profile-info">
          <h1>{{ photographer.name }}</h1>
          <p class="specialty">{{ photographer.specialty }}</p>
          <div class="stats">
            <div class="stat-item">
              <i class="icon-photos"></i>
              <span>{{ photographerPhotos.length }} Photos</span>
            </div>
            <div class="stat-item">
              <i class="icon-location"></i>
              <span>{{ photographer.location }}</span>
            </div>
            <div class="stat-item">
              <i class="icon-calendar"></i>
              <span>Member since {{ formatDate(photographer.joinDate) }}</span>
            </div>
          </div>
          <p class="bio">{{ photographer.bio }}</p>
        </div>
      </div>
    </div>

    <div class="photos-grid">
      <div v-for="photo in photographerPhotos" :key="photo.id" 
           class="photo-card" @click="openLightbox(photo)">
        <img :src="photo.imageUrl" :alt="photo.title" @error="handleImageError">
        <div class="photo-info">
          <h3>{{ photo.title }}</h3>
          <p>{{ formatDate(photo.date) }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="selectedPhoto" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="close-btn" @click="closeLightbox">&times;</button>
        <img :src="selectedPhoto.imageUrl" :alt="selectedPhoto.title" @error="handleImageError">
        <div class="lightbox-info">
          <h2>{{ selectedPhoto.title }}</h2>
          <p>{{ selectedPhoto.description }}</p>
          <div class="photo-meta">
            <span><i class="icon-camera"></i> {{ selectedPhoto.camera }}</span>
            <span><i class="icon-lens"></i> {{ selectedPhoto.lens }}</span>
            <span><i class="icon-calendar"></i> {{ formatDate(selectedPhoto.date) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '../stores/dataStore'
import gsap from 'gsap'

const route = useRoute()
const dataStore = useDataStore()
const selectedPhoto = ref(null)

// Get photographer ID from route params
const photographerId = computed(() => route.params.id)

// Get photographer data
const photographer = computed(() => {
  const found = dataStore.photographers.find(p => p.id === photographerId.value)
  if (!found) return {
    id: '',
    name: 'Photographer Not Found',
    specialty: '',
    location: '',
    photoCount: 0,
    joinDate: '',
    avatar: '',
    bio: ''
  }
  
  return {
    ...found,
    avatar: parseImageUrl(found.avatar)
  }
})

// Get photographer's photos
const photographerPhotos = computed(() => {
  return dataStore.photos
    .filter(photo => photo.photographerId === photographerId.value)
    .map(photo => ({
      ...photo,
      imageUrl: parseImageUrl(photo.imageUrl)
    }))
})

// Get background style for header
const getBackgroundStyle = computed(() => {
  if (photographerPhotos.value.length > 0) {
    // Get a random photo
    const randomIndex = Math.floor(Math.random() * photographerPhotos.value.length)
    const randomPhoto = photographerPhotos.value[randomIndex]
    return {
      backgroundImage: `url(${randomPhoto.imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }
  
  // Fallback to a gradient if no photos
  return {
    background: 'linear-gradient(135deg, #1a1a1a, #333333)'
  }
})

const openLightbox = (photo) => {
  selectedPhoto.value = photo
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedPhoto.value = null
  document.body.style.overflow = 'auto'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
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
  // Animation for photos grid
  gsap.from('.photo-card', {
    scrollTrigger: {
      trigger: '.photos-grid',
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
.photographer-portfolio {
  padding: 0;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
}

.photographer-header {
  position: relative;
  padding: 6rem 2rem 4rem;
  margin-bottom: 4rem;
  color: white;
  text-align: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8));
  z-index: 1;
}

.profile-section {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.profile-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--primary-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  text-align: center;
}

.profile-info h1 {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.specialty {
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: 1.1rem;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.bio {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ffffff;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem 4rem;
}

.photo-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  aspect-ratio: 4/3;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
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
  color: #cccccc;
}

.lightbox {
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
}

.lightbox-content {
  max-width: 1200px;
  width: 100%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
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

.lightbox-content img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
}

.lightbox-info {
  background: rgba(0, 0, 0, 0.8);
  padding: 1.5rem;
  border-radius: 0 0 10px 10px;
  margin-top: 1rem;
}

.lightbox-info h2 {
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.lightbox-info p {
  color: #cccccc;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.photo-meta {
  display: flex;
  gap: 1.5rem;
  color: #cccccc;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .photographer-header {
    padding: 4rem 1rem 3rem;
  }
  
  .profile-image {
    width: 150px;
    height: 150px;
  }
  
  .profile-info h1 {
    font-size: 2.5rem;
  }
  
  .specialty {
    font-size: 1.2rem;
  }
  
  .stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .photos-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem 3rem;
  }
}
</style> 