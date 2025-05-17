import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'

const me = {
  id: 1,
  name: "김와우",
  avatar: "여기뭐지",
  description: "wowowow"
}

export default function MeItem() {

  // 이니셜 생성 (이름의 첫 글자)
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <Link to={`/me`}>
      <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
        {/* 아바타 */}
        <Avatar className="h-12 w-12 mr-3 border-2 border-white dark:border-gray-800">
          <AvatarImage src={me.avatar || '/placeholder.svg'} alt={me.name} />
          <AvatarFallback>
            {getInitials(me.name)}
          </AvatarFallback>
        </Avatar>

        {/* 내 정보 */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-gray-900 dark:text-white truncate">{me.name}</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
              {me.description}
            </div>
          </div>
        </div>
      </div>
      <hr className='text-slate-200'/>
    </Link>
  )
}
