<template>
  <div class="feedback-popup" :class="{ 'is-visible': isVisible }">
    <div class="feedback-content">
      <button class="close-btn" @click="closePopup">×</button>
      <h3>How's your experience?</h3>
      <div class="rating-buttons">
        <button 
          v-for="rating in 5" 
          :key="rating"
          class="rating-btn"
          :class="{ active: selectedRating === rating }"
          @click="selectRating(rating)"
        >
          <font-awesome-icon :icon="['fas', 'star']" />
        </button>
      </div>
      <textarea
        v-if="selectedRating"
        v-model="feedbackText"
        placeholder="Tell us more about your experience..."
        rows="3"
      ></textarea>
      <button 
        class="submit-btn"
        :disabled="!selectedRating"
        @click="submitFeedback"
      >
        Submit Feedback
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(false);
const selectedRating = ref(0);
const feedbackText = ref('');

// Show popup after 30 seconds of page load
setTimeout(() => {
  isVisible.value = true;
}, 30000);

const closePopup = () => {
  isVisible.value = false;
};

const selectRating = (rating) => {
  selectedRating.value = rating;
};

const submitFeedback = () => {
  // Here you would typically send the feedback to your backend
  console.log('Feedback submitted:', {
    rating: selectedRating.value,
    text: feedbackText.value
  });
  closePopup();
};
</script>

<style scoped>
.feedback-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.3s ease-out;
}

.feedback-popup.is-visible {
  transform: translateY(0);
  opacity: 1;
}

.feedback-content {
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid var(--primary-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  width: 300px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.close-btn:hover {
  opacity: 1;
}

h3 {
  color: var(--white);
  margin-bottom: var(--spacing-md);
  font-size: 1.2rem;
}

.rating-buttons {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.rating-btn {
  background: none;
  border: none;
  color: var(--white);
  opacity: 0.5;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.5rem;
}

.rating-btn:hover {
  opacity: 0.8;
  transform: scale(1.1);
}

.rating-btn.active {
  color: var(--primary-color);
  opacity: 1;
}

textarea {
  width: 100%;
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  color: var(--white);
  resize: none;
}

textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.submit-btn {
  width: 100%;
  padding: var(--spacing-sm);
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style> 