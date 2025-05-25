import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/useAuthStore'
import { loginApi } from '@/api/auth/auth'
import { AxiosError } from 'axios'
import { ApiResponse } from '@/types/api/type'

// 로그인 폼 데이터 타입 정의
interface LoginFormData {
  phone_number: string
  password: string
  remember_me: boolean
}

export default function LoginForm() {
  const navigate = useNavigate()
  // zustand에서 로딩 상태 가져오기
  const { isLoading } = useAuthStore()

  // 비밀번호 표시 상태 관리
  const [showPassword, setShowPassword] = useState(false)

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    defaultValues: {
      phone_number: '',
      password: '',
      remember_me: true
    }
  })

  // 폼 제출 처리
  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('로그인 시도:', data)

      // zustand의 loginApi 사용
      await loginApi({
        phone_number: data.phone_number,
        password: data.password,
        remember_me: data.remember_me
      })

      // 로그인 성공 시 처리
      toast.success('로그인 성공!')
      // navigate('/chats',{replace:true})
    } catch (error) {
      console.error('로그인 중 오류 발생:', error)
      // AxiosError로 타입 단언
      const axiosError = error as AxiosError<ApiResponse<null>>
      if (axiosError.response?.data) {
        // 서버에서 온 에러 메시지 사용
        const message = axiosError.response.data.message || '로그인에 실패했습니다.'
        toast.error(message)
      } else {
        // 네트워크 에러 등 기타 에러
        const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
        toast.error('서버 에러: ' + message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="phone_number" className="text-amber-900 dark:text-zinc-300 text-xs font-medium">
          핸드폰 번호
        </Label>
        <Input
          id="phone_number"
          type="tel"
          placeholder="01012345678"
          className="bg-white border-amber-200 dark:border-zinc-200 dark:bg-zinc-700 focus:border-orange-400 focus:ring-orange-400"
          {...register('phone_number', {
            required: '핸드폰 번호를 입력해주세요',
            pattern: {
              value: /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/,
              message: '올바른 핸드폰 번호 형식이 아닙니다 (예: 01012345678)'
            }
          })}
        />
        {errors.phone_number && (
          <p className="text-xs text-left text-red-500">{errors.phone_number.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-amber-800 dark:text-zinc-300 text-xs font-medium">
            비밀번호
          </Label>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="bg-white border-amber-200 dark:border-zinc-200 dark:bg-zinc-700 focus:border-orange-400 focus:ring-orange-400"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다'
              }
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-left text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center">
          <input
            id="remember_me"
            type="checkbox"
            className="h-4 w-4 rounded border-amber-300 text-orange-600 focus:ring-orange-500"
            {...register('remember_me')}
          />
          <label htmlFor="remember_me" className="ml-2 block text-amber-900 dark:text-zinc-300">
            로그인 상태 유지
          </label>
        </div>

        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="font-medium text-orange-600 hover:text-orange-500 dark:text-zinc-50 transition-colors"
        >
          비밀번호를 잊으셨나요?
        </button>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-800 hover:bg-amber-900 dark:bg-zinc-950 dark:hover:bg-zinc-500 text-white"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : '로그인'}
      </Button>
    </form>
  )
}
