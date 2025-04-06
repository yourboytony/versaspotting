import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

export default {
  async fetch(request, env, ctx) {
    try {
      // Check if KV namespace is available
      if (!env.KV) {
        console.error('KV namespace not properly configured')
        return new Response(JSON.stringify({
          error: 'Internal Server Error',
          message: 'KV namespace not properly configured'
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        })
      }

      const url = new URL(request.url)
      
      // Handle API requests
      if (url.pathname.startsWith('/api/')) {
        return handleAPIRequest(request, env)
      }

      // Handle admin routes that require authentication
      if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
        const token = request.headers.get('Authorization')?.split('Bearer ')?.[1]
        if (!token) {
          return Response.redirect(`${url.origin}/admin/login`, 302)
        }
        
        try {
          const session = await env.KV.get(`session:${token}`)
          if (!session) {
            return Response.redirect(`${url.origin}/admin/login`, 302)
          }
        } catch (e) {
          console.error('Error accessing KV store:', e)
          return Response.redirect(`${url.origin}/admin/login`, 302)
        }
      }

      // Handle static assets and SPA routing
      try {
        // First try to serve the exact file
        return await getAssetFromKV(
          {
            request,
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
          }
        )
      } catch (e) {
        // If the file is not found, serve index.html for SPA routing
        return await getAssetFromKV(
          {
            request: new Request(new URL('/index.html', request.url)),
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
          }
        )
      }
    } catch (e) {
      console.error('Error in worker:', e)
      return new Response(JSON.stringify({
        error: 'Internal Server Error',
        message: e.message || 'An error occurred'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      })
    }
  }
}

async function handleAPIRequest(request, env) {
  const url = new URL(request.url)
  const path = url.pathname.replace('/api/', '')

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  // Handle API routes
  switch (path) {
    case 'profiles':
      return handleProfilesRequest(request, env)
    case 'admin/login':
      return handleAdminLogin(request, env)
    case 'contact':
      return handleContactSubmission(request, env)
    case 'team-application':
      return handleTeamApplication(request, env)
    case 'photos':
      return handlePhotosRequest(request, env)
    default:
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
  }
}

async function handleProfilesRequest(request, env) {
  if (request.method === 'GET') {
    const profiles = await env.DB.prepare('SELECT * FROM profiles').all()
    return new Response(JSON.stringify(profiles.results), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  if (request.method === 'POST') {
    const data = await request.json()
    const { name, email, instagram, bio } = data
    const id = crypto.randomUUID()

    await env.DB.prepare(
      'INSERT INTO profiles (id, name, email, instagram, bio) VALUES (?, ?, ?, ?, ?)'
    ).bind(id, name, email, instagram, bio).run()

    return new Response(JSON.stringify({ id, name, email, instagram, bio }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

async function handleAdminLogin(request, env) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
    })
  }

  const { username, password } = await request.json()
  const user = await env.DB.prepare(
    'SELECT * FROM admin_users WHERE username = ?'
  ).bind(username).first()

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
  }

  if (user.password_hash !== password) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
  }

  try {
    const token = crypto.randomUUID()
    await env.KV.put(`session:${token}`, JSON.stringify({ userId: user.id }), { expirationTtl: 86400 }) // 24 hour expiration

    return new Response(JSON.stringify({ token }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
  } catch (e) {
    console.error('Error storing session in KV:', e)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
  }
}

async function handleContactSubmission(request, env) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { name, email, message } = await request.json()
  const id = crypto.randomUUID()

  await env.DB.prepare(
    'INSERT INTO contact_submissions (id, name, email, message) VALUES (?, ?, ?, ?)'
  ).bind(id, name, email, message).run()

  return new Response(JSON.stringify({ success: true, id }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function handleTeamApplication(request, env) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { name, email, instagram, bio } = await request.json()
  const id = crypto.randomUUID()

  await env.DB.prepare(
    'INSERT INTO team_applications (id, name, email, instagram, bio) VALUES (?, ?, ?, ?, ?)'
  ).bind(id, name, email, instagram, bio).run()

  return new Response(JSON.stringify({ success: true, id }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function handlePhotosRequest(request, env) {
  if (request.method === 'GET') {
    const photos = await env.DB.prepare('SELECT * FROM photos').all()
    return new Response(JSON.stringify(photos.results), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (request.method === 'POST') {
    const { url, title, description } = await request.json()
    const id = crypto.randomUUID()

    await env.DB.prepare(
      'INSERT INTO photos (id, url, title, description) VALUES (?, ?, ?, ?)'
    ).bind(id, url, title, description).run()

    return new Response(JSON.stringify({ success: true, id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  })
} 