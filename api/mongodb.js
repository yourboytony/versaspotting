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

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    try {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
      console.log('MongoDB connection established in development mode')
    } catch (error) {
      console.error('MongoDB connection error in development:', error)
      throw error
    }
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  try {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
    console.log('MongoDB connection established in production mode')
  } catch (error) {
    console.error('MongoDB connection error in production:', error)
    throw error
  }
}

// Add a function to verify the connection
export async function verifyConnection() {
  try {
    const client = await clientPromise
    await client.db('versaspotting').command({ ping: 1 })
    console.log('MongoDB connection verified')
    return true
  } catch (error) {
    console.error('MongoDB connection verification failed:', error)
    return false
  }
}

export default clientPromise 