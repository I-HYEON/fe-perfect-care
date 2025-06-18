import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell } from 'recharts'
import type { MacroNutrients } from '@/types/nutrition/type'
import { Check } from 'lucide-react'

interface MacronutrientsChartProps {
  macronutrients: MacroNutrients
  carbPercentage: number
  proteinPercentage: number
  fatPercentage: number
}

export function MacronutrientsChart({
  macronutrients,
  carbPercentage,
  proteinPercentage,
  fatPercentage
}: MacronutrientsChartProps) {
  const data = [
    {
      name: '탄수화물',
      value: carbPercentage,
      color: '#B84EF5',
      amount: `${macronutrients.carbohydrates.min_value}-${macronutrients.carbohydrates.max_value}${macronutrients.carbohydrates.unit}`
    },
    {
      name: '단백질',
      value: proteinPercentage,
      color: '#00FAA5',
      amount: `${macronutrients.protein.min_value}-${macronutrients.protein.max_value}${macronutrients.protein.unit}`
    },
    {
      name: '지방',
      value: fatPercentage,
      color: '#FF6A00',
      amount: `${macronutrients.fat.min_value}-${macronutrients.fat.max_value}${macronutrients.fat.unit}`
    }
  ]

  return (
    <Card className="h-full bg-white dark:bg-gray-800 border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="h-5 w-5" />
          탄단지 영양소 비율
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          {/* 파이 차트 */}
          <ChartContainer
            config={
              {
                // carbohydrates: { label: '탄수화물', color: '#7FC8F8' },
                // protein: { label: '단백질', color: '#FF8AAE' },
                // fat: { label: '지방', color: '#A1E3D8' }
              }
            }
            className="w-full h-[160px] mx-auto flex justify-center items-center"
          >
            <PieChart width={210} height={140}>
              <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>

          {/* 범례 및 상세 정보 */}
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {item.value.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.amount}</div>
                </div>
              </div>
            ))}

            {/* 식이섬유 정보 */}
            {macronutrients.fiber && (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">식이섬유</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {macronutrients.fiber.min_value}-{macronutrients.fiber.max_value}
                    {macronutrients.fiber.unit}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
