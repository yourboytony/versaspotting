<template>
  <div class="contact-admin">
    <div class="admin-header">
      <h1>Contact Form Submissions</h1>
      <p>View and manage all contact form submissions</p>
    </div>

    <div class="submissions-list">
      <div v-if="submissions.length === 0" class="no-submissions">
        <div class="empty-state">
          <font-awesome-icon :icon="['fas', 'inbox']" class="empty-icon" />
          <p>No submissions yet</p>
          <p class="empty-subtext">When someone contacts you, their message will appear here</p>
        </div>
      </div>
      
      <div v-else class="submission-grid">
        <div 
          v-for="submission in submissions" 
          :key="submission.id" 
          class="submission-card"
          :class="{ 'new-submission': isNewSubmission(submission) }"
        >
          <div class="submission-header">
            <div class="user-info">
              <div class="avatar">
                {{ getInitials(submission.name) }}
              </div>
              <div class="name-time">
                <h3>{{ submission.name }}</h3>
                <span class="timestamp">{{ formatDate(submission.timestamp) }}</span>
              </div>
            </div>
            <button class="delete-btn" @click="deleteSubmission(submission.id)">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
          <div class="submission-details">
            <div class="detail-row">
              <font-awesome-icon :icon="['fas', 'envelope']" />
              <a :href="'mailto:' + submission.email">{{ submission.email }}</a>
            </div>
            <div class="detail-row">
              <font-awesome-icon :icon="['fas', 'tag']" />
              <span>{{ submission.subject }}</span>
            </div>
            <div class="message-container">
              <font-awesome-icon :icon="['fas', 'comment']" />
              <p class="message">{{ submission.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllContactSubmissions, deleteContactSubmission } from '@/data/database';

const submissions = ref([]);
const newSubmissionIds = ref(new Set());

onMounted(() => {
  loadSubmissions();
});

function loadSubmissions() {
  submissions.value = getAllContactSubmissions();
  // Mark new submissions
  submissions.value.forEach(submission => {
    if (isNewSubmission(submission)) {
      newSubmissionIds.value.add(submission.id);
    }
  });
}

function deleteSubmission(id) {
  if (confirm('Are you sure you want to delete this submission?')) {
    deleteContactSubmission(id);
    loadSubmissions();
  }
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

function isNewSubmission(submission) {
  const submissionDate = new Date(submission.timestamp);
  const now = new Date();
  const hoursDiff = (now - submissionDate) / (1000 * 60 * 60);
  return hoursDiff < 24; // Consider submissions from last 24 hours as new
}
</script>

<style scoped>
.contact-admin {
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
}

.admin-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  animation: fadeIn 0.5s ease-out;
}

.admin-header h1 {
  font-size: 3rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
}

.admin-header p {
  color: var(--white);
  opacity: 0.8;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
}

.submissions-list {
  margin-top: var(--spacing-xl);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-lg);
  color: var(--white);
  animation: fadeIn 0.5s ease-out;
}

.empty-icon {
  font-size: 4rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  opacity: 0.5;
}

.empty-subtext {
  opacity: 0.6;
  font-size: 0.9rem;
  margin-top: var(--spacing-sm);
}

.submission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-md);
  animation: fadeIn 0.5s ease-out;
}

.submission-card {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submission-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-color);
}

.submission-card.new-submission::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--primary-color);
}

.submission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--white);
  font-size: 1.2rem;
}

.name-time {
  display: flex;
  flex-direction: column;
}

.name-time h3 {
  color: var(--white);
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.timestamp {
  font-size: 0.8rem;
  opacity: 0.7;
  color: var(--white);
}

.delete-btn {
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
  padding: var(--spacing-sm);
  transition: var(--transition);
  opacity: 0.7;
}

.delete-btn:hover {
  color: #ff4444;
  opacity: 1;
  transform: scale(1.1);
}

.submission-details {
  color: var(--white);
}

.detail-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  padding: var(--spacing-sm);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
}

.detail-row .fa-icon {
  color: var(--primary-color);
  width: 20px;
}

.detail-row a {
  color: var(--white);
  text-decoration: none;
  transition: var(--transition);
}

.detail-row a:hover {
  color: var(--primary-color);
}

.message-container {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
}

.message-container .fa-icon {
  color: var(--primary-color);
  margin-top: 3px;
}

.message {
  margin: 0;
  line-height: 1.6;
  opacity: 0.9;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .submission-grid {
    grid-template-columns: 1fr;
  }
  
  .admin-header h1 {
    font-size: 2rem;
  }
  
  .submission-card {
    padding: var(--spacing-md);
  }
}
</style> 