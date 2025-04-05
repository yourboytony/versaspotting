import clientPromise, { verifyConnection } from './mongodb'

export default async function handler(req, res) {
  // Verify MongoDB connection first
  const isConnected = await verifyConnection()
  if (!isConnected) {
    return res.status(500).json({ 
      error: 'Database Connection Error',
      message: 'Unable to connect to the database'
    })
  }

  let client
  try {
    client = await clientPromise
    const db = client.db('versaspotting')
    const profilesCollection = db.collection('profiles')

    switch (req.method) {
      case 'GET':
        try {
          const profiles = await profilesCollection.find({}).toArray()
          res.status(200).json(profiles || [])
        } catch (error) {
          console.error('Error fetching profiles:', error)
          res.status(500).json({ 
            error: 'Failed to fetch profiles',
            message: error.message
          })
        }
        break

      case 'POST':
        try {
          console.log('Received profile data:', req.body)

          // Validate required fields
          const requiredFields = ['name', 'role', 'bio', 'instagram']
          const missingFields = requiredFields.filter(field => !req.body[field])
          
          if (missingFields.length > 0) {
            return res.status(400).json({ 
              error: 'Missing required fields',
              fields: missingFields
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

          res.status(201).json(newProfile)
        } catch (error) {
          console.error('Error creating profile:', error)
          res.status(500).json({ 
            error: 'Failed to create profile',
            message: error.message
          })
        }
        break

      case 'PUT':
        try {
          const { id } = req.query
          if (!id) {
            return res.status(400).json({ error: 'Profile ID is required' })
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
            return res.status(404).json({ error: 'Profile not found' })
          }

          res.status(200).json(updatedProfile)
        } catch (error) {
          console.error('Error updating profile:', error)
          res.status(500).json({ 
            error: 'Failed to update profile',
            message: error.message
          })
        }
        break

      case 'DELETE':
        try {
          const profileId = req.query.id
          if (!profileId) {
            return res.status(400).json({ error: 'Profile ID is required' })
          }

          const deleteResult = await profilesCollection.deleteOne({ id: profileId })
          if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ error: 'Profile not found' })
          }

          res.status(200).json({ message: 'Profile deleted successfully' })
        } catch (error) {
          console.error('Error deleting profile:', error)
          res.status(500).json({ 
            error: 'Failed to delete profile',
            message: error.message
          })
        }
        break

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('Error in profiles API:', error)
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message
    })
  }
} 