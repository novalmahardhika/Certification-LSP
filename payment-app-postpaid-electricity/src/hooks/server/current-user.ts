import { getUserByEmail } from '@/actions/user'
import { auth } from '@/auth'

export async function currentUser() {
  const session = await auth()

  if (!session || !session.user || !session.user.email) return

  const user = await getUserByEmail(session.user.email)

  if (!user || !user.id) return

  const data = {
    ...session.user,
    id: user.id,
  }

  return data
}
