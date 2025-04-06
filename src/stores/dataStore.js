import { defineStore } from 'pinia'
import { getLatestData, syncData, initApiService } from '../services/apiService'

// Initialize the API service
initApiService()

// Sample data for testing
const samplePhotos = [
  {
    id: '1',
    title: 'Air Canada 787 Sunset',
    description: 'Beautiful sunset capture of an Air Canada 787 at YVR',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
    photographerId: '1',
    date: '2025-04-01',
    location: 'YVR',
    aircraft: 'Boeing 787',
    airline: 'Air Canada',
    likes: 156
  },
  {
    id: '2',
    title: 'WestJet 737 MAX Take Off',
    description: 'WestJet 737 MAX taking off from YVR',
    imageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e',
    photographerId: '1',
    date: '2025-04-01',
    location: 'YVR',
    aircraft: 'Boeing 737 MAX',
    airline: 'WestJet',
    likes: 142
  },
  {
    id: '3',
    title: 'Emirates A380 Landing',
    description: 'Emirates A380 on final approach to YVR',
    imageUrl: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b',
    photographerId: '1',
    date: '2025-04-01',
    location: 'YVR',
    aircraft: 'Airbus A380',
    airline: 'Emirates',
    likes: 189
  }
]

const defaultPhotographer = {
  id: '1',
  name: 'Anthony Nigro',
  specialty: 'Aviation Photography',
  location: 'YVR',
  avatar: 'https://i.postimg.cc/MZF9qXhP/20250330-DSC03087-modified.png',
  joinDate: '2025-04-01',
  bio: 'Founder of VERSA Spotting Group. Passionate about capturing the beauty of aviation at YVR.',
  status: 'active',
  photoCount: samplePhotos.length
}

export const useDataStore = defineStore('data', {
  state: () => ({
    photos: [
      {
        id: 1,
        title: 'Air Canada 777-300ER Sunset Departure',
        description: 'Beautiful departure shot of Air Canada\'s Boeing 777-300ER against the Vancouver sunset',
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
        photographerId: 1,
        date: '2024-04-06',
        location: 'YVR North Runway'
      },
      {
        id: 2,
        title: 'WestJet 787 Dreamliner Arrival',
        description: 'WestJet\'s Boeing 787-9 Dreamliner on final approach to YVR',
        imageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e',
        photographerId: 2,
        date: '2024-04-05',
        location: 'Larry Berg Flight Path Park'
      },
      {
        id: 3,
        title: 'Emirates A380 Morning Landing',
        description: 'Emirates Airbus A380 touching down during a beautiful morning at YVR',
        imageUrl: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b',
        photographerId: 3,
        date: '2024-04-04',
        location: 'Iona Beach'
      }
    ],
    photographers: [
      {
        id: 1,
        name: 'John Smith',
        specialty: 'Commercial Aviation',
        location: 'Vancouver, BC',
        joinDate: '2023-01-15',
        photoCount: 156,
        status: 'active'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        specialty: 'Aviation Photography',
        location: 'Richmond, BC',
        joinDate: '2023-03-22',
        photoCount: 89,
        status: 'active'
      },
      {
        id: 3,
        name: 'Michael Chen',
        specialty: 'Aircraft Spotting',
        location: 'Burnaby, BC',
        joinDate: '2023-06-10',
        photoCount: 234,
        status: 'active'
      }
    ],
    spotterLocations: [
      {
        id: 1,
        name: 'Larry Berg Flight Path Park',
        description: 'Popular spot for runway 26L arrivals',
        coordinates: { lat: 49.197207, lng: -123.158796 }
      },
      {
        id: 2,
        name: 'Iona Beach Regional Park',
        description: 'Great for departures from runway 26R',
        coordinates: { lat: 49.222687, lng: -123.259649 }
      },
      {
        id: 3,
        name: 'North Runway Viewing Area',
        description: 'Perfect for runway 08L operations',
        coordinates: { lat: 49.195416, lng: -123.183458 }
      }
    ],
    applications: [],
    announcements: [
      {
        id: '1',
        title: 'Welcome to VERSA',
        content: 'Welcome to the VERSA Spotting Group website! We are excited to share our passion for aviation photography with you.',
        date: '2025-04-01',
        category: 'general',
        readTime: '2 min'
      }
    ],
    isInitialized: true,
    isLoading: false,
    error: null
  }),

  actions: {
    // Initialize data from IndexedDB with better error handling
    async initializeData() {
      console.log('Initializing data store...')
      this.isLoading = true
      this.error = null
      
      try {
        // Try to get data from storage
        const [photos, photographers, applications, announcements] = await Promise.all([
          getLatestData('photos'),
          getLatestData('photographers'),
          getLatestData('applications'),
          getLatestData('announcements')
        ])

        console.log('Data fetched:', { photos, photographers, applications, announcements })

        // Update state with fetched data or use defaults
        this.photos = photos?.length > 0 ? photos : [...samplePhotos]
        this.photographers = photographers?.length > 0 ? photographers : [defaultPhotographer]
        this.applications = applications || []
        this.announcements = announcements?.length > 0 ? announcements : [
          {
            id: '1',
            title: 'Welcome to VERSA',
            content: 'Welcome to the VERSA Spotting Group website! We are excited to share our passion for aviation photography with you.',
            date: '2025-04-01',
            category: 'general',
            readTime: '2 min'
          }
        ]

        // Save default data if none was loaded
        if (!photos?.length) await this.saveToStorage('photos')
        if (!photographers?.length) await this.saveToStorage('photographers')
        if (!announcements?.length) await this.saveToStorage('announcements')

        this.isInitialized = true
        this.isLoading = false
        
        console.log('Data store initialized:', {
          photos: this.photos.length,
          photographers: this.photographers.length,
          applications: this.applications.length,
          announcements: this.announcements.length
        })
      } catch (error) {
        console.error('Error initializing data:', error)
        this.error = error.message
        
        // Ensure we have default data even if initialization fails
        this.photos = [...samplePhotos]
        this.photographers = [defaultPhotographer]
        this.isInitialized = true
        this.isLoading = false
      }
    },

    // Helper method to save to IndexedDB
    async saveToStorage(key) {
      try {
        if (!this[key]) {
          console.error(`Cannot save ${key}: data is undefined`)
          return false
        }
        return await syncData(key, this[key])
      } catch (error) {
        console.error(`Error saving ${key} to storage:`, error)
        return false
      }
    },

    // Data fetching methods with better error handling
    async fetchPhotos() {
      try {
        const photos = await getLatestData('photos')
        if (photos) {
          this.photos = photos
        }
        return true
      } catch (error) {
        console.error('Error fetching photos:', error)
        return false
      }
    },

    async fetchPhotographers() {
      try {
        this.photographers = await getLatestData('photographers')
        return true
      } catch (error) {
        console.error('Error fetching photographers:', error)
        return false
      }
    },

    async fetchApplications() {
      try {
        this.applications = await getLatestData('applications')
        return true
      } catch (error) {
        console.error('Error fetching applications:', error)
        return false
      }
    },

    async fetchAnnouncements() {
      try {
        this.announcements = await getLatestData('announcements')
        return true
      } catch (error) {
        console.error('Error fetching announcements:', error)
        return false
      }
    },

    // Photographer actions
    async addPhotographer(photographer) {
      try {
        const newPhotographer = {
          ...photographer,
          id: String(this.photographers.length + 1),
          photoCount: 0,
          joinDate: new Date().toISOString().split('T')[0],
          status: 'active'
        }
        this.photographers.push(newPhotographer)
        return await this.saveToStorage('photographers')
      } catch (error) {
        console.error('Error adding photographer:', error)
        return false
      }
    },

    async updatePhotographer(id, updates) {
      try {
        const index = this.photographers.findIndex(p => p.id === id)
        if (index !== -1) {
          this.photographers[index] = { ...this.photographers[index], ...updates }
          return await this.saveToStorage('photographers')
        }
        return false
      } catch (error) {
        console.error('Error updating photographer:', error)
        return false
      }
    },

    async deletePhotographer(id) {
      try {
        // First, delete all photos associated with this photographer
        this.photos = this.photos.filter(p => p.photographerId !== id)
        await this.saveToStorage('photos')
        
        // Then delete the photographer
        this.photographers = this.photographers.filter(p => p.id !== id)
        return await this.saveToStorage('photographers')
      } catch (error) {
        console.error('Error deleting photographer:', error)
        return false
      }
    },

    // Photo actions with better error handling
    async addPhoto(photo) {
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
          await this.saveToStorage('photographers')
        }
        
        const success = await this.saveToStorage('photos')
        if (success) {
          await this.fetchPhotos() // Refresh photos after adding
        }
        return success
      } catch (error) {
        console.error('Error adding photo:', error)
        return false
      }
    },

    async updatePhoto(id, updates) {
      try {
        const index = this.photos.findIndex(p => p.id === id)
        if (index !== -1) {
          this.photos[index] = { ...this.photos[index], ...updates }
          return await this.saveToStorage('photos')
        }
        return false
      } catch (error) {
        console.error('Error updating photo:', error)
        return false
      }
    },

    async deletePhoto(id) {
      try {
        const photo = this.photos.find(p => p.id === id)
        if (photo) {
          // Update photographer's photo count
          const photographer = this.photographers.find(p => p.id === photo.photographerId)
          if (photographer) {
            photographer.photoCount--
            await this.saveToStorage('photographers')
          }
          this.photos = this.photos.filter(p => p.id !== id)
          return await this.saveToStorage('photos')
        }
        return false
      } catch (error) {
        console.error('Error deleting photo:', error)
        return false
      }
    },

    // Application actions
    async addApplication(application) {
      try {
        const newApplication = {
          ...application,
          id: String(this.applications.length + 1),
          date: new Date().toISOString().split('T')[0],
          status: 'pending'
        }
        this.applications.push(newApplication)
        return await this.saveToStorage('applications')
      } catch (error) {
        console.error('Error adding application:', error)
        return false
      }
    },

    async updateApplication(id, updates) {
      try {
        const index = this.applications.findIndex(a => a.id === id)
        if (index !== -1) {
          this.applications[index] = { ...this.applications[index], ...updates }
          return await this.saveToStorage('applications')
        }
        return false
      } catch (error) {
        console.error('Error updating application:', error)
        return false
      }
    },

    async deleteApplication(id) {
      try {
        this.applications = this.applications.filter(a => a.id !== id)
        return await this.saveToStorage('applications')
      } catch (error) {
        console.error('Error deleting application:', error)
        return false
      }
    },

    // Announcement actions
    async addAnnouncement(announcement) {
      try {
        const newAnnouncement = {
          ...announcement,
          id: String(this.announcements.length + 1),
          date: new Date().toISOString().split('T')[0]
        }
        this.announcements.push(newAnnouncement)
        return await this.saveToStorage('announcements')
      } catch (error) {
        console.error('Error adding announcement:', error)
        return false
      }
    },

    async updateAnnouncement(id, updates) {
      try {
        const index = this.announcements.findIndex(a => a.id === id)
        if (index !== -1) {
          this.announcements[index] = { ...this.announcements[index], ...updates }
          return await this.saveToStorage('announcements')
        }
        return false
      } catch (error) {
        console.error('Error updating announcement:', error)
        return false
      }
    },

    async deleteAnnouncement(id) {
      try {
        this.announcements = this.announcements.filter(a => a.id !== id)
        return await this.saveToStorage('announcements')
      } catch (error) {
        console.error('Error deleting announcement:', error)
        return false
      }
    }
  },

  getters: {
    // Enhanced getters with error handling
    getPhotographerById: (state) => (id) => {
      try {
        return state.photographers.find(p => p.id === id)
      } catch (error) {
        console.error('Error getting photographer by ID:', error)
        return null
      }
    },

    getPhotosByPhotographer: (state) => (photographerId) => {
      try {
        return state.photos.filter(p => p.photographerId === photographerId)
      } catch (error) {
        console.error('Error getting photos by photographer:', error)
        return []
      }
    },

    getRecentPhotos: (state) => (limit = 6) => {
      try {
        return [...state.photos]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, limit)
      } catch (error) {
        console.error('Error getting recent photos:', error)
        return []
      }
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