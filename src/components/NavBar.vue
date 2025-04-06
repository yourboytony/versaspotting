<template>
  <nav class="navbar">
    <div class="nav-content">
      <router-link to="/" class="logo">
        <img src="../assets/logo.png" alt="VERSA Logo" class="logo-img">
        <span class="logo-text">VERSA</span>
      </router-link>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
        <router-link to="/news" class="nav-link">News</router-link>
        <router-link to="/apply" class="nav-link">Join Us</router-link>
        <router-link v-if="isAdmin" to="/admin" class="nav-link admin-link">Admin</router-link>
      </div>
      
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span class="menu-icon"></span>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">Home</router-link>
      <router-link to="/portfolio" class="mobile-nav-link" @click="closeMobileMenu">Portfolio</router-link>
      <router-link to="/news" class="mobile-nav-link" @click="closeMobileMenu">News</router-link>
      <router-link to="/apply" class="mobile-nav-link" @click="closeMobileMenu">Join Us</router-link>
      <router-link v-if="isAdmin" to="/admin" class="mobile-nav-link" @click="closeMobileMenu">Admin</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isAdmin = ref(false)
const isMobileMenuOpen = ref(false)

const checkAdminStatus = () => {
  isAdmin.value = !!localStorage.getItem('adminToken')
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleResize = () => {
  if (window.innerWidth > 768) {
    closeMobileMenu()
  }
}

onMounted(() => {
  checkAdminStatus()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-img {
  height: 40px;
  width: auto;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  transition: width 0.2s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.admin-link {
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #000;
  font-weight: 600;
}

.admin-link::after {
  display: none;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background: #fff;
  position: relative;
  transition: all 0.2s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: #fff;
  transition: all 0.2s ease;
}

.menu-icon::before {
  top: -6px;
}

.menu-icon::after {
  bottom: -6px;
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-menu.is-open {
  transform: translateX(0);
}

.mobile-nav-link {
  display: block;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-nav-link:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .mobile-menu {
    display: flex;
    flex-direction: column;
  }
  
  .nav-content {
    padding: 1rem;
  }
  
  .logo-img {
    height: 32px;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
}
</style> 