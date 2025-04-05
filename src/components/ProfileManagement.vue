<template>
  <div class="profile-management">
    <h2>Profile Management</h2>
    
    <!-- Add New Profile Form -->
    <div class="add-profile-form">
      <h3>Add New Profile</h3>
      <form @submit.prevent="addProfile">
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
          <input type="url" id="instagram" v-model="newProfile.instagram" required>
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
            <input type="url" id="edit-instagram" v-model="editingProfile.instagram" required>
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

    const loadProfiles = async () => {
      profiles.value = await getAllProfiles()
    }

    const addNewProfile = async () => {
      try {
        await addProfile(newProfile.value)
        newProfile.value = {
          name: '',
          role: '',
          bio: '',
          instagram: ''
        }
        await loadProfiles()
      } catch (error) {
        console.error('Error adding profile:', error)
      }
    }

    const editProfile = (profile) => {
      editingProfile.value = { ...profile }
    }

    const updateExistingProfile = async () => {
      try {
        await updateProfile(editingProfile.value)
        editingProfile.value = null
        await loadProfiles()
      } catch (error) {
        console.error('Error updating profile:', error)
      }
    }

    const deleteExistingProfile = async (id) => {
      if (confirm('Are you sure you want to delete this profile?')) {
        try {
          await deleteProfile(id)
          await loadProfiles()
        } catch (error) {
          console.error('Error deleting profile:', error)
        }
      }
    }

    const cancelEdit = () => {
      editingProfile.value = null
    }

    onMounted(() => {
      loadProfiles()
    })

    return {
      profiles,
      newProfile,
      editingProfile,
      addProfile: addNewProfile,
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
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.profiles-list {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.profile-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #ddd;
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
}

.btn-edit {
  color: #007bff;
}

.btn-delete {
  color: #dc3545;
}

.role {
  color: #666;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.bio {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.instagram-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #007bff;
  text-decoration: none;
}

.instagram-link:hover {
  text-decoration: underline;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-primary {
  background: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background: #6c757d;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover,
.btn-secondary:hover {
  opacity: 0.9;
}
</style> 