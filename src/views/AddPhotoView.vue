<template>
  <div class="add-photo">
    <div class="container">
      <h1>Add New Photo</h1>
      <div class="photo-form">
        <div class="form-group">
          <label for="photographer">Photographer</label>
          <select id="photographer" v-model="selectedPhotographer" required>
            <option value="" disabled>Select a photographer</option>
            <option v-for="profile in profiles" :key="profile.id" :value="profile.id">
              {{ profile.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="title">Photo Title</label>
          <input
            type="text"
            id="title"
            v-model="photo.title"
            placeholder="Enter photo title"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="photo.description"
            placeholder="Enter photo description"
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="date">Date Taken</label>
          <input
            type="date"
            id="date"
            v-model="photo.date"
            required
          />
        </div>

        <div class="form-group">
          <label for="imageUrl">Postimages.org Direct Link</label>
          <input
            type="url"
            id="imageUrl"
            v-model="photo.imageUrl"
            placeholder="https://i.postimg.cc/XXXXXX/photo.jpg"
            required
          />
          <p class="help-text">Upload your photo to <a href="https://postimages.org" target="_blank">postimages.org</a> and paste the direct link here</p>
          <div class="image-preview" v-if="photo.imageUrl">
            <img :src="photo.imageUrl" alt="Preview" />
          </div>
        </div>

        <button class="submit-btn" @click="submitPhoto" :disabled="!isFormValid">
          Add Photo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { addPhotoToProfile, getAllProfiles } from '@/data/database';

export default {
  name: 'AddPhotoView',
  setup() {
    const profiles = ref([]);
    const selectedPhotographer = ref('');
    const photo = ref({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      imageUrl: ''
    });

    const isFormValid = computed(() => {
      return (
        selectedPhotographer.value &&
        photo.value.title &&
        photo.value.date &&
        photo.value.imageUrl
      );
    });

    const submitPhoto = async () => {
      if (!isFormValid.value) return;

      try {
        await addPhotoToProfile(selectedPhotographer.value, {
          title: photo.value.title,
          description: photo.value.description,
          date: photo.value.date,
          imageUrl: photo.value.imageUrl
        });

        // Reset form
        selectedPhotographer.value = '';
        photo.value = {
          title: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          imageUrl: ''
        };

        alert('Photo added successfully!');
      } catch (error) {
        console.error('Error adding photo:', error);
        alert('Failed to add photo. Please try again.');
      }
    };

    onMounted(async () => {
      profiles.value = await getAllProfiles();
    });

    return {
      profiles,
      selectedPhotographer,
      photo,
      isFormValid,
      submitPhoto
    };
  }
};
</script>

<style scoped>
.add-photo {
  padding: 2rem 0;
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.photo-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: #fff;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.help-text {
  color: #ccc;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.help-text a {
  color: #4a90e2;
  text-decoration: none;
}

.help-text a:hover {
  text-decoration: underline;
}

input,
select,
textarea {
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #4a90e2;
  background: rgba(255, 255, 255, 0.15);
}

.image-preview {
  margin-top: 1rem;
  max-width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.submit-btn {
  padding: 1rem 2rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.submit-btn:hover {
  background: #357abd;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #666;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
    margin: 1rem;
  }
}
</style> 