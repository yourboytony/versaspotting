<template>
  <div class="contact">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Contact Us</h1>
        <p>Get in touch with the VERSA team</p>
      </div>
    </div>

    <div class="content-section">
      <div class="contact-grid">
        <div class="contact-info">
          <h2>Contact Information</h2>
          <div class="info-card">
            <i class="icon-location"></i>
            <div class="info-content">
              <h3>Location</h3>
              <p>Vancouver International Airport (YVR)<br>Richmond, BC, Canada</p>
            </div>
          </div>
          <div class="info-card">
            <i class="icon-email"></i>
            <div class="info-content">
              <h3>Email</h3>
              <p><a href="mailto:info@versaspotting.com">info@versaspotting.com</a></p>
            </div>
          </div>
          <div class="info-card">
            <i class="icon-social"></i>
            <div class="info-content">
              <h3>Social Media</h3>
              <div class="social-links">
                <a href="#" target="_blank">
                  <i class="icon-instagram"></i>
                </a>
                <a href="#" target="_blank">
                  <i class="icon-twitter"></i>
                </a>
                <a href="#" target="_blank">
                  <i class="icon-facebook"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <h2>Send us a Message</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label>Name</label>
              <input type="text" v-model="form.name" required>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="form.email" required>
            </div>
            <div class="form-group">
              <label>Subject</label>
              <input type="text" v-model="form.subject" required>
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea v-model="form.message" required></textarea>
            </div>
            <button type="submit" class="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  // Handle form submission
  console.log('Form submitted:', form.value)
  // Reset form
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}

onMounted(() => {
  // Animation for hero section
  gsap.from('.hero-content', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power2.out'
  })

  // Animation for contact info cards
  gsap.from('.info-card', {
    scrollTrigger: {
      trigger: '.contact-info',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    x: -50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
  })

  // Animation for contact form
  gsap.from('.contact-form', {
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    x: 50,
    opacity: 0,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.contact {
  min-height: 100vh;
}

.hero-section {
  height: 40vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('https://via.placeholder.com/1920x1080');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-content {
  max-width: 800px;
  padding: 0 2rem;
}

.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  text-shadow: 0 0 20px rgba(144, 153, 62, 0.5);
}

.hero-content p {
  font-size: 1.5rem;
  color: var(--text-secondary);
}

.content-section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info h2,
.contact-form h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--card-background);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.info-card i {
  font-size: 2rem;
  color: var(--primary-color);
}

.info-content h3 {
  color: var(--text-color);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.info-content p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.info-content a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.info-content a:hover {
  color: var(--primary-light);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: var(--text-secondary);
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: var(--primary-color);
}

.contact-form {
  background: var(--card-background);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(144, 153, 62, 0.2);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.submit-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-content p {
    font-size: 1.2rem;
  }

  .content-section {
    padding: 2rem 1rem;
  }

  .contact-info h2,
  .contact-form h2 {
    font-size: 2rem;
  }
}
</style> 