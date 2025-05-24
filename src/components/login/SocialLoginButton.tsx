import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/useAuthStore'

export default function SocialLoginButtons() {
  // zustand에서 로딩 상태 가져오기
  const { setLoading } = useAuthStore()

  // 소셜 로그인 처리 함수
  const handleSocialLogin = (provider: string) => {
    setLoading(true)
    console.log(`${provider} 로그인 시도`)

    // 여기에 소셜 로그인 로직을 넣어야 함
    setTimeout(() => {
      console.log(`${provider} 로그인 성공`)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full border-amber-200 bg-white text-amber-900 hover:bg-amber-100 dark:border-zinc-200 dark:hover:text-black dark:hover:bg-white"
        onClick={() => handleSocialLogin('Google')}
      >
        <svg
          className="mr-2 h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google로 로그인
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full border-amber-200 bg-[#FEE500] text-[#3C1E1E] hover:bg-[#FDD835] dark:bg-[#FEE500] dark:hover:text-black dark:hover:bg-[#FDD835]"
        onClick={() => handleSocialLogin('Kakao')}
      >
        <svg
          className="mr-2 h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4C7.588 4 4 6.924 4 10.5c0 2.268 1.514 4.268 3.786 5.36-.165.628-.606 2.276-.696 2.629-.109.436.16.431.336.314.138-.09 2.172-1.475 3.048-2.067.499.072 1.01.114 1.526.114 4.412 0 8-2.924 8-6.5S16.412 4 12 4z"
          />
        </svg>
        카카오로 로그인
      </Button>
    </div>
  )
}
