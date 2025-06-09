import { useState } from 'react'
import { ChatPersona, MessageType } from './chat-interface/types'
import ChatMessageList from './chat-interface/ChatMessageList'
import ChatInputArea from './chat-interface/ChatInputArea'
import foodImage1 from '@/assets/burger.jpeg'
import foodImage2 from '@/assets/pasta.jpg'

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
    id: '3',
    content: '오늘 점심은 뭘 드셨나요?',
    senderId: 1, // persona
    receiverId: 2, // current user
    timestamp: new Date(2023, 5, 10, 14, 35),
    isRead: true
  },
  {
    id: '4',
    content: '점심 식사 사진 한장 보내주세요',
    senderId: 1, // persona
    receiverId: 2, // current user
    timestamp: new Date(2023, 5, 10, 14, 35),
    isRead: true
  },
  {
    id: '5',
    attachments: [foodImage1],
    senderId: 2, // current user
    receiverId: 1, // persona
    timestamp: new Date(2023, 5, 10, 14, 40),
    isRead: true
  },
  {
    id: '6',
    senderId: 1, // persona
    receiverId: 2, // current user
    timestamp: new Date(2023, 5, 10, 14, 42),
    isRead: true,
    foodAnalysis: {
      foodName: '치킨 햄버거',
      calories: 285,
      image: foodImage1,
      macronutrients: {
        carbs: 12,
        protein: 35,
        fat: 11
      },
      ingredients: ['닭가슴살', '로메인', '토마토', '아보카도', '올리브오일'],
      comment:
        '단백질이 풍부하고 건강한 지방이 포함된 균형 잡힌 식사입니다. 식이섬유도 충분해 포만감이 오래 지속됩니다.'
    }
  },
  {
    id: '7',
    content: '저녁으로는 뭐가 좋을까요?',
    senderId: 2, // current user
    receiverId: 1, // persona
    timestamp: new Date(2023, 5, 10, 17, 45),
    isRead: false
  },
  {
    id: '8',
    content:
      '점심에 단백질을 충분히 섭취하셨으니, 저녁은 가벼운 채소 위주의 식사가 좋을 것 같아요.',
    senderId: 1, // persona
    receiverId: 2, // current user
    timestamp: new Date(2023, 5, 10, 17, 46),
    isRead: false
  },
  {
    id: '9',
    attachments: [foodImage2],
    senderId: 2, // current user
    receiverId: 1, // persona
    timestamp: new Date(2023, 5, 10, 19, 30),
    isRead: false
  },
  {
    id: '10',
    senderId: 1, // persona
    receiverId: 2, // current user
    timestamp: new Date(2023, 5, 10, 19, 32),
    isRead: false,
    foodAnalysis: {
      foodName: '토마토 파스타',
      calories: 450,
      image: foodImage2,
      macronutrients: {
        carbs: 65,
        protein: 12,
        fat: 15
      },
      ingredients: ['파스타면', '토마토소스', '올리브오일', '파마산 치즈', '바질'],
      comment:
        '탄수화물 함량이 높은 식사입니다. 단백질이 부족하니 다음 식사에서는 단백질 섭취를 늘리는 것이 좋겠습니다.'
    }
  }
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
    color: personaColor
  }

  // 새 메시지 전송 기능
  const handleSendMessage = (content: string, attachments?: string[]) => {
    if (content.trim() === '' && (!attachments || attachments.length === 0)) return

    const newMsg: MessageType = {
      id: Date.now().toString(),
      content: content,
      senderId: currentUserId,
      receiverId: personaId,
      timestamp: new Date(),
      isRead: false,
      attachments
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
