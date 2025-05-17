import { useInstallPrompt } from '@/hooks/useInstallPrompt'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function PwaInstallButton() {
  const deferredPrompt = useInstallPrompt()
  const [isInstalled, setIsInstalled] = useState(false)

  // ✅ 설치 여부를 감지하기 위한 listener 추가 (Android Chrome 등)
  useEffect(() => {
    const handleAppInstalled = () => {
      console.log('PWA가 설치되었습니다.')
      setIsInstalled(true)
    }

    window.addEventListener('appinstalled', handleAppInstalled)
    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  // ✅ iOS Safari 등 설치 불가능한 환경 체크
  const isInstallable = Boolean(deferredPrompt)

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    const promptEvent = deferredPrompt as any
    promptEvent.prompt()

    const { outcome } = await promptEvent.userChoice
    if (outcome === 'accepted') {
      console.log('사용자가 설치를 수락했습니다.')
      setIsInstalled(true)
    } else {
      console.log('사용자가 설치를 거절했습니다.')
    }
  }

  if (!isInstallable) {
    return <Button disabled>앱 설치 비활성화</Button>
  } else if (isInstalled) {
    return <Button disabled>이미 설치됨</Button>
  } else {
    return <Button onClick={handleInstallClick}>앱 설치하기</Button>
  }
}
