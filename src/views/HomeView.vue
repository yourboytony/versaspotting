<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-background" :style="{ backgroundImage: `url(${currentBackground})` }"></div>
      <div class="hero-content">
        <h1 class="title">VERSA Spotting Group</h1>
        <p class="subtitle">Capturing the beauty of aviation around the world</p>
        <p class="description">Join our community of passionate aviation photographers and share your love for aviation photography</p>
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
        <p>Check out our latest aviation photography</p>
      </div>
      <div class="photos-grid">
        <div v-for="photo in recentPhotos" :key="photo.id" class="photo-card" @click="viewPhoto(photo)">
          <div class="photo-image">
            <img :src="photo.imageUrl" :alt="photo.title" @error="handleImageError">
            <div class="photo-overlay">
              <div class="photo-info">
                <h3>{{ photo.title }}</h3>
                <p class="photographer">By {{ photo.photographer }}</p>
                <div class="photo-meta">
                  <span><i class="fas fa-camera"></i> {{ photo.camera }}</span>
                  <span><i class="fas fa-calendar"></i> {{ formatDate(photo.date) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="view-all">
        <router-link to="/portfolio" class="view-all-btn">View All Photos</router-link>
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
            <span><i class="fas fa-camera"></i> {{ selectedPhoto.camera }}</span>
            <span><i class="fas fa-camera-retro"></i> {{ selectedPhoto.lens }}</span>
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
        <p>Discover the benefits of being part of our community</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="icon-camera"></i>
          </div>
          <h3>Photographic Excellence</h3>
          <p>Our photographers are committed to capturing the perfect shot, whether it's a commercial airliner or a private jet.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="icon-community"></i>
          </div>
          <h3>Community Focus</h3>
          <p>We believe in building a strong community of aviation enthusiasts and photographers who support and inspire each other.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="icon-location"></i>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useDataStore } from '../stores/dataStore'

const dataStore = useDataStore()
const currentBackgroundIndex = ref(0)
const backgroundInterval = ref(null)
const selectedPhoto = ref(null)

// Get recent photos for background
const backgroundPhotos = computed(() => {
  return [...dataStore.photos]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map(photo => parseImageUrl(photo.imageUrl))
})

// Current background image
const currentBackground = computed(() => {
  return backgroundPhotos.value[currentBackgroundIndex.value] || 'https://i.postimg.cc/MZF9qXhP/20250330-DSC03087-modified.png'
})

// Change background every 5 seconds
const startBackgroundRotation = () => {
  backgroundInterval.value = setInterval(() => {
    currentBackgroundIndex.value = (currentBackgroundIndex.value + 1) % backgroundPhotos.value.length
  }, 5000)
}

// Recent photos with URL parsing
const recentPhotos = computed(() => {
  return [...dataStore.photos]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)
    .map(photo => ({
      ...photo,
      imageUrl: parseImageUrl(photo.imageUrl),
      photographer: dataStore.photographers.find(p => p.id === photo.photographerId)?.name || 'Unknown'
    }))
})

// URL parsing function
const parseImageUrl = (url) => {
  if (!url) return ''
  
  if (url.includes('postimages.org')) {
    const match = url.match(/\/\/(?:i\.)?postimg\.(?:cc|org)\/([^\/]+)/)
    if (match) {
      return `https://i.postimg.cc/${match[1]}/image.jpg`
    }
  }
  
  if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return url
  }
  
  return url
}

// Error handling for images
const handleImageError = (event) => {
  const img = event.target
  img.src = 'https://via.placeholder.com/600x400?text=Photo+Not+Found'
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

// Animations
onMounted(() => {
  startBackgroundRotation()
  
  // Hero animations
  gsap.from('.hero-content', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power2.out'
  })

  // Recent uploads animations
  gsap.from('.photo-card', {
    scrollTrigger: {
      trigger: '.recent-uploads',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
  })

  // About section animations
  gsap.from('.about-title', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  })

  gsap.from('.about-subtitle', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top 80%'
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  })

  gsap.from('.about-text', {
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  })

  gsap.from('.stat-box', {
    scrollTrigger: {
      trigger: '.about-stats',
      start: 'top 80%'
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out'
  })

  // Simpler Features animations
  gsap.from('.feature-card', {
    scrollTrigger: {
      trigger: '.features',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
  })

  // Announcements animations
  gsap.from('.announcement-card', {
    scrollTrigger: {
      trigger: '.announcements',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.6,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
  })

  // CTA animation
  gsap.from('.cta-content', {
    scrollTrigger: {
      trigger: '.cta',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  })

  // Scroll indicator animation
  gsap.to('.scroll-arrow', {
    y: 10,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  })
})

onUnmounted(() => {
  if (backgroundInterval.value) {
    clearInterval(backgroundInterval.value)
  }
})

const viewPhoto = (photo) => {
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
  background-size: cover;
  background-position: center;
  transition: background-image 1s ease-in-out;
  z-index: 0;
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
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--primary-color);
  text-shadow: 0 0 20px rgba(144, 153, 62, 0.5);
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #cccccc;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.button {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.button.primary {
  background: var(--primary-color);
  color: #000000;
}

.button.secondary {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(144, 153, 62, 0.3);
}

/* Recent Uploads Section */
.recent-uploads {
  padding: 6rem 2rem;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-header p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.photo-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #000;
  aspect-ratio: 3/2;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.photo-card:hover {
  transform: translateY(-5px);
}

.photo-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.photo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.photo-card:hover .photo-image img {
  transform: scale(1.05);
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.photo-info {
  color: #fff;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.photo-card:hover .photo-info {
  transform: translateY(0);
}

.photo-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.photo-info .photographer {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.photo-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.photo-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.view-all {
  text-align: center;
  margin-top: 4rem;
}

.view-all-btn {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  color: #000;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.view-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(144, 153, 62, 0.3);
}

/* Photo Modal */
.photo-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  max-width: 1200px;
  width: 90%;
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 1;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.modal-content img {
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.modal-info {
  padding: 2rem;
}

.modal-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
}

.modal-info .photographer {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.modal-info .description {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.photo-details {
  display: flex;
  gap: 2rem;
  color: rgba(255, 255, 255, 0.6);
}

.photo-details span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .photos-grid {
    grid-template-columns: 1fr;
  }

  .section-header h2 {
    font-size: 2.5rem;
  }

  .photo-modal {
    padding: 1rem;
  }

  .modal-content {
    width: 100%;
  }

  .modal-info {
    padding: 1.5rem;
  }

  .modal-info h2 {
    font-size: 1.5rem;
  }

  .photo-details {
    flex-direction: column;
    gap: 1rem;
  }
}

/* About Section */
.about {
  padding: 6rem 2rem;
  background: var(--background-color);
  position: relative;
}

.about-wrapper {
  max-width: 1200px;
  margin: 0 auto;
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
  color: var(--primary-color);
  font-weight: 700;
  margin: 0;
}

.title-line {
  width: 100px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 3px;
}

.about-subtitle {
  font-size: 1.5rem;
  color: var(--text-color);
  margin: 0;
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
  color: var(--text-color);
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
  background: var(--card-background);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-5px);
}

.stat-value {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  line-height: 1;
}

.stat-label {
  color: var(--text-color);
  font-size: 1.1rem;
  font-weight: 500;
}

@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-text {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 4rem 1rem;
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
}

/* Features Section */
.features {
  padding: 4rem 2rem;
  background: var(--card-background);
  margin: 2rem;
  border-radius: 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-header p {
  color: var(--text-color);
  font-size: 1.2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: var(--background-color);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid var(--primary-color);
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
}

.feature-card p {
  color: var(--text-color);
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

/* Announcements Section */
.announcements {
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  margin: 2rem;
  border-radius: 20px;
}

.announcements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.announcement-card {
  background: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid var(--primary-color);
}

.announcement-date {
  color: var(--primary-color);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.announcement-card h3 {
  color: #ffffff;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.announcement-card p {
  color: #cccccc;
  line-height: 1.6;
}

/* CTA Section */
.cta {
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  margin: 2rem;
  border-radius: 20px;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.cta p {
  color: #cccccc;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .title {
    font-size: 3rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .recent-uploads,
  .about,
  .features,
  .announcements,
  .cta {
    margin: 1rem;
    padding: 2rem 1rem;
  }

  .mission-section h2,
  .team-section h2 {
    font-size: 2.5rem;
  }
  
  .mission-text,
  .team-text {
    font-size: 1.1rem;
    padding: 0 var(--spacing-md);
  }
}
</style> 