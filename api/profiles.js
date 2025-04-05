import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb+srv://VERSAadmin:adminw8492%24%40@versaspotting.qrtcdft.mongodb.net/?retryWrites=true&w=majority&appName=versaspotting'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export default async function handler(req, res) {
  try {
    await client.connect()
    const db = client.db('versaspotting')
    const profilesCollection = db.collection('profiles')

    switch (req.method) {
      case 'GET':
        const profiles = await profilesCollection.find({}).toArray()
        res.status(200).json(profiles)
        break

      case 'POST':
        const newProfile = {
          ...req.body,
          id: req.body.name.toLowerCase().replace(/\s+/g, '-'),
          photos: []
        }
        await profilesCollection.insertOne(newProfile)
        res.status(201).json(newProfile)
        break

      case 'PUT':
        const { id } = req.query
        const updatedProfile = {
          ...req.body,
          id: id
        }
        await profilesCollection.updateOne(
          { id: id },
          { $set: updatedProfile }
        )
        res.status(200).json(updatedProfile)
        break

      case 'DELETE':
        const profileId = req.query.id
        await profilesCollection.deleteOne({ id: profileId })
        res.status(200).json({ message: 'Profile deleted successfully' })
        break

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('Error in profiles API:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  } finally {
    await client.close()
  }
} 