// API Service for VERSA Spotting Group
// This service handles data synchronization between different browsers and devices

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, child } from 'firebase/database'
import { getAnalytics } from 'firebase/analytics'

// Firebase configuration should be in environment variables
// For now, we'll use a minimal configuration for development
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyCtbW5ypHtOjLs5apZU1xA5atFF7qiSn3I",
  projectId: "versa-spotting",
  databaseURL: "https://versa-spotting-default-rtdb.firebaseio.com"
}

let app
let db
let analytics

// Helper function to get data from Firebase or localStorage
const getData = async (key) => {
  try {
    // Try to get data from Firebase first
    if (db) {
      const snapshot = await get(child(ref(db), key))
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val())
        localStorage.setItem(key, JSON.stringify(data))
        return data
      }
    }
    
    // Fallback to localStorage if Firebase fails or is not initialized
    const localData = localStorage.getItem(key)
    if (localData) {
      return JSON.parse(localData)
    }
    
    return []
  } catch (error) {
    console.error(`Error getting data for ${key}:`, error)
    
    // Try to get from localStorage as last resort
    try {
      const localData = localStorage.getItem(key)
      if (localData) {
        return JSON.parse(localData)
      }
    } catch (e) {
      console.error('Error reading from localStorage:', e)
    }
    
    return []
  }
}

// Helper function to save data to Firebase and localStorage
const saveData = async (key, data) => {
  try {
    // Save to localStorage first
    localStorage.setItem(key, JSON.stringify(data))
    
    // Then try to save to Firebase if available
    if (db) {
      const dataObj = data.reduce((acc, item) => {
        acc[item.id] = item
        return acc
      }, {})
      
      await set(ref(db, key), dataObj)
    }
    
    return true
  } catch (error) {
    console.error(`Error saving data for ${key}:`, error)
    
    // Try to save to localStorage as fallback
    try {
      localStorage.setItem(key, JSON.stringify(data))
      return true
    } catch (e) {
      console.error('Error saving to localStorage:', e)
      return false
    }
  }
}

// Export functions
export const initApiService = async () => {
  try {
    // Initialize Firebase only if configuration is available
    if (firebaseConfig.apiKey) {
      app = initializeApp(firebaseConfig)
      db = getDatabase(app)
      analytics = getAnalytics(app)
      console.log('Firebase initialized successfully')
    } else {
      console.log('Firebase configuration not found, using localStorage only')
    }
    return true
  } catch (error) {
    console.error('Failed to initialize Firebase:', error)
    console.log('Falling back to localStorage only')
    return false
  }
}

export const getLatestData = async (key) => {
  return await getData(key)
}

export const syncData = async (key, data) => {
  return await saveData(key, data)
} 