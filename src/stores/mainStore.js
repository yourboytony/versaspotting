import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    portfolios: [],
    announcements: [],
    applications: [],
    adminToken: null
  }),

  actions: {
    // Portfolio actions
    addPortfolio(portfolio) {
      this.portfolios.push(portfolio)
      this.saveToLocalStorage()
    },

    updatePortfolio(id, updates) {
      const index = this.portfolios.findIndex(p => p.id === id)
      if (index !== -1) {
        this.portfolios[index] = { ...this.portfolios[index], ...updates }
        this.saveToLocalStorage()
      }
    },

    // Announcement actions
    addAnnouncement(announcement) {
      this.announcements.push({
        ...announcement,
        id: Date.now(),
        date: new Date().toISOString()
      })
      this.saveToLocalStorage()
    },

    // Application actions
    addApplication(application) {
      this.applications.push({
        ...application,
        id: Date.now(),
        date: new Date().toISOString()
      })
      this.saveToLocalStorage()
    },

    // Admin actions
    setAdminToken(token) {
      this.adminToken = token
      localStorage.setItem('adminToken', token)
    },

    clearAdminToken() {
      this.adminToken = null
      localStorage.removeItem('adminToken')
    },

    // Local storage management
    loadFromLocalStorage() {
      const portfolios = localStorage.getItem('portfolios')
      const announcements = localStorage.getItem('announcements')
      const applications = localStorage.getItem('applications')

      if (portfolios) this.portfolios = JSON.parse(portfolios)
      if (announcements) this.announcements = JSON.parse(announcements)
      if (applications) this.applications = JSON.parse(applications)
    },

    saveToLocalStorage() {
      localStorage.setItem('portfolios', JSON.stringify(this.portfolios))
      localStorage.setItem('announcements', JSON.stringify(this.announcements))
      localStorage.setItem('applications', JSON.stringify(this.applications))
    }
  },

  getters: {
    getPortfolioById: (state) => (id) => {
      return state.portfolios.find(p => p.id === id)
    },

    getLatestAnnouncements: (state) => {
      return [...state.announcements].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      )
    },

    getLatestApplications: (state) => {
      return [...state.applications].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      )
    }
  }
}) 