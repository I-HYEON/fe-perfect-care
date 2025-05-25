import SignupForm from '@/components/signup/SignupForm'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignupPage() {
  // 회원가입 상태 관리
  const [isLoading, setIsLoading] = useState(false)

  // 회원가입 성공 처리
  const handleSignupSuccess = (data: any) => {
    setIsLoading(false)
    console.log('회원가입 성공:', data)
    // 추후 회원가입 성공 후 로직 추가 (예: 로그인 페이지로 리다이렉트)
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
        <SignupForm
          onSuccess={handleSignupSuccess}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

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
