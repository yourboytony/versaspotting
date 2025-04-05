import { getAllProfiles, getProfilePhotos, addPhotoToProfile, deletePhoto } from './mongodb'

export default async function handler(req, res) {
  const { method, query, body } = req

  try {
    switch (method) {
      case 'GET':
        if (query.profileId) {
          const photos = await getProfilePhotos(query.profileId)
          return res.status(200).json(photos)
        } else {
          const profiles = await getAllProfiles()
          return res.status(200).json(profiles)
        }
      
      case 'POST':
        if (query.profileId && body) {
          const newPhoto = await addPhotoToProfile(query.profileId, body)
          return res.status(201).json(newPhoto)
        }
        return res.status(400).json({ error: 'Missing profileId or photo data' })
      
      case 'DELETE':
        if (query.profileId && query.photoId) {
          const success = await deletePhoto(query.profileId, query.photoId)
          return res.status(200).json({ success })
        }
        return res.status(400).json({ error: 'Missing profileId or photoId' })
      
      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
} 