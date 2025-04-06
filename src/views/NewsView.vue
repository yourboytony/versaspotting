<template>
  <div class="news-page">
    <div class="page-header">
      <h1>VERSA News</h1>
      <p class="subtitle">Stay updated with the latest aviation photography news and events</p>
    </div>

    <!-- Featured Announcement -->
    <div v-if="featuredAnnouncement" class="featured-announcement">
      <div class="featured-content">
        <div class="featured-meta">
          <span :class="['category-badge', featuredAnnouncement.category]">{{ featuredAnnouncement.category }}</span>
          <span class="date">{{ formatDate(featuredAnnouncement.date) }}</span>
        </div>
        <h2>{{ featuredAnnouncement.title }}</h2>
        <p class="featured-excerpt">{{ featuredAnnouncement.content.substring(0, 200) }}...</p>
        <button class="read-more-btn" @click="openAnnouncementModal(featuredAnnouncement)">Read More</button>
      </div>
      <div class="featured-image" :style="{ backgroundImage: `url(${featuredAnnouncement.image || '/images/default-news.jpg'})` }"></div>
    </div>

    <div class="news-container">
      <div class="news-sidebar">
        <!-- Categories -->
        <div class="sidebar-section">
          <h3>Categories</h3>
          <div class="category-list">
            <button 
              v-for="category in categories" 
              :key="category.value"
              :class="['category-btn', { active: selectedCategory === category.value }]"
              @click="selectedCategory = category.value"
            >
              {{ category.label }}
              <span class="count">{{ getCategoryCount(category.value) }}</span>
            </button>
          </div>
        </div>

        <!-- Newsletter Signup -->
        <div class="sidebar-section newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest aviation photography news and events.</p>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Your email address" 
              class="newsletter-input"
              required
            >
            <button type="submit" class="newsletter-btn" :disabled="isSubscribing">
              <span v-if="isSubscribing" class="loading-spinner"></span>
              {{ isSubscribing ? 'Subscribing...' : 'Subscribe' }}
            </button>
          </form>
        </div>

        <!-- Recent Posts -->
        <div class="sidebar-section">
          <h3>Recent Posts</h3>
          <div class="recent-posts">
            <div v-for="post in recentPosts" :key="post.id" class="recent-post" @click="openAnnouncementModal(post)">
              <div class="recent-post-content">
                <h4>{{ post.title }}</h4>
                <span class="date">{{ formatDate(post.date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="news-content">
        <!-- Search and Filter -->
        <div class="news-filters">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search news..." 
              class="search-input"
            >
            <i class="icon-search"></i>
          </div>
          <div class="view-options">
            <button 
              :class="['view-btn', { active: viewMode === 'grid' }]" 
              @click="viewMode = 'grid'"
            >
              <i class="icon-grid"></i>
            </button>
            <button 
              :class="['view-btn', { active: viewMode === 'list' }]" 
              @click="viewMode = 'list'"
            >
              <i class="icon-list"></i>
            </button>
          </div>
        </div>

        <!-- News Grid/List -->
        <div :class="['news-items', viewMode]">
          <div 
            v-for="announcement in filteredAnnouncements" 
            :key="announcement.id" 
            class="news-item"
            @click="openAnnouncementModal(announcement)"
          >
            <div class="news-item-image" :style="{ backgroundImage: `url(${announcement.image || '/images/default-news.jpg'})` }"></div>
            <div class="news-item-content">
              <div class="news-item-meta">
                <span :class="['category-badge', announcement.category]">{{ announcement.category }}</span>
                <span class="date">{{ formatDate(announcement.date) }}</span>
              </div>
              <h3>{{ announcement.title }}</h3>
              <p>{{ announcement.content.substring(0, 150) }}...</p>
              <button class="read-more-link">Read More <i class="icon-arrow-right"></i></button>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredAnnouncements.length === 0" class="no-results">
          <i class="icon-info"></i>
          <p>No announcements found matching your criteria.</p>
        </div>
      </div>
    </div>

    <!-- Announcement Modal -->
    <div v-if="selectedAnnouncement" class="modal" @click.self="closeAnnouncementModal">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-meta">
            <span :class="['category-badge', selectedAnnouncement.category]">{{ selectedAnnouncement.category }}</span>
            <span class="date">{{ formatDate(selectedAnnouncement.date) }}</span>
          </div>
          <button class="close-button" @click="closeAnnouncementModal">&times;</button>
        </div>
        <div class="modal-body">
          <h2>{{ selectedAnnouncement.title }}</h2>
          <div class="modal-image" v-if="selectedAnnouncement.image" :style="{ backgroundImage: `url(${selectedAnnouncement.image})` }"></div>
          <div class="modal-text" v-html="formatContent(selectedAnnouncement.content)"></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="closeAnnouncementModal">Close</button>
        </div>
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
const viewMode = ref('grid')
const email = ref('')
const isSubscribing = ref(false)
const selectedAnnouncement = ref(null)

// Categories with labels and values
const categories = [
  { label: 'All Categories', value: 'all' },
  { label: 'General', value: 'general' },
  { label: 'Events', value: 'event' },
  { label: 'Updates', value: 'update' },
  { label: 'Important', value: 'important' }
]

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

// Format content with line breaks
const formatContent = (content) => {
  return content.replace(/\n/g, '<br>')
}

// Get count of announcements in a category
const getCategoryCount = (category) => {
  if (category === 'all') return dataStore.announcements.length
  return dataStore.announcements.filter(a => a.category === category).length
}

// Featured announcement (most recent important or event)
const featuredAnnouncement = computed(() => {
  const importantOrEvents = dataStore.announcements.filter(
    a => a.category === 'important' || a.category === 'event'
  )
  return importantOrEvents.length > 0 
    ? importantOrEvents.sort((a, b) => new Date(b.date) - new Date(a.date))[0] 
    : null
})

// Recent posts (latest 5)
const recentPosts = computed(() => {
  return [...dataStore.announcements]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
})

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

// Open announcement modal
const openAnnouncementModal = (announcement) => {
  selectedAnnouncement.value = announcement
  document.body.style.overflow = 'hidden'
}

// Close announcement modal
const closeAnnouncementModal = () => {
  selectedAnnouncement.value = null
  document.body.style.overflow = ''
}

// Subscribe to newsletter
const subscribeNewsletter = async () => {
  try {
    isSubscribing.value = true
    // Here you would typically call an API to subscribe the user
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Thank you for subscribing to our newsletter!')
    email.value = ''
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    alert('An error occurred while subscribing. Please try again.')
  } finally {
    isSubscribing.value = false
  }
}

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
.news-page {
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

/* Featured Announcement */
.featured-announcement {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.featured-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featured-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.featured-content h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.featured-excerpt {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.featured-image {
  background-size: cover;
  background-position: center;
  min-height: 300px;
}

.read-more-btn {
  align-self: flex-start;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  color: #000;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.read-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(144, 153, 46, 0.3);
}

/* News Container */
.news-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

/* Sidebar */
.news-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-section {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.sidebar-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

.category-btn.active {
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  color: #000;
  font-weight: 600;
}

.count {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.newsletter p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.newsletter-input {
  padding: 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.9rem;
}

.newsletter-input:focus {
  outline: none;
  border-color: #90992e;
}

.newsletter-btn {
  padding: 0.75rem;
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  color: #000;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(144, 153, 46, 0.3);
}

.newsletter-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.recent-posts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recent-post {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.recent-post:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.recent-post h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
}

.recent-post .date {
  font-size: 0.8rem;
  color: #999;
}

/* News Content */
.news-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
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

.view-options {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

.view-btn.active {
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  color: #000;
}

/* News Items */
.news-items {
  display: grid;
  gap: 2rem;
}

.news-items.grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.news-items.list {
  grid-template-columns: 1fr;
}

.news-item {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.news-item:hover {
  transform: translateY(-5px);
}

.news-item-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.news-item-content {
  padding: 1.5rem;
}

.news-item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.news-item h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.news-item p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more-link {
  color: #90992e;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.read-more-link:hover {
  color: #b8c339;
}

/* Category Badge */
.category-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
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

/* Date */
.date {
  color: #999;
  font-size: 0.9rem;
}

/* No Results */
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

/* Modal */
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
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
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

.modal-body {
  padding: 1.5rem;
}

.modal-body h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.modal-image {
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.modal-text {
  color: #ccc;
  line-height: 1.8;
  font-size: 1.1rem;
}

.modal-footer {
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #90992e 0%, #b8c339 100%);
  color: #000;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(144, 153, 46, 0.3);
}

/* Loading Spinner */
.loading-spinner {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 992px) {
  .news-container {
    grid-template-columns: 1fr;
  }
  
  .featured-announcement {
    grid-template-columns: 1fr;
  }
  
  .featured-image {
    height: 200px;
  }
}

@media (max-width: 768px) {
  .news-page {
    padding: 1rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .news-filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-box {
    max-width: 100%;
  }
  
  .news-items.grid {
    grid-template-columns: 1fr;
  }
}
</style> 