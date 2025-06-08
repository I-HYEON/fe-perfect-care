import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Scale, Target, Smile, Plus, Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'

export function UserInfoCard() {
  const [weightVisible, setWeightVisible] = useState(false)
  const user = useAuthStore((state) => state.user)

  return (
    <Card className="border-none shadow-none py-4 bg-white dark:bg-slate-800 flex flex-col gap-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="font-medium">나의 정보</div>
        <Button variant="ghost" size="sm" className="h-4 w-4 p-0 rounded-full">
          <Plus className="h-4 w-4" />
          <span className="sr-only">설정</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full hidden sm:block">
              <Smile className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-left">
              <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400">닉네임</div>
              <div className="text-sm md:text-xl font-semibold">{user?.name}</div>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full hidden sm:block">
              <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-left">
              <div className="flex gap-2 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                체중
                {weightVisible ? (
                  <Eye className="h-4 w-4 cursor-pointer" onClick={() => setWeightVisible(false)} />
                ) : (
                  <EyeClosed
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => setWeightVisible(true)}
                  />
                )}
              </div>
              <div className="text-sm md:text-xl font-semibold">{weightVisible ? '80kg' : '-'}</div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex items-center gap-3">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full hidden sm:block">
              <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-left">
              <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                목표 칼로리
              </div>
              <div className="text-sm md:text-xl font-semibold">1,800</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
