import { useState } from 'react'
import { ChatPersona, MessageType } from './chat-interface/types'
import ChatMessageList from './chat-interface/ChatMessageList'
import ChatInputArea from './chat-interface/ChatInputArea'

interface ChatInterfaceProps {
  personaId: number
  currentUserId: number
  personaName: string
  personaAvatar?: string
  personaColor: string
}

// 대화 더미 데이터
const dummyMessages: MessageType[] = [
  {
    id: '1',
    content: '안녕하세요! 오늘 어떻게 지내세요?',
    senderId: 1, // persona
    receiverId: 2, // current user
    timestamp: new Date(2023, 5, 10, 14, 30),
    isRead: true
  },
  {
    id: '2',
    content: '안녕하세요',
    senderId: 2, // current user
    receiverId: 1, // persona
    timestamp: new Date(2023, 5, 10, 14, 32),
    isRead: true
  },
  {
    id: '3',
    content: '이퍼펙씨',
    senderId: 2, // current user
    receiverId: 1, // persona
    timestamp: new Date(2023, 5, 10, 14, 32),
    isRead: true
  },
  {
    id: '4',
    content: '오늘 점심은 뭘 드셨죠',
    senderId: 1, // persona
    receiverId: 2, // current user
    timestamp: new Date(2023, 5, 10, 14, 35),
    isRead: true
  },
  {
    id: '5',
    content: '점심 식사 사진 한장 보내주세요',
    senderId: 1, // persona
    receiverId: 2, // current user
    timestamp: new Date(2023, 5, 10, 14, 35),
    isRead: true
  },
]

export default function ChatInterface({
  personaId,
  currentUserId,
  personaName,
  personaAvatar,
  personaColor
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<MessageType[]>(dummyMessages)

  // Create persona object
  const persona: ChatPersona = {
    id: personaId,
    name: personaName,
    avatar: personaAvatar,
    color: personaColor,
  }

  // 새 메시지 전송 기능
  const handleSendMessage = (content: string, attachments?: string[]) => {
    if (content.trim() === "" && (!attachments || attachments.length === 0)) return

    const newMsg: MessageType = {
      id: Date.now().toString(),
      content: content,
      senderId: currentUserId,
      receiverId: personaId,
      timestamp: new Date(),
      isRead: false,
      attachments,
    }

    setMessages([...messages, newMsg])
  }

  return (
    <div className="h-full flex flex-col w-full max-w-4xl mx-auto">
      <ChatMessageList messages={messages} persona={persona} currentUserId={currentUserId} />
      <ChatInputArea onSendMessage={handleSendMessage} />
    </div>
  )
}
