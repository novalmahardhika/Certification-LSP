import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../prisma/client/db'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { getUserById, updateVerifiedUser } from './lib/user'
import { FormLoginSchema } from './lib/types'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from './actions/user'
import { generateKwhNum } from './lib/generate-kwh-number'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
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
      if (!user.email || !user.name) return false

      const checkOauth =
        account?.provider === 'google' || account?.provider === 'github'

      const checkUserByEmail = await getUserByEmail(user.email)

      if (checkOauth && !checkUserByEmail) {
        const kwhNumber = await generateKwhNum()

        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            image: user.image,
            kwhNumber,
            costVariant: {
              connect: {
                code: 'INV001',
              },
            },
            usage: {
              create: {
                isActive: true,
              },
            },
          },
        })
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
