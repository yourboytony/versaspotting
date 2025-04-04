<template>
  <div class="contact">
    <section class="page-header">
      <h1>Contact Us</h1>
      <p>Get in touch with the VERSA Spotting Group</p>
    </section>

    <section class="page-content">
      <div class="contact-info">
        <div class="info-card">
          <font-awesome-icon :icon="['fas', 'envelope']" />
          <h3>Email</h3>
          <a href="mailto:contact@versaspotting.com">contact@versaspotting.com</a>
        </div>
        <div class="info-card">
          <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
          <h3>Location</h3>
          <p>Vancouver International Airport (YVR)</p>
        </div>
        <div class="info-card">
          <font-awesome-icon :icon="['fas', 'users']" />
          <h3>Social Media</h3>
          <div class="social-links">
            <a href="https://instagram.com/versaspotting" target="_blank">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="https://twitter.com/versaspotting" target="_blank">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a href="https://facebook.com/versaspotting" target="_blank">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
          </div>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" v-model="formData.subject" required />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="formData.message" required></textarea>
        </div>
        <div v-if="showSuccess" class="message success">
          <font-awesome-icon :icon="['fas', 'check-circle']" />
          <span>Message sent successfully!</span>
        </div>
        <div v-if="showError" class="message error">
          <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
          <span>Failed to send message. Please try again.</span>
        </div>
        <button type="submit" :disabled="isSubmitting" class="btn btn-primary">
          <span v-if="isSubmitting">Sending...</span>
          <span v-else>Send Message</span>
        </button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { addContactSubmission } from '@/data/database';
import { sendContactAlert } from '@/utils/discord';

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  showError.value = false;
  
  try {
    await sendContactAlert(formData.value);
    showSuccess.value = true;
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    showError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact {
  min-height: 100vh;
}

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-xl);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.info-card {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-color);
}

.info-card .fa-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.info-card h3 {
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-sm);
}

.info-card a, .info-card p {
  color: var(--white);
  opacity: 0.9;
  text-decoration: none;
  transition: var(--transition);
}

.info-card a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.social-links a {
  font-size: 1.5rem;
  color: var(--white);
  transition: var(--transition);
}

.social-links a:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
}

.contact-form {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  color: var(--white);
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-md);
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  color: var(--white);
  transition: var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  background-color: rgba(255, 255, 255, 0.15);
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.btn {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-2px);
}

.message {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
}

.message.success {
  background-color: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.message.error {
  background-color: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style> 