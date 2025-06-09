import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns'
import React from 'react'

import { ko } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { koreanHolidays } from '@/data/korean-holidays'
import { type MealData, mealIcons, mealColors } from '@/types/calendar/type'

interface CustomCalendarProps {
  dietData: Record<string, MealData[]>
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  activeDate: Date | undefined
  setActiveDate: (date: Date | undefined) => void
  onDateClick: (date: Date) => void
}

export function CustomCalendar({
  dietData,
  selectedDate,
  // setSelectedDate,
  activeDate,
  // setActiveDate,
  onDateClick
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const isHoliday = (date: Date) => {
    return koreanHolidays.some((holiday) => isSameDay(holiday.date, date))
  }

  const getDietData = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    return dietData[dateKey] || []
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // 달력 시작 요일 계산 (일요일 = 0)
  const startDay = getDay(monthStart)
  const emptyDays = Array.from({ length: startDay }, (_, i) => i)

  const weekDays = ['일', '월', '화', '수', '목', '금', '토']

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const renderDayContent = (date: Date) => {
    const meals = getDietData(date)
    const isActive = activeDate && isSameDay(activeDate, date)
    const isSelected = selectedDate && isSameDay(selectedDate, date)
    const holiday = isHoliday(date)
    const isToday = isSameDay(date, new Date())
    const mealTypes = meals.map((meal) => meal.type)

    return (
      <button
        onClick={() => onDateClick(date)}
        className={`
          relative w-full h-24 md:h-28 p-1 rounded-md transition-colors
          hover:bg-accent hover:text-accent-foreground
          focus:bg-accent focus:text-accent-foreground
          ${isSelected ? 'bg-blue-200 text-primary dark:bg-primary dark:text-primary-foreground' : ''}
          ${isToday ? 'bg-accent text-accent-foreground' : ''}
          ${isActive ? 'ring-1 ring-blue-500 dark:ring-blue-400' : ''}
        `}
      >
        <div className="flex flex-col items-start justify-start h-full">
          <span
            className={`text-sm font-medium ${
              holiday ? 'text-red-600 dark:text-red-400' : ''
            } ${isActive ? 'font-bold' : ''}`}
          >
            {date.getDate()}
          </span>
          {meals.length > 0 && (
            <div className="flex gap-0.5 mt-1">
              {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => {
                if (mealTypes.includes(mealType as MealData['type'])) {
                  const IconComponent = mealIcons[mealType as keyof typeof mealIcons]
                  return (
                    <IconComponent
                      key={mealType}
                      className={`w-3 h-3 ${mealColors[mealType as keyof typeof mealColors]}`}
                    />
                  )
                }
                return null
              })}
            </div>
          )}
        </div>
      </button>
    )
  }

  return (
    <div className="rounded-md border-none shadow-none w-full p-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="sm" onClick={goToPreviousMonth} className="h-7 w-7 p-0">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h2 className="text-sm font-medium dark:text-white">
          {format(currentMonth, 'yyyy년 MM월', { locale: ko })}
        </h2>

        <Button variant="ghost" size="sm" onClick={goToNextMonth} className="h-7 w-7 p-0">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-normal p-2 ${
              index === 0
                ? 'text-red-500'
                : index === 6
                  ? 'text-blue-500'
                  : 'text-muted-foreground dark:text-gray-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 달력 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {/* 빈 셀들 */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="h-14 sm:h-16" />
        ))}

        {/* 날짜들 */}
        {monthDays.map((date) => (
          <div key={date.toISOString()}>{renderDayContent(date)}</div>
        ))}
      </div>
    </div>
  )
}
