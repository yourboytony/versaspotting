// Initial profiles data
const initialProfiles = [
  {
    id: 'anthony',
    name: 'Anthony Nigro',
    role: 'Founder & Photographer',
    bio: 'Aviation enthusiast and photographer based in New York.',
    instagram: 'https://www.instagram.com/yourboytony/',
    photos: []
  },
  {
    id: 'skyeler',
    name: 'Skyeler Kho',
    role: 'Photographer',
    bio: 'Passionate about capturing the beauty of aviation.',
    instagram: 'https://www.instagram.com/skyelerkho/',
    photos: []
  },
  {
    id: 'spencer',
    name: 'Spencer Parkinson',
    role: 'Photographer',
    bio: 'Dedicated to showcasing the art of flight.',
    instagram: 'https://www.instagram.com/spencerparkinson/',
    photos: []
  },
  {
    id: 'stefan',
    name: 'Stefan Tofan',
    role: 'Photographer',
    bio: 'Bringing unique perspectives to aviation photography.',
    instagram: 'https://www.instagram.com/stefantofan/',
    photos: []
  },
  {
    id: 'jared',
    name: 'Jared Powers',
    role: 'Photographer',
    bio: 'Capturing the essence of flight through my lens.',
    instagram: 'https://www.instagram.com/jaredpowers/',
    photos: []
  }
]

// Initialize profiles if they don't exist
export function initializeProfiles() {
  if (!localStorage.getItem('profiles')) {
    localStorage.setItem('profiles', JSON.stringify(initialProfiles))
  }
}

// Get all profiles
export function getAllProfiles() {
  initializeProfiles()
  return JSON.parse(localStorage.getItem('profiles'))
}

// Get photos for a specific profile
export function getProfilePhotos(profileId) {
  const profiles = getAllProfiles()
  const profile = profiles.find(p => p.id === profileId)
  return profile ? profile.photos : []
}

// Add a photo to a profile
export function addPhotoToProfile(profileId, photoData) {
  const profiles = getAllProfiles()
  const profileIndex = profiles.findIndex(p => p.id === profileId)
  
  if (profileIndex !== -1) {
    const newPhoto = {
      id: Date.now().toString(),
      ...photoData,
      timestamp: new Date().toISOString()
    }
    
    profiles[profileIndex].photos.unshift(newPhoto)
    localStorage.setItem('profiles', JSON.stringify(profiles))
    return newPhoto
  }
  return null
}

// Store contact form submission
export function storeContactSubmission(formData) {
  const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]')
  
  const newSubmission = {
    id: Date.now().toString(),
    ...formData,
    timestamp: new Date().toISOString()
  }
  
  submissions.push(newSubmission)
  localStorage.setItem('contact_submissions', JSON.stringify(submissions))
  return newSubmission
}

// Get all contact submissions
export function getAllContactSubmissions() {
  return JSON.parse(localStorage.getItem('contact_submissions') || '[]')
}

// Delete contact submission
export function deleteContactSubmission(id) {
  const submissions = getAllContactSubmissions()
  const filteredSubmissions = submissions.filter(s => s.id !== id)
  localStorage.setItem('contact_submissions', JSON.stringify(filteredSubmissions))
  return true
}

// Store team application
export function storeTeamApplication(formData) {
  const applications = JSON.parse(localStorage.getItem('team_applications') || '[]')
  
  const newApplication = {
    id: Date.now().toString(),
    ...formData,
    timestamp: new Date().toISOString()
  }
  
  applications.push(newApplication)
  localStorage.setItem('team_applications', JSON.stringify(applications))
  return newApplication
}

// Get all team applications
export function getAllTeamApplications() {
  return JSON.parse(localStorage.getItem('team_applications') || '[]')
}

// Delete team application
export function deleteTeamApplication(id) {
  const applications = getAllTeamApplications()
  const filteredApplications = applications.filter(a => a.id !== id)
  localStorage.setItem('team_applications', JSON.stringify(filteredApplications))
  return true
}

// Get all photos
export function getAllPhotos() {
  const profiles = getAllProfiles()
  const allPhotos = profiles.flatMap(profile => 
    profile.photos.map(photo => ({
      ...photo,
      profileName: profile.name,
      profileId: profile.id
    }))
  )
  return allPhotos.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}

// Delete photo
export function deletePhoto(profileId, photoId) {
  const profiles = getAllProfiles()
  const profileIndex = profiles.findIndex(p => p.id === profileId)
  
  if (profileIndex !== -1) {
    profiles[profileIndex].photos = profiles[profileIndex].photos.filter(p => p.id !== photoId)
    localStorage.setItem('profiles', JSON.stringify(profiles))
    return true
  }
  return false
} 