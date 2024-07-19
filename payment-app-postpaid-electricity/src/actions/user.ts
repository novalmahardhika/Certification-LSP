'use server'

import { prisma } from '../../prisma/client/db'

export const createUser = async () => {
  await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@mail.com',
    },
  })
}
