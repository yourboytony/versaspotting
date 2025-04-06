// API Service for VERSA Spotting Group
// This service handles data synchronization between different browsers and devices
// Using IndexedDB for free storage

let db;

// Initialize IndexedDB
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('versaDB', 1);
    
    request.onerror = () => {
      console.error('Error opening database');
      reject(request.error);
    };
    
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create object stores for each data type
      if (!db.objectStoreNames.contains('photos')) {
        db.createObjectStore('photos', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('photographers')) {
        db.createObjectStore('photographers', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('applications')) {
        db.createObjectStore('applications', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('announcements')) {
        db.createObjectStore('announcements', { keyPath: 'id' });
      }
    };
  });
};

// Helper function to get data from IndexedDB
const getData = (storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Helper function to save data to IndexedDB
const saveData = (storeName, data) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    
    // Clear existing data
    store.clear();
    
    // Add all new data
    data.forEach(item => {
      store.add(item);
    });
    
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => reject(transaction.error);
  });
};

// Export functions
export const initApiService = async () => {
  try {
    await initDB();
    console.log('IndexedDB initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize IndexedDB:', error);
    return false;
  }
};

export const getLatestData = async (key) => {
  try {
    return await getData(key);
  } catch (error) {
    console.error(`Error getting data for ${key}:`, error);
    return [];
  }
};

export const syncData = async (key, data) => {
  try {
    await saveData(key, data);
    return true;
  } catch (error) {
    console.error(`Error syncing data for ${key}:`, error);
    return false;
  }
}; 