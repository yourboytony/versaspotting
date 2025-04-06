// API Service for VERSA Spotting Group
// This service handles data synchronization between different browsers and devices
// Using Firebase Realtime Database (free tier)

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, child } from 'firebase/database'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "versa-spotting.firebaseapp.com",
  databaseURL: "https://versa-spotting-default-rtdb.firebaseio.com",
  projectId: "versa-spotting",
  storageBucket: "versa-spotting.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "1:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXXX"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

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