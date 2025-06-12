  /// <reference types="@cloudflare/workers-types" />
import { Hono } from 'hono'
import type { Bindings } from '../../../src/types/bindings'
import type { User } from '../../../src/types/User'
import { getUserByEmail } from '../../../db/utils/db'
import { signJwt } from '../../../db/utils/jwt';


  


  const app = new Hono<{ Bindings: Bindings }>()

  app.get('/', async (c) => {
    const db = c.env.DB

    const guest = await getUserByEmail(db, 'guest@example.com')
    if (!guest) {
      return c.json({ error: 'Guest user not found' }, 404)
    }

    const token = await signJwt({ userId: guest.id.toString() })

    return c.json({
      user: {
        id: guest.id,
        name: `${guest.firstName} ${guest.lastName}`,
        email: guest.email
      },
      token
    })
  })

  export default app
