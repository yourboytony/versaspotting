// API Service for VERSA Spotting Group
// This service handles data synchronization between different browsers and devices

// Import Firebase or another cloud storage solution
// For now, we'll use a simple localStorage with a sync mechanism

// Generate a unique ID for this browser instance
const BROWSER_ID = generateBrowserId();

// Function to generate a unique browser ID
function generateBrowserId() {
  // Check if we already have a browser ID
  let browserId = localStorage.getItem('versa_browser_id');
  
  // If not, generate a new one
  if (!browserId) {
    browserId = 'browser_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('versa_browser_id', browserId);
  }
  
  return browserId;
}

// Function to get the last sync timestamp
function getLastSyncTime() {
  return localStorage.getItem('versa_last_sync') || '0';
}

// Function to update the last sync timestamp
function updateLastSyncTime() {
  localStorage.setItem('versa_last_sync', Date.now().toString());
}

// Function to get data from localStorage
export function getLocalData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return [];
  }
}

// Function to save data to localStorage
export function saveLocalData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
}

// Function to sync data between browsers
export function syncData(key, data) {
  try {
    // Save the data with a timestamp and browser ID
    const syncData = {
      data: data,
      timestamp: Date.now(),
      browserId: BROWSER_ID
    };
    
    // Save to localStorage
    saveLocalData(key, data);
    
    // Save sync info
    localStorage.setItem(`${key}_sync`, JSON.stringify(syncData));
    
    // Update last sync time
    updateLastSyncTime();
    
    return true;
  } catch (error) {
    console.error(`Error syncing ${key}:`, error);
    return false;
  }
}

// Function to check if data needs to be synced
export function needsSync(key) {
  try {
    const lastSync = getLastSyncTime();
    const syncInfo = localStorage.getItem(`${key}_sync`);
    
    if (!syncInfo) return true;
    
    const { timestamp, browserId } = JSON.parse(syncInfo);
    
    // If the data was last updated by another browser and more than 5 minutes ago
    return browserId !== BROWSER_ID && (Date.now() - parseInt(timestamp)) > 300000;
  } catch (error) {
    console.error(`Error checking sync status for ${key}:`, error);
    return true;
  }
}

// Function to get the latest data
export function getLatestData(key) {
  try {
    const syncInfo = localStorage.getItem(`${key}_sync`);
    
    if (!syncInfo) return getLocalData(key);
    
    const { data, timestamp, browserId } = JSON.parse(syncInfo);
    
    // If the data was last updated by this browser, return it
    if (browserId === BROWSER_ID) {
      return data;
    }
    
    // Otherwise, check if we need to sync
    if (needsSync(key)) {
      // In a real app, this would fetch from a server
      // For now, we'll just return the local data
      return getLocalData(key);
    }
    
    return data;
  } catch (error) {
    console.error(`Error getting latest data for ${key}:`, error);
    return getLocalData(key);
  }
}

// Export a function to initialize the API service
export function initApiService() {
  console.log('API Service initialized with browser ID:', BROWSER_ID);
  
  // Set up periodic sync (every 5 minutes)
  setInterval(() => {
    // In a real app, this would sync with a server
    // For now, we'll just update the last sync time
    updateLastSyncTime();
  }, 300000);
  
  return true;
} 