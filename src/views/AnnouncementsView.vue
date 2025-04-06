<template>
  <div class="announcements-page">
    <div class="page-header">
      <h1>Announcements</h1>
      <p class="subtitle">Stay updated with the latest news from VERSA Spotting Group</p>
    </div>

    <div class="announcements-container">
      <div class="filters">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search announcements..." 
            class="search-input"
          >
          <i class="icon-search"></i>
        </div>
        <div class="category-filter">
          <select v-model="selectedCategory" class="category-select">
            <option value="all">All Categories</option>
            <option value="general">General</option>
            <option value="event">Event</option>
            <option value="update">Update</option>
            <option value="important">Important</option>
          </select>
        </div>
      </div>

      <div class="announcements-grid">
        <div v-for="announcement in filteredAnnouncements" :key="announcement.id" class="announcement-card">
          <div class="announcement-header">
            <div class="announcement-title">
              <h2>{{ announcement.title }}</h2>
              <span :class="['category-badge', announcement.category]">{{ announcement.category }}</span>
            </div>
            <div class="announcement-meta">
              <span class="date">
                <i class="icon-calendar"></i>
                {{ formatDate(announcement.date) }}
              </span>
              <span class="read-time">
                <i class="icon-clock"></i>
                {{ announcement.readTime || '2 min' }} read
              </span>
            </div>
          </div>
          <div class="announcement-content">
            <p>{{ announcement.content }}</p>
          </div>
        </div>
      </div>

      <div v-if="filteredAnnouncements.length === 0" class="no-results">
        <i class="icon-info"></i>
        <p>No announcements found matching your criteria.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '../stores/dataStore'

const dataStore = useDataStore()
const searchQuery = ref('')
const selectedCategory = ref('all')

// Format date to a readable format
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

// Filter announcements based on search query and category
const filteredAnnouncements = computed(() => {
  let filtered = [...dataStore.announcements]
  
  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(a => a.category === selectedCategory.value)
  }
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(query) || 
      a.content.toLowerCase().includes(query)
    )
  }
  
  // Sort by date (newest first)
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Load announcements on mount
onMounted(async () => {
  try {
    await dataStore.fetchAnnouncements()
  } catch (error) {
    console.error('Error loading announcements:', error)
  }
})
</script>

<style scoped>
.announcements-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #999;
  font-size: 1.1rem;
}

.filters {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #90992e;
  background: rgba(255, 255, 255, 0.05);
}

.icon-search {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.category-select {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  min-width: 150px;
}

.category-select:focus {
  outline: none;
  border-color: #90992e;
  background: rgba(255, 255, 255, 0.05);
}

.announcements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.announcement-card {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 1.5rem;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.announcement-card:hover {
  transform: translateY(-2px);
}

.announcement-header {
  margin-bottom: 1.5rem;
}

.announcement-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.announcement-title h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  flex: 1;
}

.category-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  margin-left: 1rem;
}

.category-badge.general {
  background: #90992e1a;
  color: #90992e;
}

.category-badge.event {
  background: #3498db1a;
  color: #3498db;
}

.category-badge.update {
  background: #9b59b61a;
  color: #9b59b6;
}

.category-badge.important {
  background: #e74c3c1a;
  color: #e74c3c;
}

.announcement-meta {
  display: flex;
  gap: 1.5rem;
  color: #999;
  font-size: 0.9rem;
}

.announcement-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.announcement-meta i {
  color: #90992e;
}

.announcement-content {
  color: #ccc;
  line-height: 1.6;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.no-results i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #90992e;
}

@media (max-width: 768px) {
  .announcements-page {
    padding: 1rem;
  }

  .filters {
    flex-direction: column;
  }

  .category-select {
    width: 100%;
  }

  .announcements-grid {
    grid-template-columns: 1fr;
  }
}
</style> 