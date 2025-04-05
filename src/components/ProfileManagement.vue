<template>
  <div class="profile-management">
    <h2>Profile Management</h2>
    
    <!-- Success Message -->
    <div v-if="success" class="success-message">
      {{ success }}
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <!-- Add New Profile Form -->
    <div class="add-profile-form">
      <h3>Add New Profile</h3>
      <form @submit.prevent="addNewProfile">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="newProfile.name" required>
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <input type="text" id="role" v-model="newProfile.role" required>
        </div>
        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea id="bio" v-model="newProfile.bio" required></textarea>
        </div>
        <div class="form-group">
          <label for="instagram">Instagram Link</label>
          <input type="url" id="instagram" v-model="newProfile.instagram" required placeholder="https://www.instagram.com/username">
        </div>
        <button type="submit" class="btn-primary">Add Profile</button>
      </form>
    </div>

    <!-- Profiles List -->
    <div class="profiles-list">
      <h3>Existing Profiles</h3>
      <div class="profile-grid">
        <div v-for="profile in profiles" :key="profile.id" class="profile-card">
          <div class="profile-header">
            <h4>{{ profile.name }}</h4>
            <div class="profile-actions">
              <button @click="editProfile(profile)" class="btn-edit">
                <font-awesome-icon :icon="['fas', 'edit']" />
              </button>
              <button @click="deleteProfile(profile.id)" class="btn-delete">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </div>
          </div>
          <p class="role">{{ profile.role }}</p>
          <p class="bio">{{ profile.bio }}</p>
          <a :href="profile.instagram" target="_blank" class="instagram-link">
            <font-awesome-icon :icon="['fab', 'instagram']" />
            Instagram
          </a>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="editingProfile" class="modal">
      <div class="modal-content">
        <h3>Edit Profile</h3>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="edit-name">Name</label>
            <input type="text" id="edit-name" v-model="editingProfile.name" required>
          </div>
          <div class="form-group">
            <label for="edit-role">Role</label>
            <input type="text" id="edit-role" v-model="editingProfile.role" required>
          </div>
          <div class="form-group">
            <label for="edit-bio">Bio</label>
            <textarea id="edit-bio" v-model="editingProfile.bio" required></textarea>
          </div>
          <div class="form-group">
            <label for="edit-instagram">Instagram Link</label>
            <input type="url" id="edit-instagram" v-model="editingProfile.instagram" required placeholder="https://www.instagram.com/username">
          </div>
          <div class="modal-actions">
            <button type="submit" class="btn-primary">Save Changes</button>
            <button type="button" @click="cancelEdit" class="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAllProfiles, addProfile, updateProfile, deleteProfile } from '@/data/database'

export default {
  name: 'ProfileManagement',
  setup() {
    const profiles = ref([])
    const newProfile = ref({
      name: '',
      role: '',
      bio: '',
      instagram: ''
    })
    const editingProfile = ref(null)
    const error = ref('')
    const success = ref('')

    const loadProfiles = async () => {
      try {
        profiles.value = await getAllProfiles()
        error.value = ''
      } catch (err) {
        console.error('Error loading profiles:', err)
        error.value = 'Failed to load profiles'
      }
    }

    const addNewProfile = async () => {
      try {
        error.value = ''
        success.value = ''
        
        // Validate all fields
        if (!newProfile.value.name || !newProfile.value.role || !newProfile.value.bio || !newProfile.value.instagram) {
          error.value = 'Please fill in all fields'
          return
        }

        // Validate Instagram URL
        if (!newProfile.value.instagram.startsWith('https://www.instagram.com/')) {
          error.value = 'Please enter a valid Instagram URL starting with https://www.instagram.com/'
          return
        }

        // Format the profile data
        const profileData = {
          name: newProfile.value.name.trim(),
          role: newProfile.value.role.trim(),
          bio: newProfile.value.bio.trim(),
          instagram: newProfile.value.instagram.trim()
        }

        console.log('Adding profile with data:', profileData)

        const result = await addProfile(profileData)
        console.log('Profile added successfully:', result)

        if (result && result.error) {
          throw new Error(result.error)
        }

        success.value = 'Profile added successfully'
        
        // Reset form
        newProfile.value = {
          name: '',
          role: '',
          bio: '',
          instagram: ''
        }
        
        // Reload profiles
        await loadProfiles()
      } catch (err) {
        console.error('Error adding profile:', err)
        error.value = typeof err === 'string' ? err : (err.message || 'Failed to add profile')
      }
    }

    const editProfile = (profile) => {
      editingProfile.value = { ...profile }
    }

    const updateExistingProfile = async () => {
      try {
        error.value = ''
        success.value = ''
        
        // Validate Instagram URL
        if (!editingProfile.value.instagram.startsWith('https://www.instagram.com/')) {
          error.value = 'Please enter a valid Instagram URL starting with https://www.instagram.com/'
          return
        }

        await updateProfile(editingProfile.value)
        success.value = 'Profile updated successfully'
        editingProfile.value = null
        await loadProfiles()
      } catch (err) {
        console.error('Error updating profile:', err)
        error.value = 'Failed to update profile'
      }
    }

    const deleteExistingProfile = async (id) => {
      if (confirm('Are you sure you want to delete this profile?')) {
        try {
          error.value = ''
          success.value = ''
          await deleteProfile(id)
          success.value = 'Profile deleted successfully'
          await loadProfiles()
        } catch (err) {
          console.error('Error deleting profile:', err)
          error.value = 'Failed to delete profile'
        }
      }
    }

    const cancelEdit = () => {
      editingProfile.value = null
      error.value = ''
    }

    onMounted(() => {
      loadProfiles()
    })

    return {
      profiles,
      newProfile,
      editingProfile,
      error,
      success,
      addNewProfile,
      editProfile,
      updateProfile: updateExistingProfile,
      deleteProfile: deleteExistingProfile,
      cancelEdit
    }
  }
}
</script>

<style scoped>
.profile-management {
  padding: 2rem;
}

.add-profile-form {
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #fff;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.profiles-list {
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.profile-card {
  background: rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.profile-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: none;
  color: #fff;
}

.btn-edit:hover {
  color: #007bff;
}

.btn-delete:hover {
  color: #dc3545;
}

.btn-primary {
  background: #007bff;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-secondary:hover {
  background: #5a6268;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.instagram-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #007bff;
  text-decoration: none;
  margin-top: 1rem;
}

.instagram-link:hover {
  text-decoration: underline;
}

.success-message {
  background: rgba(40, 167, 69, 0.2);
  color: #28a745;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid rgba(40, 167, 69, 0.3);
}

.error-message {
  background: rgba(220, 53, 69, 0.2);
  color: #dc3545;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid rgba(220, 53, 69, 0.3);
}

.role {
  color: #ccc;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.bio {
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.5;
}
</style> 