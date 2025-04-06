// API Service for VERSA Spotting Group
// This service handles data synchronization between different browsers and devices
// Using Firebase Realtime Database (free tier)

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, child } from 'firebase/database'
import { getAnalytics } from 'firebase/analytics'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtbW5ypHtOjLs5apZU1xA5atFF7qiSn3I",
  authDomain: "versa-spotting.firebaseapp.com",
  databaseURL: "https://versa-spotting-default-rtdb.firebaseio.com",
  projectId: "versa-spotting",
  storageBucket: "versa-spotting.firebasestorage.app",
  messagingSenderId: "650407524316",
  appId: "1:650407524316:web:973bbcac075cf0917ec119",
  measurementId: "G-VQCMZ2MKJT"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const analytics = getAnalytics(app)

// Helper function to get data from Firebase
const getData = async (key) => {
  try {
    const snapshot = await get(child(ref(db), key))
    if (snapshot.exists()) {
      return Object.values(snapshot.val())
    }
    return []
  } catch (error) {
    console.error(`Error getting data for ${key}:`, error)
    return []
  }
}

// Helper function to save data to Firebase
const saveData = async (key, data) => {
  try {
    // Convert array to object with IDs as keys
    const dataObj = data.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
    
    await set(ref(db, key), dataObj)
    return true
  } catch (error) {
    console.error(`Error saving data for ${key}:`, error)
    return false
  }
}

// Export functions
export const initApiService = async () => {
  try {
    console.log('Firebase initialized successfully')
    return true
  } catch (error) {
    console.error('Failed to initialize Firebase:', error)
    return false
  }
}

export const getLatestData = async (key) => {
  return await getData(key)
}

export const syncData = async (key, data) => {
  return await saveData(key, data)
} 