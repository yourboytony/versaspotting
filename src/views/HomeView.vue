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
      <!-- Background Video/Image -->
      <div class="hero-media">
        <div class="hero-image-container" v-for="(photo, index) in featuredPhotos" :key="photo.id" :class="{ active: currentSlide === index }">
          <img :src="photo.imageUrl" :alt="photo.title" class="hero-image">
        </div>
        <div class="hero-overlay"></div>
      </div>

      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="brand-tag">
              <span class="dot"></span>
              VERSA Spotting Group
            </div>
            
            <h1 class="hero-title">
              <span class="line">Vancouver's Elite</span>
              <span class="line accent">Aviation Photography</span>
              <span class="line">Community</span>
            </h1>

            <p class="hero-subtitle">
              Experience the art of aviation photography at YVR's most exclusive locations
            </p>

            <div class="hero-cta">
              <button class="btn-primary">
                Join VERSA
                <span class="btn-icon">→</span>
              </button>
              <button class="btn-secondary">
                View Gallery
                <span class="btn-icon">↗</span>
              </button>
            </div>

            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-value">25+</div>
                <div class="stat-label">Elite Photographers</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-value">1.2K+</div>
                <div class="stat-label">Premium Captures</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-value">12</div>
                <div class="stat-label">Exclusive Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="scroll-indicator">
        <span>Scroll to Explore</span>
        <div class="scroll-line">
          <div class="scroll-dot"></div>
        </div>
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
    <section class="latest" id="latest">
      <div class="container">
        <div class="section-header">
          <div class="header-content">
            <div class="section-tag">
              <span class="dot"></span>
              Featured Work
            </div>
            <h2>Latest Captures</h2>
            <p>Experience our most recent premium aviation photographs</p>
          </div>
        </div>

        <div class="photo-grid">
          <div v-for="photo in recentPhotos" 
               :key="photo.id" 
               class="photo-card"
               @click="openModal(photo)">
            <div class="photo-image">
              <img :src="photo.imageUrl" :alt="photo.title">
              <div class="photo-overlay">
                <div class="overlay-content">
                  <span class="view-btn">
                    View Details
                    <span class="btn-icon">↗</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="photo-info">
              <div class="info-header">
                <h3>{{ photo.title }}</h3>
                <span class="photo-date">{{ photo.date }}</span>
              </div>
              <div class="photo-meta">
                <div class="meta-item">
                  <span class="meta-icon">📸</span>
                  <span class="meta-text">{{ photo.photographer }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-icon">📍</span>
                  <span class="meta-text">{{ photo.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section-footer">
          <button class="btn-secondary">
            View All Captures
            <span class="btn-icon">→</span>
          </button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-content">
            <div class="section-tag">
              <span class="dot"></span>
              About VERSA
            </div>
            
            <h2>Premium Aviation Photography Experience</h2>
            
            <p class="about-lead">
              Join Vancouver's most prestigious aviation photography community and elevate your spotting experience to new heights.
            </p>

            <div class="feature-grid">
              <div class="feature-card" v-for="feature in features" :key="feature.title">
                <div class="feature-icon">{{ feature.icon }}</div>
                <div class="feature-content">
                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                </div>
              </div>
            </div>

            <div class="about-cta">
              <button class="btn-primary">
                Join Our Community
                <span class="btn-icon">→</span>
              </button>
              <button class="btn-secondary">
                Learn More
                <span class="btn-icon">↗</span>
              </button>
            </div>
          </div>

          <div class="about-media">
            <div class="media-stack">
              <div class="media-card main">
                <img :src="aboutImages[0]" alt="Aviation photography" class="media-image">
              </div>
              <div class="media-card accent">
                <img :src="aboutImages[1]" alt="Aviation photography" class="media-image">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Section -->
    <section class="join" id="join">
      <div class="join-background">
        <div class="gradient-overlay"></div>
      </div>
      
      <div class="container">
        <div class="join-content">
          <div class="section-tag">
            <span class="dot"></span>
            Join VERSA
          </div>

          <h2>Ready to Elevate Your Aviation Photography?</h2>
          
          <p class="join-lead">
            Start your journey with Vancouver's most exclusive aviation photography community. 
            Get access to premium locations, expert guidance, and a network of passionate photographers.
          </p>

          <div class="join-features">
            <div class="join-feature">
              <div class="feature-check">✓</div>
              <span>Access to exclusive spotting locations</span>
            </div>
            <div class="join-feature">
              <div class="feature-check">✓</div>
              <span>Professional photography guidance</span>
            </div>
            <div class="join-feature">
              <div class="feature-check">✓</div>
              <span>Premium community events</span>
            </div>
            <div class="join-feature">
              <div class="feature-check">✓</div>
              <span>Featured on our platform</span>
            </div>
          </div>

          <div class="join-cta">
            <button class="btn-primary">
              Apply Now
              <span class="btn-icon">→</span>
            </button>
            <p class="join-note">Limited spots available. Application required.</p>
          </div>
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
  --primary: #0a0a0f;
  --secondary: #12121a;
  --accent: #00ffd5;
  --accent-dark: #00ccaa;
  --text: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --gradient-1: linear-gradient(135deg, #00ffd5 0%, #0066ff 100%);
  --gradient-2: linear-gradient(45deg, rgba(0, 255, 213, 0.15) 0%, rgba(0, 102, 255, 0.15) 100%);
  --spacing: clamp(1rem, 5vw, 2rem);
  --radius: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;
  --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 12px 24px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 24px 48px rgba(0, 0, 0, 0.3);
  --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--primary);
  padding: 120px 0 60px;
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
}

.hero-image-container.active {
  opacity: 1;
  transform: scale(1);
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6) saturate(1.2) contrast(1.1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 15, 0.7) 0%,
    rgba(10, 10, 15, 0.85) 50%,
    rgba(10, 10, 15, 0.95) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;
}

.brand-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--text);
  margin-bottom: 3rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 20px var(--accent);
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1;
  margin-bottom: 2rem;
}

.hero-title .line {
  display: block;
  margin-bottom: 0.5rem;
}

.hero-title .accent {
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 3rem;
  line-height: 1.5;
}

.hero-cta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  transition: var(--transition);
}

.btn-primary {
  background: var(--gradient-1);
  border: none;
  color: var(--primary);
  box-shadow: 0 20px 40px rgba(0, 255, 213, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text);
  backdrop-filter: blur(10px);
}

.btn-icon {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-5px);
}

.btn-primary:hover .btn-icon,
.btn-secondary:hover .btn-icon {
  transform: translateX(5px);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 3rem;
  font-weight: 700;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
}

.scroll-line {
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  position: relative;
}

.scroll-dot {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
  animation: scrollDot 2s infinite;
  box-shadow: 0 0 20px var(--accent);
}

@keyframes scrollDot {
  0% { transform: translate(-50%, 0); opacity: 1; }
  50% { transform: translate(-50%, 50px); opacity: 0.5; }
  100% { transform: translate(-50%, 100px); opacity: 0; }
}

@media (max-width: 768px) {
  .hero {
    padding: 100px 0 40px;
    text-align: center;
  }

  .brand-tag {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-cta {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-stats {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }

  .stat-divider {
    width: 80%;
    height: 1px;
  }
}

/* Enhanced Latest Section */
.latest {
  padding: 120px 0;
  background: var(--secondary);
  position: relative;
  overflow: hidden;
}

.latest::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-2);
  opacity: 0.3;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.section-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--accent);
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-header h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0.7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-header p {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 60px;
}

.photo-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
  cursor: pointer;
}

.photo-card:hover {
  transform: translateY(-10px);
  border-color: var(--accent);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(0, 255, 213, 0.2);
}

.photo-image {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.photo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s ease;
}

.photo-card:hover .photo-image img {
  transform: scale(1.1);
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.view-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  color: var(--text);
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s ease;
}

.photo-card:hover .view-btn {
  transform: translateY(0);
  opacity: 1;
}

.photo-info {
  padding: 2rem;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.info-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
}

.photo-date {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.photo-meta {
  display: flex;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  font-size: 1rem;
  color: var(--accent);
}

.meta-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.section-footer {
  text-align: center;
  margin-top: 60px;
}

@media (max-width: 768px) {
  .latest {
    padding: 80px 0;
  }

  .photo-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .photo-info {
    padding: 1.5rem;
  }

  .info-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .photo-date {
    font-size: 0.75rem;
  }
}

/* Enhanced About Section */
.about {
  padding: 120px 0;
  background: var(--primary);
  position: relative;
  overflow: hidden;
}

.about::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-2);
  opacity: 0.2;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
}

.about-content {
  position: relative;
}

.about-content h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 2rem 0;
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0.7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-lead {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 4rem;
  line-height: 1.6;
  max-width: 540px;
}

.feature-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--accent);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(0, 255, 213, 0.1);
}

.feature-icon {
  font-size: 2rem;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.feature-content p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.about-cta {
  display: flex;
  gap: 1.5rem;
}

.media-stack {
  position: relative;
  height: 100%;
  min-height: 600px;
}

.media-card {
  position: absolute;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
}

.media-card.main {
  width: 100%;
  aspect-ratio: 4/3;
  right: 0;
  bottom: 0;
  z-index: 2;
}

.media-card.accent {
  width: 75%;
  aspect-ratio: 1;
  left: 0;
  top: 0;
  z-index: 1;
}

.media-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s ease;
}

.media-card:hover {
  transform: translateY(-10px);
  border-color: var(--accent);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(0, 255, 213, 0.2);
}

.media-card:hover .media-image {
  transform: scale(1.1);
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .about-content {
    order: 1;
  }

  .about-media {
    order: 2;
  }

  .media-stack {
    min-height: 500px;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 80px 0;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .about-cta {
    flex-direction: column;
  }

  .media-stack {
    min-height: 400px;
  }

  .media-card.accent {
    width: 70%;
  }
}

/* Enhanced Join Section */
.join {
  position: relative;
  padding: 120px 0;
  color: var(--text);
  overflow: hidden;
}

.join-background {
  position: absolute;
  inset: 0;
  background: var(--gradient-1);
  z-index: 0;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, 
    rgba(0, 0, 0, 0.4) 0%,
    transparent 100%
  );
  backdrop-filter: blur(20px);
}

.join-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.join-content h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 2rem 0;
  color: var(--primary);
}

.join-lead {
  font-size: 1.25rem;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 4rem;
  line-height: 1.6;
}

.join-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.join-feature {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  color: var(--primary);
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: var(--transition);
}

.join-feature:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.feature-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--primary);
  color: var(--accent);
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 700;
}

.join-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.join-cta .btn-primary {
  background: var(--primary);
  color: var(--text);
  border: none;
  padding: 1.25rem 3rem;
  font-size: 1.25rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.join-cta .btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
}

.join-note {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
}

@media (max-width: 768px) {
  .join {
    padding: 80px 0;
  }

  .join-features {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .join-feature {
    padding: 0.875rem 1.25rem;
  }

  .join-cta .btn-primary {
    width: 100%;
    padding: 1rem 2rem;
  }
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