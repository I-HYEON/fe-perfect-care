import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI 페르소나</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">대화하고 싶은 AI 페르소나를 선택하세요</p>
      </div>
      <Button variant="outline" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange-500"></span>
      </Button>
    </header>
  )
}
