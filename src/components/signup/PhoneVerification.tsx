import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PhoneVerificationProps {
  register: any
  errors: any
  setIsVerified: (verified: boolean) => void
  isVerified: boolean
}

export default function PhoneVerification({
  register,
  errors,
  setIsVerified,
  isVerified
}: PhoneVerificationProps) {
  // 인증 코드 전송 상태
  const [codeSent, setCodeSent] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)
  const [verifyingCode, setVerifyingCode] = useState(false)

  // 타이머 상태
  const [timeLeft, setTimeLeft] = useState(180) // 3분
  const [timerActive, setTimerActive] = useState(false)

  // 인증번호 전송 처리
  const handleSendVerificationCode = () => {
    setSendingCode(true)

    // 실제 API 요청 대신 타이머 시작 및 상태 변경
    setTimeout(() => {
      console.log('인증번호 전송 완료')
      setCodeSent(true)
      setSendingCode(false)
      setTimerActive(true)
      setTimeLeft(180) // 3분 타이머 설정

      // 타이머 시작
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            setTimerActive(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearInterval(timer)
    }, 1000)
  }

  // 인증번호 확인 처리
  const handleVerifyCode = () => {
    setVerifyingCode(true)

    // 실제 API 요청 대신 상태 변경
    setTimeout(() => {
      console.log('인증번호 확인 완료')
      setIsVerified(true)
      setVerifyingCode(false)
      setTimerActive(false)
    }, 1000)
  }

  // 타이머 포맷팅 (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="space-y-4 text-amber-700 dark:text-zinc-200">
      {/* 핸드폰 번호 입력 필드 */}
      <div className="space-y-1">
        <Label htmlFor="phoneNumber" className="text-xs ">
          휴대폰 번호 (아이디로 사용됩니다)
        </Label>
        <div className="flex gap-2">
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="01012345678"
            className="border-amber-200 dark:border-zinc-200 focus:border-amber-500 focus:ring-amber-500"
            {...register('phoneNumber', {
              required: '휴대폰 번호를 입력해주세요',
              pattern: {
                value: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
                message: '올바른 휴대폰 번호를 입력해주세요 (- 없이 숫자만)'
              }
            })}
            disabled={codeSent && isVerified}
          />
          <Button
            type="button"
            variant="outline"
            className="whitespace-nowrap border-amber-400 bg-amber-50 hover:bg-amber-100"
            onClick={handleSendVerificationCode}
            disabled={sendingCode || (codeSent && isVerified)}
          >
            {sendingCode ? '전송 중...' : codeSent && isVerified ? '인증 완료' : '인증번호 전송'}
          </Button>
        </div>
        {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
      </div>

      {/* 인증번호 입력 필드 (인증번호 전송 후 표시) */}
      {codeSent && !isVerified && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="verificationCode" className="">
              인증번호
            </Label>
            {timerActive && <span className="text-xs text-red-500">{formatTime(timeLeft)}</span>}
          </div>
          <div className="flex gap-2">
            <Input
              id="verificationCode"
              type="text"
              placeholder="인증번호 6자리"
              className="border-amber-200 dark:border-zinc-200 focus:border-amber-500 focus:ring-amber-500"
              {...register('verificationCode', {
                required: codeSent ? '인증번호를 입력해주세요' : false,
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: '6자리 숫자를 입력해주세요'
                }
              })}
            />
            <Button
              type="button"
              className="whitespace-nowrap bg-amber-600 dark:bg-amber-900 text-white hover:bg-amber-700"
              onClick={handleVerifyCode}
              disabled={verifyingCode || !timerActive}
            >
              {verifyingCode ? '확인 중...' : '확인'}
            </Button>
          </div>
          {errors.verificationCode && (
            <p className="text-xs text-red-500">{errors.verificationCode.message}</p>
          )}
          {!timerActive && timeLeft === 0 && (
            <p className="text-xs text-red-500">
              인증 시간이 만료되었습니다. 인증번호를 다시 전송해주세요.
            </p>
          )}
        </div>
      )}

      {/* 인증 완료 메시지 */}
      {isVerified && <p className="text-xs text-green-600">휴대폰 인증이 완료되었습니다.</p>}
    </div>
  )
}
