export const profiles = [
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

// Function to add a photo to a profile
export const addPhotoToProfile = (profileId, photoData) => {
  const profile = profiles.find(p => p.id === profileId);
  if (profile) {
    profile.photos.push({
      id: Date.now(),
      ...photoData,
      date: new Date().toISOString()
    });
  }
};

// Function to get all photos for a profile
export const getProfilePhotos = (profileId) => {
  const profile = profiles.find(p => p.id === profileId);
  return profile ? profile.photos : [];
};

// Function to get all profiles
export const getAllProfiles = () => {
  return profiles;
}; 