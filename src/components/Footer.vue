<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>VERSA Spotting</h3>
        <p>Capturing the essence of automotive excellence</p>
      </div>
      
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/portfolio">Portfolio</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li v-if="isAdmin"><router-link to="/admin">Admin Panel</router-link></li>
          <li v-else><router-link to="/admin/login">Admin Login</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3>Connect With Us</h3>
        <div class="social-links">
          <a href="https://instagram.com/versaspotting" target="_blank" rel="noopener noreferrer">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} VERSA Spotting. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const isAdmin = ref(false)

    onMounted(() => {
      isAdmin.value = localStorage.getItem('adminAuth') === 'true'
    })

    return {
      isAdmin
    }
  }
}
</script>

<style scoped>
/* ... existing styles ... */

.footer-section ul li a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #007bff;
}

/* ... rest of existing styles ... */
</style> 