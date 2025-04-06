import { connectToDatabase, verifyConnection } from './mongodb'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    // Verify MongoDB connection first
    const isConnected = await verifyConnection()
    if (!isConnected) {
      return res.status(500).json({ 
        error: 'Database Connection Error',
        message: 'Unable to connect to the database. Please try again later.',
        code: 'CONNECTION_ERROR'
      })
    }

    const { db } = await connectToDatabase()
    const profilesCollection = db.collection('profiles')

    switch (req.method) {
      case 'GET':
        try {
          const profiles = await profilesCollection.find({}).toArray()
          return res.status(200).json(profiles || [])
        } catch (error) {
          console.error('Error fetching profiles:', error)
          return res.status(500).json({ 
            error: 'Failed to fetch profiles',
            message: error.message || 'An unexpected error occurred',
            code: 'FETCH_ERROR'
          })
        }

      case 'POST':
        try {
          console.log('Received profile data:', req.body)

          // Validate required fields
          const requiredFields = ['name', 'role', 'bio', 'instagram']
          const missingFields = requiredFields.filter(field => !req.body[field])
          
          if (missingFields.length > 0) {
            return res.status(400).json({ 
              error: 'Missing required fields',
              fields: missingFields,
              code: 'VALIDATION_ERROR'
            })
          }

          // Create new profile
          const newProfile = {
            ...req.body,
            id: req.body.name.toLowerCase().replace(/\s+/g, '-'),
            photos: []
          }

          console.log('Creating profile:', newProfile)

          const result = await profilesCollection.insertOne(newProfile)
          console.log('Insert result:', result)

          if (!result.acknowledged) {
            throw new Error('Failed to insert profile')
          }

          return res.status(201).json(newProfile)
        } catch (error) {
          console.error('Error creating profile:', error)
          return res.status(500).json({ 
            error: 'Failed to create profile',
            message: error.message || 'An unexpected error occurred',
            code: 'CREATE_ERROR'
          })
        }

      case 'PUT':
        try {
          const { id } = req.query
          if (!id) {
            return res.status(400).json({ 
              error: 'Profile ID is required',
              code: 'VALIDATION_ERROR'
            })
          }

          const updatedProfile = {
            ...req.body,
            id: id
          }

          const updateResult = await profilesCollection.updateOne(
            { id: id },
            { $set: updatedProfile }
          )

          if (updateResult.matchedCount === 0) {
            return res.status(404).json({ 
              error: 'Profile not found',
              code: 'NOT_FOUND'
            })
          }

          return res.status(200).json(updatedProfile)
        } catch (error) {
          console.error('Error updating profile:', error)
          return res.status(500).json({ 
            error: 'Failed to update profile',
            message: error.message || 'An unexpected error occurred',
            code: 'UPDATE_ERROR'
          })
        }

      case 'DELETE':
        try {
          const profileId = req.query.id
          if (!profileId) {
            return res.status(400).json({ 
              error: 'Profile ID is required',
              code: 'VALIDATION_ERROR'
            })
          }

          const deleteResult = await profilesCollection.deleteOne({ id: profileId })
          if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ 
              error: 'Profile not found',
              code: 'NOT_FOUND'
            })
          }

          return res.status(200).json({ message: 'Profile deleted successfully' })
        } catch (error) {
          console.error('Error deleting profile:', error)
          return res.status(500).json({ 
            error: 'Failed to delete profile',
            message: error.message || 'An unexpected error occurred',
            code: 'DELETE_ERROR'
          })
        }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        return res.status(405).json({ 
          error: `Method ${req.method} Not Allowed`,
          code: 'METHOD_NOT_ALLOWED'
        })
    }
  } catch (error) {
    console.error('Error in profiles API:', error)
    // Handle MongoDB connection errors
    if (error.error === 'Database Connection Error') {
      return res.status(500).json(error)
    }
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
      code: 'INTERNAL_ERROR'
    })
  }
} 