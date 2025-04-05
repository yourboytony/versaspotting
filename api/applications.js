import { storeTeamApplication, getAllTeamApplications, deleteTeamApplication } from './mongodb'

export default async function handler(req, res) {
  const { method, body, query } = req

  try {
    switch (method) {
      case 'GET':
        const applications = await getAllTeamApplications()
        return res.status(200).json(applications)
      
      case 'POST':
        if (body) {
          const newApplication = await storeTeamApplication(body)
          return res.status(201).json(newApplication)
        }
        return res.status(400).json({ error: 'Missing application data' })
      
      case 'DELETE':
        if (query.id) {
          const success = await deleteTeamApplication(query.id)
          return res.status(200).json({ success })
        }
        return res.status(400).json({ error: 'Missing application ID' })
      
      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
} 