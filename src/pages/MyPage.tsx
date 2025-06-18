import { CalorieCard } from '@/components/my/CalorieCard'
import { ChatAssistant } from '@/components/my/ChatAssistant'
import MealStack from '@/components/my/MealStack'
import { SupplementsCard } from '@/components/my/SupplementsCard'
import { WaterIntakeCard } from '@/components/my/WaterIntakeCard'
import { FadeIn } from '@/components/ui/pade-in'
import { AlignJustify, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function MyPage() {
  const navigate = useNavigate()
  const handleSettingsButtonClick = () => {
    navigate('/settings')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 mb-12 py-2 px-4 sm:p-4 lg:p-6">
      <FadeIn>
        {/* 헤더 */}
        <div className="my-2 flex items-center justify-between">
          <div className="text-lg font-semibold">Today's Diet</div>
          <div className='flex gap-2 items-center'>
            <div className="cursor-pointer">
              <Bell className='w-5 h-5' />
            </div>
            <div className="cursor-pointer" onClick={handleSettingsButtonClick}>
              <AlignJustify />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="w-full">
            <ChatAssistant />
          </div>

          <div className="w-full overflow-x-auto sm:overflow-visible">
            <MealStack />
          </div>

          <div className="w-full">
            <CalorieCard />
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <SupplementsCard />
            </div>

            <div className="w-full">
              <WaterIntakeCard />
            </div>
          </div>

          <div className="mb-10">오늘 걸음 수</div>
        </div>
      </FadeIn>
    </div>
  )
}
