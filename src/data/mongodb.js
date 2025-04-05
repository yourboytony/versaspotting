import { MongoClient } from 'mongodb'

// MongoDB connection string - properly encoded
const uri = process.env.MONGODB_URI || 'mongodb+srv://VERSAadmin:adminw8492%24%40@versaspotting.qrtcdft.mongodb.net/?retryWrites=true&w=majority&appName=versaspotting'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

// Initialize database collections
export async function initializeDatabase() {
  try {
    await client.connect()
    const db = client.db('versaspotting')
    
    // Initialize profiles if they don't exist
    const profilesCollection = db.collection('profiles')
    const profilesCount = await profilesCollection.countDocuments()
    if (profilesCount === 0) {
      await profilesCollection.insertMany(initialProfiles)
    }
    
    // Initialize other collections
    await db.collection('contact_submissions').createIndex({ timestamp: -1 })
    await db.collection('team_applications').createIndex({ timestamp: -1 })
    
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

// Get all profiles
export async function getAllProfiles() {
  try {
    const db = client.db('versaspotting')
    const profiles = await db.collection('profiles').find().toArray()
    return profiles
  } catch (error) {
    console.error('Error getting profiles:', error)
    return []
  }
}

// Get photos for a specific profile
export async function getProfilePhotos(profileId) {
  try {
    const db = client.db('versaspotting')
    const profile = await db.collection('profiles').findOne({ id: profileId })
    return profile ? profile.photos : []
  } catch (error) {
    console.error('Error getting profile photos:', error)
    return []
  }
}

// Add a photo to a profile
export async function addPhotoToProfile(profileId, photoData) {
  try {
    const db = client.db('versaspotting')
    const newPhoto = {
      id: Date.now().toString(),
      ...photoData,
      timestamp: new Date().toISOString()
    }
    
    await db.collection('profiles').updateOne(
      { id: profileId },
      { $push: { photos: newPhoto } }
    )
    
    return newPhoto
  } catch (error) {
    console.error('Error adding photo to profile:', error)
    return null
  }
}

// Store contact form submission
export async function storeContactSubmission(formData) {
  try {
    const db = client.db('versaspotting')
    const newSubmission = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toISOString()
    }
    
    await db.collection('contact_submissions').insertOne(newSubmission)
    return newSubmission
  } catch (error) {
    console.error('Error storing contact submission:', error)
    return null
  }
}

// Get all contact submissions
export async function getAllContactSubmissions() {
  try {
    const db = client.db('versaspotting')
    const submissions = await db.collection('contact_submissions')
      .find()
      .sort({ timestamp: -1 })
      .toArray()
    return submissions
  } catch (error) {
    console.error('Error getting contact submissions:', error)
    return []
  }
}

// Delete contact submission
export async function deleteContactSubmission(id) {
  try {
    const db = client.db('versaspotting')
    await db.collection('contact_submissions').deleteOne({ id })
    return true
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    return false
  }
}

// Store team application
export async function storeTeamApplication(formData) {
  try {
    const db = client.db('versaspotting')
    const newApplication = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toISOString()
    }
    
    await db.collection('team_applications').insertOne(newApplication)
    return newApplication
  } catch (error) {
    console.error('Error storing team application:', error)
    return null
  }
}

// Get all team applications
export async function getAllTeamApplications() {
  try {
    const db = client.db('versaspotting')
    const applications = await db.collection('team_applications')
      .find()
      .sort({ timestamp: -1 })
      .toArray()
    return applications
  } catch (error) {
    console.error('Error getting team applications:', error)
    return []
  }
}

// Delete team application
export async function deleteTeamApplication(id) {
  try {
    const db = client.db('versaspotting')
    await db.collection('team_applications').deleteOne({ id })
    return true
  } catch (error) {
    console.error('Error deleting team application:', error)
    return false
  }
}

// Get all photos
export async function getAllPhotos() {
  try {
    const db = client.db('versaspotting')
    const profiles = await db.collection('profiles').find().toArray()
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
    const db = client.db('versaspotting')
    await db.collection('profiles').updateOne(
      { id: profileId },
      { $pull: { photos: { id: photoId } } }
    )
    return true
  } catch (error) {
    console.error('Error deleting photo:', error)
    return false
  }
} 