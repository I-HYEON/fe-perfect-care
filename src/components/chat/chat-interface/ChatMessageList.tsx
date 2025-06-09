import { useEffect, useRef } from 'react'
import type { MessageType, ChatPersona } from './types'
import ChatMessage from './ChatMessage'

interface ChatMessageListProps {
  messages: MessageType[]
  persona: ChatPersona
  currentUserId: number
}

export default function ChatMessageList({
  messages,
  persona,
  currentUserId
}: ChatMessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 메시지 목록이 변경될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 컴포넌트가 마운트될 때 한 번 스크롤
  useEffect(() => {
    scrollToBottom()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          persona={persona}
          currentUserId={currentUserId}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
