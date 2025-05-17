import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigate, useParams } from 'react-router-dom'
import ChatInterface from '@/components/chat/ChatInterface'

const fakePersona = {
  name: '이퍼펙',
  avatar: '/placeholder.png',
  description: '1분 전',
  color: 'yellow'
}

export default function ChatPage() {
  const params = useParams()
  const navigate = useNavigate()
  const personaId = Number(params.personaId)
  const currentUserId = 2 // 현재 사용자 ID (실제로는 인증 시스템에서 가져와야 함)

  // 이니셜 생성 (이름의 첫 글자)
  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || '?'
  }

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
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 flex items-center">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Avatar className="h-8 w-8 mr-3">
          <AvatarImage src={fakePersona.avatar || '/placeholder.svg'} alt={fakePersona.name} />
          <AvatarFallback className={`bg-${fakePersona.color}-200`}>
            {getInitials(fakePersona.name)}
          </AvatarFallback>
        </Avatar>

        <div>
          <div className="font-bold text-gray-900 dark:text-white">{fakePersona.name}</div>
          <p className="text-left text-xs text-gray-500 dark:text-gray-400">{fakePersona.description}</p>
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
