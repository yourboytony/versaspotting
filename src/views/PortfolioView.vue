<template>
  <div class="portfolio">
    <div v-if="!store.isInitialized" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading photographers...</p>
    </div>

    <template v-else>
      <div class="portfolio-header">
        <h1>Photographer Portfolios</h1>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search photographers..."
            @input="filterPhotographers"
          >
          <div class="search-icon">
            <i class="fas fa-search"></i>
          </div>
        </div>
      </div>

      <div class="photographers-grid" v-if="filteredPhotographers.length > 0">
        <div 
          v-for="photographer in filteredPhotographers" 
          :key="photographer.id" 
          class="photographer-card"
          @click="viewPortfolio(photographer.id)"
        >
          <div class="card-image">
            <img :src="photographer.coverImage || '/placeholder.jpg'" :alt="photographer.name">
            <div class="card-overlay">
              <div class="photographer-stats">
                <span><i class="fas fa-camera"></i> {{ photographer.photoCount }} Photos</span>
                <span><i class="fas fa-map-marker-alt"></i> {{ photographer.location }}</span>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="photographer-avatar">
              <img :src="photographer.avatar || '/default-avatar.jpg'" :alt="photographer.name">
            </div>
            <h3>{{ photographer.name }}</h3>
            <p class="photographer-specialty">{{ photographer.specialty }}</p>
            <div class="photographer-tags">
              <span v-for="tag in photographer.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no-results">
        <i class="fas fa-search"></i>
        <p>No photographers found matching your search.</p>
        <button @click="clearSearch" class="clear-search">Clear Search</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'

const router = useRouter()
const store = useDataStore()
const searchQuery = ref('')

const photographers = computed(() => 
  store.photographers.map(p => ({
    ...p,
    tags: [p.specialty, p.location].filter(Boolean),
    coverImage: store.photos.find(photo => photo.photographerId === p.id)?.imageUrl || '/placeholder.jpg'
  }))
)

const filteredPhotographers = computed(() => {
  if (!searchQuery.value) return photographers.value
  const query = searchQuery.value.toLowerCase()
  return photographers.value.filter(photographer => 
    photographer.name.toLowerCase().includes(query) ||
    photographer.specialty.toLowerCase().includes(query) ||
    photographer.tags.some(tag => tag.toLowerCase().includes(query))
  )
})

const filterPhotographers = () => {
  // Debounced search implementation can be added here if needed
}

const clearSearch = () => {
  searchQuery.value = ''
}

const viewPortfolio = (id) => {
  router.push(`/portfolio/${id}`)
}

onMounted(async () => {
  try {
    if (!store.isInitialized) {
      await store.initializeData()
    }
  } catch (error) {
    console.error('Error loading photographers:', error)
  }
})
</script>

<style scoped>
.portfolio {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.portfolio-header {
  margin-bottom: 3rem;
  text-align: center;
}

.portfolio-header h1 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #fff;
}

.search-bar {
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}

.search-bar input {
  width: 100%;
  padding: 1rem 3rem 1rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
}

.photographers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.photographer-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.photographer-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
}

.card-image {
  position: relative;
  padding-top: 66.67%; /* 3:2 aspect ratio */
  background: #000;
}

.card-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: #fff;
}

.photographer-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.photographer-stats span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-content {
  padding: 1.5rem;
  position: relative;
}

.photographer-avatar {
  position: absolute;
  top: -2.5rem;
  left: 1.5rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  background: #000;
}

.photographer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content h3 {
  margin-top: 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
}

.photographer-specialty {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.photographer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  background: rgba(144, 153, 62, 0.2);
  color: #90993e;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.no-results {
  text-align: center;
  padding: 4rem 0;
  color: rgba(255, 255, 255, 0.7);
}

.no-results i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.clear-search {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-search:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .portfolio {
    padding: 1rem;
  }

  .portfolio-header h1 {
    font-size: 2rem;
  }

  .photographers-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .photographer-card:hover {
    transform: none;
  }
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: rgba(255, 255, 255, 0.7);
}

.loading-state i {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.loading-state p {
  font-size: 1.2rem;
}
</style> 