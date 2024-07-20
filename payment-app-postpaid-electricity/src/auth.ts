import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../prisma/client/db'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { getUserById, updateVerifiedUser } from './lib/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: { strategy: 'jwt' },

  callbacks: {
    async signIn({ account, user }) {
      if (!user || !user.id) return false

      if (account && account.provider) {
        await updateVerifiedUser(user.id)
      }

      return true
    },
    async session({ session, token }) {
      if (!session.user) return session
      if (!token.role) return session
      session.user.role = token.role
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const currentUser = await getUserById(token.sub)
      if (currentUser && currentUser.role) token.role = currentUser.role
      return token
    },
  },
})
