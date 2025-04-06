<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'

const router = useRouter()
const dataStore = useDataStore()

const form = ref({
  name: '',
  email: '',
  location: '',
  experience: '',
  portfolio: '',
  message: ''
})

const errors = ref({})
const isSubmitting = ref(false)
const submitSuccess = ref(false)

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
  }
  
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email'
  }
  
  if (!form.value.location.trim()) {
    errors.value.location = 'Location is required'
  }
  
  if (!form.value.experience.trim()) {
    errors.value.experience = 'Experience is required'
  }
  
  if (!form.value.portfolio.trim()) {
    errors.value.portfolio = 'Portfolio link is required'
  } else if (!/^https?:\/\/.+/.test(form.value.portfolio)) {
    errors.value.portfolio = 'Please enter a valid URL'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    // Create new application
    const newApplication = {
      id: Date.now().toString(),
      name: form.value.name,
      email: form.value.email,
      location: form.value.location,
      experience: form.value.experience,
      portfolio: form.value.portfolio,
      message: form.value.message,
      status: 'pending',
      date: new Date().toISOString()
    }
    
    // Add to store
    dataStore.addApplication(newApplication)
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      location: '',
      experience: '',
      portfolio: '',
      message: ''
    }
    
    submitSuccess.value = true
    
    // Show success message for 3 seconds
    setTimeout(() => {
      submitSuccess.value = false
      router.push('/')
    }, 3000)
    
  } catch (error) {
    console.error('Error submitting application:', error)
    errors.value.submit = 'Failed to submit application. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="apply-container">
    <div class="apply-content">
      <h1>Join VERSA</h1>
      <p class="subtitle">Apply to become a member of our spotting group</p>
      
      <form @submit.prevent="handleSubmit" class="apply-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            :class="{ 'error': errors.name }"
            placeholder="Enter your full name"
          />
          <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            :class="{ 'error': errors.email }"
            placeholder="Enter your email"
          />
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>
        
        <div class="form-group">
          <label for="location">Location</label>
          <input
            type="text"
            id="location"
            v-model="form.location"
            :class="{ 'error': errors.location }"
            placeholder="Enter your location (e.g., YVR)"
          />
          <span class="error-message" v-if="errors.location">{{ errors.location }}</span>
        </div>
        
        <div class="form-group">
          <label for="experience">Experience</label>
          <textarea
            id="experience"
            v-model="form.experience"
            :class="{ 'error': errors.experience }"
            placeholder="Tell us about your aviation photography experience"
            rows="4"
          ></textarea>
          <span class="error-message" v-if="errors.experience">{{ errors.experience }}</span>
        </div>
        
        <div class="form-group">
          <label for="portfolio">Portfolio Link</label>
          <input
            type="url"
            id="portfolio"
            v-model="form.portfolio"
            :class="{ 'error': errors.portfolio }"
            placeholder="Link to your portfolio or social media"
          />
          <span class="error-message" v-if="errors.portfolio">{{ errors.portfolio }}</span>
        </div>
        
        <div class="form-group">
          <label for="message">Additional Message</label>
          <textarea
            id="message"
            v-model="form.message"
            placeholder="Any additional information you'd like to share"
            rows="4"
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button
            type="submit"
            class="submit-button"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
          </button>
        </div>
        
        <div v-if="submitSuccess" class="success-message">
          <i class="icon-check"></i>
          <p>Application submitted successfully!</p>
        </div>
        
        <div v-if="errors.submit" class="error-message submit-error">
          {{ errors.submit }}
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.apply-container {
  padding: var(--spacing-xxl) 0;
}

.apply-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

h1 {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.apply-form {
  background-color: var(--card-background);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

label {
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--text-color);
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: var(--spacing-md);
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-color);
  font-size: 1rem;
  transition: all var(--transition-normal);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(144, 153, 62, 0.2);
}

input.error,
textarea.error {
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 0.9rem;
  margin-top: var(--spacing-xs);
}

.submit-button {
  width: 100%;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: var(--text-color);
  border: none;
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(144, 153, 62, 0.3);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: var(--radius-md);
  color: #4CAF50;
}

.success-message i {
  font-size: 1.5rem;
}

.submit-error {
  text-align: center;
  margin-top: var(--spacing-lg);
}

@media (max-width: 768px) {
  .apply-container {
    padding: var(--spacing-xl) 0;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  .apply-form {
    padding: var(--spacing-lg);
  }
}
</style> 