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
            <div v-for="photo in recentPhotos.slice(0, 3)" 
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
              <div class="stat-description">Spotting locations around YVR</div>
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
              <p>VERSA Spotting Group is a community of passionate aviation photographers dedicated to capturing the beauty and power of aircraft at Vancouver International Airport (YVR). Our members range from enthusiastic beginners to seasoned professionals, all united by their love for aviation photography.</p>
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">✈️</div>
                  <h3>Aviation Excellence</h3>
                  <p>Access to premium spotting locations and expert guidance</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">📸</div>
                  <h3>Photography Skills</h3>
                  <p>Learn from experienced photographers and improve your craft</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">🤝</div>
                  <h3>Community</h3>
                  <p>Join a supportive network of like-minded enthusiasts</p>
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
const totalPhotos = computed(() => dataStore.photos.length)
const totalPhotographers = computed(() => dataStore.photographers.length)
const totalLocations = ref(8)

// Rotate background images
const rotateBackground = () => {
  if (recentPhotos.value.length > 0) {
    currentBackgroundIndex.value = (currentBackgroundIndex.value + 1) % Math.min(3, recentPhotos.value.length)
  }
}

// Update the initializeAnimations function
const initializeAnimations = () => {
  // Hero animations with staggered reveal
  const heroTimeline = gsap.timeline()
  heroTimeline
    .from('.hero-content .overline', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.hero-content h1', {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out'
    }, '-=0.7')
    .from('.hero-content .hero-description', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.9')
    .from('.hero-buttons .btn', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.7')
    .from('.scroll-indicator', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')

  // Parallax effect for hero background
  gsap.to('.background-image.active', {
    y: '20%',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  })

  // Featured section animations
  gsap.from('.featured .overline, .featured h2', {
    scrollTrigger: {
      trigger: '.featured',
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  })

  gsap.from('.featured-item', {
    scrollTrigger: {
      trigger: '.featured-grid',
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  })

  // Stats section animations with counter effect
  const statsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.stats',
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse'
    }
  })

  statsTimeline
    .from('.stats .overline, .stats h2', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    })
    .from('.stat', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.5')

  // Animate stat numbers
  gsap.utils.toArray('.stat-number').forEach(stat => {
    let endValue = parseInt(stat.textContent)
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      innerText: 0,
      duration: 2,
      snap: { innerText: 1 },
      ease: 'power2.out'
    })
  })

  // About section animations with parallax
  const aboutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.about',
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse'
    }
  })

  aboutTimeline
    .from('.about .overline, .about h2', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    })
    .from('.about-text p', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.feature', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.5')

  gsap.from('.about-image', {
    scrollTrigger: {
      trigger: '.about-image',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1
    },
    y: '10%',
    scale: 0.95,
    opacity: 0.8
  })

  // CTA section animations
  const ctaTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.cta',
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse'
    }
  })

  ctaTimeline
    .from('.cta .overline', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.cta h2', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.cta p', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.7')
    .from('.cta .btn', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.5')
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
  } catch (e) {
    error.value = e.message
  }
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  if (backgroundInterval.value) {
    clearInterval(backgroundInterval.value)
  }
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
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  overflow: hidden;
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
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1.1);
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
  transform: translateY(0);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.featured-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-item:hover img {
  transform: scale(1.1);
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
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 30px 60px rgba(0,0,0,0.15);
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: var(--spacing-xs);
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
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
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
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-shadow: none;
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
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
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
  animation: modalIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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
  opacity: 0.9;
  z-index: 3;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  animation: float 3s ease-in-out infinite;
}

.scroll-line {
  width: 1px;
  height: 32px;
  background: #fff;
  position: relative;
  overflow: hidden;
}

.scroll-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  animation: scroll 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes scroll {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(100%); }
  51% { transform: translateY(-100%); }
  100% { transform: translateY(-100%); }
}

@keyframes float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
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
</style>