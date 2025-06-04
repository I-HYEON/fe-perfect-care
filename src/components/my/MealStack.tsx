import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import burgerImg from "@/assets/burger.jpeg"
import pastaImg from "@/assets/pasta.jpg"
import { useState } from "react"
import BottomSheet from "./BottomSheet"

export default function MealStack() {
  const photos = [
    {
      id: 1,
      src: burgerImg,
      alt: "Landscape photo 1",
    },
    {
      id: 2,
      src: pastaImg,
      alt: "Portrait photo 2",
    },
    {
      id: 3,
      src: burgerImg,
      alt: "Street photo 3",
    }
  ]

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 바텀 시트 열기
  const openSheet = () => {
    setIsMenuOpen(true)
    document.body.style.overflow = "hidden" // 배경 스크롤 방지
  }

  return (
    <div className="flex items-center justify-center bg-white dark:bg-slate-900 p-8">
      <div className="relative">
        <div className="text-center mb-4 text-gray-800 dark:text-gray-200">Today's meals?<span className="text-muted-foreground"> ({photos.length})</span></div>

        <div className="flex items-center space-x-[-40px]">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
              style={{
                transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 6 + 2)}deg)`,
                zIndex: photos.length - index,
              }}
            >
              <div className="relative w-40 h-48 bg-white dark:bg-black p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="object-cover rounded-md" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
              </div>
            </div>
          ))}

          {/* Add Photo Button */}
          <div
            className="relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20"
            style={{
              transform: `rotate(${Math.random() * 6 - 3}deg)`,
              zIndex: 1,
            }}
          >
            <Button
              variant="outline"
              onClick={openSheet}
              className="w-40 h-48 bg-white border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors duration-300">
                <Plus className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-gray-700">Add Meals</span>
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && <BottomSheet isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}/>}
    </div>
  )
}
