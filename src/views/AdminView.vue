<template>
  <div class="admin">
    <!-- Alert Component -->
    <div v-if="alert.show" :class="['alert', alert.type]">
      {{ alert.message }}
    </div>
    <div class="admin-header">
      <div class="header-left">
        <h1>Admin Dashboard</h1>
        <div class="admin-actions">
          <button class="action-button primary" @click="showAddPhotoModal = true">
            <i class="icon-add"></i> Add Photo
          </button>
          <button class="action-button primary" @click="showAddPhotographerModal = true">
            <i class="icon-user-add"></i> Add Photographer
          </button>
          <button class="action-button primary" @click="showAddAnnouncementModal = true">
            <i class="icon-announcement"></i> New Announcement
          </button>
        </div>
      </div>
      <button @click="logout" class="logout-button">
        <i class="icon-logout"></i> Logout
      </button>
    </div>

    <div class="admin-grid">
      <!-- Stats Overview -->
      <div class="stats-section">
        <div class="stats-card">
          <div class="stat-icon">
            <i class="icon-photos"></i>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ totalPhotos }}</span>
            <span class="stat-label">Total Photos</span>
          </div>
        </div>
        <div class="stats-card">
          <div class="stat-icon">
            <i class="icon-users"></i>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ totalPhotographers }}</span>
            <span class="stat-label">Photographers</span>
          </div>
        </div>
        <div class="stats-card">
          <div class="stat-icon">
            <i class="icon-applications"></i>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ totalApplications }}</span>
            <span class="stat-label">Applications</span>
          </div>
        </div>
        <div class="stats-card">
          <div class="stat-icon">
            <i class="icon-announcements"></i>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ totalAnnouncements }}</span>
            <span class="stat-label">Announcements</span>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <div class="activity-timeline">
          <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
            <div class="activity-icon" :class="activity.type">
              <i :class="activity.icon"></i>
            </div>
            <div class="activity-content">
              <p class="activity-text">{{ activity.text }}</p>
              <span class="activity-time">{{ formatTimeAgo(activity.time) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <button class="action-card" @click="showAddPhotoModal = true">
            <i class="icon-photo"></i>
            <span>Add Photo</span>
          </button>
          <button class="action-card" @click="showAddPhotographerModal = true">
            <i class="icon-user-add"></i>
            <span>Add Photographer</span>
          </button>
          <button class="action-card" @click="showAddAnnouncementModal = true">
            <i class="icon-announcement"></i>
            <span>New Announcement</span>
          </button>
          <button class="action-card" @click="showEmailModal = true">
            <i class="icon-email"></i>
            <span>Send Email</span>
          </button>
        </div>
      </div>

      <!-- Photos Section -->
      <div class="photos-section">
        <div class="section-header">
          <h2>Photos</h2>
          <button class="action-button primary" @click="showAddPhotoModal = true">
            <i class="icon-add"></i> Add Photo
          </button>
        </div>
        <div class="photos-grid">
          <div v-for="photo in photos" :key="photo.id" class="photo-card">
            <div class="photo-image">
              <img :src="photo.imageUrl" :alt="photo.title">
            </div>
            <div class="photo-info">
              <h3>{{ photo.title }}</h3>
              <div class="photo-details">
                <span class="photographer">
                  <i class="icon-user"></i>
                  {{ photographers.find(p => p.id === photo.photographerId)?.name || 'Unknown' }}
                </span>
                <span class="date">
                  <i class="icon-calendar"></i>
                  {{ formatDate(photo.date) }}
                </span>
              </div>
              <p class="description">{{ photo.description }}</p>
              <div class="camera-info">
                <span v-if="photo.camera">
                  <i class="icon-camera"></i> {{ photo.camera }}
                </span>
                <span v-if="photo.lens">
                  <i class="icon-lens"></i> {{ photo.lens }}
                </span>
              </div>
            </div>
            <div class="photo-actions">
              <button class="action-button edit" @click="editPhoto(photo)">
                <i class="icon-edit"></i> Edit
              </button>
              <button class="action-button delete" @click="deletePhoto(photo.id)">
                <i class="icon-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Applications Section -->
      <div class="applications-section">
        <div class="section-header">
          <h2>Applications</h2>
          <div class="filters">
            <select v-model="applicationFilter" class="filter-select">
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <input 
              type="text" 
              v-model="applicationSearch" 
              placeholder="Search applications..." 
              class="search-input"
            >
          </div>
        </div>
        <div class="applications-grid">
          <div v-for="application in filteredApplications" :key="application.id" class="application-card">
            <div class="application-header">
              <div class="applicant-info">
                <h3>{{ application.name }}</h3>
                <span class="applicant-email">{{ application.email }}</span>
              </div>
              <span :class="['status-badge', application.status]">{{ application.status }}</span>
            </div>
            <div class="application-details">
              <div class="detail-item">
                <i class="icon-location"></i>
                <span>{{ application.location }}</span>
              </div>
              <div class="detail-item">
                <i class="icon-experience"></i>
                <span>{{ application.experience }} years experience</span>
              </div>
              <div class="detail-item">
                <i class="icon-portfolio"></i>
                <a :href="application.portfolio" target="_blank">View Portfolio</a>
              </div>
            </div>
            <div class="application-message">
              <p>{{ application.message }}</p>
            </div>
            <div class="application-actions">
              <button 
                v-if="application.status === 'pending'"
                @click="updateApplicationStatus(application.id, 'approved')"
                class="action-button approve"
              >
                <i class="icon-check"></i> Approve
              </button>
              <button 
                v-if="application.status === 'pending'"
                @click="updateApplicationStatus(application.id, 'rejected')"
                class="action-button reject"
              >
                <i class="icon-x"></i> Reject
              </button>
              <button 
                @click="deleteApplication(application.id)"
                class="action-button delete"
              >
                <i class="icon-trash"></i> Delete
              </button>
              <button 
                @click="openEmailModal(application)"
                class="action-button email"
              >
                <i class="icon-email"></i> Email
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Announcements Section -->
      <div class="announcements-section">
        <div class="section-header">
          <h2>Announcements</h2>
          <button class="action-button primary" @click="showAddAnnouncementModal = true">
            <i class="icon-add"></i> New Announcement
          </button>
        </div>
        <div class="announcements-grid">
          <div v-for="announcement in announcements" :key="announcement.id" class="announcement-card">
            <div class="announcement-header">
              <h3>{{ announcement.title }}</h3>
              <span class="announcement-date">{{ formatDate(announcement.date) }}</span>
            </div>
            <div class="announcement-content">
              <p>{{ announcement.content }}</p>
            </div>
            <div class="announcement-actions">
              <button class="action-button edit" @click="editAnnouncement(announcement)">
                <i class="icon-edit"></i> Edit
              </button>
              <button class="action-button delete" @click="deleteAnnouncement(announcement.id)">
                <i class="icon-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Photo Modal -->
    <div v-if="showAddPhotoModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingPhoto ? 'Edit Photo' : 'Add New Photo' }}</h3>
          <button class="close-button" @click="closePhotoModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="photoTitle">Title</label>
            <input 
              type="text" 
              id="photoTitle" 
              v-model="newPhoto.title" 
              class="form-control" 
              placeholder="Enter photo title"
              required
            >
          </div>
          <div class="form-group">
            <label for="photoImageUrl">Image URL</label>
            <input 
              type="text" 
              id="photoImageUrl" 
              v-model="newPhoto.imageUrl" 
              class="form-control" 
              placeholder="Enter image URL"
              @input="updatePhotoPreview"
              required
            >
          </div>
          <div class="form-group">
            <label for="photoDescription">Description</label>
            <textarea 
              id="photoDescription" 
              v-model="newPhoto.description" 
              class="form-control" 
              placeholder="Enter photo description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="photoCamera">Camera</label>
            <input 
              type="text" 
              id="photoCamera" 
              v-model="newPhoto.camera" 
              class="form-control" 
              placeholder="Enter camera model"
            >
          </div>
          <div class="form-group">
            <label for="photoLens">Lens</label>
            <input 
              type="text" 
              id="photoLens" 
              v-model="newPhoto.lens" 
              class="form-control" 
              placeholder="Enter lens model"
            >
          </div>
          <div class="form-group">
            <label for="photoPhotographer">Photographer</label>
            <select 
              id="photoPhotographer" 
              v-model="newPhoto.photographerId" 
              class="form-control"
              required
            >
              <option value="">Select photographer</option>
              <option v-for="photographer in photographers" :key="photographer.id" :value="photographer.id">
                {{ photographer.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="photoDate">Date</label>
            <input 
              type="date" 
              id="photoDate" 
              v-model="newPhoto.date" 
              class="form-control"
              required
            >
          </div>
          <div v-if="newPhoto.previewUrl" class="form-group">
            <label>Preview</label>
            <div class="image-preview">
              <img :src="newPhoto.previewUrl" alt="Photo preview">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closePhotoModal">Cancel</button>
          <button class="btn btn-primary" @click="savePhoto">
            {{ editingPhoto ? 'Update' : 'Add' }} Photo
          </button>
        </div>
      </div>
    </div>

    <!-- Add Photographer Modal -->
    <div v-if="showAddPhotographerModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingPhotographer ? 'Edit Photographer' : 'Add New Photographer' }}</h3>
          <button class="close-button" @click="closePhotographerModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="photographerName">Name</label>
            <input 
              type="text" 
              id="photographerName" 
              v-model="newPhotographer.name" 
              class="form-control" 
              placeholder="Enter name"
              required
            >
          </div>
          <div class="form-group">
            <label for="photographerSpecialty">Specialty</label>
            <input 
              type="text" 
              id="photographerSpecialty" 
              v-model="newPhotographer.specialty" 
              class="form-control" 
              placeholder="Enter specialty"
            >
          </div>
          <div class="form-group">
            <label for="photographerLocation">Location</label>
            <input 
              type="text" 
              id="photographerLocation" 
              v-model="newPhotographer.location" 
              class="form-control" 
              placeholder="Enter location"
              required
            >
          </div>
          <div class="form-group">
            <label for="photographerProfileImage">Profile Image URL</label>
            <input 
              type="text" 
              id="photographerProfileImage" 
              v-model="newPhotographer.profileImage" 
              class="form-control" 
              placeholder="Enter profile image URL"
              @input="updatePhotographerPreview"
              required
            >
          </div>
          <div class="form-group">
            <label for="photographerJoinDate">Join Date</label>
            <input 
              type="date" 
              id="photographerJoinDate" 
              v-model="newPhotographer.joinDate" 
              class="form-control"
              required
            >
          </div>
          <div v-if="newPhotographer.previewUrl" class="form-group">
            <label>Preview</label>
            <div class="image-preview">
              <img :src="newPhotographer.previewUrl" alt="Profile preview">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closePhotographerModal">Cancel</button>
          <button class="btn btn-primary" @click="savePhotographer">
            {{ editingPhotographer ? 'Update' : 'Add' }} Photographer
          </button>
        </div>
      </div>
    </div>

    <!-- Add Announcement Modal -->
    <div v-if="showAddAnnouncementModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement' }}</h3>
          <button class="close-button" @click="closeAnnouncementModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="announcementTitle">Title</label>
            <input 
              type="text" 
              id="announcementTitle" 
              v-model="newAnnouncement.title" 
              class="form-control" 
              placeholder="Enter title"
              required
            >
          </div>
          <div class="form-group">
            <label for="announcementContent">Content</label>
            <textarea 
              id="announcementContent" 
              v-model="newAnnouncement.content" 
              class="form-control" 
              placeholder="Enter content"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <label for="announcementCategory">Category</label>
            <select 
              id="announcementCategory" 
              v-model="newAnnouncement.category" 
              class="form-control"
              required
            >
              <option value="general">General</option>
              <option value="event">Event</option>
              <option value="update">Update</option>
              <option value="important">Important</option>
            </select>
          </div>
          <div class="form-group">
            <label for="announcementDate">Date</label>
            <input 
              type="date" 
              id="announcementDate" 
              v-model="newAnnouncement.date" 
              class="form-control"
              required
            >
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeAnnouncementModal">Cancel</button>
          <button class="btn btn-primary" @click="saveAnnouncement">
            {{ editingAnnouncement ? 'Update' : 'Add' }} Announcement
          </button>
        </div>
      </div>
    </div>

    <!-- Email Modal -->
    <div v-if="showEmailModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Send Email to {{ selectedApplication?.name }}</h3>
          <button @click="closeEmailModal" class="close-button">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Subject</label>
            <input v-model="emailSubject" type="text" class="form-input">
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea v-model="emailMessage" class="form-textarea"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="sendEmail" class="button primary">Send Email</button>
          <button @click="closeEmailModal" class="button secondary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { useDataStore } from '../stores/dataStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const dataStore = useDataStore()

// Modal states
const showAddPhotoModal = ref(false)
const showAddPhotographerModal = ref(false)
const showAddAnnouncementModal = ref(false)
const showEmailModal = ref(false)
const editingAnnouncement = ref(null)
const editingPhoto = ref(null)
const editingPhotographer = ref(null)

// Form data with proper initialization
const newPhoto = ref({
  title: '',
  photographerId: '',
  imageUrl: '',
  description: '',
  camera: '',
  lens: '',
  date: new Date().toISOString().split('T')[0],
  previewUrl: ''
})

const newPhotographer = ref({
  name: '',
  specialty: '',
  location: 'YVR',
  profileImage: '',
  joinDate: new Date().toISOString().split('T')[0],
  previewUrl: ''
})

const newAnnouncement = ref({
  title: '',
  content: '',
  category: 'general',
  date: new Date().toISOString().split('T')[0]
})

// Email data
const selectedApplication = ref(null)
const emailSubject = ref('')
const emailMessage = ref('')

// Alert system
const alert = ref({
  show: false,
  message: '',
  type: 'success' // 'success', 'error', 'info', 'warning'
})

const showAlert = (message, type = 'success') => {
  alert.value = {
    show: true,
    message,
    type
  }
  setTimeout(() => {
    alert.value.show = false
  }, 3000)
}

// Computed properties with error handling
const photographers = computed(() => dataStore.photographers || [])
const photos = computed(() => dataStore.photos || [])
const applications = computed(() => dataStore.applications || [])
const announcements = computed(() => dataStore.announcements || [])

const totalPhotos = computed(() => photos.value.length)
const totalPhotographers = computed(() => photographers.value.length)
const totalApplications = computed(() => applications.value.length)
const totalAnnouncements = computed(() => announcements.value.length)

// Application filtering with improved search
const applicationFilter = ref('all')
const applicationSearch = ref('')

const filteredApplications = computed(() => {
  try {
    let filtered = [...applications.value]
    
    if (applicationFilter.value !== 'all') {
      filtered = filtered.filter(app => app.status === applicationFilter.value)
    }
    
    if (applicationSearch.value) {
      const searchTerm = applicationSearch.value.toLowerCase()
      filtered = filtered.filter(app => 
        app.name?.toLowerCase().includes(searchTerm) ||
        app.email?.toLowerCase().includes(searchTerm) ||
        app.location?.toLowerCase().includes(searchTerm)
      )
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error filtering applications:', error)
    return []
  }
})

// Recent activity with error handling
const recentActivity = computed(() => {
  try {
    const activities = []
    
    // Add recent photos
    photos.value.slice(0, 3).forEach(photo => {
      activities.push({
        id: `photo-${photo.id}`,
        type: 'photo',
        icon: 'icon-photo',
        text: `New photo added: ${photo.title}`,
        time: photo.date
      })
    })
    
    // Add recent applications
    applications.value.slice(0, 3).forEach(app => {
      activities.push({
        id: `app-${app.id}`,
        type: 'application',
        icon: 'icon-application',
        text: `New application from ${app.name}`,
        time: app.date
      })
    })
    
    // Add recent announcements
    announcements.value.slice(0, 3).forEach(announcement => {
      activities.push({
        id: `announcement-${announcement.id}`,
        type: 'announcement',
        icon: 'icon-announcement',
        text: `New announcement: ${announcement.title}`,
        time: announcement.date
      })
    })
    
    return activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 5)
  } catch (error) {
    console.error('Error generating activity feed:', error)
    return []
  }
})

// Photo management with error handling and feedback
const editPhoto = (photo) => {
  try {
    editingPhoto.value = photo
    newPhoto.value = { ...photo }
    showAddPhotoModal.value = true
  } catch (error) {
    console.error('Error editing photo:', error)
    showAlert('Error editing photo', 'error')
  }
}

const deletePhoto = async (id) => {
  if (confirm('Are you sure you want to delete this photo?')) {
    try {
      const success = await dataStore.deletePhoto(id)
      if (success) {
        showAlert('Photo deleted successfully', 'success')
      } else {
        showAlert('Failed to delete photo', 'error')
      }
    } catch (error) {
      console.error('Error deleting photo:', error)
      showAlert('Error deleting photo', 'error')
    }
  }
}

const savePhoto = async () => {
  try {
    if (!newPhoto.value.title || !newPhoto.value.imageUrl || !newPhoto.value.photographerId) {
      showAlert('Please fill in all required fields', 'error')
      return
    }

    const success = editingPhoto.value
      ? await dataStore.updatePhoto(editingPhoto.value.id, newPhoto.value)
      : await dataStore.addPhoto({
          ...newPhoto.value,
          date: new Date().toISOString()
        })

    if (success) {
      showAlert(editingPhoto.value ? 'Photo updated successfully' : 'Photo added successfully', 'success')
      closePhotoModal()
    } else {
      showAlert('Failed to save photo', 'error')
    }
  } catch (error) {
    console.error('Error saving photo:', error)
    showAlert('Error saving photo', 'error')
  }
}

const closePhotoModal = () => {
  showAddPhotoModal.value = false
  editingPhoto.value = null
  resetPhotoForm()
}

// Photographer management with validation
const editPhotographer = (photographer) => {
  try {
    editingPhotographer.value = photographer
    newPhotographer.value = { ...photographer }
    showAddPhotographerModal.value = true
  } catch (error) {
    console.error('Error editing photographer:', error)
    showAlert('Error editing photographer', 'error')
  }
}

const savePhotographer = async () => {
  try {
    if (!newPhotographer.value.name || !newPhotographer.value.location || !newPhotographer.value.profileImage) {
      showAlert('Please fill in all required fields', 'error')
      return
    }

    const success = editingPhotographer.value
      ? await dataStore.updatePhotographer(editingPhotographer.value.id, newPhotographer.value)
      : await dataStore.addPhotographer({
          ...newPhotographer.value,
          joinDate: new Date().toISOString()
        })

    if (success) {
      showAlert(editingPhotographer.value ? 'Photographer updated successfully' : 'Photographer added successfully', 'success')
      closePhotographerModal()
    } else {
      showAlert('Failed to save photographer', 'error')
    }
  } catch (error) {
    console.error('Error saving photographer:', error)
    showAlert('Error saving photographer', 'error')
  }
}

const closePhotographerModal = () => {
  showAddPhotographerModal.value = false
  editingPhotographer.value = null
  resetPhotographerForm()
}

// Application management with status updates
const updateApplicationStatus = async (id, status) => {
  try {
    const success = await dataStore.updateApplicationStatus(id, status)
    if (success) {
      showAlert(`Application ${status} successfully`, 'success')
      // Open email modal with appropriate template
      const application = applications.value.find(app => app.id === id)
      if (application) {
        openEmailModal(application, status)
      }
    } else {
      showAlert(`Failed to ${status} application`, 'error')
    }
  } catch (error) {
    console.error('Error updating application status:', error)
    showAlert('Error updating application status', 'error')
  }
}

const deleteApplication = async (id) => {
  if (confirm('Are you sure you want to delete this application?')) {
    try {
      const success = await dataStore.deleteApplication(id)
      if (success) {
        showAlert('Application deleted successfully', 'success')
      } else {
        showAlert('Failed to delete application', 'error')
      }
    } catch (error) {
      console.error('Error deleting application:', error)
      showAlert('Error deleting application', 'error')
    }
  }
}

// Email functionality with templates
const openEmailModal = (application, status = null) => {
  selectedApplication.value = application
  emailSubject.value = `RE: Your VERSA Spotting Group Application`
  
  let template = `Dear ${application.name},\n\n`
  
  if (status === 'approved') {
    template += `We are pleased to inform you that your application to join VERSA Spotting Group has been approved! Welcome to the team!\n\n`
    template += `Next steps:\n1. Join our Discord server\n2. Review our spotting guidelines\n3. Schedule your orientation\n\n`
  } else if (status === 'rejected') {
    template += `Thank you for your interest in joining VERSA Spotting Group. After careful consideration, we regret to inform you that we cannot accept your application at this time.\n\n`
    template += `We encourage you to continue developing your photography skills and consider applying again in the future.\n\n`
  } else {
    template += `Thank you for your application to join VERSA Spotting Group. We have received your submission and will review it shortly.\n\n`
    template += `We will contact you with our decision within the next few days.\n\n`
  }
  
  template += `Best regards,\nVERSA Spotting Group Team`
  
  emailMessage.value = template
  showEmailModal.value = true
}

const sendEmail = async () => {
  try {
    if (!emailSubject.value || !emailMessage.value) {
      showAlert('Please fill in all email fields', 'error')
      return
    }

    // Here you would implement the actual email sending logic
    // For now, we'll simulate it with a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showAlert('Email sent successfully', 'success')
    closeEmailModal()
  } catch (error) {
    console.error('Error sending email:', error)
    showAlert('Error sending email', 'error')
  }
}

// Announcement management with validation
const editAnnouncement = (announcement) => {
  try {
    editingAnnouncement.value = announcement
    newAnnouncement.value = { ...announcement }
    showAddAnnouncementModal.value = true
  } catch (error) {
    console.error('Error editing announcement:', error)
    showAlert('Error editing announcement', 'error')
  }
}

const saveAnnouncement = async () => {
  try {
    if (!newAnnouncement.value.title || !newAnnouncement.value.content || !newAnnouncement.value.category) {
      showAlert('Please fill in all required fields', 'error')
      return
    }

    const success = editingAnnouncement.value
      ? await dataStore.updateAnnouncement(editingAnnouncement.value.id, newAnnouncement.value)
      : await dataStore.addAnnouncement({
          ...newAnnouncement.value,
          date: new Date().toISOString()
        })

    if (success) {
      showAlert(editingAnnouncement.value ? 'Announcement updated successfully' : 'Announcement added successfully', 'success')
      closeAnnouncementModal()
    } else {
      showAlert('Failed to save announcement', 'error')
    }
  } catch (error) {
    console.error('Error saving announcement:', error)
    showAlert('Error saving announcement', 'error')
  }
}

const deleteAnnouncement = async (id) => {
  if (confirm('Are you sure you want to delete this announcement?')) {
    try {
      const success = await dataStore.deleteAnnouncement(id)
      if (success) {
        showAlert('Announcement deleted successfully', 'success')
      } else {
        showAlert('Failed to delete announcement', 'error')
      }
    } catch (error) {
      console.error('Error deleting announcement:', error)
      showAlert('Error deleting announcement', 'error')
    }
  }
}

const closeAnnouncementModal = () => {
  showAddAnnouncementModal.value = false
  editingAnnouncement.value = null
  newAnnouncement.value = {
    title: '',
    content: '',
    category: 'general',
    date: new Date().toISOString().split('T')[0]
  }
}

// Form reset functions
const resetPhotoForm = () => {
  editingPhoto.value = null
  newPhoto.value = {
    title: '',
    photographerId: '',
    imageUrl: '',
    description: '',
    camera: '',
    lens: '',
    date: new Date().toISOString().split('T')[0],
    previewUrl: ''
  }
}

const resetPhotographerForm = () => {
  editingPhotographer.value = null
  newPhotographer.value = {
    name: '',
    specialty: '',
    location: 'YVR',
    profileImage: '',
    joinDate: new Date().toISOString().split('T')[0],
    previewUrl: ''
  }
}

// Image URL parsing with validation
const parseImageUrl = (url) => {
  if (!url) return ''
  
  try {
    // Handle postimages.org URLs
    if (url.includes('postimages.org')) {
      const match = url.match(/\/\/(?:i\.)?postimg\.(?:cc|org)\/([^\/]+)/)
      if (match) {
        return `https://i.postimg.cc/${match[1]}`
      }
    }
    
    // Handle direct image URLs
    if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return url
    }
    
    return url
  } catch (error) {
    console.error('Error parsing image URL:', error)
    return ''
  }
}

// Preview update functions
const updatePhotoPreview = () => {
  newPhoto.value.previewUrl = parseImageUrl(newPhoto.value.imageUrl)
}

const updatePhotographerPreview = () => {
  newPhotographer.value.previewUrl = parseImageUrl(newPhotographer.value.profileImage)
}

// Date formatting
const formatTimeAgo = (dateString) => {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  } catch (error) {
    console.error('Error formatting time:', error)
    return 'Invalid date'
  }
}

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid date'
  }
}

// Authentication
const logout = () => {
  try {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
    showAlert('Logged out successfully', 'success')
  } catch (error) {
    console.error('Error logging out:', error)
    showAlert('Error logging out', 'error')
  }
}

// Modal close functions
const closeEmailModal = () => {
  showEmailModal.value = false
  selectedApplication.value = null
  emailSubject.value = ''
  emailMessage.value = ''
}

// Initial data load
onMounted(async () => {
  try {
    const results = await Promise.all([
      dataStore.fetchPhotos(),
      dataStore.fetchPhotographers(),
      dataStore.fetchApplications(),
      dataStore.fetchAnnouncements()
    ])
    
    if (results.some(result => !result)) {
      showAlert('Error loading some data. Please refresh the page.', 'error')
    }
    
    gsap.from('.admin-grid', {
      duration: 0.5,
      opacity: 0,
      ease: 'power1.out'
    })
  } catch (error) {
    console.error('Error loading initial data:', error)
    showAlert('Error loading data. Please refresh the page.', 'error')
  }
})

// Update error handling to use alert
const handleError = (error) => {
  showAlert(error.message || 'An error occurred', 'error')
}

const handleSuccess = (message) => {
  showAlert(message, 'success')
}
</script>

<style scoped>
/* Base Admin Styles */
.admin {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  min-height: 100vh;
  background: #111111;
  color: #ffffff;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.admin-header h1 {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.admin-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: #2a2a2a;
  color: #fff;
  transition: all 0.2s ease;
}

.action-button:hover {
  transform: translateY(-1px);
  background: #333;
}

.action-button.primary {
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  color: #000;
}

.action-button.primary:hover {
  background: linear-gradient(135deg, #a1ab34 0%, #c9d63f 100%);
}

.logout-button {
  background: #2a2a2a;
  color: #ff4444;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background: #ff44441a;
  transform: translateY(-1px);
}

/* Grid Layout */
.admin-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}

/* Stats Section */
.stats-section {
  grid-column: span 12;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.stats-card {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.stats-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2rem;
  color: #90992e;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.stat-label {
  color: #999;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Recent Activity */
.recent-activity {
  grid-column: span 4;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.activity-item:hover {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.05);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #90992e1a;
  color: #90992e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.activity-content {
  flex: 1;
}

.activity-text {
  color: #fff;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.activity-time {
  color: #999;
  font-size: 0.85rem;
}

/* Quick Actions */
.quick-actions {
  grid-column: span 8;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.action-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.05);
}

.action-card i {
  font-size: 2rem;
  color: #90992e;
}

.action-card span {
  font-weight: 500;
  color: #fff;
}

/* Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
}

/* Photos Section */
.photos-section {
  grid-column: span 12;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.photo-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.photo-card:hover {
  transform: translateY(-2px);
}

.photo-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.photo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-card:hover .photo-image img {
  transform: scale(1.05);
}

.photo-info {
  padding: 1.5rem;
}

.photo-info h3 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.photo-details {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  color: #999;
  font-size: 0.9rem;
}

.photo-details span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.photo-details i {
  color: #90992e;
}

.description {
  color: #999;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.photo-actions {
  padding: 1.25rem 1.5rem;
  display: flex;
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* Applications Section */
.applications-section {
  grid-column: span 8;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.filters {
  display: flex;
  gap: 1rem;
}

.filter-select,
.search-input {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.filter-select:focus,
.search-input:focus {
  outline: none;
  border-color: #90992e;
  background: rgba(255, 255, 255, 0.05);
}

.search-input {
  width: 300px;
}

.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.application-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  transition: transform 0.2s ease;
}

.application-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.05);
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.status-badge.pending {
  background: #ffd70015;
  color: #ffd700;
}

.status-badge.approved {
  background: #2ecc7115;
  color: #2ecc71;
}

.status-badge.rejected {
  background: #ff444415;
  color: #ff4444;
}

/* Announcements Section */
.announcements-section {
  grid-column: span 4;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.announcement-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease;
}

.announcement-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.05);
}

/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  font-size: 1.5rem;
  color: #fff;
  font-weight: 600;
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

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #fff;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #90992e;
  background: rgba(255, 255, 255, 0.05);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.image-preview {
  margin-top: 1rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .admin-grid {
    grid-template-columns: 1fr;
  }

  .recent-activity,
  .quick-actions,
  .applications-section,
  .announcements-section {
    grid-column: span 12;
  }
}

@media (max-width: 768px) {
  .admin {
    padding: 1rem;
  }

  .admin-header {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .admin-actions {
    flex-wrap: wrap;
    justify-content: center;
  }

  .search-input {
    width: 100%;
  }

  .filters {
    flex-direction: column;
    width: 100%;
  }

  .stats-section {
    gap: 1rem;
  }

  .stats-card {
    padding: 1.5rem;
  }
}

/* Simple Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.close-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: var(--text-primary);
}

.modal-body {
  margin-bottom: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

/* Form styles */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--input-bg);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

textarea.form-control {
  min-height: 100px;
  resize: vertical;
}

/* Loading spinner */
.loading-spinner {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid var(--border-color);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Alert styles */
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 2rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 9999;
  animation: slideIn 0.3s ease-out;
}

.alert.success {
  background: #10B981;
}

.alert.error {
  background: #EF4444;
}

.alert.info {
  background: #3B82F6;
}

.alert.warning {
  background: #F59E0B;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style> 