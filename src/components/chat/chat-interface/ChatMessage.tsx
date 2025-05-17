import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import type { MessageType, ChatPersona } from './types'
import { useNavigate } from 'react-router-dom'

interface ChatMessageProps {
  message: MessageType
  persona: ChatPersona
  currentUserId: number
}

export default function ChatMessage({ message, persona, currentUserId }: ChatMessageProps) {
  const isCurrentUser = message.senderId === currentUserId
  const navigate = useNavigate()

  // 첫 글자 가져오는 함수
  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || '?'
  }

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <div className="flex-shrink-0 mr-3 cursor-pointer" onClick={() => navigate("/persona-profile/1")}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={persona.avatar || '/placeholder.svg'} alt={persona.name} />
            <AvatarFallback className={`bg-${persona.color}-200 text-${persona.color}-700`}>
              {getInitials(persona.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      <div className={`flex flex-col max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        {!isCurrentUser && (
          <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">{persona.name}</span>
        )}

        <div className="flex items-end gap-1">
          {isCurrentUser && (
            <div className="flex flex-col justify-end items-end mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="ml-1">{message.isRead ? '읽음' : '1'}</span>
              <span>{format(message.timestamp, 'HH:mm')}</span>
            </div>
          )}

          {/* text 채팅이면 채팅 ui*/}
          {message.content && (
            <div
              className={`rounded-lg px-4 py-2 ${
                isCurrentUser
                  ? 'bg-orange-700 text-white text-left rounded-br-none'
                  : 'bg-gray-200 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100 rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          )}

          {/* 만약 사진이 있으면 사진 ui */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-1">
              {message.attachments.map((url, index) => (
                <img
                  key={index}
                  src={url || '/placeholder.svg'}
                  alt="Attachment"
                  className="max-w-[200px] max-h-[200px] rounded-md mt-1"
                />
              ))}
            </div>
          )}

          {!isCurrentUser && (
            <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>{format(message.timestamp, 'HH:mm')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
