<template>
  <main class="home">
    <nav class="main-nav" :class="{ 'nav-scrolled': isScrolled }">
      <div class="container">
        <div class="nav-brand">VERSA</div>
        <div class="nav-links" :class="{ 'nav-open': isMenuOpen }">
          <a href="#" class="nav-link">Home</a>
          <a href="#latest" class="nav-link">Gallery</a>
          <a href="#about" class="nav-link">About</a>
          <button class="btn-primary">Join VERSA</button>
        </div>
        <button class="nav-toggle" @click="toggleMenu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <section class="hero">
      <div class="container">
        <h1>Vancouver's Elite Aviation Photography Community</h1>
        <p>Experience the art of aviation photography at YVR's most exclusive locations</p>
        <div class="cta">
          <button class="btn-primary">Join VERSA</button>
          <button class="btn-secondary">View Gallery</button>
        </div>
      </div>
    </section>

    <section id="latest" class="latest">
      <div class="container">
        <h2>Latest Captures</h2>
        <div class="grid">
          <div v-for="photo in photos" :key="photo.id" class="card">
            <img :src="photo.url" :alt="photo.title">
            <div class="info">
              <h3>{{ photo.title }}</h3>
              <p>{{ photo.photographer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="about">
      <div class="container">
        <h2>About VERSA</h2>
        <p>Join Vancouver's most prestigious aviation photography community.</p>
        <div class="grid">
          <div v-for="feature in features" :key="feature.title" class="card">
            <div class="icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const photos = [
  { id: 1, title: 'Boeing 787 Sunset', photographer: 'John Doe', url: 'https://placehold.co/600x400' },
  { id: 2, title: 'Airbus A350 Landing', photographer: 'Jane Smith', url: 'https://placehold.co/600x400' },
  { id: 3, title: 'Airport Operations', photographer: 'Mike Johnson', url: 'https://placehold.co/600x400' }
]

const features = [
  { icon: '🎯', title: 'Premium Locations', description: 'Access to exclusive spotting locations' },
  { icon: '📸', title: 'Expert Guidance', description: 'Learn from top photographers' },
  { icon: '👥', title: 'Community', description: 'Connect with aviation enthusiasts' }
]
</script>

<style>
:root {
  --primary: #0f172a;
  --secondary: #1e293b;
  --accent: #38bdf8;
  --text: #f8fafc;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: var(--primary);
  color: var(--text);
  line-height: 1.5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--primary);
  padding: 1rem 0;
  z-index: 100;
}

.main-nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  height: 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--text);
  text-decoration: none;
}

.hero {
  padding: 8rem 0 4rem;
  text-align: center;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  margin-bottom: 1rem;
}

.cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}

.btn-primary {
  background: var(--accent);
  color: var(--primary);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary {
  background: transparent;
  color: var(--text);
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--text);
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.latest,
.about {
  padding: 4rem 0;
}

.latest {
  background: var(--secondary);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.card {
  background: var(--primary);
  border-radius: 0.5rem;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.info {
  padding: 1.5rem;
}

.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text);
  margin: 4px 0;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
}

@media (max-width: 768px) {
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
  }

  .nav-toggle {
    display: block;
  }

  .cta {
    flex-direction: column;
  }
}
</style>
