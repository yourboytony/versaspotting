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
  --primary: #0f172a;
  --secondary: #1e293b;
  --accent: #38bdf8;
  --text: #f8fafc;
  --text-secondary: #94a3b8;
  --spacing: 2rem;
  --radius: 8px;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  background: var(--primary);
  color: var(--text);
  line-height: 1.5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing);
}

/* Navigation */
.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--primary);
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  height: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  color: var(--accent);
}

.nav-cta {
  background: var(--accent);
  color: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-weight: 600;
  border: none;
  cursor: pointer;
}

/* Hero Section */
.hero {
  padding: 8rem 0 4rem;
  background: var(--primary);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.btn-primary {
  background: var(--accent);
  color: var(--primary);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.btn-secondary {
  background: transparent;
  color: var(--text);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  border: 1px solid var(--text-secondary);
  cursor: pointer;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  background: var(--secondary);
  border-radius: var(--radius);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

/* Latest Captures */
.latest {
  padding: 4rem 0;
  background: var(--secondary);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.photo-card {
  background: var(--primary);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.photo-image {
  position: relative;
  aspect-ratio: 16/9;
}

.photo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-info {
  padding: 1.5rem;
}

.photo-info h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.photo-meta {
  display: flex;
  gap: 1rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

/* About Section */
.about {
  padding: 4rem 0;
  background: var(--primary);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.feature-grid {
  display: grid;
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--secondary);
  border-radius: var(--radius);
}

.feature-icon {
  font-size: 1.5rem;
  color: var(--accent);
}

/* Join Section */
.join {
  padding: 4rem 0;
  background: var(--secondary);
  text-align: center;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
}

.benefit-card {
  padding: 1.5rem;
  background: var(--primary);
  border-radius: var(--radius);
}

.benefit-icon {
  font-size: 1.5rem;
  color: var(--accent);
  margin-bottom: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-cta {
    flex-direction: column;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .about-grid {
    grid-template-columns: 1fr;
  }

  .nav-links {
    display: none;
  }

  .nav-links.nav-open {
    display: flex;
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    background: var(--primary);
    padding: 1rem;
    flex-direction: column;
    align-items: stretch;
  }

  .nav-toggle {
    display: block;
  }
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 2rem;
}
</style>