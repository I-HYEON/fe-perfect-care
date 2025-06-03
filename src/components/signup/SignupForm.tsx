import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import PhoneVerification from './PhoneVerification'
import TermsAgreement from './TermsAgreement'
import { registerApi, RegisterRequest } from '@/api/auth/auth'
import { AxiosError } from 'axios'

// 프론트엔드 폼 데이터 타입 (모든 필드 포함)
interface SignupFormData {
  name: string
  phoneNumber: string
  verificationCode: string
  password: string
  confirmPassword: string
  termsAgreed: boolean
  privacyAgreed: boolean
  marketingAgreed: boolean
}

// 컴포넌트 props 타입 정의 - 서버 전송 데이터만 받도록 수정
interface SignupFormProps {
  onSuccess: () => void
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  // 비밀번호 표시 상태 관리
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // 인증 상태 관리
  const [isVerified, setIsVerified] = useState(false)

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false)

  // 에러 상태
  const [apiError, setApiError] = useState<string>('')

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<SignupFormData>({
    defaultValues: {
      name: '',
      phoneNumber: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
      termsAgreed: false,
      privacyAgreed: false,
      marketingAgreed: false
    }
  })

  // 비밀번호 값 감시 (비밀번호 확인 검증에 사용)
  const password = watch('password')

  // 폼 제출 처리
  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true)
      setApiError('') // 이전 에러 초기화

      // 서버로 보낼 데이터만 추출하고 snake_case로 변환
      const registerData: RegisterRequest = {
        name: data.name,
        phone_number: data.phoneNumber,
        password: data.password
      }

      console.log('회원가입 API 요청:', registerData)

      // 실제 API 요청
      const response = await registerApi(registerData)

      console.log('회원가입 성공:', response)

      // 성공 시 콜백 실행 (registerApi에서 자동 로그인 처리됨)
      onSuccess()
    } catch (error) {
      console.error('회원가입 실패:', error)

      // 에러 메시지 처리
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || '회원가입에 실패했습니다.'
        setApiError(errorMessage)
      } else {
        setApiError('네트워크 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-amber-700 dark:text-zinc-200">
      {/* API 에러 메시지 표시 */}
      {apiError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {apiError}
        </div>
      )}

      {/* 이름 입력 필드 */}
      <div className="space-y-1">
        <Label htmlFor="name" className="text-xs">
          이름
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="김케어"
          className="border-amber-200 bg-white dark:border-zinc-200 dark:bg-zinc-700 focus:border-amber-500 focus:ring-amber-500"
          {...register('name', {
            required: '이름을 입력해주세요',
            minLength: {
              value: 2,
              message: '이름은 최소 2자 이상이어야 합니다'
            }
          })}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      {/* 핸드폰 번호 인증 컴포넌트 */}
      <PhoneVerification
        register={register}
        errors={errors}
        setIsVerified={setIsVerified}
        isVerified={isVerified}
      />

      {/* 비밀번호 입력 필드 */}
      <div className="space-y-1">
        <Label htmlFor="password" className="text-xs">
          비밀번호
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="border-amber-200 bg-white dark:border-zinc-200 dark:bg-zinc-700 focus:border-amber-500 focus:ring-amber-500"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자 이상이어야 합니다'
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다'
              }
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        <p className="text-left text-xs">영문, 숫자, 특수문자를 포함한 8자 이상</p>
      </div>

      {/* 비밀번호 확인 입력 필드 */}
      <div className="space-y-1">
        <Label htmlFor="confirmPassword" className="text-xs">
          비밀번호 확인
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="border-amber-200 bg-white dark:border-zinc-200 dark:bg-zinc-700 focus:border-amber-500 focus:ring-amber-500"
            {...register('confirmPassword', {
              required: '비밀번호 확인을 입력해주세요',
              validate: (value) => value === password || '비밀번호가 일치하지 않습니다'
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* 이용약관 동의 컴포넌트 */}
      <TermsAgreement register={register} errors={errors} setValue={setValue} watch={watch} />

      {/* 회원가입 버튼 */}
      <Button
        type="submit"
        disabled={isLoading || !isVerified}
        className="w-full bg-amber-600 dark:bg-zinc-200 text-white dark:text-black hover:bg-amber-700"
      >
        {isLoading ? '처리 중...' : '회원가입'}
      </Button>
      {!isVerified && <p className="text-center text-xs text-red-500">휴대폰 인증이 필요합니다</p>}
    </form>
  )
}
