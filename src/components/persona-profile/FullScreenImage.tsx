import { motion } from "framer-motion"
import { X, Download, Share } from "lucide-react"

interface FullScreenImageProps {
    image: string,
    onClose: () => void
}

export default function FullScreenImage({ image, onClose }:FullScreenImageProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-70 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex space-x-2">
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          >
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>

      <motion.div
        className="w-full h-full flex items-center justify-center p-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image || "/placeholder.svg?height=800&width=800&query=profile picture"}
          alt="Full screen profile"
          className="max-w-full max-h-full object-contain"
        />
      </motion.div>
    </motion.div>
  )
}
