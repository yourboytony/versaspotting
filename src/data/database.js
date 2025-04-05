// API endpoints
const API_BASE = '/api'

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

// Initialize database
export async function initializeDatabase() {
  try {
    const response = await fetch(`${API_BASE}/init`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to initialize database')
    }
    return await response.json()
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

// Get all profiles
export async function getAllProfiles() {
  try {
    const response = await fetch(`${API_BASE}/profiles`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch profiles')
    }
    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error getting profiles:', error)
    return []
  }
}

// Get photos for a specific profile
export async function getProfilePhotos(profileId) {
  try {
    const response = await fetch(`${API_BASE}/profiles?profileId=${profileId}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch profile photos')
    }
    return await response.json()
  } catch (error) {
    console.error('Error getting profile photos:', error)
    throw error
  }
}

// Add a photo to a profile
export async function addPhotoToProfile(profileId, photoData) {
  try {
    const response = await fetch(`${API_BASE}/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ profileId, photoData })
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to add photo')
    }
    return await response.json()
  } catch (error) {
    console.error('Error adding photo to profile:', error)
    throw error
  }
}

// Store contact form submission
export async function storeContactSubmission(formData) {
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to store contact submission')
    }
    return await response.json()
  } catch (error) {
    console.error('Error storing contact submission:', error)
    throw error
  }
}

// Get all contact submissions
export async function getAllContactSubmissions() {
  try {
    const response = await fetch(`${API_BASE}/contact`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch contact submissions')
    }
    return await response.json()
  } catch (error) {
    console.error('Error getting contact submissions:', error)
    throw error
  }
}

// Delete contact submission
export async function deleteContactSubmission(id) {
  try {
    const response = await fetch(`${API_BASE}/contact?id=${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to delete contact submission')
    }
    return true
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    throw error
  }
}

// Store team application
export async function storeTeamApplication(formData) {
  try {
    const response = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to store team application')
    }
    return await response.json()
  } catch (error) {
    console.error('Error storing team application:', error)
    throw error
  }
}

// Get all team applications
export async function getAllTeamApplications() {
  try {
    const response = await fetch(`${API_BASE}/applications`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch team applications')
    }
    return await response.json()
  } catch (error) {
    console.error('Error getting team applications:', error)
    throw error
  }
}

// Delete team application
export async function deleteTeamApplication(id) {
  try {
    const response = await fetch(`${API_BASE}/applications?id=${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to delete team application')
    }
    return true
  } catch (error) {
    console.error('Error deleting team application:', error)
    throw error
  }
}

// Get all photos
export async function getAllPhotos() {
  try {
    const profiles = await getAllProfiles()
    return profiles.flatMap(profile => 
      profile.photos.map(photo => ({
        ...photo,
        profileName: profile.name,
        profileId: profile.id
      }))
    ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  } catch (error) {
    console.error('Error getting all photos:', error)
    throw error
  }
}

// Delete photo
export async function deletePhoto(profileId, photoId) {
  try {
    const response = await fetch(`${API_BASE}/profiles?id=${profileId}&photoId=${photoId}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to delete photo')
    }
    return true
  } catch (error) {
    console.error('Error deleting photo:', error)
    throw error
  }
}

// Add a new profile
export async function addProfile(profileData) {
  try {
    console.log('Adding profile with data:', profileData)
    
    const response = await fetch(`${API_BASE}/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(profileData)
    })

    console.log('Response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response:', errorText)
      
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        errorData = { error: 'Failed to parse error response', message: errorText }
      }
      
      throw new Error(errorData.error || errorData.message || 'Failed to add profile')
    }

    const data = await response.json()
    console.log('Successfully added profile:', data)
    return data
  } catch (error) {
    console.error('Error in addProfile:', error)
    throw error
  }
}

// Update a profile
export async function updateProfile(profileData) {
  try {
    const response = await fetch(`${API_BASE}/profiles?id=${profileData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to update profile')
    }
    return await response.json()
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
}

// Delete a profile
export async function deleteProfile(id) {
  try {
    const response = await fetch(`${API_BASE}/profiles?id=${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to delete profile')
    }
    return await response.json()
  } catch (error) {
    console.error('Error deleting profile:', error)
    throw error
  }
} 