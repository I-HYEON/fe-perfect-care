import * as React from 'react'
import { format } from 'date-fns'
import { sampleDietData } from '@/data/sample-diet-data'
import { useMobile } from '@/hooks/useMobile'
import { DietData } from '@/types/calendar/type'
import { DietDetail } from './monthly-calendar/DietDetail'
import { CustomCalendar } from './monthly-calendar/CustomCalendar'

export function MonthlyCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [activeDate, setActiveDate] = React.useState<Date | undefined>()
  const [modalOpen, setModalOpen] = React.useState(false)
  const [dietData, setDietData] = React.useState<DietData>({})
  const isMobile = useMobile()

  // 샘플 식단 데이터 로드
  React.useEffect(() => {
    setDietData(sampleDietData)
  }, [])

  const handleDateClick = (date: Date) => {
    if (activeDate && isSameDay(activeDate, date)) {
      // 이미 활성화된 날짜를 다시 클릭하면 모달 열기
      setModalOpen(true)
    } else {
      // 새로운 날짜 활성화
      setActiveDate(date)
      setSelectedDate(date)
    }
  }

  const getDietData = (date: Date | undefined) => {
    if (!date) return []
    const dateKey = format(date, 'yyyy-MM-dd')
    return dietData[dateKey] || []
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 border-none">
      <div>
        <CustomCalendar
          dietData={dietData}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          onDateClick={handleDateClick}
        />
      </div>

      <DietDetail
        open={modalOpen}
        onOpenChange={setModalOpen}
        selectedDate={activeDate}
        meals={getDietData(activeDate)}
        isMobile={isMobile}
      />
    </div>
  )
}

// isSameDay 함수 추가 (date-fns에서 가져오지만 여기서는 직접 구현)
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}
