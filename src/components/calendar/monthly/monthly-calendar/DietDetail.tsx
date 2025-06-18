import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { type MealData, mealIcons, mealLabels, mealColors } from '@/types/calendar/type'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { DialogDescription } from '@radix-ui/react-dialog'

interface DietDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate: Date | undefined
  meals: MealData[]
  isMobile: boolean
}

export function DietDetail({ open, onOpenChange, selectedDate, meals, isMobile }: DietDetailProps) {
  const formattedDate = selectedDate
    ? format(selectedDate, 'yyyy년 MM월 dd일 (EEEE)', { locale: ko })
    : ''
  const totalCalories = meals.reduce((total, meal) => total + (meal.calories || 0), 0)

  const ModalContent = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm mb-2 dark:text-white">{formattedDate}</h3>
        {meals.length > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="font-medium dark:text-white">총 칼로리</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {totalCalories} kcal
              </span>
            </div>

            <div className="space-y-3">
              {meals
                .sort((a, b) => {
                  const order = { breakfast: 0, lunch: 1, dinner: 2, snack: 3 }
                  return order[a.type] - order[b.type]
                })
                .map((meal) => {
                  const IconComponent = mealIcons[meal.type]
                  return (
                    <div key={meal.id} className="p-3 border dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className={`w-4 h-4 ${mealColors[meal.type]}`} />
                          <span className="font-medium dark:text-white">
                            {mealLabels[meal.type]}
                          </span>
                          {meal.time && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ({meal.time})
                            </span>
                          )}
                        </div>
                        {meal.calories && (
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {meal.calories} kcal
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {meal.foods.map((food, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {food}
                          </Badge>
                        ))}
                      </div>
                      {meal.notes && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          {meal.notes}
                        </p>
                      )}
                    </div>
                  )
                })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CalendarDays className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">등록된 식단이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="dark:bg-gray-900 dark:border-gray-800">
          <DrawerHeader>
            <DrawerTitle className="dark:text-white">식단 상세</DrawerTitle>
            <DrawerDescription className="dark:text-gray-400 text-sm">선택한 날짜의 식단 정보를 확인하세요</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <ModalContent />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md dark:bg-gray-900 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="dark:text-white">식단 상세</DialogTitle>
          <DialogDescription className="dark:text-gray-400 text-sm">선택한 식단의 상세 정보를 확인하세요.</DialogDescription>
        </DialogHeader>
        <ModalContent />
      </DialogContent>
    </Dialog>
  )
}
