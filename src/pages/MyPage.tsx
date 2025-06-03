import { CalorieCard } from '@/components/my/CalorieCard'
import { ChatAssistant } from '@/components/my/ChatAssistant'
import MealStack from '@/components/my/MealStack'
import { SupplementsCard } from '@/components/my/SupplementsCard'
import { WaterIntakeCard } from '@/components/my/WaterIntakeCard'

export default function MyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 mb-12">
      {/* 헤더 */}
      <div className="my-8">
        <div className="text-xl font-bold text-gray-900 dark:text-white">안녕하세요, 회원님!</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">오늘도 건강한 하루되세요</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className='w-full'><ChatAssistant/></div>

        <div className='w-full overflow-x-auto sm:overflow-visible'><MealStack/></div>

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
        
        <div className="bg-red-200">오늘 걸음 수</div>
      </div>
    </div>
  )
}
