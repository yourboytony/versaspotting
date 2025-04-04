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

// Initialize contact form submissions in localStorage if not present
if (!localStorage.getItem('contactSubmissions')) {
  localStorage.setItem('contactSubmissions', JSON.stringify([]));
}

// Function to get all contact form submissions
export function getAllContactSubmissions() {
  const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
  return submissions;
}

// Function to add a new contact form submission
export function addContactSubmission(submissionData) {
  const submissions = getAllContactSubmissions();
  const newSubmission = {
    id: Date.now().toString(),
    ...submissionData,
    timestamp: new Date().toISOString()
  };
  submissions.push(newSubmission);
  localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
  return newSubmission;
}

// Function to delete a contact form submission
export function deleteContactSubmission(id) {
  const submissions = getAllContactSubmissions();
  const filteredSubmissions = submissions.filter(submission => submission.id !== id);
  localStorage.setItem('contactSubmissions', JSON.stringify(filteredSubmissions));
  return true;
}

// Initialize the database
initializeProfiles(); 