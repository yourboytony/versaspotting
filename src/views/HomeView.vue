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
        <div v-for="(feature, index) in features" :key="index" class="feature-card">
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
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
  animation: fadeIn 0.8s ease-out;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: var(--spacing-xl);
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

.hero-content {
  max-width: 800px;
  z-index: 2;
  animation: slideUp 0.8s ease-out 0.2s backwards;
}

.typing-text {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  color: var(--white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  min-height: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cursor {
  display: inline-block;
  width: 3px;
  height: 1em;
  background-color: var(--white);
  margin-left: 2px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.subtitle {
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.8s ease-out 0.4s backwards;
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  animation: fadeIn 0.8s ease-out 0.6s backwards;
}

.btn {
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.btn::after {
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

.btn:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}

.btn-primary {
  background-color: var(--primary-color);
  color: var(--white);
}

.btn-primary:hover {
  background-color: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(132, 155, 85, 0.4);
}

.btn-secondary {
  border: 2px solid var(--white);
  color: var(--white);
}

.btn-secondary:hover {
  background-color: var(--white);
  color: var(--dark);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
}

.floating-icons {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.floating-icon {
  position: absolute;
  color: var(--white);
  opacity: 0.1;
  font-size: 3rem;
  animation: float 10s infinite ease-in-out;
}

.floating-icon:nth-child(1) {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.floating-icon:nth-child(2) {
  top: 30%;
  right: 15%;
  animation-delay: 2s;
}

.floating-icon:nth-child(3) {
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

.features {
  padding: var(--spacing-xl) 0;
  background-color: rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.8s ease-out 0.8s backwards;
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  animation: slideUp 0.8s ease-out 1s backwards;
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.underline {
  width: 100px;
  height: 4px;
  background-color: var(--primary-color);
  margin: 0 auto;
  border-radius: var(--radius-sm);
  animation: scaleIn 0.8s ease-out 1.2s backwards;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
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
  animation: slideUp 0.8s ease-out backwards;
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

.feature-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.feature-card:hover::before {
  transform: translateX(100%);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  animation: float 3s ease-in-out infinite;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-sm);
}

.feature-card p {
  color: var(--white);
  opacity: 0.9;
}

.cta {
  padding: var(--spacing-xl) 0;
  text-align: center;
  background: linear-gradient(135deg, rgba(132, 155, 85, 0.2), rgba(0, 0, 0, 0.4));
  animation: fadeIn 0.8s ease-out 1.4s backwards;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.cta h2 {
  font-size: 2.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.cta p {
  font-size: 1.25rem;
  color: var(--white);
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
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
  .typing-text {
    font-size: 3rem;
  }
  
  .subtitle {
    font-size: 1.25rem;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style> 