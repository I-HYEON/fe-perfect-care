import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface TermsAgreementProps {
  register: any
  errors: any
  setValue: any // setValue 함수 추가
  watch: any // watch 함수 추가
}

export default function TermsAgreement({ register, errors, setValue, watch }: TermsAgreementProps) {
  // 각 약관 동의 상태 감시
  const termsAgreed = watch('termsAgreed')
  const privacyAgreed = watch('privacyAgreed')
  const marketingAgreed = watch('marketingAgreed')

  // 전체 동의 상태 관리
  const [allAgreed, setAllAgreed] = useState(false)

  // 개별 약관 변경 시 전체 동의 상태 업데이트
  useEffect(() => {
    if (termsAgreed && privacyAgreed && marketingAgreed) {
      setAllAgreed(true)
    } else {
      setAllAgreed(false)
    }
  }, [termsAgreed, privacyAgreed, marketingAgreed])

  // 전체 동의 처리
  const handleAllAgree = (checked: boolean) => {
    setAllAgreed(checked)

    // react-hook-form의 setValue를 사용하여 각 체크박스 값을 변경
    setValue('termsAgreed', checked, { shouldValidate: true })
    setValue('privacyAgreed', checked, { shouldValidate: true })
    setValue('marketingAgreed', checked, { shouldValidate: true })
  }

  return (
    <div className="space-y-4 rounded-lg bg-amber-50 p-4">
      {/* 전체 동의 체크박스 */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="allAgreed"
          checked={allAgreed}
          onCheckedChange={handleAllAgree}
          className="border-amber-400 text-amber-600"
        />
        <Label htmlFor="allAgreed" className="font-medium text-amber-800">
          모든 약관에 동의합니다
        </Label>
      </div>

      <div className="h-px bg-amber-200" />

      {/* 필수 약관 동의 */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="termsAgreed"
          checked={termsAgreed}
          onCheckedChange={(checked) => setValue('termsAgreed', checked, { shouldValidate: true })}
          className="border-amber-400 text-amber-600"
          {...register('termsAgreed', {
            required: '이용약관 동의는 필수입니다'
          })}
        />
        <div className="flex flex-wrap items-center gap-1">
          <Label htmlFor="termsAgreed" className="text-sm text-amber-700">
            <span className="text-red-500">*</span> 이용약관 동의
          </Label>
          <Link to="/terms" className="text-xs text-amber-500 underline">
            (보기)
          </Link>
        </div>
      </div>
      {errors.termsAgreed && (
        <p className="text-left text-xs text-red-500">{errors.termsAgreed.message}</p>
      )}

      {/* 개인정보 처리방침 동의 */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="privacyAgreed"
          checked={privacyAgreed}
          onCheckedChange={(checked) =>
            setValue('privacyAgreed', checked, { shouldValidate: true })
          }
          className="border-amber-400 text-amber-600"
          {...register('privacyAgreed', {
            required: '개인정보 처리방침 동의는 필수입니다'
          })}
        />
        <div className="flex flex-wrap items-center gap-1">
          <Label htmlFor="privacyAgreed" className="text-sm text-amber-700">
            <span className="text-red-500">*</span> 개인정보 처리방침 동의
          </Label>
          <Link to="/privacy" className="text-xs text-amber-500 underline">
            (보기)
          </Link>
        </div>
      </div>
      {errors.privacyAgreed && (
        <p className="text-left text-xs text-red-500">{errors.privacyAgreed.message}</p>
      )}

      {/* 마케팅 정보 수신 동의 (선택) */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="marketingAgreed"
          checked={marketingAgreed}
          onCheckedChange={(checked) => setValue('marketingAgreed', checked)}
          className="border-amber-400 text-amber-600"
          {...register('marketingAgreed')}
        />
        <Label htmlFor="marketingAgreed" className="text-sm text-amber-700">
          (선택) 마케팅 정보 수신 동의
        </Label>
      </div>
    </div>
  )
}
