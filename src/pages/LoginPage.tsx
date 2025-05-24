import AnimatedCoffeeBean from '@/components/login/AnimatedCoffeeBean'
import LoginForm from '@/components/login/LoginForm'
import SocialLoginButtons from '@/components/login/SocialLoginButton'
import { Link } from 'react-router-dom'

export default function LoginPage() {
 
  return (
    <div className="w-full flex h-full items-center justify-center bg-amber-50 overflow-hidden">
      <div className="hidden md:flex md:w-1/2 min-h-screen bg-amber-800 dark:bg-zinc-950">
        image or guide
      </div>
      <div className="flex flex-col gap-4 w-full md:flex md:w-1/2 min-h-screen px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="w-full">
          <div className="flex justify-center my-12">
            <AnimatedCoffeeBean />
          </div>

          <div className="mb-6 text-center">
            <div className="text-2xl font-bold text-amber-800">Perfect Care</div>
            <p className="mt-2 text-xs text-amber-600">
              케어메이트와 대화하고 더 건강하게 식사하세요
            </p>
          </div>
        </div>

        {/* 로그인 폼 */}
        <LoginForm />

        {/* 구분선 */}
        <div className="my-2 flex items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="mx-4 text-xs bg-amber-50 px-2 text-amber-700">또는</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* 소셜 로그인 버튼 */}
        <SocialLoginButtons />

        {/* 회원가입 링크 */}
        <div className="mt-4 text-center text-xs">
          <span className="text-amber-700">계정이 없으신가요?</span>{' '}
          <Link to="/signup" className="font-medium text-amber-600 hover:text-amber-500">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  )
}
