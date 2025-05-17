import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// 로그인 폼 데이터 타입 정의
interface LoginFormData {
  phoneNumber: string
  password: string
}

// 컴포넌트 props 타입 정의
interface LoginFormProps {
  onSuccess: (data: LoginFormData) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export default function LoginForm({ onSuccess, isLoading, setIsLoading }: LoginFormProps) {
  const navigate = useNavigate()
  // 비밀번호 표시 상태 관리
  const [showPassword, setShowPassword] = useState(false)

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  })

  // 폼 제출 처리
  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true)
    // 실제 API 요청 대신 콘솔 출력 및 성공 처리
    console.log('로그인 시도:', data)
    setTimeout(() => {
      onSuccess(data)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="phoneNumber" className="text-amber-900 text-xs font-medium">
          핸드폰 번호
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="01012345678"
          className="bg-white border-amber-200 dark:bg-zinc-700 focus:border-orange-400 focus:ring-orange-400"
          {...register('phoneNumber', {
            required: '핸드폰 번호를 입력해주세요',
            pattern: {
              value: /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/,
              message: '올바른 핸드폰 번호 형식이 아닙니다 (예: 01012345678)'
            }
          })}
        />
        {errors.phoneNumber && (
          <p className="text-xs text-left text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-amber-800 text-xs font-medium">
            비밀번호
          </Label>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="bg-white border-amber-200 dark:bg-zinc-700 focus:border-orange-400 focus:ring-orange-400"
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
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-amber-300 text-orange-600 focus:ring-orange-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-amber-900">
            로그인 상태 유지
          </label>
        </div>

        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
        >
          비밀번호를 잊으셨나요?
        </button>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-800 hover:bg-amber-900 dark:bg-zinc-950 dark:hover:bg-zinc-500 text-white"
      >
        {isLoading ? '로딩중...' : '로그인'}
      </Button>
    </form>
  )
}
