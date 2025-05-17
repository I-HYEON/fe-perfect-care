
import { useEffect, useRef } from "react"
import type { MessageType, ChatPersona } from "./types"
import ChatMessage from "./ChatMessage"

interface ChatMessageListProps {
  messages: MessageType[]
  persona: ChatPersona
  currentUserId: number
}

export default function ChatMessageList ({ messages, persona, currentUserId }: ChatMessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} persona={persona} currentUserId={currentUserId} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
