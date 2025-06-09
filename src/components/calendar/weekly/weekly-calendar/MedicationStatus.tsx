import { Pill } from "lucide-react"

interface MedicationStatusProps {
  medication: {
    taken: boolean
    total: number
    completed: number
  }
}

export function MedicationStatus({ medication }: MedicationStatusProps) {
  const percentage = (medication.completed / medication.total) * 100

  return (
    <div className="flex items-center gap-2">
      <Pill
        className={`h-4 w-4 ${
          medication.taken ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
        }`}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">복약</span>
          <span className="font-medium">
            {medication.completed}/{medication.total}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 mt-1">
          <div
            className={`h-1.5 rounded-full transition-all ${
              percentage === 100 ? "bg-green-500" : percentage > 50 ? "bg-orange-500" : "bg-red-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
