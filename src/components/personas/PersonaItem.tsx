import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'

export interface Persona {
  id: number
  name: string
  description: string
  avatar: string
  color: 'orange' | 'blue' | 'slate'
  badge?: string
  messageCount: number
}

interface PersonaItemProps {
  persona: Persona
}

export default function PersonaItem({ persona }: PersonaItemProps) {
  // 색상에 따른 스타일 매핑
  const colorStyles = {
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    slate: 'bg-slate-100 text-slate-800 border-slate-200'
  }

  // 아바타 배경색 매핑
  const avatarBgColor = {
    orange: 'bg-orange-200',
    blue: 'bg-blue-200',
    slate: 'bg-slate-200'
  }

  // 이니셜 생성 (이름의 첫 글자)
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <Link to={`/persona-profile/${persona.id}`}>
      <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
        {/* 아바타 */}
        <Avatar className="h-12 w-12 mr-3 border-2 border-white dark:border-gray-800">
          <AvatarImage src={persona.avatar || '/placeholder.svg'} alt={persona.name} />
          <AvatarFallback className={avatarBgColor[persona.color]}>
            {getInitials(persona.name)}
          </AvatarFallback>
        </Avatar>

        {/* 페르소나 정보 */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          {/* 배지 (선택적) */}
          {persona.badge && (
            <Badge className={`${colorStyles[persona.color]}`} variant="outline">
              {persona.badge}
            </Badge>
          )}
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-gray-900 dark:text-white truncate">{persona.name}</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
              {persona.description}
            </div>
          </div>
        </div>
      </div>
      <hr className='text-slate-200'/>
    </Link>
  )
}
