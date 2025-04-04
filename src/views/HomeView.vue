<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="typing-text">
          <span class="typing">{{ typedText }}</span>
          <span class="cursor">|</span>
        </h1>
        <p class="subtitle">Capturing the beauty of aviation worldwide</p>
        <div class="hero-buttons">
          <router-link to="/portfolio" class="btn btn-primary">View Portfolio</router-link>
          <router-link to="/contact" class="btn btn-secondary">Contact Us</router-link>
        </div>
      </div>
      <div class="floating-icons">
        <font-awesome-icon :icon="['fas', 'plane']" class="floating-icon" />
        <font-awesome-icon :icon="['fas', 'camera']" class="floating-icon" />
        <font-awesome-icon :icon="['fas', 'cloud']" class="floating-icon" />
      </div>
    </section>

    <section class="features">
      <div class="section-header">
        <h2>What We Do</h2>
        <div class="underline"></div>
      </div>
      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-card" :style="{ animationDelay: `${index * 0.2}s` }">
          <div class="feature-icon">
            <font-awesome-icon :icon="feature.icon" />
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="cta-content">
        <h2>Ready to See More?</h2>
        <p>Explore our portfolio of stunning aviation photography</p>
        <router-link to="/portfolio" class="btn btn-primary">View Portfolio</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const typedText = ref('');
const fullText = 'VERSA Spotting';
let currentIndex = 0;

const features = [
  {
    title: 'Aviation Photography',
    description: 'Specializing in capturing the beauty and power of aircraft.',
    icon: 'camera'
  },
  {
    title: 'Building Community',
    description: 'Connecting aviation enthusiasts through our shared passion for spotting.',
    icon: 'users'
  },
  {
    title: 'Spotting Locations',
    description: 'Showcasing the best aircraft spotting locations.',
    icon: 'map-marker-alt'
  }
];

onMounted(() => {
  const typingInterval = setInterval(() => {
    if (currentIndex < fullText.length) {
      typedText.value += fullText[currentIndex];
      currentIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 150);
});
</script>

<style scoped>
.home {
  padding: var(--spacing-xl);
  max-width: var(--container-width);
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
  animation: fadeIn 0.5s ease-out;
}

.hero {
  text-align: center;
  padding: var(--spacing-xl) 0;
  margin-bottom: var(--spacing-xl);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(132, 155, 85, 0.1) 0%, transparent 70%);
  animation: pulse 4s infinite;
}

.hero h1 {
  font-size: 4rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  animation: float 3s ease-in-out infinite;
}

.hero p {
  font-size: 1.5rem;
  color: var(--white);
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto var(--spacing-xl);
  line-height: 1.6;
  animation: slideIn 0.5s ease-out 0.2s backwards;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  animation: fadeIn 0.5s ease-out 0.4s backwards;
}

.feature-card {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.feature-card:hover::before {
  transform: translateX(100%);
}

.feature-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  animation: float 3s ease-in-out infinite;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  font-weight: 600;
}

.feature-card p {
  color: var(--white);
  opacity: 0.8;
  line-height: 1.6;
}

.cta {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.5s ease-out 0.6s backwards;
}

.cta h2 {
  font-size: 2.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.cta p {
  font-size: 1.2rem;
  color: var(--white);
  opacity: 0.8;
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-xl);
  background-color: var(--primary-color);
  color: var(--white);
  text-decoration: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(132, 155, 85, 0.4);
}

.cta-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.cta-button:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.5;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero p {
    font-size: 1.2rem;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
  
  .feature-card {
    padding: var(--spacing-lg);
  }
  
  .cta h2 {
    font-size: 2rem;
  }
}
</style> 