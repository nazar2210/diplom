import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'

const GlobalBubblesBackground = () => {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 11) % 96}%`,
        top: `${(i * 29 + 7) % 94}%`,
        size: 3 + (i % 5) * 2,
        duration: 9 + (i % 6) * 1.1,
        delay: (i % 7) * 0.35
      })),
    []
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[4] overflow-hidden mix-blend-screen">
      {bubbles.map((bubble) => (
        <motion.span
          key={bubble.id}
          className="absolute rounded-full bg-sky-400/30 dark:bg-cyan-300/24"
          style={{
            left: bubble.left,
            top: bubble.top,
            width: bubble.size,
            height: bubble.size
          }}
          animate={{
            y: [0, -26 - (bubble.id % 4) * 8, 0],
            x: [0, (bubble.id % 2 === 0 ? 1 : -1) * 10, 0],
            opacity: [0.05, 0.26, 0.05],
            scale: [0.9, 1.25, 0.9]
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <GlobalBubblesBackground />
      <Header />
      <main className="relative z-[3] flex-grow">
        {children}
      </main>
      <div className="relative z-[3]">
        <Footer />
      </div>
    </div>
  )
}

export default Layout



