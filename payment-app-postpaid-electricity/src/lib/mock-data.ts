import { Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const mockUsers = [
  {
    name: 'Trafalgar',
    email: 'trafalgar@mail.com',
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345689',
    address: 'Jl Semangka no 1',
  },
  {
    name: 'Zoro',
    email: 'zoro@mail.com',
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345688',
    address: 'Jl Semangka no 2',
  },
  {
    name: 'John',
    email: 'john@mail.com',
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345686',
    address: 'Jl Semangka no 3',
  },
  {
    name: 'Harry',
    email: 'harry@mail.com',
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345682',
    address: 'Jl Nanas no 21',
  },
  {
    name: 'Joko',
    email: 'joko@mail.com',
    password: bcrypt.hashSync('user12345', 10),
    phoneNumber: '+6212345685',
    address: 'Jl Nanas no 85',
  },
]

export const mockUserAdmin = [
  {
    name: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin12345', 10),
    phoneNumber: '+6212345611',
    role: Role.ADMIN,
    address: 'Jl Semangka no 1',
  },
  {
    name: 'bob',
    email: 'bob@mail.com',
    password: bcrypt.hashSync('bob12345', 10),
    phoneNumber: '+6212345612',
    role: Role.ADMIN,
    address: 'Jl Semangka no 2',
  },
]

export const mockCostVariant = [
  {
    code: 'INV001',
    power: '450 VA',
    costPerKwh: 1000,
  },
  {
    code: 'INV002',
    power: '500 VA',
    costPerKwh: 1200,
  },
  {
    code: 'INV003',
    power: '510 VA',
    costPerKwh: 1300,
  },
  {
    code: 'INV004',
    power: '550 VA',
    costPerKwh: 1500,
  },
  {
    code: 'INV005',
    power: '600 VA',
    costPerKwh: 1800,
  },
]
