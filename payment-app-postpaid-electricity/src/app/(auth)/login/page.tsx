import CardWrapperForm from '@/components/auth/card-wrapper'
import { LoginForm } from '@/components/auth/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <CardWrapperForm
      title='Login'
      description=' Welcome, Lets join with us to have a new experience.'
      href='/register'
      linkText="Don't have an account ?"
    >
      <LoginForm />
    </CardWrapperForm>
  )
}
