import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../prisma/client/db'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { getUserById, updateVerifiedUser } from './lib/user'
import { FormLoginSchema } from './lib/types'
import bcrypt from 'bcryptjs'

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
    Credentials({
      authorize: async (credential) => {
        try {
          let user = null

          const validateCredential = FormLoginSchema.safeParse(credential)

          if (!validateCredential.success) return null

          const { email, password } = validateCredential.data

          user = await prisma.user.findFirst({
            where: { email },
          })

          if (!user || !user.password) return null

          const comparePassword = await bcrypt.compare(password, user.password)

          if (!comparePassword) return null

          return user
        } catch (error) {
          return null
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
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
