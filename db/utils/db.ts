import type { D1Database } from '@cloudflare/workers-types'
import type { User } from '../../src/types/User'

export async function getUserByEmail(
  db: D1Database,
  email: string
): Promise<User | null> {
  const result = await db.prepare(
    'SELECT * FROM users WHERE email = ?'
  ).bind(email).first()

  return result as User | null
}
