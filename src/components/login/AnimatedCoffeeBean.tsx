import { motion } from "framer-motion"

export default function AnimatedCoffeeBean() {
  return (
    <div className="relative w-24 h-24">
      <motion.div
        className="absolute inset-0"
        animate={{
          rotate: [0, 10, 0, -10, 0],
          scale: [1, 1.05, 1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.path
            d="M50 15C32.5 15 20 30 20 50C20 70 32.5 85 50 85C67.5 85 80 70 80 50C80 30 67.5 15 50 15Z"
            fill="#8B4513"
            stroke="#5D2906"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M50 25C40 25 30 35 30 50C30 65 40 75 50 75C60 75 70 65 70 50C70 35 60 25 50 25Z"
            fill="#A0522D"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.path
            d="M50 35C45 35 40 40 40 50C40 60 45 65 50 65C55 65 60 60 60 50C60 40 55 35 50 35Z"
            fill="#D2691E"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
          <motion.circle
            cx="40"
            cy="40"
            r="3"
            fill="#FF8C00"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              delay: 1.5,
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
          <motion.circle
            cx="60"
            cy="60"
            r="3"
            fill="#FF8C00"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              delay: 2,
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </svg>
      </motion.div>

      {/* 커피 향기 애니메이션 */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
        initial={{ opacity: 0, y: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          y: [-5, -20],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          repeatDelay: 1,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C10 6 8 8 4 9C8 10 10 12 12 16C14 12 16 10 20 9C16 8 14 6 12 2Z"
            fill="#FFA500"
            fillOpacity="0.6"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-0 left-1/3 transform -translate-y-full"
        initial={{ opacity: 0, y: 0 }}
        animate={{
          opacity: [0, 0.5, 0],
          y: [-5, -15],
        }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          repeatDelay: 1.2,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C10 6 8 8 4 9C8 10 10 12 12 16C14 12 16 10 20 9C16 8 14 6 12 2Z"
            fill="#FFA500"
            fillOpacity="0.6"
          />
        </svg>
      </motion.div>
    </div>
  )
}
