<template>
  <div class="applications-page">
    <div class="page-header">
      <h1>Join VERSA Spotting Group</h1>
      <p class="subtitle">Apply to become a member of our aviation photography community</p>
    </div>

    <div class="application-container">
      <div class="application-info">
        <div class="info-card">
          <h2>About VERSA</h2>
          <p>VERSA Spotting Group is a community of aviation photographers dedicated to capturing the beauty of aircraft around the world, with a particular focus on YVR. As a member, you'll have access to:</p>
          <ul>
            <li>Regular group photo sessions</li>
            <li>Photography workshops and tips</li>
            <li>A supportive community of fellow aviation enthusiasts</li>
          </ul>
        </div>
        
        <div class="info-card">
          <h2>Requirements</h2>
          <p>To join VERSA, you should have:</p>
          <ul>
            <li>A passion for aviation photography</li>
            <li>Basic photography equipment (DSLR/Mirrorless camera)</li>
            <li>Some experience with aviation photography</li>
            <li>A portfolio of your work</li>
            <li>Availability for regular group activities</li>
          </ul>
        </div>
      </div>

      <div class="application-form-container">
        <h2>Application Form</h2>
        <form @submit.prevent="submitApplication" class="application-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="application.name" 
              class="form-control" 
              placeholder="Enter your full name"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              v-model="application.email" 
              class="form-control" 
              placeholder="Enter your email address"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="location">Location</label>
            <input 
              type="text" 
              id="location" 
              v-model="application.location" 
              class="form-control" 
              placeholder="Enter your location (city, country)"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="experience">Years of Experience</label>
            <input 
              type="number" 
              id="experience" 
              v-model="application.experience" 
              class="form-control" 
              placeholder="Enter years of photography experience"
              min="0"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="portfolio">Portfolio URL</label>
            <input 
              type="url" 
              id="portfolio" 
              v-model="application.portfolio" 
              class="form-control" 
              placeholder="Enter your portfolio URL (Flickr, Instagram, etc.)"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="message">Why do you want to join VERSA?</label>
            <textarea 
              id="message" 
              v-model="application.message" 
              class="form-control" 
              placeholder="Tell us about your interest in aviation photography and why you want to join VERSA"
              rows="5"
              required
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="loading-spinner"></span>
              {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Application Submitted!</h3>
          <button class="close-button" @click="closeSuccessModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="success-icon">
            <i class="icon-check"></i>
          </div>
          <p>Thank you for your application to join VERSA Spotting Group. We have received your submission and will review it shortly.</p>
          <p>We will contact you at {{ application.email }} with our decision within the next few days.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="closeSuccessModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDataStore } from '../stores/dataStore'

const dataStore = useDataStore()
const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const application = ref({
  name: '',
  email: '',
  location: '',
  experience: '',
  portfolio: '',
  message: ''
})

const submitApplication = async () => {
  try {
    isSubmitting.value = true
    
    // Add the application to the data store
    const success = await dataStore.addApplication({
      ...application.value,
      date: new Date().toISOString(),
      status: 'pending'
    })
    
    if (success) {
      showSuccessModal.value = true
      // Reset the form
      application.value = {
        name: '',
        email: '',
        location: '',
        experience: '',
        portfolio: '',
        message: ''
      }
    } else {
      alert('Failed to submit application. Please try again.')
    }
  } catch (error) {
    console.error('Error submitting application:', error)
    alert('An error occurred while submitting your application. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}
</script>

<style scoped>
.applications-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #999;
  font-size: 1.1rem;
}

.application-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.application-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.info-card h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
}

.info-card p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.info-card ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.info-card li {
  color: #ccc;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.info-card li:before {
  content: "✓";
  color: #90992e;
  position: absolute;
  left: 0;
}

.application-form-container {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.application-form-container h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #fff;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #90992e;
  background: rgba(255, 255, 255, 0.05);
}

textarea.form-control {
  min-height: 120px;
  resize: vertical;
}

.form-actions {
  margin-top: 2rem;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  color: #000;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(144, 153, 46, 0.3);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  font-size: 1.5rem;
  color: #fff;
  font-weight: 600;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: #999;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #fff;
}

.modal-body {
  text-align: center;
  margin-bottom: 1.5rem;
}

.success-icon {
  font-size: 3rem;
  color: #90992e;
  margin-bottom: 1rem;
}

.modal-body p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  color: #000;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(144, 153, 46, 0.3);
}

@media (max-width: 992px) {
  .application-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .applications-page {
    padding: 1rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
}
</style> 