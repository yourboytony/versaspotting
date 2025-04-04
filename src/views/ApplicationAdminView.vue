<template>
  <div class="application-admin">
    <section class="admin-header">
      <h1>Application Management</h1>
      <p>Manage team applications</p>
    </section>

    <section class="admin-content">
      <div class="filters">
        <div class="filter-group">
          <label>Filter by Status:</label>
          <select v-model="statusFilter">
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Filter by Type:</label>
          <select v-model="typeFilter">
            <option value="all">All Types</option>
            <option value="photographer">Photographer</option>
            <option value="editor">Editor</option>
            <option value="both">Both</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Search:</label>
          <input type="text" v-model="searchQuery" placeholder="Search by name, email..." />
        </div>
      </div>
      
      <div v-if="!filteredApplications.length" class="no-applications">
        <font-awesome-icon :icon="['fas', 'inbox']" />
        <p>No applications found.</p>
      </div>
      
      <div v-else class="applications-list">
        <div v-for="application in filteredApplications" :key="application.id" class="application-card" :class="{'expanded': expandedId === application.id, [application.status]: true}">
          <div class="application-header" @click="toggleExpand(application.id)">
            <div class="application-header-info">
              <h3>{{ application.name }}</h3>
              <span class="application-type">{{ getApplicationTypeText(application.applicationType) }}</span>
            </div>
            <div class="application-header-meta">
              <span class="application-date">{{ formatDate(application.date) }}</span>
              <span class="application-status-badge" :class="application.status">{{ capitalizeFirst(application.status) }}</span>
              <font-awesome-icon :icon="expandedId === application.id ? ['fas', 'chevron-up'] : ['fas', 'chevron-down']" />
            </div>
          </div>
          
          <div class="application-details" v-if="expandedId === application.id">
            <div class="details-grid">
              <div class="detail-group">
                <label>Email:</label>
                <p><a :href="`mailto:${application.email}`">{{ application.email }}</a></p>
              </div>
              
              <div class="detail-group">
                <label>Age:</label>
                <p>{{ application.age }}</p>
              </div>
              
              <div class="detail-group">
                <label>Phone (Last 5):</label>
                <p>{{ application.phone }}</p>
              </div>
              
              <div class="detail-group">
                <label>Location:</label>
                <p>{{ application.location }}</p>
              </div>
              
              <div class="detail-group">
                <label>Experience:</label>
                <p>{{ application.experience }}</p>
              </div>
              
              <div class="detail-group">
                <label>Portfolio:</label>
                <p v-if="application.portfolio">
                  <a :href="application.portfolio" target="_blank" rel="noopener noreferrer">View Portfolio</a>
                </p>
                <p v-else>Not provided</p>
              </div>
            </div>
            
            <div class="detail-group full-width">
              <label>Reason for Joining:</label>
              <p>{{ application.reason }}</p>
            </div>
            
            <div v-if="application.applicationType !== 'editor'" class="detail-group full-width">
              <label>Photography Specialization:</label>
              <p>{{ application.specialization }}</p>
            </div>
            
            <div v-if="application.applicationType !== 'photographer'" class="detail-group full-width">
              <label>Editing Experience:</label>
              <p>{{ application.editingExperience }}</p>
            </div>
            
            <div v-if="application.applicationType !== 'editor'" class="detail-group full-width">
              <label>Equipment:</label>
              <p>{{ application.equipment || 'Not provided' }}</p>
            </div>
            
            <div class="application-actions">
              <button 
                v-if="application.status !== 'approved'" 
                @click="updateStatus(application.id, 'approved')" 
                class="action-btn approve-btn"
              >
                <font-awesome-icon :icon="['fas', 'check']" />
                Approve
              </button>
              
              <button 
                v-if="application.status !== 'rejected'" 
                @click="updateStatus(application.id, 'rejected')" 
                class="action-btn reject-btn"
              >
                <font-awesome-icon :icon="['fas', 'times']" />
                Reject
              </button>
              
              <button 
                v-if="application.status !== 'pending'" 
                @click="updateStatus(application.id, 'pending')" 
                class="action-btn reset-btn"
              >
                <font-awesome-icon :icon="['fas', 'undo']" />
                Reset to Pending
              </button>
              
              <button 
                @click="deleteApplication(application.id)" 
                class="action-btn delete-btn"
              >
                <font-awesome-icon :icon="['fas', 'trash-alt']" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Filters
const statusFilter = ref('all');
const typeFilter = ref('all');
const searchQuery = ref('');
const expandedId = ref(null);

// Applications data
const applications = ref([]);

// Load applications from localStorage
onMounted(() => {
  const storedApplications = JSON.parse(localStorage.getItem('versaApplications') || '[]');
  applications.value = storedApplications;
});

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get application type text
const getApplicationTypeText = (type) => {
  const mapping = {
    'photographer': 'Photographer',
    'editor': 'Editor',
    'both': 'Photographer & Editor'
  };
  return mapping[type] || type;
};

// Capitalize first letter
const capitalizeFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Toggle expand
const toggleExpand = (id) => {
  if (expandedId.value === id) {
    expandedId.value = null;
  } else {
    expandedId.value = id;
  }
};

// Filter applications
const filteredApplications = computed(() => {
  return applications.value.filter(app => {
    // Filter by status
    if (statusFilter.value !== 'all' && app.status !== statusFilter.value) {
      return false;
    }
    
    // Filter by type
    if (typeFilter.value !== 'all' && app.applicationType !== typeFilter.value) {
      return false;
    }
    
    // Search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      return (
        app.name.toLowerCase().includes(query) ||
        app.email.toLowerCase().includes(query) ||
        app.location.toLowerCase().includes(query) ||
        app.reason.toLowerCase().includes(query)
      );
    }
    
    return true;
  }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
});

// Update application status
const updateStatus = (id, status) => {
  const index = applications.value.findIndex(app => app.id === id);
  if (index !== -1) {
    applications.value[index].status = status;
    // Save to localStorage
    localStorage.setItem('versaApplications', JSON.stringify(applications.value));
  }
};

// Delete application
const deleteApplication = (id) => {
  if (confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
    applications.value = applications.value.filter(app => app.id !== id);
    // Save to localStorage
    localStorage.setItem('versaApplications', JSON.stringify(applications.value));
    // Close expanded view if the deleted app was expanded
    if (expandedId.value === id) {
      expandedId.value = null;
    }
  }
};
</script>

<style scoped>
.application-admin {
  color: var(--white);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  min-height: 100vh;
}

.admin-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl) 0;
}

.admin-header h1 {
  font-size: 3rem;
  margin-bottom: var(--spacing-sm);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.admin-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.admin-content {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: var(--spacing-xl);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  font-weight: 500;
}

.filter-group select,
.filter-group input {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  color: var(--white);
  transition: var(--transition);
}

.filter-group select:focus,
.filter-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  background-color: rgba(255, 255, 255, 0.15);
}

.no-applications {
  text-align: center;
  padding: var(--spacing-xl) 0;
  opacity: 0.7;
}

.no-applications .fa-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.applications-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.application-card {
  background: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
}

.application-card.expanded {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.application-card.pending {
  border-left: 4px solid #f39c12;
}

.application-card.approved {
  border-left: 4px solid #2ecc71;
}

.application-card.rejected {
  border-left: 4px solid #e74c3c;
}

.application-header {
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.application-header:hover {
  background: rgba(255, 255, 255, 0.05);
}

.application-header-info h3 {
  margin: 0;
  font-size: 1.2rem;
}

.application-type {
  font-size: 0.9rem;
  opacity: 0.8;
  display: block;
  margin-top: var(--spacing-xs);
}

.application-header-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.application-date {
  font-size: 0.9rem;
  opacity: 0.7;
}

.application-status-badge {
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.application-status-badge.pending {
  background-color: rgba(243, 156, 18, 0.2);
  color: #f39c12;
}

.application-status-badge.approved {
  background-color: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
}

.application-status-badge.rejected {
  background-color: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
}

.application-details {
  padding: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.detail-group {
  margin-bottom: var(--spacing-md);
}

.detail-group.full-width {
  grid-column: 1 / -1;
}

.detail-group label {
  display: block;
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
  color: var(--primary-color);
}

.detail-group p {
  margin: 0;
  line-height: 1.5;
}

.detail-group a {
  color: var(--primary-light);
  text-decoration: none;
}

.detail-group a:hover {
  text-decoration: underline;
}

.application-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.action-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: var(--transition);
}

.approve-btn {
  background-color: #2ecc71;
  color: white;
}

.approve-btn:hover {
  background-color: #27ae60;
}

.reject-btn {
  background-color: #e74c3c;
  color: white;
}

.reject-btn:hover {
  background-color: #c0392b;
}

.reset-btn {
  background-color: #f39c12;
  color: white;
}

.reset-btn:hover {
  background-color: #d35400;
}

.delete-btn {
  background-color: #34495e;
  color: white;
  margin-left: auto;
}

.delete-btn:hover {
  background-color: #2c3e50;
}

@media (max-width: 768px) {
  .admin-header h1 {
    font-size: 2.2rem;
  }
  
  .admin-content {
    padding: var(--spacing-md);
  }
  
  .application-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .application-header-meta {
    width: 100%;
    margin-top: var(--spacing-sm);
    justify-content: space-between;
  }
  
  .application-actions {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .delete-btn {
    margin-left: 0;
  }
}
</style> 