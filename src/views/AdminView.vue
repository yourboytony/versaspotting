<template>
  <div class="admin-dashboard">
    <header class="admin-header">
      <h1>Admin Dashboard</h1>
      <button @click="logout" class="logout-button">Logout</button>
    </header>

    <div class="admin-content">
      <nav class="admin-nav">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="{ active: currentTab === tab.id }"
          @click="currentTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </nav>

      <div class="admin-main">
        <!-- Profiles Tab -->
        <div v-if="currentTab === 'profiles'" class="tab-content">
          <h2>Profiles</h2>
          <div class="data-grid">
            <div v-for="profile in profiles" :key="profile.id" class="data-item">
              <h3>{{ profile.name }}</h3>
              <p>{{ profile.email }}</p>
              <p v-if="profile.instagram">@{{ profile.instagram }}</p>
              <p>{{ profile.bio }}</p>
              <button @click="deleteProfile(profile.id)" class="delete-button">Delete</button>
            </div>
          </div>
        </div>

        <!-- Contact Submissions Tab -->
        <div v-if="currentTab === 'contact'" class="tab-content">
          <h2>Contact Submissions</h2>
          <div class="data-grid">
            <div v-for="submission in submissions" :key="submission.id" class="data-item">
              <h3>{{ submission.name }}</h3>
              <p>{{ submission.email }}</p>
              <p>{{ submission.message }}</p>
              <button @click="deleteSubmission(submission.id)" class="delete-button">Delete</button>
            </div>
          </div>
        </div>

        <!-- Team Applications Tab -->
        <div v-if="currentTab === 'applications'" class="tab-content">
          <h2>Team Applications</h2>
          <div class="data-grid">
            <div v-for="application in applications" :key="application.id" class="data-item">
              <h3>{{ application.name }}</h3>
              <p>{{ application.email }}</p>
              <p v-if="application.instagram">@{{ application.instagram }}</p>
              <p>{{ application.bio }}</p>
              <select v-model="application.status" @change="updateApplicationStatus(application)">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button @click="deleteApplication(application.id)" class="delete-button">Delete</button>
            </div>
          </div>
        </div>

        <!-- Photos Tab -->
        <div v-if="currentTab === 'photos'" class="tab-content">
          <h2>Photos</h2>
          <div class="photo-grid">
            <div v-for="photo in photos" :key="photo.id" class="photo-item">
              <img :src="photo.url" :alt="photo.title">
              <h3>{{ photo.title }}</h3>
              <p>{{ photo.description }}</p>
              <button @click="deletePhoto(photo.id)" class="delete-button">Delete</button>
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

const router = useRouter()
const currentTab = ref('profiles')
const profiles = ref([])
const submissions = ref([])
const applications = ref([])
const photos = ref([])

const tabs = [
  { id: 'profiles', name: 'Profiles' },
  { id: 'contact', name: 'Contact Submissions' },
  { id: 'applications', name: 'Team Applications' },
  { id: 'photos', name: 'Photos' }
]

// Check authentication
const checkAuth = async () => {
  const token = localStorage.getItem('adminToken')
  if (!token) {
    router.push('/admin/login')
    return
  }
}

// Load data
const loadData = async () => {
  const token = localStorage.getItem('adminToken')
  if (!token) {
    router.push('/admin/login')
    return
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  try {
    const [profilesRes, submissionsRes, applicationsRes, photosRes] = await Promise.all([
      fetch('/api/profiles', { headers }),
      fetch('/api/contact', { headers }),
      fetch('/api/team-application', { headers }),
      fetch('/api/photos', { headers })
    ])

    // Check if any response indicates unauthorized access
    if ([profilesRes, submissionsRes, applicationsRes, photosRes].some(res => res.status === 401)) {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
      return
    }

    profiles.value = await profilesRes.json()
    submissions.value = await submissionsRes.json()
    applications.value = await applicationsRes.json()
    photos.value = await photosRes.json()
  } catch (error) {
    console.error('Error loading data:', error)
    if (error.message.includes('unauthorized') || error.message.includes('401')) {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    }
  }
}

// Delete functions
const deleteProfile = async (id) => {
  const token = localStorage.getItem('adminToken')
  try {
    const response = await fetch(`/api/profiles/${id}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 401) {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
      return
    }
    profiles.value = profiles.value.filter(p => p.id !== id)
  } catch (error) {
    console.error('Error deleting profile:', error)
  }
}

const deleteSubmission = async (id) => {
  const token = localStorage.getItem('adminToken')
  try {
    const response = await fetch(`/api/contact/${id}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 401) {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
      return
    }
    submissions.value = submissions.value.filter(s => s.id !== id)
  } catch (error) {
    console.error('Error deleting submission:', error)
  }
}

const deleteApplication = async (id) => {
  const token = localStorage.getItem('adminToken')
  try {
    const response = await fetch(`/api/team-application/${id}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 401) {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
      return
    }
    applications.value = applications.value.filter(a => a.id !== id)
  } catch (error) {
    console.error('Error deleting application:', error)
  }
}

const deletePhoto = async (id) => {
  const token = localStorage.getItem('adminToken')
  try {
    const response = await fetch(`/api/photos/${id}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 401) {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
      return
    }
    photos.value = photos.value.filter(p => p.id !== id)
  } catch (error) {
    console.error('Error deleting photo:', error)
  }
}

const updateApplicationStatus = async (application) => {
  const token = localStorage.getItem('adminToken')
  try {
    const response = await fetch(`/api/team-application/${application.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: application.status })
    })
    if (response.status === 401) {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
      return
    }
  } catch (error) {
    console.error('Error updating application status:', error)
  }
}

const logout = () => {
  localStorage.removeItem('adminToken')
  router.push('/admin/login')
}

onMounted(async () => {
  await checkAuth()
  await loadData()
})
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logout-button {
  padding: 8px 16px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.admin-content {
  display: flex;
  gap: 20px;
}

.admin-nav {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.admin-nav button {
  padding: 10px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  text-align: left;
}

.admin-nav button.active {
  background: #007bff;
  color: white;
}

.admin-main {
  flex: 1;
}

.tab-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.data-grid, .photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.data-item, .photo-item {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.photo-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.delete-button {
  padding: 6px 12px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

select {
  padding: 6px 12px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style> 