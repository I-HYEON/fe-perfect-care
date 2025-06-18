import { AlignJustify } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function DashboardHeader() {
  const navigate = useNavigate()

  const handleSettingsButtonClick = () => {
    navigate('/settings')
  }

  return (
      <div className="flex justify-between items-center">
        <div className="text-left">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            Dashboard
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            나의 식습관을 한눈에 알아보세요
          </p>
        </div>
        <div className="cursor-pointer" onClick={handleSettingsButtonClick}>
          <AlignJustify className="h-6 w-6" />
        </div>
      </div>
  )
}
