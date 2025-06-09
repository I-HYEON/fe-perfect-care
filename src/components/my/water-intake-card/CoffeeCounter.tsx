import { useState } from 'react'
import { Coffee, Plus, Minus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export function CoffeeCounter() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  const decrement = () => {
    setCount((prev) => Math.max(0, prev - 1))
  }

  const getMessage = () => {
    if (count === 0) return '아직 커피를 마시지 않았어요'
    if (count <= 2) return '적당한 커피 섭취량이에요! ☕'
    if (count <= 4) return '커피를 좀 많이 마셨네요!'
    return '오늘 커피를 너무 많이 마셨어요! 😵'
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center gap-2 group hover:bg-amber-50 p-2 rounded-lg transition-colors"
      >
        <div className="relative">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
            <Coffee className="h-5 w-5 text-amber-800" />
          </div>
          {count > 0 && (
            <div className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {count}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-amber-800">커피</span>
          <span className="text-xs text-amber-600">{count}잔</span>
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-800">
              <Coffee className="h-5 w-5" /> 커피 섭취량
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6 py-4">
            <div className="relative">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                <Coffee className="h-12 w-12 text-amber-800" />
              </div>
              {count > 0 && (
                <div className="absolute -top-2 -right-2 bg-amber-600 text-white text-lg rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {count}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={decrement}
                className="h-12 w-12 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors"
                disabled={count === 0}
              >
                <Minus className="h-6 w-6 text-amber-800" />
              </button>

              <span className="text-3xl font-bold w-16 text-center text-amber-800">{count}</span>

              <button
                onClick={increment}
                className="h-12 w-12 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors"
              >
                <Plus className="h-6 w-6 text-amber-800" />
              </button>
            </div>

            <div className="text-sm text-amber-700 text-center bg-amber-50 p-3 rounded-lg">
              {getMessage()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
