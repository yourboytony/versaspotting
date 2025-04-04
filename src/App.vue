<template>
  <div class="app">
    <transition name="slide-down">
      <div v-if="showAnnouncement" class="announcement-banner">
        <div class="announcement-content">
          <div class="announcement-icon-container">
            <font-awesome-icon :icon="['fas', 'bullhorn']" class="announcement-icon" />
          </div>
          <p class="announcement-text">
            <strong>Editors Wanted:</strong> We're looking for talented photo editors to join our team! 
            <router-link to="/about#join-section" class="announcement-link">Apply now</router-link>
          </p>
          <button @click="closeAnnouncement" class="announcement-close" aria-label="Close announcement">
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
        </div>
      </div>
    </transition>
    
    <nav class="nav" :class="{ 'with-announcement': showAnnouncement }">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">
          <span class="logo-text">VERSA</span>
          <span class="logo-subtext">Spotting</span>
        </router-link>
        
        <div class="nav-links">
          <router-link to="/" class="nav-link">
            <font-awesome-icon :icon="['fas', 'home']" class="link-icon" />
            <span>Home</span>
          </router-link>
          <router-link to="/portfolio" class="nav-link">
            <font-awesome-icon :icon="['fas', 'images']" class="link-icon" />
            <span>Portfolio</span>
          </router-link>
          <router-link to="/about" class="nav-link">
            <font-awesome-icon :icon="['fas', 'info-circle']" class="link-icon" />
            <span>About</span>
          </router-link>
          <router-link to="/contact" class="nav-link">
            <font-awesome-icon :icon="['fas', 'envelope']" class="link-icon" />
            <span>Contact</span>
          </router-link>
        </div>

        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span class="menu-icon">
            <font-awesome-icon :icon="['fas', 'bars']" />
          </span>
        </button>
      </div>
    </nav>

    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <div class="mobile-menu-header">
        <router-link to="/" class="mobile-logo" @click="toggleMobileMenu">
          <span class="logo-text">VERSA</span>
          <span class="logo-subtext">Spotting</span>
        </router-link>
        <button class="close-btn" @click="toggleMobileMenu">×</button>
      </div>
      <div class="mobile-links">
        <router-link to="/" class="mobile-link" @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'home']" />
          <span>Home</span>
        </router-link>
        <router-link to="/portfolio" class="mobile-link" @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'images']" />
          <span>Portfolio</span>
        </router-link>
        <router-link to="/about" class="mobile-link" @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'info-circle']" />
          <span>About</span>
        </router-link>
        <router-link to="/contact" class="mobile-link" @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'envelope']" />
          <span>Contact</span>
        </router-link>
      </div>
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
    <SpeedInsights />
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import FeedbackPopup from '@/components/FeedbackPopup.vue';
import SpeedInsights from '@/components/SpeedInsights.vue';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Announcement banner
const showAnnouncement = ref(true);

const closeAnnouncement = () => {
  showAnnouncement.value = false;
  localStorage.setItem('announcementClosed', Date.now().toString());
};

onMounted(() => {
  // Check if announcement was previously closed
  const lastClosed = localStorage.getItem('announcementClosed');
  if (lastClosed) {
    // Show again after 7 days
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - parseInt(lastClosed) < sevenDaysInMs) {
      showAnnouncement.value = false;
    }
  }
  
  // Add padding to body when announcement is visible
  watchEffect(() => {
    if (showAnnouncement.value) {
      document.body.classList.add('has-announcement');
    } else {
      document.body.classList.remove('has-announcement');
    }
  });
});
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
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-xl);
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
  transition: var(--transition);
  position: relative;
  padding: var(--spacing-sm) 0;
}

.nav-logo::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: var(--transition);
}

.nav-logo:hover::after {
  width: 100%;
}

.logo-text {
  font-size: 1.5rem;
  line-height: 1;
  background: linear-gradient(45deg, var(--white), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: var(--transition);
}

.logo-subtext {
  font-size: 0.9rem;
  opacity: 0.8;
  transition: var(--transition);
}

.nav-logo:hover .logo-text {
  transform: translateY(-2px);
}

.nav-logo:hover .logo-subtext {
  opacity: 1;
}

.nav-links {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
}

.nav-link {
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(132, 155, 85, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.nav-link:hover::before {
  transform: translateX(100%);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: var(--transition);
}

.nav-link:hover::after {
  width: 100%;
}

.link-icon {
  opacity: 0;
  transform: translateX(-10px);
  transition: var(--transition);
}

.nav-link:hover .link-icon {
  opacity: 1;
  transform: translateX(0);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  transition: var(--transition);
}

.mobile-menu-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  transition: var(--transition);
  z-index: 999;
}

.mobile-menu.is-open {
  right: 0;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-xl);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-logo {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--white);
  font-weight: 700;
}

.mobile-links {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl);
  gap: var(--spacing-lg);
}

.mobile-link {
  color: var(--white);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}

.mobile-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(10px);
}

.close-btn {
  background: none;
  border: none;
  color: var(--white);
  font-size: 2rem;
  cursor: pointer;
  transition: var(--transition);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
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

  .nav-container {
    padding: var(--spacing-sm) var(--spacing-md);
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

/* Announcement Banner */
.announcement-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  color: var(--white);
  z-index: 1010;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.announcement-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px var(--spacing-lg);
  display: flex;
  align-items: center;
  position: relative;
}

.announcement-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-right: var(--spacing-md);
  flex-shrink: 0;
}

.announcement-icon {
  font-size: 0.9rem;
  color: var(--white);
}

.announcement-text {
  flex: 1;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
}

.announcement-link {
  color: var(--white);
  text-decoration: underline;
  font-weight: 700;
  white-space: nowrap;
  margin-left: 4px;
  transition: opacity 0.2s ease;
}

.announcement-link:hover {
  opacity: 0.9;
}

.announcement-close {
  background: transparent;
  border: none;
  color: var(--white);
  font-size: 1rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: var(--spacing-md);
  transition: background-color 0.2s ease;
  opacity: 0.8;
  flex-shrink: 0;
}

.announcement-close:hover {
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 1;
}

/* Adjust nav position when announcement is shown */
.nav {
  transition: top 0.3s ease;
}

.nav.with-announcement {
  top: 56px; /* Height of announcement banner */
}

/* Animation for announcement banner */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Adjust main content when announcement is shown */
:deep(.main-content) {
  transition: margin-top 0.3s ease;
}

.has-announcement :deep(.main-content) {
  margin-top: 136px; /* 80px nav height + 56px announcement height */
}

@media (max-width: 768px) {
  .announcement-content {
    padding: 10px var(--spacing-md);
  }
  
  .announcement-text {
    font-size: 0.85rem;
  }
  
  .announcement-icon-container {
    width: 28px;
    height: 28px;
    margin-right: var(--spacing-sm);
  }
  
  .announcement-link {
    display: inline;
  }
}
</style> 