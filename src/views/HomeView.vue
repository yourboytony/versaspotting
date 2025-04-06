<template>
  <div class="home">
    <!-- Simple Navigation -->
    <nav class="nav">
      <div class="container">
        <h1 class="logo">VERSA</h1>
        <button class="menu-btn" @click="menuOpen = !menuOpen">Menu</button>
        <div class="nav-menu" :class="{ 'is-open': menuOpen }">
          <a href="#home">Home</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a href="#join" class="cta">Join Now</a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="hero" id="home">
      <div class="container">
        <h2>Vancouver's Aviation Photography Community</h2>
        <p>Join us at YVR's most exclusive spotting locations</p>
        <div class="buttons">
          <a href="#join" class="button primary">Join VERSA</a>
          <a href="#gallery" class="button">View Gallery</a>
        </div>
      </div>
    </header>

    <!-- Gallery Section -->
    <section class="gallery" id="gallery">
      <div class="container">
        <h3>Latest Captures</h3>
        <div class="gallery-grid">
          <div v-for="photo in photos" :key="photo.id" class="photo-card">
            <img :src="photo.url" :alt="photo.title">
            <div class="photo-info">
              <h4>{{ photo.title }}</h4>
              <p>{{ photo.photographer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
      <div class="container">
        <h3>About Us</h3>
        <div class="features">
          <div v-for="feature in features" :key="feature.title" class="feature">
            <span class="icon">{{ feature.icon }}</span>
            <h4>{{ feature.title }}</h4>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Section -->
    <section class="join" id="join">
      <div class="container">
        <h3>Ready to Join?</h3>
        <p>Start your journey with Vancouver's aviation photography community</p>
        <a href="#" class="button primary">Apply Now</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const photos = [
  {
    id: 1,
    title: 'Boeing 787 Sunset',
    photographer: 'John Doe',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05'
  },
  {
    id: 2,
    title: 'Airbus A350 Landing',
    photographer: 'Jane Smith',
    url: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e'
  },
  {
    id: 3,
    title: 'Airport Operations',
    photographer: 'Mike Johnson',
    url: 'https://images.unsplash.com/photo-1449155125655-df9336797796'
  }
]

const features = [
  {
    icon: '📍',
    title: 'Premium Locations',
    description: 'Access to exclusive spotting locations'
  },
  {
    icon: '📸',
    title: 'Expert Guidance',
    description: 'Learn from experienced photographers'
  },
  {
    icon: '🤝',
    title: 'Community',
    description: 'Connect with fellow enthusiasts'
  }
]
</script>

<style>
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Variables */
:root {
  --dark: #0f172a;
  --gray: #1e293b;
  --blue: #38bdf8;
  --white: #f8fafc;
  --max-width: 1200px;
  --padding: 1rem;
}

/* Base */
body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--dark);
  color: var(--white);
  line-height: 1.5;
}

.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--padding);
}

/* Navigation */
.nav {
  background: var(--dark);
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

.nav .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-menu a {
  color: var(--white);
  text-decoration: none;
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
}

/* Hero */
.hero {
  padding: 8rem 0 4rem;
  text-align: center;
}

.hero h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

/* Sections */
section {
  padding: 4rem 0;
}

.gallery {
  background: var(--gray);
}

h3 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

/* Gallery Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.photo-card {
  background: var(--dark);
  border-radius: 0.5rem;
  overflow: hidden;
}

.photo-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.photo-info {
  padding: 1rem;
}

/* Features */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 2rem;
  background: var(--gray);
  border-radius: 0.5rem;
}

.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: inline-block;
}

/* Join Section */
.join {
  background: var(--gray);
  text-align: center;
}

/* Buttons */
.button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
}

.button:hover {
  opacity: 0.9;
}

.primary {
  background: var(--blue);
  color: var(--dark);
}

.button:not(.primary) {
  background: transparent;
  color: var(--white);
  border: 1px solid var(--white);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--dark);
    padding: 1rem;
    flex-direction: column;
  }

  .nav-menu.is-open {
    display: flex;
  }

  .buttons {
    flex-direction: column;
  }

  .button {
    width: 100%;
    text-align: center;
  }
}
</style>
