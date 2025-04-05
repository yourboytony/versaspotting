<template>
  <div class="admin-container">
    <div v-if="!isAuthenticated" class="login-container">
      <h2>Admin Login</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="form-input"
          />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>

    <div v-else class="admin-dashboard">
      <header class="admin-header">
        <h1>Admin Dashboard</h1>
        <button @click="handleLogout" class="logout-button">Logout</button>
      </header>

      <div class="admin-sections">
        <ProfileManagement />
        
        <div class="section">
          <h2>Contact Form Submissions</h2>
          <div v-if="submissions.length === 0" class="no-data">
            No submissions yet
          </div>
          <div v-else class="submissions-list">
            <div v-for="submission in submissions" :key="submission.id" class="submission-card">
              <div class="submission-header">
                <h3>{{ submission.name }}</h3>
                <span class="timestamp">{{ formatDate(submission.timestamp) }}</span>
              </div>
              <div class="submission-details">
                <p><strong>Email:</strong> {{ submission.email }}</p>
                <p><strong>Message:</strong> {{ submission.message }}</p>
              </div>
              <button @click="deleteSubmission(submission.id)" class="delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Team Applications</h2>
          <div v-if="applications.length === 0" class="no-data">
            No applications yet
          </div>
          <div v-else class="applications-list">
            <div v-for="app in applications" :key="app.id" class="application-card">
              <div class="application-header">
                <h3>{{ app.name }}</h3>
                <span class="timestamp">{{ formatDate(app.timestamp) }}</span>
              </div>
              <div class="application-details">
                <p><strong>Email:</strong> {{ app.email }}</p>
                <p><strong>Role:</strong> {{ app.role }}</p>
                <p><strong>Experience:</strong> {{ app.experience }} years</p>
                <p><strong>Specialization:</strong> {{ app.specialization }}</p>
                <p><strong>Motivation:</strong> {{ app.motivation }}</p>
                <p><strong>Portfolio:</strong> <a :href="app.portfolio" target="_blank">View Portfolio</a></p>
              </div>
              <button @click="deleteApplication(app.id)" class="delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Uploaded Photos</h2>
          <div v-if="photos.length === 0" class="no-data">
            No photos uploaded yet
          </div>
          <div v-else class="photos-grid">
            <div v-for="photo in photos" :key="photo.id" class="photo-card">
              <img :src="photo.imageUrl" :alt="photo.caption" class="photo-preview" />
              <div class="photo-details">
                <p><strong>Uploaded by:</strong> {{ photo.profileName }}</p>
                <p><strong>Caption:</strong> {{ photo.caption }}</p>
                <p><strong>Location:</strong> {{ photo.location }}</p>
                <p><strong>Date:</strong> {{ formatDate(photo.timestamp) }}</p>
              </div>
              <button @click="handleDeletePhoto(photo.profileId, photo.id)" class="delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import ProfileManagement from '@/components/ProfileManagement.vue'
import { 
  getAllContactSubmissions, 
  deleteContactSubmission,
  getAllTeamApplications,
  deleteTeamApplication,
  getAllPhotos,
  deletePhoto
} from '@/data/database'

const router = useRouter()
const isAuthenticated = ref(false)
const username = ref('')
const password = ref('')
const error = ref('')
const submissions = ref([])
const applications = ref([])
const photos = ref([])

const ADMIN_CREDENTIALS = {
  username: 'VERSAadmin',
  password: 'adminw8492$@'
}

const handleLogin = () => {
  if (username.value === ADMIN_CREDENTIALS.username && password.value === ADMIN_CREDENTIALS.password) {
    isAuthenticated.value = true
    localStorage.setItem('adminAuth', 'true')
    error.value = ''
    loadData()
  } else {
    error.value = 'Invalid credentials'
  }
}

const handleLogout = () => {
  isAuthenticated.value = false
  localStorage.removeItem('adminAuth')
  router.push('/')
}

const loadData = async () => {
  try {
    submissions.value = await getAllContactSubmissions()
    applications.value = await getAllTeamApplications()
    photos.value = await getAllPhotos()
  } catch (err) {
    console.error('Error loading data:', err)
  }
}

const deleteSubmission = async (id) => {
  try {
    await deleteContactSubmission(id)
    submissions.value = submissions.value.filter(s => s.id !== id)
  } catch (err) {
    console.error('Error deleting submission:', err)
  }
}

const deleteApplication = async (id) => {
  try {
    await deleteTeamApplication(id)
    applications.value = applications.value.filter(a => a.id !== id)
  } catch (err) {
    console.error('Error deleting application:', err)
  }
}

const handleDeletePhoto = async (profileId, photoId) => {
  try {
    await deletePhoto(profileId, photoId)
    photos.value = photos.value.filter(p => p.id !== photoId)
  } catch (err) {
    console.error('Error deleting photo:', err)
  }
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}

onMounted(() => {
  if (localStorage.getItem('adminAuth') === 'true') {
    isAuthenticated.value = true
    loadData()
  }
})
</script>

<style scoped>
.admin-container {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  color: #fff;
}

.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
}

.login-button {
  padding: 0.75rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.login-button:hover {
  background: #45a049;
}

.error-message {
  color: #ff4444;
  margin-top: 1rem;
  text-align: center;
}

.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.logout-button {
  padding: 0.5rem 1rem;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.admin-sections {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.section {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submissions-list,
.applications-list {
  display: grid;
  gap: 1rem;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.submission-card,
.application-card,
.photo-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.photo-preview {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.submission-header,
.application-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.timestamp {
  color: #888;
  font-size: 0.9rem;
}

.submission-details,
.application-details,
.photo-details {
  display: grid;
  gap: 0.5rem;
}

.delete-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.no-data {
  text-align: center;
  color: #888;
  padding: 2rem;
}
</style> 