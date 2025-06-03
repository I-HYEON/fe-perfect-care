import { Button } from '@/components/ui/button'
import { AlignJustify, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ChatInterface from '@/components/chat/ChatInterface'

const fakePersona = {
  name: '케어메이트',
  avatar: '/placeholder.png',
  description: '2025년 6월 1일',
  color: 'yellow'
}

export default function ChatPage() {
  // const params = useParams()
  const navigate = useNavigate()
  // const personaId = Number(params.personaId)
  const personaId = Number(1)
  const currentUserId = 2 // 현재 사용자 ID (실제로는 인증 시스템에서 가져와야 함)

  if (!personaId) {
    return (
      <div className="h-full bg-gray-50 dark:bg-gray-900 p-4 flex items-center justify-center">
        <p>페르소나를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* 헤더 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 flex justify-between items-center">
        <div className="flex">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="text-left">
            <div className="font-bold text-gray-900 dark:text-white">{fakePersona.name}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{fakePersona.description}</p>
          </div>
        </div>

        <div>
          <AlignJustify />
        </div>
      </div>

      {/* 채팅 영역 */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <ChatInterface
          personaId={personaId}
          currentUserId={currentUserId}
          personaName={fakePersona.name}
          personaAvatar={fakePersona.avatar}
          personaColor={fakePersona.color}
        />
      </div>
    </div>
  )
}
