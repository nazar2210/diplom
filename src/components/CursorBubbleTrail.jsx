import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Мягкий «ореол» за курсором + короткий след пузырьков (только hero-секция).
 * pointer-events-none — клики проходят к контенту.
 */
export default function CursorBubbleTrail({ containerRef }) {
  const [bubbles, setBubbles] = useState([])
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const idRef = useRef(0)
  const lastSpawn = useRef(0)

  const mx = useMotionValue(-9999)
  const my = useMotionValue(-9999)
  const gx = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.65 })
  const gy = useSpring(my, { stiffness: 55, damping: 22, mass: 0.65 })
  const glowX = useTransform(gx, (v) => v - 140)
  const glowY = useTransform(gy, (v) => v - 140)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const popBubble = useCallback((id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const spawnBubbles = useCallback(
    (cx, cy) => {
      if (reduced) return
      const now = performance.now()
      if (now - lastSpawn.current < 36) return
      lastSpawn.current = now
      const batch = []
      const count = 2 + Math.floor(Math.random() * 2)
      for (let i = 0; i < count; i += 1) {
        idRef.current += 1
        batch.push({
          id: idRef.current,
          x: cx + (Math.random() - 0.5) * 32,
          y: cy + (Math.random() - 0.5) * 32,
          size: 5 + Math.random() * 12,
          dur: 1.05 + Math.random() * 0.75,
          drift: (Math.random() - 0.5) * 64,
          lift: 70 + Math.random() * 55
        })
      }
      setBubbles((prev) => [...prev, ...batch].slice(-50))
    },
    [reduced]
  )

  const onPointerMove = useCallback(
    (e) => {
      const el = containerRef?.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      mx.set(cx)
      my.set(cy)
      spawnBubbles(cx, cy)
    },
    [containerRef, mx, my, spawnBubbles]
  )

  const onPointerLeave = useCallback(() => {
    mx.set(-9999)
    my.set(-9999)
  }, [mx, my])

  useEffect(() => {
    const el = containerRef?.current
    if (!el || reduced) return
    el.addEventListener('pointermove', onPointerMove, { passive: true })
    el.addEventListener('pointerleave', onPointerLeave, { passive: true })
    return () => {
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [containerRef, onPointerMove, onPointerLeave, reduced])

  if (reduced) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/25 via-cyan-300/12 to-primary-500/20 blur-3xl dark:from-cyan-400/18 dark:via-sky-500/10 dark:to-primary-400/12 dark:mix-blend-screen"
        style={{ x: glowX, y: glowY }}
      />
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full border border-white/40 bg-gradient-to-br from-sky-200/70 to-primary-300/50 shadow-[0_0_12px_rgba(56,189,248,0.35)] dark:border-cyan-400/25 dark:from-cyan-400/35 dark:to-primary-500/25 dark:shadow-[0_0_16px_rgba(34,211,238,0.25)]"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            marginLeft: -b.size / 2,
            marginTop: -b.size / 2
          }}
          initial={{ scale: 0.15, opacity: 0.92 }}
          animate={{
            scale: [0.4, 1.35],
            opacity: [0.88, 0],
            y: -b.lift,
            x: b.drift * 0.45
          }}
          transition={{ duration: b.dur, ease: 'easeOut' }}
          onAnimationComplete={() => popBubble(b.id)}
        />
      ))}
    </div>
  )
}
