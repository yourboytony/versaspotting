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
          <span class="overline">Welcome to</span>
          <h1>VERSA<br>Spotting Group</h1>
          <p class="hero-description">Capturing the extraordinary at Vancouver International Airport. Join our community of passionate aviation photographers.</p>
          <div class="hero-buttons">
            <router-link to="/portfolio" class="btn btn-primary">Explore Gallery</router-link>
            <router-link to="/applications" class="btn btn-outline">Join VERSA</router-link>
          </div>
        </div>
        <div class="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <div class="scroll-line"></div>
        </div>
      </section>

      <!-- Featured Section -->
      <section class="featured">
        <div class="section-content">
          <span class="overline">Featured</span>
          <h2>Latest Captures</h2>
          <div class="featured-grid">
            <div v-for="photo in recentPhotos" 
                 :key="photo.id" 
                 class="featured-item"
                 @click="openPhotoModal(photo)">
              <div class="featured-image">
                <img :src="photo.imageUrl" :alt="photo.title" @error="handleImageError">
                <div class="featured-overlay">
                  <div class="featured-info">
                    <h3>{{ photo.title }}</h3>
                    <p>{{ photo.description }}</p>
                    <span class="photographer">By {{ photo.photographer }}</span>
                    <span class="location">{{ photo.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats">
        <div class="section-content">
          <span class="overline">Our Community</span>
          <h2>VERSA in Numbers</h2>
          <div class="stats-grid">
            <div class="stat">
              <div class="stat-number">{{ totalPhotographers }}</div>
              <div class="stat-label">Photographers</div>
              <div class="stat-description">Active members capturing aviation moments</div>
            </div>
            <div class="stat">
              <div class="stat-number">{{ totalPhotos }}</div>
              <div class="stat-label">Photos</div>
              <div class="stat-description">High-quality aviation photographs</div>
            </div>
            <div class="stat">
              <div class="stat-number">{{ totalLocations }}</div>
              <div class="stat-label">Locations</div>
              <div class="stat-description">Premium spotting locations around YVR</div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="about">
        <div class="section-content">
          <span class="overline">About Us</span>
          <h2>Vancouver's Premier Aviation Photography Community</h2>
          <div class="about-grid">
            <div class="about-text">
              <p>VERSA Spotting Group is Vancouver's leading community of aviation photographers, dedicated to capturing the beauty and power of aircraft at YVR International Airport. Our members range from enthusiastic beginners to seasoned professionals, all united by their passion for aviation photography.</p>
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">📸</div>
                  <h3>Expert Guidance</h3>
                  <p>Learn from experienced aviation photographers</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">🤝</div>
                  <h3>Active Community</h3>
                  <p>Join regular meetups and photography events</p>
                </div>
              </div>
            </div>
            <div class="about-image">
              <img :src="recentPhotos[0]?.imageUrl" alt="Aviation Photography" @error="handleImageError">
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="section-content">
          <span class="overline">Join Us</span>
          <h2>Ready to Start Your Journey?</h2>
          <p>Become part of Vancouver's most passionate aviation photography community. Share your work, learn from others, and capture extraordinary moments.</p>
          <div class="cta-buttons">
            <router-link to="/applications" class="btn btn-primary">Apply Now</router-link>
            <router-link to="/portfolio" class="btn btn-outline">View Gallery</router-link>
          </div>
        </div>
      </section>

      <!-- Photo Modal -->
      <div v-if="selectedPhoto" class="photo-modal" @click="closePhotoModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closePhotoModal">&times;</button>
          <img :src="selectedPhoto.imageUrl" :alt="selectedPhoto.title">
          <div class="modal-info">
            <h3>{{ selectedPhoto.title }}</h3>
            <p>{{ selectedPhoto.description }}</p>
            <div class="modal-meta">
              <span>By {{ selectedPhoto.photographer }}</span>
              <span>{{ formatDate(selectedPhoto.date) }}</span>
            </div>
          </div>
        </div>
      </div>
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

// Format date helper
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Get recent photos with error handling
const recentPhotos = computed(() => {
  const photos = dataStore.photos || []
  return photos
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)
    .map(photo => ({
      ...photo,
      photographer: dataStore.photographers.find(p => p.id === photo.photographerId)?.name || 'Unknown'
    }))
})

// Watch for data initialization
watchEffect(() => {
  if (dataStore.isInitialized) {
    if (recentPhotos.value.length > 0) {
      isLoading.value = false
    } else {
      error.value = 'No photos available'
      isLoading.value = false
    }
  }
})

// Error handling for images
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/800x600?text=Photo+Not+Available'
}

// Stats
const totalPhotos = computed(() => {
  const photos = dataStore.photos || []
  return photos.length
})

const totalPhotographers = computed(() => {
  const photographers = dataStore.photographers || []
  return photographers.length
})

const totalLocations = computed(() => {
  const locations = dataStore.spotterLocations || []
  return locations.length
})

// Rotate background images
const rotateBackground = () => {
  if (recentPhotos.value.length > 0) {
    currentBackgroundIndex.value = (currentBackgroundIndex.value + 1) % Math.min(3, recentPhotos.value.length)
  }
}

// Update the initializeAnimations function
const initializeAnimations = () => {
  // Enhanced hero parallax with depth effect
  gsap.to('.background-image.active', {
    y: '15%',
    scale: 1.1,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  })

  // Floating animation for hero content
  gsap.to('.hero-content', {
    y: '-20px',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2
    }
  })

  // Text reveal animations
  gsap.utils.toArray('h2, .overline').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 65%',
        scrub: 0.5
      },
      y: 20,
      opacity: 0.3,
      duration: 0.5
    })
  })

  // Enhanced section parallax
  gsap.utils.toArray('.featured, .stats, .about').forEach((section, i) => {
    gsap.to(section, {
      backgroundPositionY: '10%',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    // Stagger children animations
    const items = section.querySelectorAll('.featured-item, .stat, .feature')
    gsap.from(items, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    })
  })

  // Stats counter with better easing
  gsap.utils.toArray('.stat-number').forEach(stat => {
    const value = parseInt(stat.textContent)
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 80%'
      },
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: () => {
        stat.textContent = Math.round(gsap.getProperty(stat, 'textContent'))
      }
    })
  })

  // Magnetic effect for buttons
  gsap.utils.toArray('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      gsap.to(btn, {
        x: (x - rect.width / 2) / rect.width * 20,
        y: (y - rect.height / 2) / rect.height * 20,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    })
  })

  // Smooth parallax for about image
  gsap.to('.about-image', {
    y: '20%',
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  })

  // Enhanced CTA section reveal
  gsap.from('.cta', {
    scrollTrigger: {
      trigger: '.cta',
      start: 'top 80%'
    },
    backgroundColor: 'rgba(130, 157, 80, 0)',
    duration: 1,
    ease: 'power2.inOut'
  })
}

// Component lifecycle
onMounted(async () => {
  try {
    await dataStore.initializeData()
    
    if (recentPhotos.value.length > 0) {
      backgroundInterval.value = setInterval(rotateBackground, 5000)
    }
    
    if (!error.value) {
      initializeAnimations()
    }

    // Handle navigation background on scroll
    const handleScroll = () => {
      const nav = document.querySelector('nav')
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled')
        } else {
          nav.classList.remove('scrolled')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
  } catch (e) {
    error.value = e.message
  }
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  if (backgroundInterval.value) {
    clearInterval(backgroundInterval.value)
  }
  // Remove scroll listener
  window.removeEventListener('scroll', handleScroll)
})

// Modal handlers
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
/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Variables */
:root {
  --primary: #829d50;
  --primary-light: #a3b97a;
  --primary-dark: #6a823f;
  --text: #1d1d1f;
  --text-secondary: #86868b;
  --background: #ffffff;
  --section-bg: #f5f5f7;
  --card-bg: #ffffff;
  --border-radius: 14px;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 8rem;
}

/* Global Styles */
.home {
  margin: 0;
  padding: 0;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.overline {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--primary);
  margin-bottom: var(--spacing-sm);
}

h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  color: var(--text);
}

/* Hero Section */
.hero {
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  overflow: hidden;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  right: 0;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.background-slider {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
}

.background-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1.1);
  margin: 0;
  padding: 0;
}

.background-image.active {
  opacity: 1;
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  text-align: center;
  animation: modalIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-content h1 {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 800;
  line-height: 1;
  margin: var(--spacing-sm) 0;
  letter-spacing: -0.02em;
  background: linear-gradient(120deg, #ffffff 0%, rgba(255,255,255,0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 100%;
  animation: shine 3s linear infinite;
}

.hero-description {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  max-width: 600px;
  margin: 0 auto var(--spacing-lg);
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-bottom: var(--spacing-xl);
  position: relative;
  z-index: 3;
  opacity: 1 !important;
}

/* Featured Section */
.featured {
  padding: var(--spacing-xl) 0;
  background: var(--section-bg);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.featured-item {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  transform: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.featured-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.featured-image {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-item:hover img {
  transform: translateZ(20px);
}

.featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: flex-end;
  padding: var(--spacing-md);
  color: #fff;
}

.featured-item:hover .featured-overlay {
  opacity: 1;
}

.featured-info h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xs);
}

.featured-info p {
  font-size: 1rem;
  margin-bottom: var(--spacing-xs);
  opacity: 0.9;
}

.photographer {
  font-size: 0.875rem;
  opacity: 0.7;
}

.featured-info .location {
  font-size: 0.875rem;
  opacity: 0.7;
  display: block;
  margin-top: 0.25rem;
}

/* Stats Section */
.stats {
  padding: var(--spacing-xl) 0;
  background: var(--background);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.stat {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat:hover {
  transform: translateY(-5px) scale(1.02);
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: var(--spacing-xs);
  background: linear-gradient(45deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradient 5s ease infinite;
}

.stat-label {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.stat-description {
  font-size: 1rem;
  color: var(--text-secondary);
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* About Section */
.about {
  padding: var(--spacing-xl) 0;
  background: var(--section-bg);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  align-items: center;
}

.about-text {
  font-size: 1.125rem;
  line-height: 1.6;
}

.about-text p {
  margin-bottom: var(--spacing-lg);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.feature {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--card-bg);
  border-radius: var(--border-radius);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature:hover .feature-icon {
  transform: scale(1.2) rotate(5deg);
}

.feature h3 {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-xs);
  color: var(--primary);
}

.feature p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
}

.about-image {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  aspect-ratio: 4/3;
}

.about-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* CTA Section */
.cta {
  padding: var(--spacing-xl) 0;
  background: var(--primary);
  color: #fff;
  text-align: center;
}

.cta h2 {
  color: #fff;
}

.cta p {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto var(--spacing-lg);
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 50px;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  text-shadow: none;
  opacity: 1 !important;
  transform: none !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
  border: 2px solid var(--primary);
}

.btn-outline {
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.btn:hover {
  transform: translateY(-2px) scale(1.02) !important;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.btn-primary:hover {
  background: var(--primary-dark);
  border-color: var(--primary-dark);
}

.btn-outline:hover {
  background: rgba(255,255,255,0.1);
}

/* Photo Modal */
.photo-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-md);
}

.modal-content {
  position: relative;
  max-width: 1200px;
  width: 90%;
  background: var(--card-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  animation: modalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}

.modal-close {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: rgba(0,0,0,0.8);
}

.modal-content img {
  width: 100%;
  height: auto;
  display: block;
}

.modal-info {
  padding: var(--spacing-md);
}

.modal-info h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xs);
}

.modal-info p {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-sm);
  color: var(--text-secondary);
}

.modal-meta {
  display: flex;
  gap: var(--spacing-md);
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Loading State */
.loading-state {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--primary-light);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-md);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-state {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background);
  padding: var(--spacing-md);
  text-align: center;
}

.error-state h2 {
  color: var(--primary);
  margin-bottom: var(--spacing-sm);
}

.error-state p {
  margin-bottom: var(--spacing-md);
  max-width: 600px;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  z-index: 3;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  opacity: 0.7;
  animation: float 3s ease-in-out infinite;
}

.scroll-indicator::after {
  content: '';
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
  opacity: 0.5;
  animation: pulseAndFloat 2s infinite;
}

@keyframes float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

@keyframes pulseAndFloat {
  0% { transform: translateX(-50%) scale(1) translateY(0); opacity: 0.5; }
  50% { transform: translateX(-50%) scale(1.5) translateY(-5px); opacity: 0.2; }
  100% { transform: translateX(-50%) scale(1) translateY(0); opacity: 0.5; }
}

/* Add shimmer effect to featured images */
.featured-image::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  20%, 100% { transform: translateX(100%); }
}

/* Enhanced Animations */
.featured-item {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.featured-image {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-item:hover .featured-image {
  transform: translateZ(20px);
}

.stat {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat:hover {
  transform: translateY(-5px) scale(1.02);
}

.stat-number {
  background: linear-gradient(45deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.feature {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.feature-icon {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature:hover .feature-icon {
  transform: scale(1.2) rotate(5deg);
}

.btn {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.btn:hover {
  transform: translateY(-2px) scale(1.02) !important;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.hero-content h1 {
  background: linear-gradient(120deg, #ffffff 0%, rgba(255,255,255,0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 100%;
  animation: shine 3s linear infinite;
}

@keyframes shine {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.modal-content {
  transform-origin: center;
  animation: modalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalPop {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  
  .about-image {
    order: -1;
  }
}

@media (max-width: 768px) {
  :root {
    --spacing-xl: 4rem;
    --spacing-lg: 2rem;
  }
  
  .hero-buttons,
  .cta-buttons {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
}

/* Navigation styles to prevent spacing issues */
:deep(nav) {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: background-color 0.3s ease;
}

:deep(nav.scrolled) {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
}
</style>