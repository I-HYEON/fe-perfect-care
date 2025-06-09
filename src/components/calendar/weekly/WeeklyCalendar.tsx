import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WeekData } from './type'
import { generateWeekData } from '@/utils/generateWeekData'
import { WeeklyDayCard } from './weekly-calendar/WeeklyDayCard'

const weeklyData: WeekData[] = [
  generateWeekData(1, '2024-01-01'),
  generateWeekData(2, '2024-01-08'),
  generateWeekData(3, '2024-01-15'),
  generateWeekData(4, '2024-01-22'),
  generateWeekData(5, '2024-01-29')
]

export function WeeklyCalendar() {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(2) // 3주차부터 시작
  const currentWeek = weeklyData[currentWeekIndex]
  const today = new Date().toISOString().split('T')[0]

  const goToPreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    }
  }

  const goToNextWeek = () => {
    if (currentWeekIndex < weeklyData.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    }
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return `${start.getMonth() + 1}월 ${start.getDate()}일 - ${end.getMonth() + 1}월 ${end.getDate()}일`
  }

  return (
    <div className="space-y-4 my-8">
      {/* Week Header with Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousWeek}
          disabled={currentWeekIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex justify-center items-center gap-8">
          <div className="text-center">
            <div className="text-sm md:text-xl font-semibold">
              {currentWeek.year}년 {currentWeek.month}월 {currentWeek.weekNumber}주차
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              {formatDateRange(currentWeek.startDate, currentWeek.endDate)}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNextWeek}
          disabled={currentWeekIndex === weeklyData.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Weekly Summary */}
      <div className="mt-2 p-4 bg-muted/50 rounded-xs">
        {/* <div className="text-sm md:text-lg mb-3">Weekly Summary</div> */}
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-sm md:text-lg font-bold text-orange-600 dark:text-orange-400">
              {currentWeek.data
                .reduce((sum, day) => sum + day.nutrition.calories, 0)
                .toLocaleString()}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">총 칼로리</div>
          </div>
          <div className="text-center">
            <div className="text-sm md:text-lg font-bold text-purple-600 dark:text-purple-400">
              {currentWeek.data.reduce((sum, day) => sum + day.nutrition.carbs, 0)}g
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">총 탄수화물</div>
          </div>
          <div className="text-center">
            <div className="text-sm md:text-lg font-bold text-purple-600 dark:text-purple-400">
              {currentWeek.data.reduce((sum, day) => sum + day.nutrition.protein, 0)}g
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">총 단백질</div>
          </div>
          <div className="text-center">
            <div className="text-sm md:text-lg font-bold text-green-600 dark:text-green-400">
              {Math.round(
                (currentWeek.data.reduce((sum, day) => sum + day.medication.completed, 0) /
                  currentWeek.data.reduce((sum, day) => sum + day.medication.total, 0)) *
                  100
              )}
              %
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">복약 준수율</div>
          </div>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {currentWeek.data.map((dayData) => (
          <WeeklyDayCard key={dayData.id} data={dayData} isToday={dayData.date === today} />
        ))}
      </div>
    </div>
  )
}
