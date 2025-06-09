import { useState } from 'react'
import { Plus, Minus, CupSoda } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export function DrinkCounter() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  const decrement = () => {
    setCount((prev) => Math.max(0, prev - 1))
  }

  const getMessage = () => {
    if (count === 0) return '아직 음료를 마시지 않았어요'
    if (count <= 2) return '시원한 음료로 기분 전환! 🥤'
    if (count <= 4) return '음료를 좀 많이 마셨네요!'
    return '당분 섭취를 조심하세요! 😅'
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center gap-2 group hover:bg-sky-50 p-2 rounded-lg transition-colors"
      >
        <div className="relative">
          <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center group-hover:bg-sky-200 transition-colors">
            <CupSoda className="h-5 w-5 text-sky-600" />
          </div>
          {count > 0 && (
            <div className="absolute -top-1 -right-1 bg-sky-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {count}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-sky-800">음료</span>
          <span className="text-xs text-sky-600">{count}잔</span>
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sky-800">
              <CupSoda className="h-5 w-5" /> 음료 섭취량
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6 py-4">
            <div className="relative">
              <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center">
                <CupSoda className="h-12 w-12 text-sky-600" />
              </div>
              {count > 0 && (
                <div className="absolute -top-2 -right-2 bg-sky-600 text-white text-lg rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {count}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={decrement}
                className="h-12 w-12 rounded-full bg-sky-100 hover:bg-sky-200 flex items-center justify-center transition-colors"
                disabled={count === 0}
              >
                <Minus className="h-6 w-6 text-sky-800" />
              </button>

              <span className="text-3xl font-bold w-16 text-center text-sky-800">{count}</span>

              <button
                onClick={increment}
                className="h-12 w-12 rounded-full bg-sky-100 hover:bg-sky-200 flex items-center justify-center transition-colors"
              >
                <Plus className="h-6 w-6 text-sky-800" />
              </button>
            </div>

            <div className="text-sm text-sky-700 text-center bg-sky-50 p-3 rounded-lg">
              {getMessage()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
