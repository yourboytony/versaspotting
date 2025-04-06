<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">VERSA Spotting Group</h1>
        <p class="hero-subtitle">Where Aviation Meets Artistry</p>
        <div class="hero-buttons">
          <router-link to="/portfolio" class="button primary">View Portfolios</router-link>
          <router-link to="/applications" class="button secondary">Join Us</router-link>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Scroll to explore</span>
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- Recent Uploads -->
    <section class="recent-uploads">
      <div class="section-header">
        <h2>Recent Uploads</h2>
        <p>Discover our latest captures</p>
      </div>
      <div class="photos-grid">
        <div v-for="photo in recentPhotos" 
             :key="photo.id" 
             class="photo-card"
             @click="openPhotoModal(photo)">
          <img :src="photo.imageUrl" 
               :alt="photo.title"
               @error="handleImageError">
          <div class="photo-info">
            <h3>{{ photo.title }}</h3>
            <p>By {{ photo.photographer }}</p>
          </div>
        </div>
      </div>
      <div class="view-all">
        <router-link to="/portfolio" class="button primary">View All Photos</router-link>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <div class="about-content">
        <div class="about-text">
          <h2>About VERSA</h2>
          <p>Vancouver's Premier Aviation Photography Community</p>
          <div class="about-description">
            <p>VERSA Spotting Group is a community of aviation enthusiasts and photographers based in Vancouver, Canada. We are dedicated to capturing and sharing the beauty of aviation through our lenses.</p>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <span class="stat-value">{{ totalPhotographers }}</span>
            <span class="stat-label">Members</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ totalPhotos }}</span>
            <span class="stat-label">Photos</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ totalLocations }}</span>
            <span class="stat-label">Locations</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="section-header">
        <h2>Why Join VERSA</h2>
        <p>Experience the difference</p>
      </div>
      <div class="features-grid">
        <div class="feature">
          <div class="feature-icon">
            <i class="fas fa-camera"></i>
          </div>
          <h3>Photographic Excellence</h3>
          <p>Our photographers are committed to capturing the perfect shot, whether it's a commercial airliner or a private jet.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">
            <i class="fas fa-users"></i>
          </div>
          <h3>Community Focus</h3>
          <p>We believe in building a strong community of aviation enthusiasts and photographers who support and inspire each other.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <h3>YVR-Based</h3>
          <p>Located at Vancouver International Airport, we have prime access to some of the most beautiful aircraft in the world.</p>
        </div>
      </div>
    </section>

    <!-- Announcements -->
    <section class="announcements">
      <div class="section-header">
        <h2>Latest Announcements</h2>
        <p>Stay updated with our latest news and events</p>
      </div>
      <div class="announcements-grid">
        <div v-for="announcement in announcements" 
             :key="announcement.id" 
             class="announcement">
          <div class="announcement-date">{{ formatDate(announcement.date) }}</div>
          <h3>{{ announcement.title }}</h3>
          <p>{{ announcement.content }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="cta-content">
        <h2>Ready to Join VERSA?</h2>
        <p>Start your journey with us today and become part of Vancouver's premier aviation photography community</p>
        <router-link to="/applications" class="button primary">Apply Now</router-link>
      </div>
    </section>
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
  if (dataStore.isInitialized && recentPhotos.value.length > 0) {
    isLoading.value = false
  }
})

// Error handling for images
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300?text=Photo+Not+Available'
}

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Stats
const totalPhotos = computed(() => dataStore.photos.length)
const totalPhotographers = computed(() => dataStore.photographers.length)
const totalLocations = ref(8)

onMounted(async () => {
  if (!dataStore.isInitialized) {
    await dataStore.initializeData()
  }
  
  // Hero section animations
  gsap.from('.hero-title', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
  })
  
  gsap.from('.hero-subtitle', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 1
  })
  
  gsap.from('.hero-buttons', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 1.5
  })
  
  // Recent Uploads section
  gsap.timeline({
    scrollTrigger: {
      trigger: '.recent-uploads',
      start: 'top center',
      end: 'bottom center',
      scrub: 1
    }
  })
  .from('.recent-uploads .section-header', {
    y: 100,
    opacity: 0,
    duration: 1
  })
  .from('.photo-card', {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'back.out(1.7)'
  }, '-=0.5')
  
  // About section
  gsap.timeline({
    scrollTrigger: {
      trigger: '.about',
      start: 'top center',
      end: 'bottom center',
      scrub: 1
    }
  })
  .from('.about-text', {
    x: -100,
    opacity: 0,
    duration: 1
  })
  .from('.stat', {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1
  }, '-=0.5')
  
  // Features section
  gsap.timeline({
    scrollTrigger: {
      trigger: '.features',
      start: 'top center',
      end: 'bottom center',
      scrub: 1
    }
  })
  .from('.features .section-header', {
    y: 100,
    opacity: 0,
    duration: 1
  })
  .from('.feature', {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'back.out(1.7)'
  }, '-=0.5')
  
  // Announcements section
  gsap.timeline({
    scrollTrigger: {
      trigger: '.announcements',
      start: 'top center',
      end: 'bottom center',
      scrub: 1
    }
  })
  .from('.announcements .section-header', {
    y: 100,
    opacity: 0,
    duration: 1
  })
  .from('.announcement', {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'back.out(1.7)'
  }, '-=0.5')
  
  // CTA section
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
    duration: 1,
    ease: 'elastic.out(1, 0.5)'
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
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
  --primary-color: #829d50;
  --primary-light: #a3b97a;
  --primary-dark: #6a823f;
  --background-color: #ffffff;
  --text-color: #333333;
  --card-background: #f5f7f0;
  --border-color: rgba(130, 157, 80, 0.2);
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
}

.home {
  min-height: 100vh;
  overflow-x: hidden;
  background: var(--background-color);
  color: var(--text-color);
}

/* Hero Section */
.hero {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: #ffffff;
  overflow: hidden;
}

.hero-content {
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.hero-title {
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #fff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  letter-spacing: -2px;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 500;
  letter-spacing: -0.5px;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.button {
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-size: 1.2rem;
  letter-spacing: -0.5px;
}

.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.button:hover::before {
  left: 100%;
}

.button.primary {
  background: #fff;
  color: var(--primary-color);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.button.secondary {
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

/* Recent Uploads Section */
.recent-uploads {
  padding: 8rem 2rem;
  background: var(--card-background);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-weight: 700;
  letter-spacing: -1px;
  position: relative;
  display: inline-block;
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 3px;
}

.section-header p {
  color: var(--text-color);
  font-size: 1.2rem;
  font-weight: 400;
}

.photos-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.photo-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  perspective: 1000px;
}

.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.photo-card:hover img {
  transform: scale(1.1);
}

.photo-info {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(130, 157, 80, 0.9) 0%, rgba(130, 157, 80, 0.5) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.photo-card:hover .photo-info {
  opacity: 1;
}

.photo-info h3 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: #fff;
}

.photo-info p {
  font-size: 1rem;
  opacity: 0.9;
  color: #fff;
  font-weight: 500;
}

.view-all {
  text-align: center;
  margin-top: 2rem;
}

/* About Section */
.about {
  padding: 8rem 2rem;
  background: var(--background-color);
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text {
  padding-right: 2rem;
}

.about-text h2 {
  font-size: 3.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: -1px;
}

.about-text p {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  font-weight: 500;
  letter-spacing: -0.5px;
}

.about-description {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-color);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stat {
  background: var(--card-background);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
}

.stat:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 50px rgba(130, 157, 80, 0.2);
  border-color: var(--primary-color);
}

.stat-value {
  display: block;
  font-size: 4rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  line-height: 1;
  letter-spacing: -1px;
}

.stat-label {
  color: var(--text-color);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.5px;
}

/* Features Section */
.features {
  padding: 8rem 2rem;
  background: var(--card-background);
}

.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature {
  position: relative;
  background: var(--background-color);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
}

.feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 50px rgba(130, 157, 80, 0.2);
  border-color: var(--primary-color);
}

.feature-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.feature-icon::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(130, 157, 80, 0.1);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  transition: all 0.5s ease;
}

.feature:hover .feature-icon {
  transform: scale(1.2) rotate(5deg);
}

.feature:hover .feature-icon::after {
  transform: translate(-50%, -50%) scale(1.5);
  background: rgba(130, 157, 80, 0.2);
}

.feature h3 {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.feature p {
  color: var(--text-color);
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
}

/* Announcements Section */
.announcements {
  padding: 8rem 2rem;
  background: var(--background-color);
}

.announcements-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.announcement {
  position: relative;
  background: var(--card-background);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
}

.announcement:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 50px rgba(130, 157, 80, 0.2);
  border-color: var(--primary-color);
}

.announcement-date {
  color: var(--primary-color);
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.announcement h3 {
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.announcement p {
  color: var(--text-color);
  line-height: 1.6;
  font-weight: 400;
}

/* CTA Section */
.cta {
  padding: 8rem 2rem;
  background: var(--primary-color);
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta h2 {
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: -1px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.cta p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  font-weight: 400;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.cta .button {
  font-size: 1.2rem;
  padding: 1.2rem 3rem;
  background: #fff;
  color: var(--primary-color);
  border: none;
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
}

.cta .button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 20px 40px rgba(255, 255, 255, 0.3);
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
  color: #fff;
  opacity: 0.8;
  z-index: 10;
}

.scroll-indicator span {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.scroll-arrow {
  width: 30px;
  height: 30px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) rotate(45deg);
  }
  40% {
    transform: translateY(-10px) rotate(45deg);
  }
  60% {
    transform: translateY(-5px) rotate(45deg);
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-title {
    font-size: 4rem;
  }
  
  .hero-subtitle {
    font-size: 1.8rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .about-text {
    padding-right: 0;
    text-align: center;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.4rem;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .about-text h2 {
    font-size: 2.5rem;
  }
  
  .about-text p {
    font-size: 1.2rem;
  }
  
  .stats {
    grid-template-columns: 1fr;
  }
  
  .photos-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .recent-uploads,
  .about,
  .features,
  .announcements,
  .cta {
    padding: 4rem 1rem;
  }
}
</style>