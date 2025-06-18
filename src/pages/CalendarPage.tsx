import { MonthlyCalendar } from '@/components/calendar/monthly/MonthlyCalendar'
import { WeeklyCalendar } from '@/components/calendar/weekly/WeeklyCalendar'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/pade-in'
import { motion } from 'framer-motion'
import { AlignVerticalSpaceAround, CalendarDaysIcon } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

type CalendarMode = 'weekly' | 'monthly'

export default function CalendarPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const modeParam = searchParams.get('mode')
  const mode = modeParam === 'weekly' ? 'weekly' : 'monthly'

  // 모드 변경 함수
  const handleModeChange = (newMode: CalendarMode) => {
    setSearchParams({ mode: newMode })
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-2">
      <div className="max-w-7xl mx-auto">
        {/* 주/월 모드 토글탭 */}
        <FadeIn>
          {/* 헤더 */}
          <div className="flex items-center justify-between gap-2">
            <div className="text-lg font-semibold">Calendar</div>
            <div className="relative flex gap-1 p-1 bg-muted rounded-lg w-1/4">
              {/* 슬라이딩 배경 */}
              <motion.div
                className="absolute top-1 bottom-1 bg-background rounded-md shadow-sm border"
                style={{
                  width: 'calc(50% - 2px)'
                }}
                animate={{
                  left: mode === 'weekly' ? '4px' : 'calc(50% + 2px)'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
              />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleModeChange('weekly')}
                className={`relative z-10 w-1/2 px-4 py-2 transition-colors duration-200 ${
                  mode === 'weekly'
                    ? 'text-foreground hover:bg-transparent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
                }`}
              >
                <AlignVerticalSpaceAround />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleModeChange('monthly')}
                className={`relative z-10 w-1/2 px-4 py-2 transition-colors duration-200 ${
                  mode === 'monthly'
                    ? 'text-foreground hover:bg-transparent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
                }`}
              >
                <CalendarDaysIcon />
              </Button>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="w-full">
            {mode === 'weekly' ? (
              <WeeklyCalendar />
            ) : (
              // <div className="flex items-center justify-center h-96 text-2xl md:text-3xl lg:text-4xl font-medium">
              <MonthlyCalendar />
              // </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
