import { MessageCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Avatar } from '../ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

export function ChatAssistant() {
  return (
    <Link to="/chat">
      <div className="flex justify-between items-center min-h-24 px-4 rounded-sm bg-white dark:bg-slate-800">
        <div className='flex gap-2'>
          <Avatar className="h-12 w-12 mr-3 border-2 border-white dark:border-gray-800">
            <AvatarImage src="/placeholder.png" alt="코치" />
            <AvatarFallback>코치</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3 text-black dark:text-white">회원님.. 지금 뭐 드시고 계세요..?</div>
        </div>

        <Button variant="default">
          <MessageCircle className="h-6 w-6" />
          알려주러가기
        </Button>
      </div>
    </Link>
  )
}
