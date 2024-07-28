import { prisma } from '../../prisma/client/db'

export function generateNum() {
  return Math.random().toString().slice(2, 14)
}

export async function generateKwhNum() {
  let kwhNumber = generateNum()

  const checkKwhNumberExist = await prisma.user.findUnique({
    where: { kwhNumber: kwhNumber },
  })

  while (checkKwhNumberExist) {
    kwhNumber = generateNum()
  }

  return kwhNumber
}
