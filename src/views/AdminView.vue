<template>
  <div class="admin-dashboard">
    <header class="admin-header">
      <h1>Admin Dashboard</h1>
      <button @click="handleLogout" class="btn-logout">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        Logout
      </button>
    </header>

    <div class="admin-content">
      <nav class="admin-nav">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['nav-btn', { active: currentTab === tab.id }]"
          @click="currentTab = tab.id"
        >
          <font-awesome-icon :icon="tab.icon" />
          {{ tab.label }}
        </button>
      </nav>

      <div class="admin-main">
        <!-- Profile Management -->
        <div v-if="currentTab === 'profiles'" class="tab-content">
          <div class="section-instructions">
            <h2>Profile Management</h2>
            <p>Manage team member profiles here. Each profile should include:</p>
            <ul>
              <li>Name</li>
              <li>Role (e.g., Photographer, Videographer)</li>
              <li>Bio (short description)</li>
              <li>Instagram handle</li>
              <li>Profile photos</li>
            </ul>
          </div>
          <ProfileManagement />
        </div>

        <!-- Contact Form Submissions -->
        <div v-if="currentTab === 'contact'" class="tab-content">
          <div class="section-instructions">
            <h2>Contact Form Submissions</h2>
            <p>Review and manage contact form submissions. Each submission includes:</p>
            <ul>
              <li>Name</li>
              <li>Email</li>
              <li>Subject</li>
              <li>Message</li>
              <li>Timestamp</li>
            </ul>
          </div>
          <div v-if="submissions.length === 0" class="no-data">
            <p>No submissions yet</p>
          </div>
          <div v-else class="submissions-list">
            <div v-for="submission in submissions" :key="submission.id" class="submission-card">
              <div class="submission-header">
                <h3>{{ submission.name }}</h3>
                <span class="timestamp">{{ formatDate(submission.timestamp) }}</span>
              </div>
              <div class="submission-details">
                <p><strong>Email:</strong> {{ submission.email }}</p>
                <p><strong>Subject:</strong> {{ submission.subject }}</p>
                <p><strong>Message:</strong> {{ submission.message }}</p>
              </div>
              <button @click="deleteSubmission(submission.id)" class="btn-delete">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </div>
          </div>
        </div>

        <!-- Team Applications -->
        <div v-if="currentTab === 'applications'" class="tab-content">
          <div class="section-instructions">
            <h2>Team Applications</h2>
            <p>Review and manage team applications. Each application includes:</p>
            <ul>
              <li>Name</li>
              <li>Email</li>
              <li>Instagram handle</li>
              <li>Experience level</li>
              <li>Reason for joining</li>
              <li>Timestamp</li>
            </ul>
          </div>
          <div v-if="applications.length === 0" class="no-data">
            <p>No applications yet</p>
          </div>
          <div v-else class="applications-list">
            <div v-for="application in applications" :key="application.id" class="application-card">
              <div class="application-header">
                <h3>{{ application.name }}</h3>
                <span class="timestamp">{{ formatDate(application.timestamp) }}</span>
              </div>
              <div class="application-details">
                <p><strong>Email:</strong> {{ application.email }}</p>
                <p><strong>Instagram:</strong> {{ application.instagram }}</p>
                <p><strong>Experience:</strong> {{ application.experience }}</p>
                <p><strong>Why Join:</strong> {{ application.whyJoin }}</p>
              </div>
              <button @click="deleteApplication(application.id)" class="btn-delete">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </div>
          </div>
        </div>

        <!-- Uploaded Photos -->
        <div v-if="currentTab === 'photos'" class="tab-content">
          <div class="section-instructions">
            <h2>Uploaded Photos</h2>
            <p>Manage team member photos. Each photo entry includes:</p>
            <ul>
              <li>Photo preview</li>
              <li>Description/caption</li>
              <li>Associated profile</li>
              <li>Upload date</li>
            </ul>
          </div>
          <div v-if="photos.length === 0" class="no-data">
            <p>No photos uploaded yet</p>
          </div>
          <div v-else class="photos-grid">
            <div v-for="photo in photos" :key="photo.id" class="photo-card">
              <img :src="photo.url" :alt="photo.description" class="photo-preview">
              <div class="photo-info">
                <p class="photo-description">{{ photo.description }}</p>
                <p class="photo-profile">Profile: {{ photo.profileId }}</p>
                <p class="photo-date">{{ formatDate(photo.timestamp) }}</p>
              </div>
              <button @click="deletePhoto(photo.id)" class="btn-delete">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faUserCog, 
  faEnvelope, 
  faUserPlus, 
  faImages,
  faSignOutAlt,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import ProfileManagement from '@/components/ProfileManagement.vue'
import { 
  getAllContactSubmissions, 
  deleteContactSubmission,
  getAllTeamApplications,
  deleteTeamApplication,
  getAllPhotos,
  deletePhoto
} from '@/data/database'

export default {
  name: 'AdminView',
  components: {
    FontAwesomeIcon,
    ProfileManagement
  },
  setup() {
    const router = useRouter()
    const currentTab = ref('profiles')
    const submissions = ref([])
    const applications = ref([])
    const photos = ref([])

    const tabs = [
      { id: 'profiles', label: 'Profiles', icon: faUserCog },
      { id: 'contact', label: 'Contact Forms', icon: faEnvelope },
      { id: 'applications', label: 'Applications', icon: faUserPlus },
      { id: 'photos', label: 'Photos', icon: faImages }
    ]

    const loadData = async () => {
      submissions.value = await getAllContactSubmissions()
      applications.value = await getAllTeamApplications()
      photos.value = await getAllPhotos()
    }

    const deleteSubmission = async (id) => {
      if (confirm('Are you sure you want to delete this submission?')) {
        await deleteContactSubmission(id)
        await loadData()
      }
    }

    const deleteApplication = async (id) => {
      if (confirm('Are you sure you want to delete this application?')) {
        await deleteTeamApplication(id)
        await loadData()
      }
    }

    const deletePhoto = async (id) => {
      if (confirm('Are you sure you want to delete this photo?')) {
        await deletePhoto(id)
        await loadData()
      }
    }

    const formatDate = (timestamp) => {
      return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const handleLogout = () => {
      localStorage.removeItem('adminAuth')
      router.push('/')
    }

    onMounted(() => {
      loadData()
    })

    return {
      currentTab,
      tabs,
      submissions,
      applications,
      photos,
      deleteSubmission,
      deleteApplication,
      deletePhoto,
      formatDate,
      handleLogout
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  color: #fff;
}

.admin-header {
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.admin-header h1 {
  margin: 0;
  color: #fff;
  font-size: 1.5rem;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background: #c82333;
}

.admin-content {
  display: flex;
  min-height: calc(100vh - 64px);
}

.admin-nav {
  width: 250px;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: none;
  border: none;
  border-radius: 0.5rem;
  color: #ccc;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.nav-btn.active {
  background: #007bff;
  color: #fff;
}

.admin-main {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.tab-content {
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.section-instructions {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-instructions h2 {
  margin-top: 0;
  color: #fff;
  font-size: 1.5rem;
}

.section-instructions p {
  color: #ccc;
  margin-bottom: 1rem;
}

.section-instructions ul {
  color: #ccc;
  padding-left: 1.5rem;
  margin: 0;
}

.section-instructions li {
  margin-bottom: 0.5rem;
}

.tab-content h2 {
  margin-top: 0;
  color: #fff;
  font-size: 1.5rem;
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #ccc;
}

.submissions-list,
.applications-list {
  display: grid;
  gap: 1rem;
}

.submission-card,
.application-card {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.submission-header,
.application-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.timestamp {
  color: #ccc;
  font-size: 0.875rem;
}

.submission-details,
.application-details {
  color: #fff;
}

.submission-details p,
.application-details p {
  margin: 0.5rem 0;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.photo-card {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
}

.photo-preview {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.photo-info {
  padding: 1rem;
}

.photo-description {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #fff;
}

.photo-profile,
.photo-date {
  color: #ccc;
  font-size: 0.875rem;
  margin: 0.25rem 0;
}

.btn-delete {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(220, 53, 69, 0.9);
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-delete:hover {
  background: #dc3545;
}

@media (max-width: 768px) {
  .admin-content {
    flex-direction: column;
  }

  .admin-nav {
    width: 100%;
    padding: 1rem;
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
  }

  .nav-btn {
    margin-bottom: 0;
    white-space: nowrap;
  }

  .admin-main {
    padding: 1rem;
  }
}
</style> 