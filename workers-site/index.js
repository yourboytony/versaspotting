import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  try {
    // Handle API requests
    if (event.request.url.includes('/api/')) {
      return handleAPIRequest(event)
    }

    // Handle static assets
    return await getAssetFromKV(event)
  } catch (e) {
    // Handle errors
    return new Response(e.message || 'An error occurred', {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }
}

async function handleAPIRequest(event) {
  const url = new URL(event.request.url)
  const path = url.pathname.replace('/api/', '')

  // Handle CORS preflight requests
  if (event.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }

  // Handle API routes
  switch (path) {
    case 'profiles':
      return handleProfilesRequest(event)
    default:
      return new Response('Not Found', { status: 404 })
  }
}

async function handleProfilesRequest(event) {
  const { db } = await connectToDatabase()
  const profilesCollection = db.collection('profiles')

  switch (event.request.method) {
    case 'GET':
      const profiles = await profilesCollection.find({}).toArray()
      return new Response(JSON.stringify(profiles || []), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })

    case 'POST':
      const data = await event.request.json()
      const newProfile = {
        ...data,
        id: data.name.toLowerCase().replace(/\s+/g, '-'),
        photos: []
      }
      const result = await profilesCollection.insertOne(newProfile)
      return new Response(JSON.stringify(newProfile), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })

    default:
      return new Response('Method Not Allowed', { status: 405 })
  }
} 