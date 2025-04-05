import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb+srv://VERSAadmin:adminw8492%24%40@versaspotting.qrtcdft.mongodb.net/?retryWrites=true&w=majority&appName=versaspotting'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

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

export default async function handler(req, res) {
  try {
    await client.connect()
    const db = client.db('versaspotting')
    
    // Initialize profiles if they don't exist
    const profilesCollection = db.collection('profiles')
    const profilesCount = await profilesCollection.countDocuments()
    
    if (profilesCount === 0) {
      await profilesCollection.insertMany(initialProfiles)
      res.status(200).json({ message: 'Database initialized successfully' })
    } else {
      res.status(200).json({ message: 'Database already initialized' })
    }
  } catch (error) {
    console.error('Error initializing database:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  } finally {
    await client.close()
  }
} 