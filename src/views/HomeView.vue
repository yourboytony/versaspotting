<template>
  <div class="home">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading VERSA Spotting Group...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <h2>Oops! Something went wrong</h2>
      <p>{{ error }}</p>
      <button @click="retryInitialization" class="btn">Retry</button>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-background">
          <div class="background-slider">
            <div v-for="(photo, index) in recentPhotos.slice(0, 3)" 
                 :key="photo.id" 
                 class="background-image"
                 :class="{ active: currentBackgroundIndex === index }"
                 :style="{ backgroundImage: `url(${photo.imageUrl})` }">
            </div>
          </div>
          <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
          <h1>VERSA<br>Spotting Group</h1>
          <p>Vancouver's Premier Aviation Photography Community</p>
          <div class="hero-buttons">
            <router-link to="/portfolio" class="btn">View Gallery</router-link>
            <router-link to="/applications" class="btn btn-outline">Join Us</router-link>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats">
        <div class="stats-container">
          <div class="stat">
            <span class="number">{{ totalPhotographers }}</span>
            <span class="label">Members</span>
          </div>
          <div class="stat">
            <span class="number">{{ totalPhotos }}</span>
            <span class="label">Photos</span>
          </div>
          <div class="stat">
            <span class="number">{{ totalLocations }}</span>
            <span class="label">Locations</span>
          </div>
        </div>
      </section>

      <!-- Gallery Section -->
      <section class="gallery">
        <h2>Recent Captures</h2>
        <div class="gallery-grid">
          <div v-for="photo in recentPhotos.slice(0, 6)" 
               :key="photo.id" 
               class="gallery-item"
               @click="openPhotoModal(photo)">
            <img :src="photo.imageUrl" :alt="photo.title" @error="handleImageError">
            <div class="gallery-info">
              <h3>{{ photo.title }}</h3>
              <p>By {{ photo.photographer }}</p>
            </div>
          </div>
        </div>
        <router-link to="/portfolio" class="btn">View All Photos</router-link>
      </section>

      <!-- About Section -->
      <section class="about">
        <div class="about-content">
          <h2>About VERSA</h2>
          <p>We are a community of aviation enthusiasts and photographers based in Vancouver, Canada. Our mission is to capture and share the beauty of aviation through our lenses.</p>
          <div class="features">
            <div class="feature">
              <div class="feature-icon">✈️</div>
              <h3>Aviation Focus</h3>
              <p>Dedicated to capturing aircraft at their best moments</p>
            </div>
            <div class="feature">
              <div class="feature-icon">📸</div>
              <h3>Photography Excellence</h3>
              <p>Committed to producing high-quality aviation photography</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🤝</div>
              <h3>Community Driven</h3>
              <p>Supporting and inspiring fellow aviation photographers</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="cta-content">
          <h2>Ready to Join VERSA?</h2>
          <p>Start your journey with us today and become part of Vancouver's premier aviation photography community.</p>
          <router-link to="/applications" class="btn">Apply Now</router-link>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useDataStore } from '../stores/dataStore'

gsap.registerPlugin(ScrollTrigger)

const dataStore = useDataStore()
const selectedPhoto = ref(null)
const isLoading = ref(true)
const currentBackgroundIndex = ref(0)
const backgroundInterval = ref(null)
const error = ref(null)

console.log('Initial dataStore state:', {
  photos: dataStore.photos,
  photographers: dataStore.photographers,
  isInitialized: dataStore.isInitialized,
  isLoading: dataStore.isLoading
})

// Get recent photos with error handling
const recentPhotos = computed(() => {
  console.log('Computing recentPhotos, current photos:', dataStore.photos)
  const photos = dataStore.photos || []
  const sorted = photos
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)
    .map(photo => ({
      ...photo,
      photographer: dataStore.photographers.find(p => p.id === photo.photographerId)?.name || 'Unknown'
    }))
  console.log('Computed recentPhotos:', sorted)
  return sorted
})

// Watch for data initialization and loading state
watchEffect(() => {
  console.log('watchEffect triggered:', {
    isInitialized: dataStore.isInitialized,
    photosLength: recentPhotos.value.length,
    isLoading: isLoading.value
  })
  
  if (dataStore.isInitialized) {
    if (recentPhotos.value.length > 0) {
      isLoading.value = false
      console.log('Data loaded successfully')
    } else {
      error.value = 'No photos available'
      isLoading.value = false
      console.log('No photos available')
    }
  }
})

// Error handling for images
const handleImageError = (event) => {
  console.log('Image load error, using fallback')
  event.target.src = 'https://via.placeholder.com/400x300?text=Photo+Not+Available'
}

// Stats
const totalPhotos = computed(() => {
  console.log('Computing totalPhotos:', dataStore.photos.length)
  return dataStore.photos.length
})

const totalPhotographers = computed(() => {
  console.log('Computing totalPhotographers:', dataStore.photographers.length)
  return dataStore.photographers.length
})

const totalLocations = ref(8)

// Rotate background images
const rotateBackground = () => {
  if (recentPhotos.value.length > 0) {
    currentBackgroundIndex.value = (currentBackgroundIndex.value + 1) % Math.min(3, recentPhotos.value.length)
    console.log('Rotating background to index:', currentBackgroundIndex.value)
  }
}

// Retry initialization
const retryInitialization = async () => {
  console.log('Retrying initialization')
  isLoading.value = true
  error.value = null
  try {
    await dataStore.initializeData()
  } catch (e) {
    console.error('Retry failed:', e)
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

// Initialize data on component mount
onMounted(async () => {
  console.log('Component mounted, initializing data')
  try {
    await dataStore.initializeData()
    console.log('Data initialized:', {
      photos: dataStore.photos,
      photographers: dataStore.photographers
    })
    
    // Start background rotation if we have photos
    if (recentPhotos.value.length > 0) {
      console.log('Starting background rotation')
      backgroundInterval.value = setInterval(rotateBackground, 5000)
    }
    
    // Initialize animations
    if (!error.value) {
      console.log('Initializing animations')
      initializeAnimations()
    }
  } catch (e) {
    console.error('Initialization failed:', e)
    error.value = e.message
  }
})

// Initialize animations
const initializeAnimations = () => {
  console.log('Setting up animations')
  // Hero animations
  gsap.from('.hero-content', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
  })
  
  // Stats animations
  gsap.timeline({
    scrollTrigger: {
      trigger: '.stats',
      start: 'top center',
      end: 'bottom center',
      scrub: 1
    }
  })
  .from('.stat', {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1
  })
  
  // Gallery animations
  gsap.timeline({
    scrollTrigger: {
      trigger: '.gallery',
      start: 'top center',
      end: 'bottom center',
      scrub: 1
    }
  })
  .from('.gallery h2', {
    y: 50,
    opacity: 0,
    duration: 1
  })
  .from('.gallery-item', {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1
  }, '-=0.5')
  
  // About animations
  gsap.timeline({
    scrollTrigger: {
      trigger: '.about',
      start: 'top center',
      end: 'bottom center',
      scrub: 1
    }
  })
  .from('.about-content', {
    y: 50,
    opacity: 0,
    duration: 1
  })
  .from('.feature', {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1
  }, '-=0.5')
  
  // CTA animations
  gsap.timeline({
    scrollTrigger: {
      trigger: '.cta',
      start: 'top center',
      end: 'bottom center',
      scrub: 1
    }
  })
  .from('.cta-content', {
    scale: 0.8,
    opacity: 0,
    duration: 1
  })
}

onUnmounted(() => {
  console.log('Component unmounting, cleaning up')
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  if (backgroundInterval.value) {
    clearInterval(backgroundInterval.value)
  }
})

const openPhotoModal = (photo) => {
  selectedPhoto.value = photo
  document.body.style.overflow = 'hidden'
}

const closePhotoModal = () => {
  selectedPhoto.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
:root {
  --primary: #829d50;
  --primary-light: #a3b97a;
  --primary-dark: #6a823f;
  --text: #333333;
  --background: #ffffff;
  --card-bg: #f5f7f0;
}

.home {
  min-height: 100vh;
  background: var(--background);
  color: var(--text);
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.background-slider {
  position: absolute;
  inset: 0;
}

.background-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
}

.background-image.active {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
  text-align: center;
}

.hero-content h1 {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  letter-spacing: -2px;
  text-shadow: 0 0 20px rgba(130, 157, 80, 0.5);
}

.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  font-weight: 500;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.btn {
  display: inline-block;
  padding: 1.2rem 3rem;
  background: var(--primary);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(130, 157, 80, 0.4);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary);
}

.btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(130, 157, 80, 0.4);
}

.btn-outline:hover {
  background: var(--primary);
}

/* Stats Section */
.stats {
  padding: 4rem 2rem;
  background: var(--card-bg);
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stat {
  text-align: center;
  padding: 2rem;
  background: var(--background);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.stat:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(130, 157, 80, 0.2);
}

.stat .number {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat .label {
  font-size: 1.2rem;
  color: var(--text);
  font-weight: 500;
}

/* Gallery Section */
.gallery {
  padding: 8rem 2rem;
  text-align: center;
}

.gallery h2 {
  font-size: 3rem;
  color: var(--primary);
  margin-bottom: 3rem;
  font-weight: 700;
}

.gallery-grid {
  max-width: 1200px;
  margin: 0 auto 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.gallery-item {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  aspect-ratio: 4/3;
}

.gallery-item:hover {
  transform: translateY(-10px);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-info {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-info {
  opacity: 1;
}

.gallery-info h3 {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.gallery-info p {
  color: rgba(255,255,255,0.8);
  font-size: 1rem;
}

/* About Section */
.about {
  padding: 8rem 2rem;
  background: var(--card-bg);
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.about-content h2 {
  font-size: 3rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.about-content p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 2rem;
  background: var(--background);
  border-radius: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(130, 157, 80, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.5rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.feature p {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* CTA Section */
.cta {
  padding: 8rem 2rem;
  background: var(--primary);
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta h2 {
  font-size: 3rem;
  color: #fff;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.cta p {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta .btn {
  background: #fff;
  color: var(--primary);
}

.cta .btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255,255,255,0.2);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-content h1 {
    font-size: 4rem;
  }
  
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 3rem;
  }
  
  .hero-content p {
    font-size: 1.2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
  
  .stats,
  .gallery,
  .about,
  .cta {
    padding: 4rem 1rem;
  }
}

/* Loading State */
.loading-state {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background);
  color: var(--text);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--primary-light);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  font-size: 1.2rem;
  color: var(--primary);
}

/* Error State */
.error-state {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background);
  color: var(--text);
  padding: 2rem;
  text-align: center;
}

.error-state h2 {
  font-size: 2rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.error-state p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
}
</style>