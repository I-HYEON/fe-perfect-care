import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Persona } from '@/components/personas/PersonaItem'
import PersonaList from '@/components/personas/PersonasList'
import MeItem from '@/components/personas/MeItem'

// 더미 데이터: 페르소나 목록
const personas: Persona[] = [
  {
    id: 1,
    name: '박창배',
    description: '오늘 하루도 화이팅!',
    avatar: '/placeholder.png',
    color: 'orange',
    messageCount: 1243,
    badge: 'best'
  },
  {
    id: 2,
    name: '이퍼펙',
    description: '운동은 매일매일...',
    avatar: '/placeholder1.png',
    color: 'blue',
    messageCount: 856,
    badge: 'new'
  },
  {
    id: 3,
    name: '김운동',
    description: '영양, 운동, 건강',
    avatar: '/placeholder2.png',
    color: 'slate',
    messageCount: 2156,
    badge: 'recomend'
  },
  {
    id: 4,
    name: '이하이',
    description: '휴가 중...🐳',
    avatar: '/placeholder3.png',
    color: 'slate',
    messageCount: 732
  }
]

export default function PersonasPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // 검색 기능
  const filteredPersonas = personas.filter(
    (persona) =>
      persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 mb-12">
      <div className="mx-auto px-4 py-4">
        {/* 헤더 */}
        <div className="mb-4 text-left">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            <span className="text-amber-400">P</span>erfect{' '}
            <span className="text-orange-600">C</span>are
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">당신의 건강을 책임지는</div>
        </div>

        {/* 검색 바 */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="케어메이트 검색..."
            className="pl-10 bg-white text-sm dark:bg-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 내 프로필 */}
        <div className='mb-4'>
          <div className='text-xs text-left text-muted-foreground'>My profile</div>
          <MeItem />
        </div>

        {/* 페르소나 목록 */}
        <div className='mb-4'>
          <div className='text-xs text-left text-muted-foreground'>Care mate</div>
        <PersonaList personas={filteredPersonas} />
        </div>
      </div>
    </main>
  )
}
