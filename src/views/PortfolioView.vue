<template>
  <div class="portfolio-container">
    <div class="portfolio-header">
      <h1>Photographer Portfolios</h1>
      <div class="filters">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search photographers..."
            @input="filterPhotographers"
          >
          <i class="icon-search"></i>
        </div>
        <div class="view-options">
          <button 
            :class="['view-btn', { active: viewMode === 'grid' }]"
            @click="viewMode = 'grid'"
          >
            <i class="icon-grid"></i>
          </button>
          <button 
            :class="['view-btn', { active: viewMode === 'list' }]"
            @click="viewMode = 'list'"
          >
            <i class="icon-list"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="photographers-grid" :class="viewMode">
      <router-link 
        v-for="photographer in filteredPhotographers" 
        :key="photographer.id"
        :to="'/portfolio/' + photographer.id"
        class="photographer-card"
      >
        <div class="photographer-image" :style="getBackgroundStyle(photographer.id)">
          <div class="overlay"></div>
          <div class="photographer-info">
            <div class="profile-image">
              <img :src="photographer.avatar" :alt="photographer.name" @error="handleImageError">
            </div>
            <h2>{{ photographer.name }}</h2>
            <p class="specialty">{{ photographer.specialty }}</p>
            <div class="stats">
              <span><i class="icon-photos"></i> {{ getPhotoCount(photographer.id) }} Photos</span>
              <span><i class="icon-location"></i> {{ photographer.location }}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '../stores/dataStore'
import gsap from 'gsap'

const dataStore = useDataStore()
const searchQuery = ref('')
const viewMode = ref('grid')

// Get filtered photographers based on search query
const filteredPhotographers = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return dataStore.photographers.filter(photographer => 
    photographer.name.toLowerCase().includes(query) ||
    photographer.specialty.toLowerCase().includes(query) ||
    photographer.location.toLowerCase().includes(query)
  )
})

// Get background style for photographer card
const getBackgroundStyle = (photographerId) => {
  const photos = dataStore.photos.filter(photo => photo.photographerId === photographerId)
  if (photos.length > 0) {
    // Get a random photo
    const randomIndex = Math.floor(Math.random() * photos.length)
    const randomPhoto = photos[randomIndex]
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

// Get photo count for a photographer
const getPhotoCount = (photographerId) => {
  return dataStore.photos.filter(photo => photo.photographerId === photographerId).length
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
  // Animation for photographer cards
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
.portfolio-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.portfolio-header {
  margin-bottom: 3rem;
  text-align: center;
}

.portfolio-header h1 {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  width: 300px;
}

.search-box input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid var(--border-color);
  border-radius: 50px;
  font-size: 1rem;
  background: var(--card-background);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

.view-options {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--card-background);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.photographers-grid {
  display: grid;
  gap: 2rem;
}

.photographers-grid.grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.photographers-grid.list {
  grid-template-columns: 1fr;
}

.photographer-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 3/4;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.photographer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.photographer-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
}

.photographer-card:hover .photographer-image {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8));
  z-index: 1;
}

.photographer-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  color: white;
  z-index: 2;
  text-align: center;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid var(--primary-color);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photographer-info h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.specialty {
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.stats span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .portfolio-container {
    padding: 1rem;
  }
  
  .portfolio-header h1 {
    font-size: 2.5rem;
  }
  
  .filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-box {
    width: 100%;
  }
  
  .photographers-grid.grid {
    grid-template-columns: 1fr;
  }
  
  .profile-image {
    width: 80px;
    height: 80px;
  }
  
  .photographer-info h2 {
    font-size: 1.5rem;
  }
  
  .specialty {
    font-size: 1rem;
  }
  
  .stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style> 