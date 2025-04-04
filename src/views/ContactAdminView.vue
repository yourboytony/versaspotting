<template>
  <div class="contact-admin">
    <div class="admin-header">
      <h1>Contact Form Submissions</h1>
      <p>View and manage all contact form submissions</p>
    </div>

    <div class="submissions-list">
      <div v-if="submissions.length === 0" class="no-submissions">
        <p>No submissions yet</p>
      </div>
      
      <div v-else class="submission-grid">
        <div v-for="submission in submissions" :key="submission.id" class="submission-card">
          <div class="submission-header">
            <h3>{{ submission.name }}</h3>
            <button class="delete-btn" @click="deleteSubmission(submission.id)">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
          <div class="submission-details">
            <p><strong>Email:</strong> {{ submission.email }}</p>
            <p><strong>Subject:</strong> {{ submission.subject }}</p>
            <p><strong>Message:</strong> {{ submission.message }}</p>
            <p class="timestamp">{{ formatDate(submission.timestamp) }}</p>
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

onMounted(() => {
  loadSubmissions();
});

function loadSubmissions() {
  submissions.value = getAllContactSubmissions();
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
</script>

<style scoped>
.contact-admin {
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.admin-header h1 {
  font-size: 2.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
}

.admin-header p {
  color: var(--white);
  opacity: 0.8;
}

.submissions-list {
  margin-top: var(--spacing-xl);
}

.no-submissions {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-lg);
  color: var(--white);
}

.submission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.submission-card {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.submission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.submission-header h3 {
  color: var(--white);
  margin: 0;
}

.delete-btn {
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
  padding: var(--spacing-sm);
  transition: var(--transition);
}

.delete-btn:hover {
  color: var(--primary-color);
}

.submission-details {
  color: var(--white);
}

.submission-details p {
  margin-bottom: var(--spacing-sm);
}

.timestamp {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: var(--spacing-md);
}

@media (max-width: 768px) {
  .submission-grid {
    grid-template-columns: 1fr;
  }
}
</style> 