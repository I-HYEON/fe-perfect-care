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
          <Avatar className="h-12 w-12 mr-1 border-2 border-white dark:border-gray-800">
            <AvatarImage src="/placeholder.png" alt="코치" />
            <AvatarFallback>코치</AvatarFallback>
          </Avatar>
          <div className='flex flex-col justify-center text-black text-left dark:text-white text-xs sm:text-sm'>
            <div>회원님 오늘 뭐드시나요?</div>
            <div className='text-muted-foreground'>1분 전</div>
          </div>
          
        </div>

        <Button variant="default">
          <MessageCircle className="h-6 w-6" />
          대화
        </Button>
      </div>
    </Link>
  )
}
