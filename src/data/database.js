import { Redis } from '@upstash/redis'

// Initialize Redis client with existing credentials
const redis = new Redis({
  url: 'https://safe-louse-62148.upstash.io',
  token: 'AfLEAAIjcDE5NjFkMGI1NTYzMGI0NzhkYTZmOWUxZmI2NWM1NmFkY3AxMA',
})

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
export async function initializeProfiles() {
  try {
    const exists = await redis.exists('profiles')
    if (!exists) {
      await redis.set('profiles', JSON.stringify(initialProfiles))
    }
  } catch (error) {
    console.error('Error initializing profiles:', error)
  }
}

// Get all profiles
export async function getAllProfiles() {
  try {
    const profiles = await redis.get('profiles')
    return profiles ? JSON.parse(profiles) : initialProfiles
  } catch (error) {
    console.error('Error getting profiles:', error)
    return initialProfiles
  }
}

// Get photos for a specific profile
export async function getProfilePhotos(profileId) {
  try {
    const profiles = await getAllProfiles()
    const profile = profiles.find(p => p.id === profileId)
    return profile ? profile.photos : []
  } catch (error) {
    console.error('Error getting profile photos:', error)
    return []
  }
}

// Add a photo to a profile
export async function addPhotoToProfile(profileId, photoData) {
  try {
    const profiles = await getAllProfiles()
    const profileIndex = profiles.findIndex(p => p.id === profileId)
    
    if (profileIndex !== -1) {
      const newPhoto = {
        id: Date.now().toString(),
        ...photoData,
        timestamp: new Date().toISOString()
      }
      
      profiles[profileIndex].photos.unshift(newPhoto)
      await redis.set('profiles', JSON.stringify(profiles))
      return newPhoto
    }
    return null
  } catch (error) {
    console.error('Error adding photo to profile:', error)
    return null
  }
}

// Store contact form submission
export async function storeContactSubmission(formData) {
  try {
    const submissions = await redis.get('contact_submissions') || '[]'
    const parsedSubmissions = JSON.parse(submissions)
    
    const newSubmission = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toISOString()
    }
    
    parsedSubmissions.push(newSubmission)
    await redis.set('contact_submissions', JSON.stringify(parsedSubmissions))
    return newSubmission
  } catch (error) {
    console.error('Error storing contact submission:', error)
    return null
  }
}

// Get all contact submissions
export async function getAllContactSubmissions() {
  try {
    const submissions = await redis.get('contact_submissions')
    return submissions ? JSON.parse(submissions) : []
  } catch (error) {
    console.error('Error getting contact submissions:', error)
    return []
  }
}

// Delete contact submission
export async function deleteContactSubmission(id) {
  try {
    const submissions = await getAllContactSubmissions()
    const filteredSubmissions = submissions.filter(s => s.id !== id)
    await redis.set('contact_submissions', JSON.stringify(filteredSubmissions))
    return true
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    return false
  }
}

// Store team application
export async function storeTeamApplication(formData) {
  try {
    const applications = await redis.get('team_applications') || '[]'
    const parsedApplications = JSON.parse(applications)
    
    const newApplication = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toISOString()
    }
    
    parsedApplications.push(newApplication)
    await redis.set('team_applications', JSON.stringify(parsedApplications))
    return newApplication
  } catch (error) {
    console.error('Error storing team application:', error)
    return null
  }
}

// Get all team applications
export async function getAllTeamApplications() {
  try {
    const applications = await redis.get('team_applications')
    return applications ? JSON.parse(applications) : []
  } catch (error) {
    console.error('Error getting team applications:', error)
    return []
  }
}

// Delete team application
export async function deleteTeamApplication(id) {
  try {
    const applications = await getAllTeamApplications()
    const filteredApplications = applications.filter(a => a.id !== id)
    await redis.set('team_applications', JSON.stringify(filteredApplications))
    return true
  } catch (error) {
    console.error('Error deleting team application:', error)
    return false
  }
}

// Get all photos
export async function getAllPhotos() {
  try {
    const profiles = await getAllProfiles()
    const allPhotos = profiles.flatMap(profile => 
      profile.photos.map(photo => ({
        ...photo,
        profileName: profile.name,
        profileId: profile.id
      }))
    )
    return allPhotos.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  } catch (error) {
    console.error('Error getting all photos:', error)
    return []
  }
}

// Delete photo
export async function deletePhoto(profileId, photoId) {
  try {
    const profiles = await getAllProfiles()
    const profileIndex = profiles.findIndex(p => p.id === profileId)
    
    if (profileIndex !== -1) {
      profiles[profileIndex].photos = profiles[profileIndex].photos.filter(p => p.id !== photoId)
      await redis.set('profiles', JSON.stringify(profiles))
      return true
    }
    return false
  } catch (error) {
    console.error('Error deleting photo:', error)
    return false
  }
} 