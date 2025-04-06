<template>
  <main class="home">
    <!-- Navigation -->
    <nav class="main-nav" :class="{ 'nav-scrolled': isScrolled }">
      <div class="container nav-container">
        <div class="nav-brand">
          <img src="@/assets/logo.svg" alt="VERSA" class="nav-logo">
        </div>
        <div class="nav-links" :class="{ 'nav-open': isMenuOpen }">
          <a href="#" class="nav-link">Home</a>
          <a href="#latest" class="nav-link">Gallery</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#help" class="nav-link">Help</a>
          <button class="btn-primary nav-cta">Join VERSA</button>
        </div>
        <button class="nav-toggle" @click="toggleMenu" aria-label="Toggle Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-media">
        <div class="hero-image-container" 
             v-for="(photo, index) in featuredPhotos" 
             :key="photo.id"
             :class="{ active: currentSlide === index }">
          <img :src="photo.imageUrl" :alt="photo.title" class="hero-image">
        </div>
        <div class="hero-overlay"></div>
      </div>

      <div class="hero-content container">
        <div class="hero-text">
          <h1 class="glide-in">
            <span class="line">Vancouver's Elite</span>
            <span class="line accent">Aviation Photography</span>
            <span class="line">Community</span>
          </h1>
          <p class="hero-subtitle fade-in">
            Experience the art of aviation photography at YVR's most exclusive locations
          </p>
          <div class="hero-cta fade-in">
            <button class="btn-primary">Join VERSA</button>
            <button class="btn-secondary">View Gallery</button>
          </div>
        </div>

        <div class="hero-counter">
          <div class="counter-item" v-for="stat in stats" :key="stat.label">
            <div class="counter-number">{{ stat.value }}</div>
            <div class="counter-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <div class="scroll-indicator">
        <span>Scroll to Explore</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- Photo Modal -->
    <div class="photo-modal" v-if="selectedPhoto" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <img :src="selectedPhoto.imageUrl" :alt="selectedPhoto.title">
        <div class="modal-info">
          <h3>{{ selectedPhoto.title }}</h3>
          <p>{{ selectedPhoto.description }}</p>
          <div class="modal-meta">
            <span class="photographer">By {{ selectedPhoto.photographer }}</span>
            <span class="location">{{ selectedPhoto.location }}</span>
            <span class="date">{{ selectedPhoto.date }}</span>
          </div>
          <div class="modal-details">
            <div class="detail-item">
              <span class="label">Camera</span>
              <span class="value">{{ selectedPhoto.camera }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Lens</span>
              <span class="value">{{ selectedPhoto.lens }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Settings</span>
              <span class="value">{{ selectedPhoto.settings }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest Captures -->
    <section class="latest">
      <div class="container">
        <div class="section-header">
          <div class="header-content">
            <span class="overline">Featured Work</span>
            <h2>Latest Captures</h2>
            <p>Discover our most recent premium aviation photographs</p>
          </div>
        </div>

        <div class="photo-grid">
          <div v-for="photo in recentPhotos" 
               :key="photo.id" 
               class="photo-card"
               @mouseenter="hoverPhoto(photo)"
               @mouseleave="unhoverPhoto">
            <div class="photo-image">
              <img :src="photo.imageUrl" :alt="photo.title">
            </div>
            <div class="photo-info">
              <h3>{{ photo.title }}</h3>
              <p>{{ photo.description }}</p>
              <div class="photo-meta">
                <span class="photographer">{{ photo.photographer }}</span>
                <span class="location">{{ photo.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-content">
            <span class="overline">About VERSA</span>
            <h2>Premium Aviation Photography Experience</h2>
            <p class="about-lead">
              Join Vancouver's most prestigious aviation photography community and elevate your spotting experience.
            </p>
            <div class="feature-grid">
              <div class="feature-item" v-for="feature in features" :key="feature.title">
                <div class="feature-icon">{{ feature.icon }}</div>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
          <div class="about-media">
            <div class="media-stack">
              <img :src="aboutImages[0]" alt="Aviation photography" class="stack-image main">
              <img :src="aboutImages[1]" alt="Aviation photography" class="stack-image accent">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Section -->
    <section class="join">
      <div class="container">
        <div class="join-content">
          <h2>Ready to Join VERSA?</h2>
          <p>Start your journey with Vancouver's most exclusive aviation photography community</p>
          <button class="btn-primary">Apply Now</button>
        </div>
      </div>
    </section>

    <!-- Help Section -->
    <section id="help" class="help">
      <div class="container">
        <div class="section-header">
          <span class="overline">Support</span>
          <h2>Need Help?</h2>
          <p>Get assistance with your aviation photography journey</p>
        </div>
        
        <div class="help-grid">
          <div class="help-card">
            <div class="help-icon">📘</div>
            <h3>Getting Started</h3>
            <p>New to aviation photography? Learn the basics and best practices.</p>
            <button class="btn-text">Learn More</button>
          </div>
          
          <div class="help-card">
            <div class="help-icon">🎯</div>
            <h3>Spotting Locations</h3>
            <p>Discover premium locations and access guidelines.</p>
            <button class="btn-text">View Map</button>
          </div>
          
          <div class="help-card">
            <div class="help-icon">💬</div>
            <h3>Community Support</h3>
            <p>Connect with experienced photographers for guidance.</p>
            <button class="btn-text">Join Chat</button>
          </div>
          
          <div class="help-card">
            <div class="help-icon">❓</div>
            <h3>FAQs</h3>
            <p>Find answers to common questions about VERSA.</p>
            <button class="btn-text">Read FAQs</button>
          </div>
        </div>

        <div class="help-cta">
          <p>Can't find what you're looking for?</p>
          <button class="btn-primary">Contact Support</button>
        </div>
      </div>
    </section>

    <!-- Loading Overlay -->
    <div class="loading-overlay" v-if="isLoading">
      <div class="loader"></div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useDataStore } from '../stores/dataStore'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const dataStore = useDataStore()
const currentSlide = ref(0)
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const selectedPhoto = ref(null)
const isLoading = ref(true)

// Computed properties
const featuredPhotos = computed(() => dataStore.photos?.slice(0, 3) || [])
const recentPhotos = computed(() => dataStore.photos?.slice(0, 6) || [])
const aboutImages = computed(() => dataStore.photos?.slice(0, 2).map(p => p.imageUrl) || [])

const stats = computed(() => [
  { value: dataStore.photographers?.length || 0, label: 'Photographers' },
  { value: dataStore.photos?.length || 0, label: 'Premium Captures' },
  { value: dataStore.spotterLocations?.length || 0, label: 'Elite Locations' }
])

const features = [
  {
    icon: '🎯',
    title: 'Premium Locations',
    description: 'Access to exclusive spotting locations around YVR'
  },
  {
    icon: '📸',
    title: 'Expert Guidance',
    description: 'Learn from Vancouver\'s top aviation photographers'
  },
  {
    icon: '🌟',
    title: 'Quality Focus',
    description: 'Premium equipment and advanced techniques'
  },
  {
    icon: '👥',
    title: 'Elite Community',
    description: 'Connect with passionate aviation enthusiasts'
  }
]

// Animation functions
const initAnimations = () => {
  // Split text for hero title
  const heroTitle = new SplitType('.hero-text h1', { types: 'lines,chars' })
  
  // Hero animations
  const heroTL = gsap.timeline({ delay: 0.5 })
  heroTL
    .from(heroTitle.chars, {
      y: 100,
      opacity: 0,
      rotateX: -90,
      duration: 1.2,
      stagger: 0.02,
      ease: 'power4.out'
    })
    .from('.hero-subtitle', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-cta', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-counter', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.scroll-indicator', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')

  // Scroll animations
  gsap.from('.photo-card', {
    scrollTrigger: {
      trigger: '.photo-grid',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1
    },
    y: 100,
    opacity: 0,
    scale: 0.9,
    stagger: 0.2,
    ease: 'power3.out'
  })

  gsap.from('.feature-item', {
    scrollTrigger: {
      trigger: '.feature-grid',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1
    },
    y: 80,
    opacity: 0,
    scale: 0.95,
    stagger: 0.1,
    ease: 'power3.out'
  })

  gsap.from('.media-stack img', {
    scrollTrigger: {
      trigger: '.about-media',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1
    },
    y: 100,
    opacity: 0,
    scale: 0.9,
    stagger: 0.3,
    ease: 'power3.out'
  })

  // Parallax effects
  gsap.to('.hero-image-container.active img', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: '20%',
    scale: 1.1
  })

  // Counter animation
  const counterItems = document.querySelectorAll('.counter-number')
  counterItems.forEach(item => {
    const value = parseInt(item.textContent)
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%'
      },
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      stagger: 0.2
    })
  })
}

// Slide rotation
const rotateSlides = () => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % 3
  }, 5000)
}

// Navigation handling
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

// Scroll handling
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Photo modal
const openModal = (photo) => {
  selectedPhoto.value = photo
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedPhoto.value = null
  document.body.style.overflow = ''
}

// Loading state
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
  
  initAnimations()
  rotateSlides()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Base Styles */
:root {
  /* Enhanced color palette */
  --primary: #080810;
  --secondary: #0c0c14;
  --accent: #00ffd5;
  --accent-dark: #00ccaa;
  --text: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --gradient-1: linear-gradient(135deg, #00ffd5 0%, #0066ff 100%);
  --gradient-2: linear-gradient(45deg, rgba(0, 255, 213, 0.15) 0%, rgba(0, 102, 255, 0.15) 100%);
  --spacing: clamp(1rem, 5vw, 2rem);
  --radius: 20px;
  --radius-lg: 30px;
  --radius-full: 9999px;
  --shadow-sm: 0 4px 20px rgba(0, 255, 213, 0.1);
  --shadow-md: 0 12px 32px rgba(0, 255, 213, 0.15);
  --shadow-lg: 0 24px 48px rgba(0, 255, 213, 0.2);
  --transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Enhanced Typography */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--primary);
  color: var(--text);
  line-height: 1.6;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing);
}

/* Enhanced Hero Section */
.hero {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  color: var(--text);
  overflow: hidden;
  background: var(--primary);
}

.hero-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-image-container {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(1.1);
  transition: opacity 1.5s ease-out, transform 8s ease-out;
  filter: brightness(0.8) saturate(1.2);
}

.hero-image-container.active {
  opacity: 1;
  transform: scale(1);
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(8, 8, 16, 0.3) 0%,
    rgba(8, 8, 16, 0.8) 60%,
    rgba(8, 8, 16, 0.98) 100%
  );
  backdrop-filter: blur(10px);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 6rem;
  align-items: center;
}

.hero-text {
  max-width: 800px;
}

.hero-text h1 {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 800;
  margin-bottom: 2rem;
  letter-spacing: -0.03em;
  line-height: 1;
  text-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.hero-text h1 .line {
  display: block;
  overflow: hidden;
}

.hero-text h1 .accent {
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  color: var(--text-secondary);
  margin-bottom: 3rem;
  max-width: 600px;
  font-weight: 400;
}

.hero-counter {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

.counter-item {
  text-align: right;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

.counter-item:hover {
  transform: translateY(-8px) scale(1.02);
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--accent);
  box-shadow: 0 30px 60px rgba(0, 255, 213, 0.2);
}

.counter-number {
  font-size: 3rem;
  font-weight: 700;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.counter-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* Enhanced Latest Section */
.latest {
  padding: 10rem 0;
  background: var(--secondary);
  position: relative;
  overflow: hidden;
}

.latest::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-2);
  opacity: 0.5;
}

.section-header {
  margin-bottom: 6rem;
  text-align: center;
  position: relative;
}

.overline {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
  margin-bottom: 1rem;
  display: block;
}

.section-header h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.section-header p {
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.125rem;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  position: relative;
}

.photo-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(20px);
}

.photo-card:hover {
  transform: translateY(-15px) scale(1.02);
  border-color: var(--accent);
  box-shadow: 0 40px 80px rgba(0, 255, 213, 0.25);
}

.photo-image {
  aspect-ratio: 16/9;
  overflow: hidden;
  position: relative;
}

.photo-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    rgba(8, 8, 16, 0) 0%,
    rgba(8, 8, 16, 0.8) 100%
  );
  opacity: 0;
  transition: var(--transition);
}

.photo-card:hover .photo-image::after {
  opacity: 1;
}

.photo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.5s ease;
}

.photo-card:hover .photo-image img {
  transform: scale(1.1);
}

.photo-info {
  padding: 2.5rem;
}

.photo-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.photo-info p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.photo-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--accent);
  font-weight: 500;
}

/* Enhanced About Section */
.about {
  padding: 10rem 0;
  background: var(--primary);
  position: relative;
  overflow: hidden;
}

.about::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-2);
  opacity: 0.3;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  position: relative;
}

.about-content h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.about-lead {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 4rem;
  line-height: 1.6;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-item {
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-lg);
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(20px);
}

.feature-item:hover {
  transform: translateY(-10px) scale(1.02);
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--accent);
  box-shadow: 0 30px 60px rgba(0, 255, 213, 0.2);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-item h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.feature-item p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.media-stack {
  position: relative;
  padding-top: 3rem;
  padding-left: 3rem;
}

.stack-image {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  transition: var(--transition);
}

.stack-image.main {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stack-image.accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  aspect-ratio: 1;
  object-fit: cover;
  z-index: 1;
  filter: saturate(1.2) brightness(0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Enhanced Join Section */
.join {
  padding: 10rem 0;
  background: var(--gradient-1);
  color: var(--primary);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.join::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
}

.join-content {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
}

.join h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.join p {
  margin-bottom: 3rem;
  font-size: 1.25rem;
  opacity: 0.9;
}

/* Enhanced Buttons */
.btn-primary,
.btn-secondary {
  padding: 1.5rem 4rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  letter-spacing: 0.02em;
  box-shadow: var(--shadow-md);
}

.btn-primary {
  background: var(--gradient-1);
  color: var(--primary);
  margin-right: 1.5rem;
  position: relative;
  z-index: 1;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-1);
  border-radius: var(--radius-full);
  opacity: 0;
  z-index: -1;
  transition: var(--transition);
  transform: scale(1.05);
}

.btn-primary:hover::before {
  opacity: 1;
  transform: scale(1);
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--text);
  color: var(--text);
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 60px rgba(0, 255, 213, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Enhanced Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 2;
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  opacity: 0.7;
  transition: var(--transition);
}

.scroll-indicator:hover {
  opacity: 1;
}

.scroll-line {
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  margin: 1rem auto 0;
  position: relative;
  opacity: 0.8;
  box-shadow: 0 0 20px var(--accent);
}

.scroll-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 30px var(--accent);
  animation: scrollDot 2s infinite;
}

@keyframes scrollDot {
  0% { transform: translate(-50%, 0); opacity: 1; }
  100% { transform: translate(-50%, 30px); opacity: 0; }
}

/* Enhanced Responsive Design */
@media (max-width: 1200px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 4rem;
  }

  .hero-counter {
    grid-template-columns: repeat(3, 1fr);
  }

  .counter-item {
    text-align: center;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .about-media {
    order: -1;
  }

  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  :root {
    --spacing: 1rem;
  }

  .hero-cta {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .hero-counter {
    grid-template-columns: repeat(2, 1fr);
  }

  .photo-grid {
    grid-template-columns: 1fr;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    margin-bottom: 4rem;
  }
}

@media (max-width: 480px) {
  .hero-counter {
    grid-template-columns: 1fr;
  }

  .counter-item {
    padding: 1.25rem;
  }

  .counter-number {
    font-size: 2.5rem;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    margin-right: 0;
  }
}

/* Add smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Add selection styling */
::selection {
  background: var(--accent);
  color: var(--primary);
}

/* Navigation Styles */
.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: var(--transition);
  background: transparent;
}

.nav-scrolled {
  background: rgba(8, 8, 16, 0.8);
  backdrop-filter: blur(20px);
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.nav-logo {
  height: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 2px;
  background: var(--gradient-1);
  opacity: 0;
  transform: scaleX(0.5);
  transition: var(--transition);
}

.nav-link:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

.nav-cta {
  padding: 0.75rem 2rem;
}

/* Photo Modal Styles */
.photo-modal {
  position: fixed;
  inset: 0;
  background: rgba(8, 8, 16, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.modal-content {
  max-width: 1200px;
  width: 100%;
  background: var(--secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text);
  font-size: 1.5rem;
  cursor: pointer;
  transition: var(--transition);
  z-index: 1;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-info {
  padding: 2rem;
}

.modal-meta {
  display: flex;
  gap: 2rem;
  margin: 1rem 0 2rem;
  color: var(--text-secondary);
}

.modal-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-item .label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

/* Help Section Styles */
.help {
  padding: 10rem 0;
  background: var(--secondary);
  position: relative;
  overflow: hidden;
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.help-card {
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: var(--transition);
}

.help-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--accent);
  box-shadow: var(--shadow-lg);
}

.help-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.help-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.help-card p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.btn-text {
  background: none;
  border: none;
  color: var(--accent);
  font-weight: 600;
  padding: 0;
  cursor: pointer;
  transition: var(--transition);
}

.btn-text:hover {
  color: var(--accent-dark);
  transform: translateX(4px);
}

.help-cta {
  text-align: center;
  margin-top: 6rem;
}

.help-cta p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  inset: 0;
  background: var(--primary);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  width: 48px;
  height: 48px;
  border: 3px solid var(--accent);
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: loader 1s linear infinite;
}

@keyframes loader {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Navigation */
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text);
  transition: var(--transition);
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: var(--primary);
    padding: 6rem 2rem;
    min-width: 300px;
    flex-direction: column;
    transform: translateX(100%);
    transition: var(--transition);
  }

  .nav-links.nav-open {
    transform: translateX(0);
  }

  .nav-toggle.active span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .nav-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .nav-toggle.active span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}
</style>