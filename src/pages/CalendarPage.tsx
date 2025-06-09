import { WeeklyCalendar } from '@/components/calendar/weekly/WeeklyCalendar'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/pade-in'
import { useState } from 'react'

type CalendarMode = 'weekly' | 'monthly'

export default function CalendarPage() {
  const [mode, setMode] = useState<CalendarMode>('weekly')

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 주/월 모드 토글탭 */}
        <FadeIn>
          <div className="flex gap-1 p-1 bg-muted rounded-lg w-full mb-4">
            <Button
              variant={mode === 'weekly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('weekly')}
              className="w-1/2 px-4 py-2"
            >
              Weekly
            </Button>
            <Button
              variant={mode === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('monthly')}
              className="w-1/2 px-4 py-2"
            >
              Monthly
            </Button>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="w-full">
            {mode === 'weekly' ? (
              <WeeklyCalendar />
            ) : (
              <div className="flex items-center justify-center h-96 text-2xl md:text-3xl lg:text-4xl font-medium">
                Monthly Canlendar UI
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
