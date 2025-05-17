export type MessageType = {
  id: string
  content: string
  senderId: number
  receiverId: number
  timestamp: Date
  isRead: boolean
  attachments?: string[]
}

export interface ChatPersona {
  id: number
  name: string
  avatar?: string
  color: string
}
