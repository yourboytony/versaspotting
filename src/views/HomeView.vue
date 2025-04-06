<template>
  <div class="home">
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
        <div class="hero-text">
          <h1>VERSA<br>Spotting Group</h1>
          <p>Vancouver's Premier Aviation Photography Community</p>
          <div class="hero-cta">
            <router-link to="/portfolio" class="btn-primary">View Gallery</router-link>
            <router-link to="/applications" class="btn-secondary">Join Us</router-link>
          </div>
        </div>
        <div class="scroll-hint">
          <span>Scroll to explore</span>
          <div class="scroll-line"></div>
        </div>
      </div>
    </section>

    <!-- Featured Section -->
    <section class="featured">
      <div class="featured-grid">
        <div class="featured-text">
          <h2>Capture the<br>Extraordinary</h2>
          <p>Join a community of passionate aviation photographers capturing the beauty of flight at YVR.</p>
          <div class="stats">
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
        </div>
        <div class="featured-image">
          <img :src="recentPhotos[0]?.imageUrl" alt="Featured Photo" @error="handleImageError">
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery">
      <h2>Recent Captures</h2>
      <div class="gallery-grid">
        <div v-for="photo in recentPhotos.slice(1, 7)" 
             :key="photo.id" 
             class="gallery-item"
             @click="openPhotoModal(photo)">
          <div class="gallery-image">
            <img :src="photo.imageUrl" :alt="photo.title" @error="handleImageError">
          </div>
          <div class="gallery-info">
            <h3>{{ photo.title }}</h3>
            <p>By {{ photo.photographer }}</p>
          </div>
        </div>
      </div>
      <router-link to="/portfolio" class="btn-primary">View All Photos</router-link>
    </section>

    <!-- About Section -->
    <section class="about">
      <div class="about-content">
        <div class="about-text">
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
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="cta-content">
        <h2>Ready to Join VERSA?</h2>
        <p>Start your journey with us today and become part of Vancouver's premier aviation photography community.</p>
        <router-link to="/applications" class="btn-primary">Apply Now</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useDataStore } from '../stores/dataStore'

gsap.registerPlugin(ScrollTrigger)

const dataStore = useDataStore()
const selectedPhoto = ref(null)
const isLoading = ref(true)
const currentBackgroundIndex = ref(0)
const backgroundInterval = ref(null)

// Get recent photos with error handling
const recentPhotos = computed(() => {
  const photos = dataStore.photos || []
  return photos
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7)
    .map(photo => ({
      ...photo,
      photographer: dataStore.photographers.find(p => p.id === photo.photographerId)?.name || 'Unknown'
    }))
})

// Watch for data initialization
watchEffect(() => {
  if (dataStore.isInitialized && recentPhotos.value.length > 0) {
    isLoading.value = false
  }
})

// Error handling for images
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300?text=Photo+Not+Available'
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

onMounted(async () => {
  if (!dataStore.isInitialized) {
    await dataStore.initializeData()
  }
  
  // Start background rotation
  if (recentPhotos.value.length > 0) {
    backgroundInterval.value = setInterval(rotateBackground, 5000)
  }
  
  // Hero animations
  gsap.from('.hero-text', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
  })
  
  // Featured section animations
  gsap.timeline({
    scrollTrigger: {
      trigger: '.featured',
      start: 'top center',
      end: 'bottom center',
      scrub: 1
    }
  })
  .from('.featured-text', {
    x: -100,
    opacity: 0,
    duration: 1
  })
  .from('.featured-image', {
    x: 100,
    opacity: 0,
    duration: 1
  }, '-=0.5')
  
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
  
  // About section animations
  gsap.timeline({
    scrollTrigger: {
      trigger: '.about',
      start: 'top center',
      end: 'bottom center',
      scrub: 1
    }
  })
  .from('.about-text', {
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
})

onUnmounted(() => {
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
  max-width: 1400px;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.hero-text {
  text-align: center;
  margin-bottom: 4rem;
}

.hero-text h1 {
  font-size: 6rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  letter-spacing: -2px;
  text-shadow: 0 0 20px rgba(130, 157, 80, 0.5);
}

.hero-text p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  font-weight: 500;
}

.hero-cta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.btn-primary {
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

.btn-secondary {
  display: inline-block;
  padding: 1.2rem 3rem;
  background: transparent;
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  border: 2px solid var(--primary);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(130, 157, 80, 0.4);
}

.btn-secondary:hover {
  background: var(--primary);
  transform: translateY(-5px);
}

.scroll-hint {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  opacity: 0.8;
}

.scroll-hint span {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.scroll-line {
  width: 2px;
  height: 50px;
  background: #fff;
  position: relative;
}

.scroll-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* Featured Section */
.featured {
  padding: 8rem 2rem;
  background: var(--card-bg);
}

.featured-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.featured-text h2 {
  font-size: 4rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -1px;
}

.featured-text p {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stat {
  text-align: center;
}

.stat .number {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat .label {
  font-size: 1rem;
  color: var(--text);
  font-weight: 500;
}

.featured-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  max-width: 1400px;
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
}

.gallery-item:hover {
  transform: translateY(-10px);
}

.gallery-image {
  aspect-ratio: 4/3;
  overflow: hidden;
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image img {
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
  max-width: 1400px;
  margin: 0 auto;
}

.about-text {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-text h2 {
  font-size: 3rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.about-text p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 4rem;
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
}

.feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
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

.cta .btn-primary {
  background: #fff;
  color: var(--primary);
}

.cta .btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255,255,255,0.2);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-text h1 {
    font-size: 5rem;
  }
  
  .featured-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .featured-text {
    text-align: center;
  }
  
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-text h1 {
    font-size: 3.5rem;
  }
  
  .hero-text p {
    font-size: 1.2rem;
  }
  
  .hero-cta {
    flex-direction: column;
  }
  
  .stats {
    grid-template-columns: 1fr;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
  
  .featured,
  .gallery,
  .about,
  .cta {
    padding: 4rem 1rem;
  }
}
</style>