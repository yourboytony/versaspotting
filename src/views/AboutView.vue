<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero" :style="{ backgroundImage: `url('${recentPhotos[currentBackgroundIndex]?.imageUrl || 'https://i.postimg.cc/MZF9qXhP/20250330-DSC03087-modified.png'}')` }">
      <div class="hero-content">
        <h1>About VERSA</h1>
        <p class="hero-subtitle">Vancouver's Premier Aviation Photography Community</p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="container">
        <div class="mission-content">
          <h2>Our Mission</h2>
          <p>VERSA Spotting Group is dedicated to capturing and sharing the beauty of aviation through our lenses. We bring together aviation enthusiasts and photographers who share a passion for aircraft and photography.</p>
          <p>Our community is built on the principles of collaboration, learning, and respect for both aviation and photography.</p>
        </div>
        <div class="mission-image">
          <img :src="recentPhotos[1]?.imageUrl || 'https://i.postimg.cc/MZF9qXhP/20250330-DSC03087-modified.png'" alt="VERSA Group">
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <h2>Our Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <i class="icon-camera"></i>
            </div>
            <h3>Excellence</h3>
            <p>We strive for excellence in every photograph, pushing the boundaries of aviation photography.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <i class="icon-users"></i>
            </div>
            <h3>Community</h3>
            <p>We foster a supportive community where photographers can learn, grow, and share their passion.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <i class="icon-location"></i>
            </div>
            <h3>Location</h3>
            <p>We take advantage of our prime location at YVR to capture unique aviation moments.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <i class="icon-education"></i>
            </div>
            <h3>Education</h3>
            <p>We believe in continuous learning and sharing knowledge with our community.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <h2>Our Team</h2>
        <div class="team-grid">
          <div v-for="photographer in photographers" :key="photographer.id" class="team-card">
            <div class="team-image">
              <img :src="photographer.profileImage || 'https://i.postimg.cc/MZF9qXhP/20250330-DSC03087-modified.png'" :alt="photographer.name">
            </div>
            <h3>{{ photographer.name }}</h3>
            <p class="team-role">{{ photographer.role || 'Photographer' }}</p>
            <p class="team-bio">{{ photographer.bio || 'Passionate aviation photographer capturing the beauty of flight.' }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">{{ totalPhotographers }}</span>
            <span class="stat-label">Members</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ totalPhotos }}</span>
            <span class="stat-label">Photos</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ totalLocations }}</span>
            <span class="stat-label">Locations</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">50+</span>
            <span class="stat-label">Events</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Section -->
    <section class="join-section">
      <div class="container">
        <h2>Join Our Community</h2>
        <p>Become part of Vancouver's premier aviation photography community</p>
        <router-link to="/applications" class="join-button">Apply Now</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { useDataStore } from '../stores/dataStore'

const dataStore = useDataStore()

// Stats
const totalPhotos = computed(() => dataStore.photos.length)
const totalPhotographers = computed(() => dataStore.photographers.length)
const totalLocations = ref(8)

// Get photographers for team section
const photographers = computed(() => {
  return dataStore.photographers
})

// Get recent photos for display
const recentPhotos = computed(() => {
  return [...dataStore.photos]
    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
    .slice(0, 15) // Get 15 most recent photos
})

// Background photo rotation
const currentBackgroundIndex = ref(0)

onMounted(() => {
  // Rotate background photo every 5 seconds
  setInterval(() => {
    if (recentPhotos.value.length > 0) {
      currentBackgroundIndex.value = (currentBackgroundIndex.value + 1) % recentPhotos.value.length
    }
  }, 5000)

  // Hero animations
  gsap.from('.hero-content', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    ease: 'power2.out'
  })

  // Mission section animations
  gsap.from('.mission-content', {
    scrollTrigger: {
      trigger: '.mission-section',
      start: 'top 80%'
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  })

  gsap.from('.mission-image', {
    scrollTrigger: {
      trigger: '.mission-section',
      start: 'top 80%'
    },
    x: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  })

  // Values animations
  gsap.from('.value-card', {
    scrollTrigger: {
      trigger: '.values-section',
      start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out'
  })

  // Team animations
  gsap.from('.team-card', {
    scrollTrigger: {
      trigger: '.team-section',
      start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out'
  })

  // Stats animations
  gsap.from('.stat-item', {
    scrollTrigger: {
      trigger: '.stats-section',
      start: 'top 80%'
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  })

  // Join section animation
  gsap.from('.join-section', {
    scrollTrigger: {
      trigger: '.join-section',
      start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: var(--background-color);
}

/* Hero Section */
.about-hero {
  height: 50vh;
  width: 100%;
  background-size: 100% 100% !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.about-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-content h1 {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--primary-color);
  text-shadow: 0 0 20px rgba(144, 153, 62, 0.5);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #ffffff;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Mission Section */
.mission-section {
  padding: 6rem 0;
  background: var(--card-background);
}

.mission-section .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.mission-content h2 {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-weight: 700;
}

.mission-content p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.mission-image {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.mission-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Values Section */
.values-section {
  padding: 6rem 0;
  background: var(--background-color);
}

.values-section h2 {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 700;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.value-card {
  background: var(--card-background);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.value-card h3 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
}

.value-card p {
  color: var(--text-color);
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Team Section */
.team-section {
  padding: 6rem 0;
  background: var(--card-background);
}

.team-section h2 {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 700;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.team-card {
  background: var(--background-color);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}

.team-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-card h3 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin: 1.5rem 1.5rem 0.5rem;
  font-weight: 600;
}

.team-role {
  color: var(--text-color);
  font-size: 1rem;
  margin: 0 1.5rem 1rem;
  font-weight: 500;
}

.team-bio {
  color: var(--text-color);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 1.5rem 1.5rem;
}

/* Stats Section */
.stats-section {
  padding: 6rem 0;
  background: var(--background-color);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  line-height: 1;
}

.stat-label {
  color: var(--text-color);
  font-size: 1.2rem;
  font-weight: 500;
}

/* Join Section */
.join-section {
  padding: 6rem 0;
  background: var(--card-background);
  text-align: center;
}

.join-section h2 {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 700;
}

.join-section p {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.join-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: var(--primary-color);
  color: #000000;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.join-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(144, 153, 62, 0.3);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 968px) {
  .mission-section .container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .mission-content {
    text-align: center;
  }

  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-hero {
    height: 40vh;
  }

  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .mission-content h2,
  .values-section h2,
  .team-section h2,
  .join-section h2 {
    font-size: 2.5rem;
  }

  .values-grid,
  .team-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 0 1.5rem;
  }
}
</style> 