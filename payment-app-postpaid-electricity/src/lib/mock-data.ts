import { Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const mockUsers = [
  {
    name: 'Trafalgar',
    email: 'trafalgar@mail.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345689',
    address: 'jl Semangka no 1',
  },
  {
    name: 'Zoro',
    email: 'zoro@mail.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345688',
    address: 'jl Semangka no 2',
  },
  {
    name: 'John',
    email: 'john@mail.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345686',
    address: 'jl Semangka no 3',
  },
  {
    name: 'Harry',
    email: 'harry@mail.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345682',
    address: 'jl Nanas no 21',
  },
  {
    name: 'Joko',
    email: 'joko@mail.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345685',
    address: 'jl Nanas no 85',
  },
]

export const mockUserAdmin = [
  {
    name: 'admin',
    email: 'admin@admin.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('admin12345', 10),
    phoneNumber: '+6212345611',
    role: Role.ADMIN,
    address: 'jl Semangka no 1',
  },
  {
    name: 'bob',
    email: 'bob@mail.com',
    emailVerified: new Date(),
    password: bcrypt.hashSync('bob12345', 10),
    phoneNumber: '+6212345612',
    role: Role.ADMIN,
    address: 'jl Semangka no 2',
  },
]