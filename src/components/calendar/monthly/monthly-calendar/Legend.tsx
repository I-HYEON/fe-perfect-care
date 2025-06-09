import { Badge } from '@/components/ui/badge'
import { Flag, Coffee, Utensils, Moon, Apple } from 'lucide-react'

export function Legend() {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      <Badge variant="outline" className="bg-red-50 dark:bg-red-950 dark:border-red-800">
        <Flag className="w-3 h-3 text-red-500 dark:text-red-400 mr-1" />
        공휴일
      </Badge>
      <Badge variant="outline" className="bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
        <Coffee className="w-3 h-3 text-orange-500 dark:text-orange-400 mr-1" />
        아침
      </Badge>
      <Badge variant="outline" className="bg-green-50 dark:bg-green-950 dark:border-green-800">
        <Utensils className="w-3 h-3 text-green-500 dark:text-green-400 mr-1" />
        점심
      </Badge>
      <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <Moon className="w-3 h-3 text-blue-500 dark:text-blue-400 mr-1" />
        저녁
      </Badge>
      <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950 dark:border-purple-800">
        <Apple className="w-3 h-3 text-purple-500 dark:text-purple-400 mr-1" />
        간식
      </Badge>
    </div>
  )
}
