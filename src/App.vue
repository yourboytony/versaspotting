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
  /* Colors */
  --primary-color: #849b55;
  --primary-light: #a0b36c;
  --primary-dark: #6b7f45;
  --white: #ffffff;
  --black: #000000;
  --gray: #f5f5f5;
  --dark-gray: #333333;
  --text-light: #666666;
  
  /* Typography */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --hover-scale: scale(1.02);
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --card-shadow-hover: 0 8px 15px rgba(0, 0, 0, 0.2);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-primary);
  line-height: 1.6;
  color: var(--dark-gray);
  background-color: var(--white);
  overflow-x: hidden;
}

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

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Page transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Global animations */
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

/* Enhanced scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color-dark);
}

/* Selection styling */
::selection {
  background: var(--primary-color);
  color: var(--white);
}

/* Link hover effects */
a {
  position: relative;
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--primary-color);
}

a::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: var(--primary-color);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
}

a:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* Button hover effects */
button {
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

button:hover {
  transform: translateY(-2px);
}

button::after {
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

button:focus:not(:active)::after {
  animation: ripple 1s ease-out;
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

/* Card hover effects */
.card {
  transition: var(--transition);
  box-shadow: var(--card-shadow);
}

.card:hover {
  transform: var(--hover-scale);
  box-shadow: var(--card-shadow-hover);
}

/* Image hover effects */
img {
  transition: var(--transition);
}

img:hover {
  transform: var(--hover-scale);
}

/* Form input focus effects */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-color);
}

/* Loading animation */
.loading {
  position: relative;
}

.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style> 