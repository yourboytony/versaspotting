<template>
  <div class="app">
    <nav class="nav">
      <router-link to="/" class="nav-logo">
        <img src="@/assets/logo.png" alt="VERSA Spotting" />
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </div>
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
    </nav>

    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <button class="close-btn" @click="toggleMobileMenu">×</button>
      <router-link to="/" class="mobile-link" @click="toggleMobileMenu">Home</router-link>
      <router-link to="/portfolio" class="mobile-link" @click="toggleMobileMenu">Portfolio</router-link>
      <router-link to="/contact" class="mobile-link" @click="toggleMobileMenu">Contact</router-link>
    </div>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>VERSA Spotting</h3>
          <p>Capturing the beauty of aviation worldwide</p>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <router-link to="/" class="footer-link">Home</router-link>
          <router-link to="/portfolio" class="footer-link">Portfolio</router-link>
          <router-link to="/contact" class="footer-link">Contact</router-link>
        </div>
        <div class="footer-section">
          <h3>Connect</h3>
          <div class="social-links">
            <a href="#" class="social-link">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="#" class="social-link">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a href="#" class="social-link">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 VERSA Spotting. All rights reserved.</p>
      </div>
    </footer>

    <FeedbackPopup />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FeedbackPopup from '@/components/FeedbackPopup.vue';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style>
:root {
  /* Colors */
  --primary-color: #849b55;
  --primary-light: #9ab36a;
  --white: #ffffff;
  --dark: #1a1a1a;
  --gray: #666666;
  --light-gray: #f5f5f5;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition: all 0.3s ease;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-light);
}

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: var(--dark);
  background-color: var(--light-gray);
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navigation */
.nav {
  background-color: var(--dark);
  padding: var(--spacing-md) var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
}

.nav-logo img {
  height: 40px;
}

.nav-links {
  display: flex;
  gap: var(--spacing-xl);
}

.nav-link {
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: var(--transition);
}

.nav-link:hover::after {
  width: 100%;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100vh;
  background-color: var(--dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xl);
  transition: var(--transition);
  z-index: 999;
}

.mobile-menu.is-open {
  right: 0;
}

.mobile-link {
  color: var(--white);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  transition: var(--transition);
}

.mobile-link:hover {
  color: var(--primary-color);
}

.close-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-xl);
  background: none;
  border: none;
  color: var(--white);
  font-size: 2rem;
  cursor: pointer;
  transition: var(--transition);
}

.close-btn:hover {
  color: var(--primary-color);
}

/* Main Content */
.main-content {
  flex: 1;
  margin-top: 80px;
}

/* Footer */
.footer {
  background-color: var(--dark);
  color: var(--white);
  padding: var(--spacing-xl) 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.footer-section h3 {
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
}

.footer-link {
  display: block;
  color: var(--white);
  text-decoration: none;
  margin-bottom: var(--spacing-sm);
  transition: var(--transition);
}

.footer-link:hover {
  color: var(--primary-color);
  transform: translateX(5px);
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-link {
  color: var(--white);
  font-size: 1.5rem;
  transition: var(--transition);
}

.social-link:hover {
  color: var(--primary-color);
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-xl);
  margin-top: var(--spacing-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}

/* Animations */
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

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style> 