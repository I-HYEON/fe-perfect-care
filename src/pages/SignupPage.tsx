import SignupForm from '@/components/signup/SignupForm'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
  const navigate = useNavigate()

  // 회원가입 성공 처리
  const handleSignupSuccess = () => {
    console.log('회원가입 성공')
    navigate('/dashboard')
  }
  return (
    <div className="w-full flex h-full items-center justify-center overflow-hidden bg-amber-50 text-amber-700 dark:bg-zinc-800 dark:text-zinc-100">
      <div className="hidden md:flex md:w-1/2 h-full bg-orange-500 dark:bg-zinc-950">
        image or service introduction
      </div>
      <div className="flex flex-col gap-4 w-full md:flex md:w-1/2 min-h-screen px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="w-full">
          <div className="mt-8 text-center">
            <div className="text-xs font-bold">Perfect Care</div>
            <div className="text-2xl mb-4">Sign Up</div>
          </div>
        </div>

        {/* 회원가입 폼 */}
        <SignupForm onSuccess={handleSignupSuccess} />

        {/* 로그인 페이지 링크 */}
        <div className="mt-2 text-center text-sm">
          <span className="text-xs">이미 계정이 있으신가요?</span>{' '}
          <Link to="/login" className="text-xs">
            로그인
          </Link>
        </div>
      </div>
    </div>
  )
}
