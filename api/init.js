import clientPromise from './mongodb'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const client = await clientPromise
    const db = client.db('versaspotting')

    // Initialize collections if they don't exist
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(col => col.name)

    if (!collectionNames.includes('profiles')) {
      await db.createCollection('profiles')
      console.log('Created profiles collection')
    }

    if (!collectionNames.includes('contact_submissions')) {
      await db.createCollection('contact_submissions')
      await db.collection('contact_submissions').createIndex({ timestamp: -1 })
      console.log('Created contact_submissions collection')
    }

    if (!collectionNames.includes('team_applications')) {
      await db.createCollection('team_applications')
      await db.collection('team_applications').createIndex({ timestamp: -1 })
      console.log('Created team_applications collection')
    }

    res.status(200).json({ message: 'Database initialized successfully' })
  } catch (error) {
    console.error('Error initializing database:', error)
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message
    })
  }
} 