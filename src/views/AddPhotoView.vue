<template>
  <div class="add-photo">
    <section class="page-header">
      <h1>Add Photos</h1>
      <p>Add photos to your profile using postimages.org links</p>
    </section>

    <section class="page-content">
      <form class="photo-form" @submit.prevent="submitPhoto">
        <div class="form-group">
          <label for="profile">Select Profile</label>
          <select id="profile" v-model="form.profileId" required>
            <option value="">Select a profile</option>
            <option v-for="profile in profiles" :key="profile.id" :value="profile.id">
              {{ profile.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="title">Photo Title</label>
          <input type="text" id="title" v-model="form.title" required />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="form.description" required></textarea>
        </div>

        <div class="form-group">
          <label for="date">Date Taken</label>
          <input type="date" id="date" v-model="form.date" required />
        </div>

        <div class="form-group">
          <label for="photoUrl">Postimages.org URL</label>
          <input 
            type="url" 
            id="photoUrl" 
            v-model="form.photoUrl" 
            placeholder="https://postimg.cc/XXXXXX"
            required 
          />
          <div class="photo-preview" v-if="form.photoUrl">
            <img :src="form.photoUrl" alt="Preview" />
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          Add Photo
        </button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllProfiles, addPhotoToProfile } from '@/data/database';

const profiles = ref([]);

const form = ref({
  profileId: '',
  title: '',
  description: '',
  date: '',
  photoUrl: ''
});

onMounted(() => {
  profiles.value = getAllProfiles();
});

const submitPhoto = () => {
  if (!form.value.photoUrl) {
    alert('Please enter a valid postimages.org URL');
    return;
  }

  try {
    // Create a photo object
    const photo = {
      id: Date.now().toString(),
      title: form.value.title,
      description: form.value.description,
      date: form.value.date,
      url: form.value.photoUrl
    };

    // Add the photo to the selected profile
    addPhotoToProfile(form.value.profileId, photo);

    // Reset form
    form.value = {
      profileId: '',
      title: '',
      description: '',
      date: '',
      photoUrl: ''
    };

    alert('Photo added successfully!');
  } catch (error) {
    console.error('Error adding photo:', error);
    alert('Error adding photo. Please try again.');
  }
};
</script>

<style scoped>
.add-photo {
  min-height: 100vh;
}

.photo-form {
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
.form-group select,
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
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  background-color: rgba(255, 255, 255, 0.15);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.photo-preview {
  margin-top: var(--spacing-md);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.photo-preview img {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: var(--radius-md);
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
</style> 