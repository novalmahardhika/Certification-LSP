import CardWrapperForm from '@/components/auth/card-wrapper'
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <CardWrapperForm
      title='Login'
      description=' Welcome, Lets join with us to have a new experience.'
    >
      <LoginForm />
    </CardWrapperForm>
  )
}
