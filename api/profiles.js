import clientPromise from './mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('versaspotting')
    const profilesCollection = db.collection('profiles')

    switch (req.method) {
      case 'GET':
        const profiles = await profilesCollection.find({}).toArray()
        res.status(200).json(profiles)
        break

      case 'POST':
        if (!req.body.name || !req.body.role || !req.body.bio || !req.body.instagram) {
          return res.status(400).json({ error: 'Missing required fields' })
        }

        const newProfile = {
          ...req.body,
          id: req.body.name.toLowerCase().replace(/\s+/g, '-'),
          photos: []
        }

        const result = await profilesCollection.insertOne(newProfile)
        if (!result.acknowledged) {
          throw new Error('Failed to insert profile')
        }

        res.status(201).json(newProfile)
        break

      case 'PUT':
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
        break

      case 'DELETE':
        const profileId = req.query.id
        if (!profileId) {
          return res.status(400).json({ error: 'Profile ID is required' })
        }

        const deleteResult = await profilesCollection.deleteOne({ id: profileId })
        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ error: 'Profile not found' })
        }

        res.status(200).json({ message: 'Profile deleted successfully' })
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