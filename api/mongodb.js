import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
}

// In Vercel serverless functions, we need to create a new connection for each request
let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  try {
    if (cachedClient && cachedDb) {
      try {
        // Verify the connection is still alive
        await cachedClient.db('versaspotting').command({ ping: 1 })
        return { client: cachedClient, db: cachedDb }
      } catch (error) {
        // If the connection is dead, clear the cache and create a new one
        cachedClient = null
        cachedDb = null
      }
    }

    const client = new MongoClient(uri, options)
    await client.connect()
    const db = client.db('versaspotting')

    // Verify the connection
    await db.command({ ping: 1 })

    cachedClient = client
    cachedDb = db

    console.log('MongoDB connection established')
    return { client, db }
  } catch (error) {
    console.error('MongoDB connection error:', error)
    // Format error for Vercel serverless function
    const formattedError = {
      error: 'Database Connection Error',
      message: error.message || 'Failed to connect to database',
      code: error.code || 'CONNECTION_ERROR'
    }
    throw formattedError
  }
}

// Add a function to verify the connection
export async function verifyConnection() {
  try {
    const { client } = await connectToDatabase()
    await client.db('versaspotting').command({ ping: 1 })
    console.log('MongoDB connection verified')
    return true
  } catch (error) {
    console.error('MongoDB connection verification failed:', error)
    return false
  }
}

// For backward compatibility
export default connectToDatabase 