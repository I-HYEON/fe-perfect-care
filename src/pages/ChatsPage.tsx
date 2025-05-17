import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'

// 더미 대화방 데이터
const chatRooms = [
  {
    id: 1,
    personaId: 3,
    personaName: '김복지',
    avatar: '/placeholder1.png',
    lastMessage: '오늘은 이제 그만드셔도 될 것 같아요요',
    timestamp: '방금 전',
    unread: 2
  },
  {
    id: 2,
    personaId: 1,
    personaName: '이친절',
    avatar: '/placeholder2.png',
    lastMessage: '오늘 혈압약 아직 안드셨죠? 빨리 드세요',
    timestamp: '10분 전',
    unread: 0
  },
  {
    id: 3,
    personaId: 7,
    personaName: '최요리',
    avatar: '/placeholder3.png',
    lastMessage: '파스타 소스에 바질과 올리브 오일을 넣으면 풍미가 더 좋아집니다.',
    timestamp: '1시간 전',
    unread: 0
  }
]

export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // 검색 기능
  const filteredChatRooms = chatRooms.filter(
    (room) =>
      room.personaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 이니셜 생성 (이름의 첫 글자)
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 mb-12">
      <div className="mx-auto px-4 py-4">
        {/* 헤더 */}
        <div className="mb-4">
          <div className="text-xl font-bold text-gray-900 dark:text-white">대화</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">최근 대화 목록</div>
        </div>

        {/* 검색 바 */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="대화 검색..."
            className="pl-10 bg-white dark:bg-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 대화방 목록 */}
        <div className="space-y-1">
          {filteredChatRooms.length > 0 ? (
            filteredChatRooms.map((room) => (
              <Link key={room.id} to={`/chat/${room.personaId}`}>
                <div className="flex gap-2 items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  {/* 아바타 */}
                  <div className="relative">
                    <Avatar className="h-12 w-12 mr-3 border-2 border-white dark:border-gray-800">
                      <AvatarImage src={room.avatar || '/placeholder.svg'} alt={room.personaName} />
                      <AvatarFallback>{getInitials(room.personaName)}</AvatarFallback>
                    </Avatar>
                    {room.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {room.unread}
                      </span>
                    )}
                  </div>

                  {/* 대화방 정보 */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {room.personaName}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                        {room.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {room.lastMessage}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-2">검색 결과가 없습니다</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">다른 키워드로 검색해보세요</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
