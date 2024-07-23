import { auth } from '@/auth'

export async function currentUser() {
  const session = await auth()

  if (!session || !session.user) return

  return session.user
}
