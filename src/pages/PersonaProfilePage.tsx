import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle, Share2, Bell, BellOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProfilePicture from '@/components/persona-profile/ProfilePicture'
import ProfileHistoryPreview from '@/components/persona-profile/ProfileHistoryPreview'
import FullScreenImage from '@/components/persona-profile/FullScreenImage'
import ProfileHistoryModal from '@/components/persona-profile/ProfileHistoryModal'
import image1 from '@/assets/image1.webp'
import image2 from '@/assets/image2.webp'
import image3 from '@/assets/image3.webp'
import image4 from '@/assets/image4.webp'
import { useNavigate } from 'react-router-dom'

const personaData = {
  id: 1,
  name: '이댕댕',
  statusMessage: '우리 함께 저속노화로 행복한 삶 🥗',
  bio: '안녕하세요! ae 식습관 코치 이댕댕입니다. 개인 맞춤형 식단 설계와 건강한 식습관 형성을 도와드립니다. 영양과 관련된 어떤 질문이든 편하게 물어보세요!',
  profileImage: '/placeholder.png',
  backgroundImage: '/placeholder.svg?key=1lh1j',
  online: true,
  previousImages: ['/placeholder.png', image3, image4, image2, image1]
}

export default function PersonaProfilePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [isNotificationOn, setIsNotificationOn] = useState(true)
  const navigate = useNavigate()

  // 더미 데이터 사용 (실제로는 API 호출 등으로 대체)
  const persona = personaData

  useEffect(() => {
    // 컴포넌트 마운트 시 애니메이션 시작
    setIsVisible(true)
  }, [])

  const handleStartChat = () => {
    // 채팅방으로 이동. 이동 후 뒤로가기했을 때 현재 페이지로 오지 않도록 replace 설정
    navigate('/chat', { replace: true })
  }

  const toggleNotification = () => {
    setIsNotificationOn(!isNotificationOn)
  }

  return (
    <>
      <motion.div
        className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col"
        initial={{ y: '100%' }}
        animate={{ y: isVisible ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* 헤더 */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="p-1">
              <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="ml-3 font-medium text-gray-800 dark:text-gray-200">프로필</div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Share2 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={toggleNotification}
            >
              {isNotificationOn ? (
                <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <BellOff className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* 내용 영역 */}
        <div className="flex-1 flex flex-col">
          {/* 프로필 상단 영역 (배경 + 프로필 정보) */}
          <div
            className="relative bg-cover bg-center h-64"
            style={{
              backgroundImage: `url(${persona.backgroundImage})`
            }}
          >
            {/* 배경 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>

            {/* 프로필 정보 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              {/* 프로필 이미지 */}
              <div className="mb-3">
                <ProfilePicture
                  image={persona.profileImage}
                  name={persona.name}
                  onOpenFullScreen={() => setFullScreenImage(persona.profileImage)}
                  online={persona.online}
                />
              </div>

              <h2 className="text-xl font-bold text-white">{persona.name}</h2>
              <div className="flex items-center mt-1 mb-2">
                <span
                  className={`w-2 h-2 rounded-full ${persona.online ? 'bg-green-500' : 'bg-gray-400'} mr-2`}
                ></span>
                <p className="text-sm text-gray-100">{persona.online ? 'Online' : 'Offline'}</p>
              </div>
              <p className="text-sm text-gray-200 text-center max-w-xs">{persona.statusMessage}</p>
            </div>
          </div>

          {/* 채팅 버튼 */}
          <div className="px-4 -mt-5 relative z-10">
            <Button
              className="w-full py-6 rounded-xl bg-zinc-900 hover:bg-zinc-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              onClick={handleStartChat}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">채팅하기</span>
            </Button>
          </div>

          {/* 프로필 정보 영역 */}
          <div className="mt-6 px-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="text-sm text-left font-medium text-gray-500 dark:text-gray-300 mb-3">
                자기소개
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{persona.bio}</p>
            </div>

            <div className="mt-4 mb-8">
              <ProfileHistoryPreview
                previewImage={persona.previousImages[0]}
                totalCount={persona.previousImages.length}
                onViewAll={() => setShowHistoryModal(true)}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 전체 화면 이미지 보기 */}
      {fullScreenImage && (
        <FullScreenImage image={fullScreenImage} onClose={() => setFullScreenImage(null)} />
      )}

      {/* 이전 프로필 사진 모달 */}
      {showHistoryModal && (
        <ProfileHistoryModal
          images={persona.previousImages}
          onClose={() => setShowHistoryModal(false)}
          onSelectImage={setFullScreenImage}
        />
      )}
    </>
  )
}
