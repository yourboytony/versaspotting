<template>
  <div class="about">
    <nav class="nav">
      <div class="container">
        <h1 class="logo">VERSA</h1>
        <button class="menu-btn" @click="menuOpen = !menuOpen">Menu</button>
        <div class="nav-menu" :class="{ 'is-open': menuOpen }">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </nav>

    <main class="container">
      <h2>About VERSA</h2>
      <p>VERSA is Vancouver's premier aviation photography community, dedicated to capturing the beauty of aviation at YVR.</p>
      
      <div class="features">
        <div class="feature">
          <span class="icon">📍</span>
          <h3>Premium Locations</h3>
          <p>Access to exclusive spotting locations around YVR</p>
        </div>
        <div class="feature">
          <span class="icon">📸</span>
          <h3>Expert Guidance</h3>
          <p>Learn from experienced aviation photographers</p>
        </div>
        <div class="feature">
          <span class="icon">🤝</span>
          <h3>Community</h3>
          <p>Connect with fellow aviation enthusiasts</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<style scoped>
.about {
  min-height: 100vh;
  background: var(--dark);
  color: var(--white);
  padding-top: 4rem;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem var(--padding);
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

p {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature {
  background: var(--gray);
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
}

.feature h3 {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.icon {
  font-size: 2.5rem;
  display: block;
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style> 