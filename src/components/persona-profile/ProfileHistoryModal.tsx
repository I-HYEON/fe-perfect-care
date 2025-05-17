import { motion } from "framer-motion"
import { X } from "lucide-react"

interface ProfileHistoryModalProps {
    images: string[],
    onClose: () => void,
    onSelectImage: (image:string) => void
}

export default function ProfileHistoryModal({ images, onClose, onSelectImage }:ProfileHistoryModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 z-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white dark:bg-gray-800 p-4 flex items-center justify-between">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">이전 프로필 사진</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => onSelectImage(image)}
            >
              <img
                src={image || "/placeholder.svg?height=200&width=200&query=profile picture"}
                alt={`이전 프로필 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
