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

    switch (req.method) {
      case 'GET':
        const profiles = await db.collection('profiles').find().toArray()
        res.status(200).json(profiles)
        break
      case 'POST':
        const { profileId, photoData } = req.body
        const newPhoto = {
          id: Date.now().toString(),
          ...photoData,
          timestamp: new Date().toISOString()
        }
        await db.collection('profiles').updateOne(
          { id: profileId },
          { $push: { photos: newPhoto } }
        )
        res.status(200).json(newPhoto)
        break
      case 'DELETE':
        const { profileId: deleteProfileId, photoId } = req.query
        await db.collection('profiles').updateOne(
          { id: deleteProfileId },
          { $pull: { photos: { id: photoId } } }
        )
        res.status(200).json({ success: true })
        break
      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('Error in profiles API:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  } finally {
    await client.close()
  }
} 