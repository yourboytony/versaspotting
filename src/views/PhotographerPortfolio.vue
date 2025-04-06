<template>
  <div class="photographer-portfolio">
    <div class="photographer-header">
      <div class="profile-section">
        <div class="profile-image">
          <img :src="photographer.profileImage" :alt="photographer.name">
        </div>
        <div class="profile-info">
          <h1>{{ photographer.name }}</h1>
          <p class="specialty">{{ photographer.specialty }}</p>
          <div class="stats">
            <div class="stat-item">
              <i class="icon-photos"></i>
              <span>{{ photographer.photoCount }} Photos</span>
            </div>
            <div class="stat-item">
              <i class="icon-location"></i>
              <span>{{ photographer.location }}</span>
            </div>
            <div class="stat-item">
              <i class="icon-calendar"></i>
              <span>Member since {{ photographer.joinDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="photos-grid">
      <div v-for="photo in photographer.photos" :key="photo.id" 
           class="photo-card" @click="openLightbox(photo)">
        <img :src="photo.url" :alt="photo.title">
        <div class="photo-info">
          <h3>{{ photo.title }}</h3>
          <p>{{ photo.date }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="selectedPhoto" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="close-btn" @click="closeLightbox">&times;</button>
        <img :src="selectedPhoto.url" :alt="selectedPhoto.title">
        <div class="lightbox-info">
          <h2>{{ selectedPhoto.title }}</h2>
          <p>{{ selectedPhoto.description }}</p>
          <div class="photo-meta">
            <span><i class="icon-camera"></i> {{ selectedPhoto.camera }}</span>
            <span><i class="icon-lens"></i> {{ selectedPhoto.lens }}</span>
            <span><i class="icon-calendar"></i> {{ selectedPhoto.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'

const route = useRoute()
const selectedPhoto = ref(null)

const photographer = ref({
  id: 1,
  name: 'John Smith',
  specialty: 'Aircraft Portraits',
  location: 'YVR',
  photoCount: 156,
  joinDate: '2024',
  profileImage: 'https://via.placeholder.com/300',
  photos: [
    {
      id: 1,
      title: 'Air Canada 787',
      date: 'March 15, 2025',
      url: 'https://via.placeholder.com/800',
      description: 'Air Canada Boeing 787 Dreamliner departing from YVR',
      camera: 'Canon EOS R5',
      lens: 'EF 100-400mm f/4.5-5.6L IS II USM'
    },
    // Add more photos here
  ]
})

const openLightbox = (photo) => {
  selectedPhoto.value = photo
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedPhoto.value = null
  document.body.style.overflow = 'auto'
}

onMounted(() => {
  // Animation for photos grid
  gsap.from('.photo-card', {
    scrollTrigger: {
      trigger: '.photos-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.photographer-portfolio {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.photographer-header {
  margin-bottom: 4rem;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 3rem;
  background: var(--card-background);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid var(--border-color);
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary-color);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-info h1 {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.specialty {
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.photo-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  aspect-ratio: 4/3;
}

.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.photo-card:hover img {
  transform: scale(1.1);
}

.photo-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.photo-card:hover .photo-info {
  transform: translateY(0);
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-content {
  max-width: 90%;
  max-height: 90vh;
  position: relative;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
}

.lightbox-info {
  background: var(--card-background);
  padding: 1.5rem;
  border-radius: 0 0 10px 10px;
  margin-top: -5px;
}

.lightbox-info h2 {
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.lightbox-info p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.photo-meta {
  display: flex;
  gap: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.photo-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .profile-section {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .stats {
    justify-content: center;
  }

  .photos-grid {
    grid-template-columns: 1fr;
  }
}
</style> 