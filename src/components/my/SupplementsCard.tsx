import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pill, Plus, Check } from "lucide-react"
import { useState } from "react"

export function SupplementsCard() {
  const initialSupplements = [
    { id: 1, name: "비타민 D", taken: false },
    { id: 2, name: "오메가3", taken: false },
    { id: 3, name: "유산균", taken: false },
  ]

  const [supplements, setSupplements] = useState(initialSupplements)

  const toggleSupplement = (id: number) => {
    setSupplements(supplements.map((supp) => (supp.id === id ? { ...supp, taken: !supp.taken } : supp)))
  }

  return (
    <Card className="border-none shadow-none bg-white dark:bg-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Pill className="h-5 w-5 text-purple-500" />
          영양제
        </h3>
        <Button variant="ghost" size="sm" className="h-8 rounded-full">
          <Plus className="h-4 w-4 mr-1" />
          추가
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {supplements.map((supplement) => (
            <div
              key={supplement.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="font-medium">{supplement.name}</span>
              <button
                onClick={() => toggleSupplement(supplement.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  supplement.taken
                    ? "bg-purple-500 text-white shadow-lg shadow-purple-200 dark:shadow-purple-900/30"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                }`}
                aria-pressed={supplement.taken}
                aria-label={`${supplement.name} ${supplement.taken ? "복용 완료" : "복용 전"}`}
              >
                {supplement.taken ? (
                  <div className="relative">
                    <Pill className="h-5 w-5" />
                    <Check className="h-3 w-3 absolute -bottom-1 -right-1 bg-white text-purple-500 rounded-full" />
                  </div>
                ) : (
                  <Pill className="h-5 w-5" />
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-slate-500">
          {supplements.filter((s) => s.taken).length === 0
            ? "오늘 복용한 영양제가 없습니다"
            : `${supplements.filter((s) => s.taken).length}/${supplements.length}개 복용 완료`}
        </div>
      </CardContent>
    </Card>
  )
}
