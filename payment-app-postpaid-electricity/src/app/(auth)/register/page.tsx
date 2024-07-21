import CardWrapperForm from '@/components/auth/card-wrapper'
import { RegisterForm } from '@/components/auth/register-form'
import React from 'react'

export default function RegisterPage() {
  return (
    <CardWrapperForm
      title='Register'
      description=' Welcome, Lets join with us to have a new experience.'
    >
      <RegisterForm />
    </CardWrapperForm>
  )
}
