<template>
  <main class="home">
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
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useDataStore } from '../stores/dataStore'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const dataStore = useDataStore()
const currentSlide = ref(0)

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
  const heroTitle = new SplitType('.hero-text h1', { types: 'lines' })
  
  // Hero animations
  const heroTL = gsap.timeline({ delay: 0.5 })
  heroTL
    .from(heroTitle.lines, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-cta', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.7')
    .from('.hero-counter', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')

  // Scroll animations
  gsap.from('.photo-card', {
    scrollTrigger: {
      trigger: '.photo-grid',
      start: 'top 80%'
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  })

  gsap.from('.feature-item', {
    scrollTrigger: {
      trigger: '.feature-grid',
      start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  })

  gsap.from('.media-stack img', {
    scrollTrigger: {
      trigger: '.about-media',
      start: 'top 80%'
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: 'power3.out'
  })
}

// Slide rotation
const rotateSlides = () => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % 3
  }, 5000)
}

onMounted(() => {
  initAnimations()
  rotateSlides()
})
</script>

<style scoped>
/* Base Styles */
:root {
  --primary: #1e1e1e;
  --secondary: #292929;
  --accent: #64ffda;
  --text: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --spacing: clamp(1rem, 5vw, 2rem);
  --radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing);
}

/* Typography */
h1, h2, h3 {
  margin: 0;
  line-height: 1.2;
}

.overline {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: 1rem;
  display: block;
}

/* Hero Section */
.hero {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  color: var(--text);
  overflow: hidden;
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
  transition: opacity 1s ease-out, transform 6s ease-out;
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
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  max-width: 800px;
}

.hero-text h1 {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  margin-bottom: 2rem;
}

.hero-text h1 .line {
  display: block;
  overflow: hidden;
}

.hero-text h1 .accent {
  color: var(--accent);
}

.hero-subtitle {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  color: var(--text-secondary);
  margin-bottom: 3rem;
  max-width: 600px;
}

.hero-counter {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

.counter-item {
  text-align: right;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius);
}

.counter-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent);
}

.counter-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Latest Section */
.latest {
  padding: 8rem 0;
  background: var(--primary);
  color: var(--text);
}

.section-header {
  margin-bottom: 4rem;
  text-align: center;
}

.section-header h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
}

.section-header p {
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.photo-card {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--secondary);
  transition: var(--transition);
}

.photo-card:hover {
  transform: translateY(-10px);
}

.photo-image {
  aspect-ratio: 16/9;
  overflow: hidden;
}

.photo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.photo-card:hover .photo-image img {
  transform: scale(1.1);
}

.photo-info {
  padding: 2rem;
}

.photo-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.photo-info p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.photo-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--accent);
}

/* About Section */
.about {
  padding: 8rem 0;
  background: var(--secondary);
  color: var(--text);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-content h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
}

.about-lead {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.feature-item {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius);
  transition: var(--transition);
}

.feature-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-item h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.feature-item p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.media-stack {
  position: relative;
  padding-top: 2rem;
  padding-left: 2rem;
}

.stack-image {
  border-radius: var(--radius);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.stack-image.main {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

.stack-image.accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  aspect-ratio: 1;
  object-fit: cover;
  z-index: 1;
}

/* Join Section */
.join {
  padding: 8rem 0;
  background: var(--accent);
  color: var(--primary);
  text-align: center;
}

.join-content {
  max-width: 600px;
  margin: 0 auto;
}

.join h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
}

.join p {
  margin-bottom: 2rem;
  opacity: 0.8;
}

/* Buttons */
.btn-primary,
.btn-secondary {
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: var(--transition);
}

.btn-primary {
  background: var(--accent);
  color: var(--primary);
  margin-right: 1rem;
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--text);
  color: var(--text);
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 2;
  color: var(--text);
  font-size: 0.875rem;
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, var(--text), transparent);
  margin: 1rem auto 0;
  position: relative;
}

.scroll-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: var(--text);
  border-radius: 50%;
  animation: scrollDot 2s infinite;
}

@keyframes scrollDot {
  0% { transform: translate(-50%, 0); opacity: 1; }
  100% { transform: translate(-50%, 20px); opacity: 0; }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-counter {
    grid-template-columns: repeat(3, 1fr);
  }

  .counter-item {
    text-align: center;
  }

  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-media {
    order: -1;
  }
}

@media (max-width: 768px) {
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
}

@media (max-width: 480px) {
  .hero-counter {
    grid-template-columns: 1fr;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>