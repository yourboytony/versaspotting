<template>
  <div class="home" ref="mainContainer">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <video autoplay loop muted playsinline class="hero-video">
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="title">VERSA Spotting Group</h1>
        <p class="subtitle">Where Aviation Meets Artistry</p>
        <p class="description">Join Vancouver's premier aviation photography community</p>
        <div class="hero-buttons">
          <router-link to="/portfolio" class="button primary">View Portfolios</router-link>
          <router-link to="/applications" class="button secondary">Join Us</router-link>
        </div>
      </div>
      <div class="scroll-indicator">
        <span class="scroll-text">Scroll to explore</span>
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- Recent Uploads Section -->
    <section class="recent-uploads">
      <div class="section-header">
        <h2>Recent Uploads</h2>
        <p>Discover our latest captures</p>
      </div>
      <div class="photos-container">
        <div v-if="recentPhotos.length === 0" class="no-photos">
          <span>No photos available</span>
        </div>
        <div v-else class="photos-grid">
          <div v-for="photo in recentPhotos" 
               :key="photo.id" 
               class="photo-card"
               @click="openPhotoModal(photo)">
            <img :src="photo.imageUrl" 
                 :alt="photo.title"
                 @error="handleImageError">
            <div class="photo-overlay">
              <div class="photo-info">
                <h3>{{ photo.title }}</h3>
                <p class="photographer">By {{ photo.photographer }}</p>
                <p class="date">{{ formatDate(photo.date) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="view-all">
          <router-link to="/portfolio" class="view-all-btn">View All Photos</router-link>
        </div>
      </div>
    </section>

    <!-- Photo Modal -->
    <div v-if="selectedPhoto" class="photo-modal" @click="closePhotoModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closePhotoModal">&times;</button>
        <img :src="selectedPhoto.imageUrl" :alt="selectedPhoto.title">
        <div class="modal-info">
          <h2>{{ selectedPhoto.title }}</h2>
          <p class="photographer">By {{ selectedPhoto.photographer }}</p>
          <p class="description">{{ selectedPhoto.description }}</p>
          <div class="photo-details">
            <span v-if="selectedPhoto.camera"><i class="fas fa-camera"></i> {{ selectedPhoto.camera }}</span>
            <span v-if="selectedPhoto.lens"><i class="fas fa-camera-retro"></i> {{ selectedPhoto.lens }}</span>
            <span><i class="fas fa-calendar"></i> {{ formatDate(selectedPhoto.date) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <section class="about">
      <div class="about-wrapper">
        <div class="about-header">
          <div class="about-title">
            <h2>About VERSA</h2>
            <div class="title-line"></div>
          </div>
          <p class="about-subtitle">Vancouver's Premier Aviation Photography Community</p>
        </div>

        <div class="about-content">
          <div class="about-text">
            <p>VERSA Spotting Group is a community of aviation enthusiasts and photographers based in Vancouver, Canada. We are dedicated to capturing and sharing the beauty of aviation through our lenses.</p>
            <p>Our members are passionate about aviation photography and are committed to capturing the perfect shot, whether it's a commercial airliner or a private jet.</p>
          </div>

          <div class="about-stats">
            <div class="stat-box">
              <span class="stat-value">{{ totalPhotographers }}</span>
              <span class="stat-label">Members</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">{{ totalPhotos }}</span>
              <span class="stat-label">Photos</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">{{ totalLocations }}</span>
              <span class="stat-label">Locations</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="section-header">
        <h2>Why Join VERSA</h2>
        <p>Experience the difference</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-camera"></i>
          </div>
          <h3>Photographic Excellence</h3>
          <p>Our photographers are committed to capturing the perfect shot, whether it's a commercial airliner or a private jet.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-users"></i>
          </div>
          <h3>Community Focus</h3>
          <p>We believe in building a strong community of aviation enthusiasts and photographers who support and inspire each other.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <h3>YVR-Based</h3>
          <p>Located at Vancouver International Airport, we have prime access to some of the most beautiful aircraft in the world.</p>
        </div>
      </div>
    </section>

    <!-- Latest Announcements -->
    <section class="announcements">
      <div class="section-header">
        <h2>Latest Announcements</h2>
        <p>Stay updated with our latest news and events</p>
      </div>
      <div class="announcements-grid">
        <div v-for="announcement in announcements" :key="announcement.id" class="announcement-card">
          <div class="announcement-date">{{ formatDate(announcement.date) }}</div>
          <h3>{{ announcement.title }}</h3>
          <p>{{ announcement.content }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
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
const currentBackgroundIndex = ref(0)
const backgroundInterval = ref(null)
const selectedPhoto = ref(null)
const mainContainer = ref(null)
const isLoading = ref(true)
const mousePosition = ref({ x: 0, y: 0 })
const previousBackground = ref(null)

// Get recent photos for background with error handling
const backgroundPhotos = computed(() => {
  try {
    return [...dataStore.photos]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(photo => parseImageUrl(photo.imageUrl))
  } catch (error) {
    console.error('Error loading background photos:', error)
    return []
  }
})

// Current background image
const currentBackground = computed(() => {
  return backgroundPhotos.value[currentBackgroundIndex.value] || 'https://i.postimg.cc/MZF9qXhP/20250330-DSC03087-modified.png'
})

// Change background every 5 seconds with crossfade
const startBackgroundRotation = () => {
  backgroundInterval.value = setInterval(() => {
    previousBackground.value = currentBackground.value
    currentBackgroundIndex.value = (currentBackgroundIndex.value + 1) % backgroundPhotos.value.length
  }, 5000)
}

// Recent photos with URL parsing and error handling
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

// URL parsing function with better error handling
const parseImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/600x400?text=Photo+Not+Found'
  
  try {
    if (url.includes('postimages.org')) {
      const match = url.match(/\/\/(?:i\.)?postimg\.(?:cc|org)\/([^\/]+)/)
      if (match) {
        return `https://i.postimg.cc/${match[1]}`
      }
    }
    
    if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return url
    }
    
    return url
  } catch (error) {
    console.error('Error parsing image URL:', error)
    return 'https://via.placeholder.com/600x400?text=Photo+Not+Found'
  }
}

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

// Track mouse position for parallax effect
const handleMouseMove = (e) => {
  mousePosition.value = {
    x: (e.clientX / window.innerWidth - 0.5) * 20,
    y: (e.clientY / window.innerHeight - 0.5) * 20
  }
}

onMounted(async () => {
  if (!dataStore.isInitialized) {
    await dataStore.initializeData()
  }
  
  startBackgroundRotation()
  
  // Add mouse move event listener for parallax effect
  window.addEventListener('mousemove', handleMouseMove)
  
  // Hero section animations
  gsap.from('.hero-content', {
    duration: 2,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
  })
  
  gsap.from('.hero-buttons', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 1.5
  })
  
  gsap.from('.scroll-indicator', {
    duration: 1.5,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 2
  })
  
  // Parallax effect for hero background
  gsap.to('.hero-background', {
    backgroundPosition: `${mousePosition.value.x}px ${mousePosition.value.y}px`,
    ease: 'power1.out',
    duration: 1,
    repeat: -1
  })
  
  // Recent Uploads section
  gsap.timeline({
    scrollTrigger: {
      trigger: '.recent-uploads',
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: true,
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
  .from('.view-all-btn', {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'elastic.out(1, 0.5)'
  }, '-=0.5')
  
  // About section
  gsap.timeline({
    scrollTrigger: {
      trigger: '.about',
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: true,
      scrub: 1
    }
  })
  .from('.about-title', {
    y: 100,
    opacity: 0,
    duration: 1
  })
  .from('.title-line', {
    scaleX: 0,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.5')
  .from('.about-subtitle', {
    y: 50,
    opacity: 0,
    duration: 1
  }, '-=0.5')
  .from('.about-text p', {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1
  }, '-=0.5')
  .from('.stat-box', {
    scale: 0.8,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'back.out(1.7)'
  }, '-=0.5')
  
  // Features section
  gsap.timeline({
    scrollTrigger: {
      trigger: '.features',
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: true,
      scrub: 1
    }
  })
  .from('.features .section-header', {
    y: 100,
    opacity: 0,
    duration: 1
  })
  .from('.feature-card', {
    scale: 0.8,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'back.out(1.7)'
  }, '-=0.5')
  .from('.feature-icon', {
    rotation: 360,
    scale: 0,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'elastic.out(1, 0.5)'
  }, '-=0.5')
  
  // Announcements section
  gsap.timeline({
    scrollTrigger: {
      trigger: '.announcements',
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: true,
      scrub: 1
    }
  })
  .from('.announcements .section-header', {
    y: 100,
    opacity: 0,
    duration: 1
  })
  .from('.announcement-card', {
    x: -100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'back.out(1.7)'
  }, '-=0.5')
  
  // CTA section
  gsap.timeline({
    scrollTrigger: {
      trigger: '.cta',
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: true,
      scrub: 1
    }
  })
  .from('.cta-content', {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'elastic.out(1, 0.5)'
  })
  
  // Add floating animation to stat boxes
  gsap.to('.stat-box', {
    y: -10,
    duration: 2,
    ease: 'power1.inOut',
    stagger: {
      each: 0.3,
      yoyo: true,
      repeat: -1
    }
  })
  
  // Add pulse animation to feature icons
  gsap.to('.feature-icon', {
    scale: 1.1,
    duration: 1.5,
    ease: 'power1.inOut',
    stagger: {
      each: 0.5,
      yoyo: true,
      repeat: -1
    }
  })
})

onUnmounted(() => {
  // Clean up ScrollTrigger instances
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  
  if (backgroundInterval.value) {
    clearInterval(backgroundInterval.value)
  }
  
  // Remove event listener
  window.removeEventListener('mousemove', handleMouseMove)
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
.home {
  min-height: 100vh;
  overflow-x: hidden;
  background: #000;
  color: #fff;
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
  color: #ffffff;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.9)
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
}

.title {
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #fff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  letter-spacing: -1px;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 500;
  letter-spacing: -0.5px;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  font-weight: 400;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.button {
  padding: 1rem 2.5rem;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-size: 1.1rem;
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
  color: #000;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
}

.button.secondary {
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 255, 255, 0.2);
}

/* Recent Uploads Section */
.recent-uploads {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem;
  background: #000;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fff;
  font-weight: 700;
  letter-spacing: -1px;
}

.section-header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  font-weight: 400;
}

.photos-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.photos-grid {
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.photo-info {
  color: #fff;
  transform: translateY(20px);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.photo-card:hover .photo-info {
  transform: translateY(0);
}

.photo-info h3 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.photo-info .photographer {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.photo-info .date {
  font-size: 0.9rem;
  opacity: 0.7;
  font-weight: 400;
}

.view-all {
  text-align: center;
  margin-top: 2rem;
}

.view-all-btn {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: transparent;
  color: #fff;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 2px solid #fff;
  font-size: 1.1rem;
  letter-spacing: -0.5px;
}

.view-all-btn::before {
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

.view-all-btn:hover::before {
  left: 100%;
}

.view-all-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
}

/* About Section */
.about {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem;
  background: #000;
}

.about-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.about-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.about-title h2 {
  font-size: 3.5rem;
  color: #fff;
  font-weight: 700;
  margin: 0;
  letter-spacing: -1px;
}

.title-line {
  width: 100px;
  height: 3px;
  background: #fff;
  border-radius: 3px;
}

.about-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 500;
  letter-spacing: -0.5px;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
}

.about-text p {
  margin-bottom: 1.5rem;
}

.about-text p:last-child {
  margin-bottom: 0;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stat-box {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.stat-box:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.1);
}

.stat-value {
  display: block;
  font-size: 3.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  line-height: 1;
  letter-spacing: -1px;
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: -0.5px;
}

/* Features Section */
.features {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem;
  background: #000;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 1.5rem;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .feature-icon {
  transform: scale(1.2);
}

.feature-card h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
}

/* Announcements Section */
.announcements {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem;
  background: #000;
}

.announcements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.announcement-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.announcement-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.1);
}

.announcement-date {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.announcement-card h3 {
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.announcement-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-weight: 400;
}

/* CTA Section */
.cta {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem;
  background: #000;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta h2 {
  font-size: 3rem;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: -1px;
}

.cta p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: 400;
  letter-spacing: -0.5px;
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

.scroll-text {
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
@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-text {
    text-align: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.4rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .about-title h2 {
    font-size: 2.5rem;
  }

  .about-subtitle {
    font-size: 1.2rem;
  }

  .about-stats {
    grid-template-columns: 1fr;
  }

  .photos-grid {
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