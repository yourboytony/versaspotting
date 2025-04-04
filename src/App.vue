<template>
  <div class="app">
    <nav class="navbar">
      <div class="nav-content">
        <router-link to="/" class="nav-logo">
          <span class="logo-text">VERSA</span>
          <span class="logo-subtext">Spotting</span>
        </router-link>
        
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/portfolio">Portfolio</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/contact">Contact</router-link>
        </div>

        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
    </nav>

    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <button class="close-btn" @click="closeMobileMenu">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
      <router-link to="/" class="mobile-link" @click="closeMobileMenu">Home</router-link>
      <router-link to="/portfolio" class="mobile-link" @click="closeMobileMenu">Portfolio</router-link>
      <router-link to="/about" class="mobile-link" @click="closeMobileMenu">About</router-link>
      <router-link to="/contact" class="mobile-link" @click="closeMobileMenu">Contact</router-link>
    </div>

    <main class="content-overlay">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>VERSA Spotting</h3>
          <p>Capturing the beauty of aviation at YVR</p>
          <div class="social-links">
            <a href="https://instagram.com/versaspotting" target="_blank" class="social-link">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="https://twitter.com/versaspotting" target="_blank" class="social-link">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a href="https://facebook.com/versaspotting" target="_blank" class="social-link">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
          </div>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <router-link to="/" class="footer-link">Home</router-link>
          <router-link to="/portfolio" class="footer-link">Portfolio</router-link>
          <router-link to="/about" class="footer-link">About</router-link>
          <a href="mailto:contact@versaspotting.com" class="footer-link">Contact</a>
        </div>
        <div class="footer-section">
          <h3>Contact Us</h3>
          <p>Email: contact@versaspotting.com</p>
          <p>Location: Vancouver International Airport (YVR)</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 VERSA Spotting Group. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style>
:root {
  --primary-color: #849b55;
  --primary-light: #9ab36a;
  --primary-dark: #6d8244;
  --secondary-color: #2c3e50;
  --accent-color: #e74c3c;
  --text-color: #333;
  --light-gray: #f5f5f5;
  --medium-gray: #e0e0e0;
  --dark-gray: #666;
  --white: #ffffff;
  --black: #000000;
  --success: #2ecc71;
  --warning: #f1c40f;
  --error: #e74c3c;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-xxl: 3rem;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
  --transition-slow: all 0.5s ease;
  --transition-fast: all 0.15s ease;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --font-mono: 'Fira Code', monospace;
  --font-serif: Georgia, 'Times New Roman', Times, serif;
  --container-width: 1200px;
  --header-height: 64px;
  --footer-height: 200px;
  --z-index-dropdown: 1000;
  --z-index-sticky: 1020;
  --z-index-fixed: 1030;
  --z-index-modal-backdrop: 1040;
  --z-index-modal: 1050;
  --z-index-popover: 1060;
  --z-index-tooltip: 1070;
}

/* Base styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--light-gray);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--light-gray);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-dark);
}

/* Selection styling */
::selection {
  background: var(--primary-color);
  color: var(--white);
}

/* Link styles */
a {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* Button styles */
button {
  cursor: pointer;
  transition: var(--transition);
}

button:hover {
  transform: translateY(-1px);
}

/* Form elements */
input, textarea, select {
  transition: var(--transition);
}

input:focus, textarea:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-color);
}

/* Card styles */
.card {
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Image styles */
img {
  transition: var(--transition);
}

img:hover {
  opacity: 0.9;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading {
  animation: spin 1s linear infinite;
}

/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}

/* Slide up animation */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-up {
  animation: slideUp 0.3s ease-out;
}

/* Container */
.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* Responsive utilities */
@media (max-width: 768px) {
  :root {
    --container-width: 100%;
    --spacing-xl: 1.5rem;
    --spacing-xxl: 2rem;
  }
  
  .container {
    padding: 0 var(--spacing-sm);
  }
}

/* Utility classes */
.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.mt-1 { margin-top: var(--spacing-xs); }
.mt-2 { margin-top: var(--spacing-sm); }
.mt-3 { margin-top: var(--spacing-md); }
.mt-4 { margin-top: var(--spacing-lg); }
.mt-5 { margin-top: var(--spacing-xl); }

.mb-1 { margin-bottom: var(--spacing-xs); }
.mb-2 { margin-bottom: var(--spacing-sm); }
.mb-3 { margin-bottom: var(--spacing-md); }
.mb-4 { margin-bottom: var(--spacing-lg); }
.mb-5 { margin-bottom: var(--spacing-xl); }

.p-1 { padding: var(--spacing-xs); }
.p-2 { padding: var(--spacing-sm); }
.p-3 { padding: var(--spacing-md); }
.p-4 { padding: var(--spacing-lg); }
.p-5 { padding: var(--spacing-xl); }

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--white);
  font-weight: 700;
}

.logo-text {
  font-size: 1.5rem;
  line-height: 1;
}

.logo-subtext {
  font-size: 0.9rem;
  opacity: 0.8;
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.nav-link {
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.nav-link:hover {
  color: var(--primary-light);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-light);
  transition: var(--transition);
}

.nav-link:hover::after {
  width: 100%;
}

.contact-link {
  background-color: var(--primary-color);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
}

.contact-link:hover {
  background-color: var(--primary-light);
  color: var(--white);
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
}

.main-content {
  flex: 1;
  margin-top: 80px;
}

.footer {
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  color: var(--white);
  padding: var(--spacing-xl) 0 var(--spacing-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
  font-size: 1.25rem;
  margin-bottom: var(--spacing-md);
  color: var(--white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.footer-section p {
  color: var(--white);
  opacity: 0.9;
  margin-bottom: var(--spacing-sm);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.social-link {
  color: var(--white);
  font-size: 1.5rem;
  transition: var(--transition);
}

.social-link:hover {
  color: var(--primary-light);
  transform: translateY(-2px);
}

.footer-link {
  display: block;
  color: var(--white);
  text-decoration: none;
  margin-bottom: var(--spacing-sm);
  opacity: 0.9;
  transition: var(--transition);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.footer-link:hover {
  opacity: 1;
  color: var(--primary-light);
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-xl);
  margin-top: var(--spacing-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  color: var(--white);
  opacity: 0.7;
  font-size: 0.9rem;
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  padding: var(--spacing-md);
  flex-direction: column;
  gap: var(--spacing-md);
  z-index: 999;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu.is-open {
  display: flex;
}

.mobile-link {
  color: var(--white);
  text-decoration: none;
  padding: var(--spacing-sm) 0;
  font-weight: 500;
  transition: var(--transition);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.mobile-link:hover {
  color: var(--primary-light);
}

.close-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
  transition: var(--transition);
  padding: var(--spacing-sm);
}

.close-btn:hover {
  color: var(--primary-color);
  transform: rotate(90deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-toggle {
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

/* Common page styles */
.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl) var(--spacing-md) 0;
}

.page-header h1 {
  font-size: 3rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.page-header p {
  font-size: 1.25rem;
  color: var(--white);
  opacity: 0.9;
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md) var(--spacing-xl);
}
</style> 