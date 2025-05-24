import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, TrendingDown } from "lucide-react"

interface NutritionGoal {
  name: string
  current: number
  target: number
  unit: string
  status: "good" | "warning" | "danger"
  trend: "up" | "down" | "stable"
}

interface NutritionGoalsProps {
  goals: NutritionGoal[]
}

export function NutritionGoals({ goals }: NutritionGoalsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 dark:text-green-400"
      case "warning":
        return "text-yellow-600 dark:text-yellow-400"
      case "danger":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">양호</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">주의</Badge>
      case "danger":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">위험</Badge>
      default:
        return <Badge variant="outline">보통</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5" />
          영양소 목표 현황
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal, index) => {
            const percentage = Math.min((goal.current / goal.target) * 100, 100)

            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{goal.name}</span>
                    {getTrendIcon(goal.trend)}
                  </div>
                  {getStatusBadge(goal.status)}
                </div>

                <div className="space-y-2">
                  <Progress value={percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {goal.current.toFixed(1)} {goal.unit}
                    </span>
                    <span>
                      목표: {goal.target.toFixed(1)} {goal.unit}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${getStatusColor(goal.status)}`}>
                    {percentage.toFixed(1)}% 달성
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {goal.current < goal.target
                      ? `${(goal.target - goal.current).toFixed(1)}${goal.unit} 부족`
                      : goal.current > goal.target
                        ? `${(goal.current - goal.target).toFixed(1)}${goal.unit} 초과`
                        : "목표 달성!"}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* 전체 요약 */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">전체 목표 달성률</div>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {(
                goals.reduce((sum, goal) => sum + Math.min((goal.current / goal.target) * 100, 100), 0) / goals.length
              ).toFixed(1)}
              %
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {goals.filter((goal) => goal.status === "good").length}/{goals.length} 항목 양호
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
