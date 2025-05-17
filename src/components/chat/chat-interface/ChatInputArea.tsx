import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Camera } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface ChatInputAreaProps {
  onSendMessage: (content: string, attachments?: string[]) => void
}

export default function ChatInputArea({ onSendMessage }:ChatInputAreaProps) {
  const [message, setMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [selectedImages, setSelectedImages] = useState<{ url: string; selected: boolean }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Enter 키를 눌러 메시지 전송
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // 메시지 전송 처리
  const handleSendMessage = () => {
    if (message.trim() === "" && selectedImages.filter((img) => img.selected).length === 0) return

    // 선택된 이미지만 필터링
    const attachments = selectedImages.filter((img) => img.selected).map((img) => img.url)

    onSendMessage(message, attachments.length > 0 ? attachments : undefined)
    setMessage("")
    setSelectedImages([])
  }

  // 파일 선택 처리
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    // 선택한 파일들을 처리
    const newImages: { url: string; selected: boolean }[] = []

    Array.from(files).forEach((file) => {
      // 로컬 객체 URL 생성 (실제 앱에서는 서버에 업로드하는 로직으로 대체)
      const objectUrl = URL.createObjectURL(file)
      newImages.push({ url: objectUrl, selected: true })
    })

    // 네트워크 지연 시뮬레이션
    setTimeout(() => {
      setSelectedImages(newImages)
      setIsUploading(false)
      setShowImagePicker(true)

      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }, 500)
  }

  // 이미지 선택 상태 토글
  const toggleImageSelection = (index: number) => {
    const updatedImages = [...selectedImages]
    updatedImages[index].selected = !updatedImages[index].selected
    setSelectedImages(updatedImages)
  }

  // 이미지 선택 모달 닫기
  const closeImagePicker = () => {
    setShowImagePicker(false)
  }

  // 선택한 이미지로 메시지 전송
  const sendWithSelectedImages = () => {
    handleSendMessage()
    setShowImagePicker(false)
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-slate-100 dark:bg-slate-800 flex-shrink-0"
          aria-label="이미지 첨부"
        >
          <Camera className="h-5 w-5" />
        </Button>

        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="메시지를 입력하세요"
          className="flex-1 bg-gray-100 dark:bg-gray-800"
          disabled={isUploading}
        />

        <Button
          onClick={handleSendMessage}
          size="icon"
          variant="ghost"
          disabled={isUploading || (message.trim() === "" && selectedImages.filter((img) => img.selected).length === 0)}
          className="cursor-pointer flex-shrink-0"
          aria-label="메시지 전송"
        >
          <Send className="h-5 w-5" />
        </Button>

        {/* 숨겨진 파일 입력 필드 - 모바일에서 갤러리 접근 */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*"
          multiple
          // capture="environment" // 모바일에서 카메라/갤러리 접근 활성화
        />
      </div>

      {isUploading && <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">파일 업로드 중...</div>}

      {/* 이미지 선택 모달 */}
      <Dialog open={showImagePicker} onOpenChange={setShowImagePicker}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>사진 선택</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-2 mt-4 max-h-[50vh] overflow-y-auto">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={`선택한 이미지 ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute top-2 right-2">
                  <Checkbox
                    checked={image.selected}
                    onCheckedChange={() => toggleImageSelection(index)}
                    className="bg-white border-gray-300"
                  />
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={closeImagePicker}>
              취소
            </Button>
            <Button onClick={sendWithSelectedImages} className="bg-blue-500 hover:bg-blue-600 text-white">
              선택 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
