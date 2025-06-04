import type React from "react"

import { useRef, useEffect } from "react"
import { X, Home, Settings, User, Bell, Search, Pencil, ForkKnife } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BottomSheetProps {
    isOpen: boolean,
    setIsOpen: (isOpen:boolean) => void
}

export default function BottomSheet({isOpen, setIsOpen}:BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const startY = useRef<number | null>(null)
  const currentY = useRef<number | null>(null)

  // 바텀 시트 닫기
  const closeSheet = () => {
    setIsOpen(false)
    document.body.style.overflow = "" // 배경 스크롤 복원
  }

  // 터치 이벤트 핸들러 (모바일 슬라이드 닫기)
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startY.current) return
    currentY.current = e.touches[0].clientY

    const diff = currentY.current - startY.current

    // 아래로 드래그할 때만 시트 이동
    if (diff > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${diff}px)`
      e.preventDefault()
    }
  }

  const handleTouchEnd = () => {
    if (!startY.current || !currentY.current) return

    const diff = currentY.current - startY.current

    // 일정 거리 이상 드래그하면 닫기
    if (diff > 100) {
      closeSheet()
    } else if (sheetRef.current) {
      // 원위치로 돌아가기
      sheetRef.current.style.transform = "translateY(0)"
    }

    startY.current = null
    currentY.current = null
  }

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        closeSheet()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSheet()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen])

  return (
    <>
      {/* 오버레이 */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />

      {/* 바텀 시트 */}
      <div
        ref={sheetRef}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-2xl shadow-lg p-6",
          "transform transition-transform duration-300 ease-in-out",
          "max-h-[80vh] overflow-y-auto",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 드래그 핸들 */}
        <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6" />

        {/* 닫기 버튼 */}
        <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={closeSheet}>
          <X className="h-5 w-5" />
          <span className="sr-only">닫기</span>
        </Button>

        {/* <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">메뉴</h2> */}

        {/* 바텀 시트 내용 */}
        <div className="space-y-4">
          <MenuItem icon={<Pencil className="mr-3 h-5 w-5" />} text="직접 기록하기" />
          <MenuItem icon={<User className="mr-3 h-5 w-5" />} text="코치쌤한테 알리기" />
          <MenuItem icon={<Search className="mr-3 h-5 w-5" />} text="음식 검색하기" />
          <MenuItem icon={<ForkKnife className="mr-3 h-5 w-5" />} text="식단 불러오기" />
        </div>
      </div>
    </>
  )
}

// 메뉴 아이템 컴포넌트
function MenuItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-gray-100">
      {icon}
      {text}
    </button>
  )
}
