import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => {
    // Try to load data from localStorage, or use default values
    const loadFromStorage = (key, defaultValue) => {
      try {
        const stored = localStorage.getItem(key)
        if (!stored) return defaultValue
        const parsed = JSON.parse(stored)
        return Array.isArray(parsed) ? parsed : defaultValue
      } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error)
        return defaultValue
      }
    }

    return {
      photographers: loadFromStorage('photographers', [
        {
          id: '1',
          name: 'Anthony Nigro',
          specialty: 'Aviation Photography',
          location: 'YVR',
          avatar: 'https://i.postimg.cc/MZF9qXhP/20250330-DSC03087-modified.png',
          joinDate: '2024-01-01',
          bio: 'Founder of VERSA Spotting Group. Passionate about capturing the beauty of aviation at YVR.',
          status: 'active',
          photoCount: 0
        }
      ]),
      photos: loadFromStorage('photos', []),
      applications: loadFromStorage('applications', []),
      announcements: loadFromStorage('announcements', [
        {
          id: '1',
          title: 'Welcome to VERSA',
          content: 'Welcome to the VERSA Spotting Group website! We are excited to share our passion for aviation photography with you.',
          date: '2024-01-01',
          category: 'general',
          readTime: '2 min'
        }
      ])
    }
  },

  actions: {
    // Helper method to save to localStorage with error handling
    saveToStorage(key) {
      try {
        if (!this[key]) {
          console.error(`Cannot save ${key}: data is undefined`)
          return false
        }
        localStorage.setItem(key, JSON.stringify(this[key]))
        return true
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error)
        return false
      }
    },

    // Data fetching methods
    async fetchPhotos() {
      try {
        const stored = localStorage.getItem('photos')
        if (stored) {
          this.photos = JSON.parse(stored)
        }
        return true
      } catch (error) {
        console.error('Error fetching photos:', error)
        return false
      }
    },

    async fetchPhotographers() {
      try {
        const stored = localStorage.getItem('photographers')
        if (stored) {
          this.photographers = JSON.parse(stored)
        }
        return true
      } catch (error) {
        console.error('Error fetching photographers:', error)
        return false
      }
    },

    async fetchApplications() {
      try {
        const stored = localStorage.getItem('applications')
        if (stored) {
          this.applications = JSON.parse(stored)
        }
        return true
      } catch (error) {
        console.error('Error fetching applications:', error)
        return false
      }
    },

    async fetchAnnouncements() {
      try {
        const stored = localStorage.getItem('announcements')
        if (stored) {
          this.announcements = JSON.parse(stored)
        }
        return true
      } catch (error) {
        console.error('Error fetching announcements:', error)
        return false
      }
    },

    // Photographer actions
    addPhotographer(photographer) {
      try {
        const newPhotographer = {
          ...photographer,
          id: String(this.photographers.length + 1),
          photoCount: 0,
          joinDate: new Date().toISOString().split('T')[0],
          status: 'active'
        }
        this.photographers.push(newPhotographer)
        return this.saveToStorage('photographers')
      } catch (error) {
        console.error('Error adding photographer:', error)
        return false
      }
    },

    updatePhotographer(id, updates) {
      try {
        const index = this.photographers.findIndex(p => p.id === id)
        if (index !== -1) {
          this.photographers[index] = { ...this.photographers[index], ...updates }
          return this.saveToStorage('photographers')
        }
        return false
      } catch (error) {
        console.error('Error updating photographer:', error)
        return false
      }
    },

    deletePhotographer(id) {
      try {
        // First, delete all photos associated with this photographer
        this.photos = this.photos.filter(p => p.photographerId !== id)
        this.saveToStorage('photos')
        
        // Then delete the photographer
        this.photographers = this.photographers.filter(p => p.id !== id)
        return this.saveToStorage('photographers')
      } catch (error) {
        console.error('Error deleting photographer:', error)
        return false
      }
    },

    // Photo actions
    addPhoto(photo) {
      try {
        const newPhoto = {
          ...photo,
          id: String(this.photos.length + 1),
          date: new Date().toISOString().split('T')[0]
        }
        this.photos.push(newPhoto)
        
        // Update photographer's photo count
        const photographer = this.photographers.find(p => p.id === photo.photographerId)
        if (photographer) {
          photographer.photoCount++
          this.saveToStorage('photographers')
        }
        
        return this.saveToStorage('photos')
      } catch (error) {
        console.error('Error adding photo:', error)
        return false
      }
    },

    updatePhoto(id, updates) {
      try {
        const index = this.photos.findIndex(p => p.id === id)
        if (index !== -1) {
          this.photos[index] = { ...this.photos[index], ...updates }
          return this.saveToStorage('photos')
        }
        return false
      } catch (error) {
        console.error('Error updating photo:', error)
        return false
      }
    },

    deletePhoto(id) {
      try {
        const photo = this.photos.find(p => p.id === id)
        if (photo) {
          // Update photographer's photo count
          const photographer = this.photographers.find(p => p.id === photo.photographerId)
          if (photographer) {
            photographer.photoCount--
            this.saveToStorage('photographers')
          }
          this.photos = this.photos.filter(p => p.id !== id)
          return this.saveToStorage('photos')
        }
        return false
      } catch (error) {
        console.error('Error deleting photo:', error)
        return false
      }
    },

    // Application actions
    addApplication(application) {
      try {
        const newApplication = {
          ...application,
          id: String(this.applications.length + 1),
          date: new Date().toISOString().split('T')[0],
          status: 'pending'
        }
        this.applications.push(newApplication)
        return this.saveToStorage('applications')
      } catch (error) {
        console.error('Error adding application:', error)
        return false
      }
    },

    updateApplicationStatus(id, status) {
      try {
        const index = this.applications.findIndex(a => a.id === id)
        if (index !== -1) {
          this.applications[index].status = status
          return this.saveToStorage('applications')
        }
        return false
      } catch (error) {
        console.error('Error updating application status:', error)
        return false
      }
    },

    deleteApplication(id) {
      try {
        this.applications = this.applications.filter(a => a.id !== id)
        return this.saveToStorage('applications')
      } catch (error) {
        console.error('Error deleting application:', error)
        return false
      }
    },

    // Announcement actions
    addAnnouncement(announcement) {
      try {
        const newAnnouncement = {
          ...announcement,
          id: String(this.announcements.length + 1),
          date: new Date().toISOString().split('T')[0]
        }
        this.announcements.push(newAnnouncement)
        return this.saveToStorage('announcements')
      } catch (error) {
        console.error('Error adding announcement:', error)
        return false
      }
    },

    updateAnnouncement(id, updates) {
      try {
        const index = this.announcements.findIndex(a => a.id === id)
        if (index !== -1) {
          this.announcements[index] = { ...this.announcements[index], ...updates }
          return this.saveToStorage('announcements')
        }
        return false
      } catch (error) {
        console.error('Error updating announcement:', error)
        return false
      }
    },

    deleteAnnouncement(id) {
      try {
        this.announcements = this.announcements.filter(a => a.id !== id)
        return this.saveToStorage('announcements')
      } catch (error) {
        console.error('Error deleting announcement:', error)
        return false
      }
    }
  },

  getters: {
    getPhotographerById: (state) => (id) => {
      return state.photographers.find(p => p.id === id)
    },

    getPhotosByPhotographer: (state) => (photographerId) => {
      return state.photos.filter(p => p.photographerId === photographerId)
    },

    getRecentPhotos: (state) => (limit = 6) => {
      return [...state.photos]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit)
    },

    getPendingApplications: (state) => {
      return state.applications.filter(a => a.status === 'pending')
    },

    getLatestAnnouncements: (state) => (limit = 5) => {
      return [...state.announcements]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit)
    }
  }
}) 