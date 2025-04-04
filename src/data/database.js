// Initial profiles data
const initialProfiles = [
  {
    id: 1,
    name: 'Anthony Nigro',
    role: 'Lead Photographer',
    bio: 'Passionate about aviation photography with a focus on unique angles and lighting. Specializes in capturing the perfect moment with exceptional attention to detail.',
    instagram: 'https://instagram.com/anthonynigro',
    photos: []
  },
  {
    id: 2,
    name: 'Skyeler Kho',
    role: 'Photographer',
    bio: 'Specializing in capturing the perfect moment with exceptional attention to detail. Known for unique perspectives and creative compositions.',
    instagram: 'https://instagram.com/skyelerkho',
    photos: []
  },
  {
    id: 3,
    name: 'Spencer Parkinson',
    role: 'Photographer',
    bio: 'Expert in aircraft identification and aviation history. Brings technical knowledge and historical context to every shot.',
    instagram: 'https://instagram.com/spencerparkinson',
    photos: []
  },
  {
    id: 4,
    name: 'Stefan Tofan',
    role: 'Photographer',
    bio: 'Focused on detailed aircraft photography and unique perspectives. Specializes in capturing the intricate details of modern aircraft.',
    instagram: 'https://instagram.com/stefantofan',
    photos: []
  },
  {
    id: 5,
    name: 'Jared Powers',
    role: 'Photographer',
    bio: 'Specializing in capturing aircraft in motion with dynamic compositions. Expert in action shots and unique lighting conditions.',
    instagram: 'https://instagram.com/jaredpowers',
    photos: []
  }
];

// Initialize profiles in localStorage if not already present
const initializeProfiles = () => {
  if (!localStorage.getItem('versaProfiles')) {
    localStorage.setItem('versaProfiles', JSON.stringify(initialProfiles));
  }
};

// Get all profiles
export const getAllProfiles = () => {
  initializeProfiles();
  return JSON.parse(localStorage.getItem('versaProfiles'));
};

// Get photos for a specific profile
export const getProfilePhotos = (profileId) => {
  const profiles = getAllProfiles();
  const profile = profiles.find(p => p.id === profileId);
  return profile ? profile.photos : [];
};

// Add a photo to a profile
export const addPhotoToProfile = (profileId, photoData) => {
  const profiles = getAllProfiles();
  const profileIndex = profiles.findIndex(p => p.id === profileId);
  
  if (profileIndex !== -1) {
    const newPhoto = {
      id: Date.now(),
      ...photoData
    };
    
    profiles[profileIndex].photos.push(newPhoto);
    localStorage.setItem('versaProfiles', JSON.stringify(profiles));
    return newPhoto;
  }
  
  return null;
};

// Initialize the database
initializeProfiles(); 