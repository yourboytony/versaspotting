<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <nav class="nav">
          <router-link to="/" class="logo-link" @click="scrollToTop">
            <span class="logo-text">VERSA</span>
            <span class="logo-subtext">Spotting Group</span>
          </router-link>
          
          <div class="nav-links" :class="{ 'active': mobileMenuOpen }">
            <router-link to="/" @click="scrollToTop" class="nav-link">
              <span class="nav-text">Home</span>
              <span class="nav-dot"></span>
            </router-link>
            <router-link to="/portfolio" @click="scrollToTop" class="nav-link">
              <span class="nav-text">Portfolio</span>
              <span class="nav-dot"></span>
            </router-link>
            <router-link to="/news" @click="scrollToTop" class="nav-link">
              <span class="nav-text">News</span>
              <span class="nav-dot"></span>
            </router-link>
            <router-link to="/about" @click="scrollToTop" class="nav-link">
              <span class="nav-text">About</span>
              <span class="nav-dot"></span>
            </router-link>
            <router-link to="/apply" @click="scrollToTop" class="nav-link">
              <span class="nav-text">Apply</span>
              <span class="nav-dot"></span>
            </router-link>
            <router-link to="/admin" class="nav-link admin-link" v-if="isAdmin">
              <span class="nav-text">Admin</span>
              <span class="nav-dot"></span>
            </router-link>
          </div>
          
          <button class="mobile-menu-button" @click="toggleMobileMenu" :class="{ 'active': mobileMenuOpen }">
            <span class="toggle-line"></span>
            <span class="toggle-line"></span>
            <span class="toggle-line"></span>
          </button>
        </nav>
      </div>
    </header>

    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>VERSA Spotting Group</h3>
            <p>Capturing the beauty of aviation through the lenses of passionate photographers.</p>
            <div class="social-links">
              <a href="#" class="social-link" target="_blank">
                <i class="icon-instagram"></i>
              </a>
              <a href="#" class="social-link" target="_blank">
                <i class="icon-facebook"></i>
              </a>
              <a href="#" class="social-link" target="_blank">
                <i class="icon-twitter"></i>
              </a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>Quick Links</h4>
            <div class="quick-links-container">
              <div class="quick-links-column">
                <router-link to="/" @click="scrollToTop" class="quick-link">
                  <i class="fas fa-home"></i>
                  <span>Home</span>
                </router-link>
                <router-link to="/portfolio" @click="scrollToTop" class="quick-link">
                  <i class="fas fa-images"></i>
                  <span>Portfolio</span>
                </router-link>
                <router-link to="/news" @click="scrollToTop" class="quick-link">
                  <i class="fas fa-newspaper"></i>
                  <span>News</span>
                </router-link>
              </div>
              <div class="quick-links-column">
                <router-link to="/about" @click="scrollToTop" class="quick-link">
                  <i class="fas fa-info-circle"></i>
                  <span>About</span>
                </router-link>
                <router-link to="/apply" @click="scrollToTop" class="quick-link">
                  <i class="fas fa-user-plus"></i>
                  <span>Apply</span>
                </router-link>
                <router-link to="/contact" @click="scrollToTop" class="quick-link">
                  <i class="fas fa-envelope"></i>
                  <span>Contact</span>
                </router-link>
              </div>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>Contact</h4>
            <div class="contact-info">
              <p><i class="icon-email"></i> info@versaspotting.com</p>
              <p><i class="icon-location"></i> Based in Vancouver, Canada (YVR)</p>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ new Date().getFullYear() }} VERSA Spotting Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { useDataStore } from './stores/dataStore'
import { storeToRefs } from 'pinia'
import NavBar from './components/NavBar.vue'

const router = useRouter()
const isAdmin = computed(() => localStorage.getItem('adminToken') !== null)
const mobileMenuOpen = ref(false)
const store = useDataStore()
const { photographers, announcements } = storeToRefs(store)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : 'auto'
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(async () => {
  await store.initializeData()

  // Animate logo on mount
  gsap.from('.logo-text', {
    duration: 0.5,
    y: 0,
    opacity: 1,
    ease: 'power2.out'
  })

  gsap.from('.logo-subtext', {
    duration: 0.5,
    y: 0,
    opacity: 1,
    delay: 0.1,
    ease: 'power2.out'
  })

  // Animate nav links
  gsap.from('.nav-link', {
    duration: 0.4,
    y: 0,
    opacity: 1,
    stagger: 0.05,
    delay: 0.2,
    ease: 'power2.out'
  })

  // Enhanced footer animations
  gsap.from('.footer-section', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
  })

  // Animate social links
  gsap.from('.social-link', {
    scrollTrigger: {
      trigger: '.social-links',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.5,
    scale: 0,
    opacity: 0,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  })

  // Animate footer links
  gsap.from('.footer-links li', {
    scrollTrigger: {
      trigger: '.footer-links',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.6,
    x: -20,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
  })

  // Animate contact info
  gsap.from('.contact-info p', {
    scrollTrigger: {
      trigger: '.contact-info',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.6,
    x: 20,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
  })
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

:root {
  --primary-color: #90993e;
  --primary-dark: #6b7230;
  --primary-light: #b0b95e;
  --accent-color: #c4c97c;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
  --background-color: #000000;
  --card-background: #141414;
  --card-hover: #1a1a1a;
  --border-color: rgba(255, 255, 255, 0.1);
  --gradient-start: rgba(144, 153, 62, 0.1);
  --gradient-end: rgba(10, 10, 10, 0.95);
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-xxl: 4rem;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  line-height: 1.6;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top right, var(--gradient-start), var(--gradient-end));
}

.header {
  background-color: var(--background-color);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--border-color);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.logo-link {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  letter-spacing: 0.5px;
}

.logo-subtext {
  font-size: 0.8rem;
  color: var(--text-color);
  opacity: 0.8;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.nav-link:hover {
  opacity: 1;
}

.nav-link.router-link-active {
  opacity: 1;
  font-weight: 500;
}

.nav-text {
  font-size: 1.1rem;
  letter-spacing: 1px;
  transition: all var(--transition-normal);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.nav-dot {
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  border-radius: var(--radius-full);
  position: absolute;
  bottom: 0;
  opacity: 0;
  transform: translateY(5px);
  transition: all var(--transition-normal);
  box-shadow: 0 0 10px rgba(144, 153, 62, 0.5);
  animation: sparkle 2s infinite;
}

.nav-link:hover .nav-text {
  color: var(--primary-color);
  transform: translateY(-2px);
  text-shadow: 0 0 10px rgba(144, 153, 62, 0.5);
}

.nav-link:hover .nav-dot {
  opacity: 1;
  transform: translateY(0);
}

.nav-link.router-link-active .nav-text {
  color: var(--primary-color);
  text-shadow: 0 0 10px rgba(144, 153, 62, 0.5);
}

.nav-link.router-link-active .nav-dot {
  opacity: 1;
  transform: translateY(0);
}

.admin-link .nav-text {
  color: var(--accent-color);
  text-shadow: 0 0 10px rgba(196, 201, 124, 0.5);
}

.admin-link:hover .nav-text {
  color: var(--primary-light);
  text-shadow: 0 0 10px rgba(176, 185, 94, 0.5);
}

.mobile-menu-button {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  padding: var(--spacing-xs);
  background: none;
  border: none;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.mobile-menu-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(144, 153, 62, 0.1),
    rgba(176, 185, 94, 0.1)
  );
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.mobile-menu-button:hover::before {
  opacity: 1;
}

.mobile-menu-button.active .toggle-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-button.active .toggle-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-button.active .toggle-line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.toggle-line {
  width: 25px;
  height: 2px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  transition: all var(--transition-normal);
  box-shadow: 0 0 10px rgba(144, 153, 62, 0.5);
  position: relative;
  overflow: hidden;
}

.toggle-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(144, 153, 62, 0.5),
    transparent
  );
  animation: shimmer 2s infinite;
}

.main {
  margin-top: 4rem;
  flex: 1;
  padding: 2rem 0;
}

.footer {
  background-color: var(--background-color);
  padding: 3rem 0 1rem;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding-bottom: 2rem;
}

.footer-section h3 {
  color: var(--text-color);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.footer-section p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-link {
  color: var(--text-secondary);
  font-size: 1.2rem;
  transition: opacity 0.2s ease;
  opacity: 0.8;
}

.social-link:hover {
  opacity: 1;
}

.quick-links-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.quick-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.quick-link:hover {
  opacity: 1;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }

  .quick-links-container {
    grid-template-columns: 1fr;
  }
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.02);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .container {
    padding: 0 var(--spacing-md);
  }

  .nav-links {
    gap: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .mobile-menu-button {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background-color: rgba(20, 20, 20, 0.98);
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-lg);
    transition: right var(--transition-normal);
    padding: var(--spacing-lg);
    backdrop-filter: blur(12px);
  }

  .nav-links.active {
    right: 0;
  }

  .nav-link {
    font-size: 1.4rem;
  }

  .nav-text {
    font-size: 1.4rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--spacing-lg);
  }

  .footer-section h3::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .social-links {
    justify-content: center;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .quick-links-container {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(
    to bottom,
    var(--background-color),
    var(--card-background)
  );
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(
    to bottom,
    var(--primary-color),
    var(--primary-light)
  );
  border-radius: var(--radius-full);
  box-shadow: 
    0 0 10px rgba(144, 153, 62, 0.5),
    inset 0 0 5px rgba(0, 0, 0, 0.3);
  animation: glow 2s infinite;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(var(--primary-light), var(--primary-color));
}

/* Add these new animations and effects */
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
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(144, 153, 62, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(144, 153, 62, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(144, 153, 62, 0.5);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

@keyframes sparkle {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 0;
  }
}

@keyframes wave {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-5px) rotate(5deg);
  }
  75% {
    transform: translateY(5px) rotate(-5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes neonPulse {
  0% {
    text-shadow: 0 0 5px var(--primary-color),
                 0 0 10px var(--primary-color),
                 0 0 15px var(--primary-color);
  }
  50% {
    text-shadow: 0 0 10px var(--primary-color),
                 0 0 20px var(--primary-color),
                 0 0 30px var(--primary-color);
  }
  100% {
    text-shadow: 0 0 5px var(--primary-color),
                 0 0 10px var(--primary-color),
                 0 0 15px var(--primary-color);
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Background Effects */
.app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 20%, rgba(144, 153, 62, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(176, 185, 94, 0.1) 0%, transparent 50%);
  animation: gradientShift 10s infinite;
  pointer-events: none;
  z-index: -1;
}

/* New Quick Links Styles */
.quick-links-container {
  display: flex;
  gap: var(--spacing-lg);
}

.quick-links-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.quick-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  transition: color var(--transition-normal);
}

.quick-link i {
  color: var(--primary-color);
  font-size: 1.2rem;
}

.quick-link:hover {
  color: var(--text-color);
}

@media (max-width: 768px) {
  .quick-links-container {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}
</style> 