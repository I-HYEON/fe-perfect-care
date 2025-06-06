import { CalorieCard } from '@/components/my/CalorieCard'
import { ChatAssistant } from '@/components/my/ChatAssistant'
import MealStack from '@/components/my/MealStack'
import { SupplementsCard } from '@/components/my/SupplementsCard'
import { WaterIntakeCard } from '@/components/my/WaterIntakeCard'
import { FadeIn } from '@/components/ui/pade-in'
import { useAuthStore } from '@/stores/useAuthStore'

export default function MyPage() {
  const user = useAuthStore((state) => state.user)
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 mb-12 p-4 sm:p-6 lg:p-8">
      <FadeIn>
        {/* 헤더 */}
        <div className="my-4">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            안녕하세요, {user?.name?.slice(1, 3) || '회원'}님!
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">오늘도 건강한 하루되세요</div>
        </div>

        <div className="flex flex-col mt-4 space-y-4">
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

          <div className="bg-red-200">오늘 걸음 수</div>
        </div>
      </FadeIn>
    </div>
  )
}
