import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Droplets } from 'lucide-react'
import { useState } from 'react'

export function WaterIntakeCard() {
  const [waterGlasses, setWaterGlasses] = useState(0)
  const totalGlasses = 8

  const handleWaterClick = (glassIndex: number) => {
    setWaterGlasses(glassIndex + 1)
  }

  const percentage = (waterGlasses / totalGlasses) * 100

  const getMessage = () => {
    if (percentage === 0) return '아직 물을 마시지 않았어요'
    if (percentage < 50) return '더 많은 물을 마셔주세요!'
    if (percentage < 100) return '잘하고 있어요!'
    return '오늘 목표 달성! 💧'
  }

  return (
    <Card className="border-none shadow-none bg-white dark:bg-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />물 섭취량
        </h3>
        <span className="text-sm font-medium">
          {waterGlasses}/{totalGlasses}잔
        </span>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {Array.from({ length: totalGlasses }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleWaterClick(index)}
              aria-label={`물 ${index + 1}잔 ${index < waterGlasses ? '마심' : '안 마심'}`}
              className="transition-all duration-200 shadow-sm"
              style={{
                width: '2.5rem',
                height: '2.5rem',
                clipPath: 'polygon(10% 0%, 90% 0%, 75% 100%, 25% 100%)', // 컵 모양
                backgroundColor: index < waterGlasses ? '#3B82F6' : '#F1F5F9', // Tailwind blue-500 or slate-100
                border: '2px solid',
                borderColor: index < waterGlasses ? '#3B82F6' : '#E2E8F0', // blue-500 or slate-200
                color: index < waterGlasses ? '#FFFFFF' : '#64748B', // white or slate-500
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem', // text-sm
                fontWeight: 500
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="text-center text-sm text-slate-500 dark:text-slate-400 mb-2">{getMessage()}</div>

        <hr className='mb-4'/>

        <div className='text-left flex flex-col gap-2'>
            <div className='flex gap-2 items-center'><div className='bg-amber-800 w-8 h-12 rounded-lg'></div>Coffe UI</div>
            <div className='flex gap-2 items-center'><div className='bg-slate-800 w-8 h-12 rounded-lg'></div>Drink UI</div>
        </div>
      </CardContent>
    </Card>
  )
}
