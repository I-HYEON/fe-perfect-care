import { Badge } from "@/components/ui/badge"

interface DrinkCardProps {
  drink: {
    id: string
    name: string
    time: string
    calories: number
    type: "coffee" | "alcohol" | "beverage"
    memo?: string
  }
}

export function DrinkCard({ drink }: DrinkCardProps) {
  const getTypeInfo = (type: string) => {
    switch (type) {
      case "coffee":
        return {
          emoji: "☕",
          color: "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-300",
          label: "커피",
        }
      case "alcohol":
        return {
          emoji: "🍷",
          color: "bg-purple-50 text-purple-700 dark:bg-purple-950/20 dark:text-purple-300",
          label: "주류",
        }
      default:
        return {
          emoji: "🥤",
          color: "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-300",
          label: "음료",
        }
    }
  }

  const typeInfo = getTypeInfo(drink.type)

  return (
    <div className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${typeInfo.color} flex items-center justify-center text-lg`}>
          {typeInfo.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm truncate">{drink.name}</h4>
            <Badge
              variant="secondary"
              className="rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-xs px-2 py-0.5"
            >
              {typeInfo.label}
            </Badge>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>{drink.time}</span>
            <span>{drink.calories} kcal</span>
          </div>
        </div>
      </div>
    </div>
  )
}
