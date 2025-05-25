import { motion } from "framer-motion"

export default function AnimatedLogo() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Main Icon Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="relative"
        >
          <svg width="72" height="108" viewBox="0 0 192 192" className="drop-shadow-2xl">
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF8C00" />
                <stop offset="50%" stopColor="#FF7700" />
                <stop offset="100%" stopColor="#FF6600" />
              </linearGradient>
              <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8C00" />
                <stop offset="100%" stopColor="#FF6600" />
              </linearGradient>
            </defs>

            {/* Background Rounded Rectangle */}
            <motion.rect
              width="192"
              height="192"
              rx="42"
              ry="42"
              fill="url(#orangeGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Heart Shape */}
            <motion.path
              d="M96 156c-4-4-32-28-48-52-12-18-12-42 8-58 12-10 28-8 40 4 12-12 28-14 40-4 20 16 20 40 8 58-16 24-44 48-48 52z"
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.3,
              }}
            />

            {/* Animated Checkmark */}
            <motion.path
              d="M76 96 L88 108 L116 80"
              stroke="url(#checkGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />
          </svg>
        </motion.div>

        {/* Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${50 + 60 * Math.cos((i * Math.PI * 2) / 8)}%`,
              top: `${50 + 60 * Math.sin((i * Math.PI * 2) / 8)}%`,
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1.2 + i * 0.1,
              ease: "easeInOut",
            }}
          >
            <svg width="6" height="6" viewBox="0 0 24 24">
              <path
                d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
                fill="#FFB347"
                className="drop-shadow-sm"
              />
            </svg>
          </motion.div>
        ))}

        {/* Additional floating sparkles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + (i % 2) * 60}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 2 + i * 0.3,
              ease: "easeInOut",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" fill="#FF8C00" opacity="0.6" />
            </svg>
          </motion.div>
        ))}

        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-[42px]"
          style={{
            background: "radial-gradient(circle, rgba(255,140,0,0.3) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>
    </div>
  )
}
