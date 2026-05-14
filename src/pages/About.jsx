import React, { useRef, useEffect, useState, useId, useMemo } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion'
import { 
  Award, 
  Users, 
  Target, 
  Shield, 
  Truck, 
  Clock,
  CheckCircle,
  TrendingUp,
  Heart
} from 'lucide-react'

/** Плашка 99.5% / O₂ — премиум-слой: SVG-свечение, conic-аура, 3D-параллакс, орбиты, шум */
function MissionPurityShowcase() {
  const uid = useId().replace(/:/g, '')
  const rootRef = useRef(null)
  const isInView = useInView(rootRef, { once: true, amount: 0.35 })
  const [pct, setPct] = useState(0)
  /** Только 3D от мыши: при «уменьшить анимацию» в ОС раньше гасились ВСЕ эффекты — выглядело как «ничего не изменилось» */
  const [noParallax, setNoParallax] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.55 })
  const sy = useSpring(my, { stiffness: 55, damping: 22, mass: 0.55 })
  const tiltX = useTransform(sy, [-48, 48], [6.5, -6.5])
  const tiltY = useTransform(sx, [-48, 48], [-6.5, 6.5])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fn = () => setNoParallax(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    if (!isInView) return
    const duration = 2200
    const start = performance.now()
    let id
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - (1 - p) ** 3.2
      setPct(Math.round(eased * 995) / 10)
      if (p < 1) id = requestAnimationFrame(step)
    }
    id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [isInView])

  const handleMove = (e) => {
    if (noParallax) return
    const el = rootRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 96)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 96)
  }

  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const bubbles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${(i * 53 + 7) % 92}%`,
        top: `${(i * 31 + 12) % 88}%`,
        size: 4 + (i % 5) * 2,
        dur: 5 + (i % 5) * 0.65,
        delay: (i % 6) * 0.32
      })),
    []
  )

  const streamBubbles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: `stream-${i}`,
        xPct: 42 + ((i * 41) % 16),
        size: 3 + (i % 4),
        dur: 3 + (i % 4) * 0.5,
        delay: i * 0.32
      })),
    []
  )

  const sparks = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: `spark-${i}`,
        left: `${8 + ((i * 47) % 84)}%`,
        top: `${10 + ((i * 29) % 75)}%`,
        delay: i * 0.22,
        dur: 2.1 + (i % 4) * 0.35,
        size: 2 + (i % 3)
      })),
    []
  )

  const orbitAngles = useMemo(() => [0, 51, 103, 154, 206, 257, 308], [])

  return (
    <motion.div
      ref={rootRef}
      onMouseMove={noParallax ? undefined : handleMove}
      onMouseLeave={noParallax ? undefined : handleLeave}
      className="relative min-h-[26rem] overflow-hidden rounded-2xl sm:min-h-[28rem]"
      style={{ perspective: 1280 }}
      initial={{ opacity: 0, scale: 0.92, rotateX: 10 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
        aria-hidden
      >
        <defs>
          <filter id={`o2glow-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feColorMatrix
              in="b"
              type="matrix"
              values="0 0 0 0 0.2  0 0 0 0 0.85  0 0 0 0 1  0 0 0 0.9 0"
              result="c"
            />
            <feMerge>
              <feMergeNode in="c" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-sky-50 to-cyan-50 dark:from-slate-950 dark:via-[#0a1628] dark:to-slate-950" />

      <motion.div
        className="pointer-events-none absolute -left-1/2 -top-1/2 h-[200%] w-[200%] opacity-[0.14] dark:opacity-[0.22]"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(34,211,238,0.55) 42deg, transparent 95deg, rgba(99,102,241,0.45) 160deg, transparent 220deg, rgba(14,165,233,0.5) 290deg, transparent 360deg)'
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-cyan-400/30 blur-3xl dark:bg-cyan-500/25"
        animate={{ x: [0, 36, 0], y: [0, 22, 0], scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-primary-400/25 blur-3xl dark:bg-sky-600/20"
        animate={{ x: [0, -28, 0], y: [0, -18, 0], scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/3 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-400/15"
        animate={{ opacity: [0.2, 0.45, 0.2], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay dark:opacity-[0.22]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '96px 96px'
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_42%,transparent_0%,rgba(15,23,42,0.12)_100%)] dark:bg-[radial-gradient(ellipse_78%_62%_at_50%_38%,transparent_0%,rgba(2,6,23,0.5)_100%)]" />

      <motion.div
        className="absolute inset-0 opacity-45 dark:opacity-35"
        style={{
          background:
            'radial-gradient(circle at 30% 18%, rgba(56,189,248,0.38), transparent 62%), radial-gradient(circle at 72% 82%, rgba(59,130,246,0.28), transparent 58%)'
        }}
        animate={{ opacity: [0.32, 0.48, 0.32] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="pointer-events-none absolute z-[2] rounded-full bg-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.35)] dark:bg-sky-300/28"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size
          }}
          animate={{
            y: [0, -12 - (b.id % 4) * 3, 0],
            x: [0, (b.id % 2 === 0 ? 1 : -1) * 5, 0],
            opacity: [0.18, 0.5, 0.18],
            scale: [0.88, 1.12, 0.88]
          }}
          transition={{
            duration: b.dur + 3,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut'
          }}
        />
      ))}

      {streamBubbles.map((b) => (
        <motion.div
          key={b.id}
          className="pointer-events-none absolute z-[3] rounded-full bg-gradient-to-t from-emerald-300/55 to-sky-400/50 shadow-[0_0_10px_rgba(45,212,191,0.4)] dark:from-emerald-400/40 dark:to-sky-300/35"
          style={{
            left: `${b.xPct}%`,
            bottom: '-5%',
            width: b.size,
            height: b.size,
            marginLeft: -b.size / 2
          }}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{
            y: [0, -340, -400],
            opacity: [0, 0.65, 0],
            scale: [0.55, 1.12, 0.8],
            x: [0, (b.id % 2 === 0 ? 1 : -1) * 18, 0]
          }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            delay: b.delay,
            ease: [0.2, 0.9, 0.35, 1]
          }}
        />
      ))}

      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="pointer-events-none absolute z-[4] rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] dark:bg-cyan-200 dark:shadow-[0_0_8px_rgba(103,232,249,0.85)]"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.2, 1, 0.2]
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut'
          }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 z-[5] rounded-2xl shadow-[inset_0_0_100px_rgba(56,189,248,0.06),inset_0_1px_0_rgba(255,255,255,0.12)] dark:shadow-[inset_0_0_120px_rgba(14,165,233,0.08),inset_0_1px_0_rgba(255,255,255,0.04)]" />

      <motion.div
        className="relative z-10 flex min-h-[26rem] flex-col items-center justify-center px-6 py-12 text-center sm:min-h-[28rem]"
        style={{
          rotateX: noParallax ? 0 : tiltX,
          rotateY: noParallax ? 0 : tiltY,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          className="relative mb-10 flex h-[10.5rem] w-[10.5rem] items-center justify-center"
          initial={{ opacity: 0, scale: 0.5, rotateZ: -12 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateZ: 0 } : {}}
          transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.08 }}
        >
          <motion.div
            className="absolute -inset-10 rounded-full bg-gradient-to-br from-cyan-300/45 via-sky-400/35 to-primary-500/30 blur-3xl dark:from-cyan-500/25 dark:via-sky-500/25 dark:to-primary-600/20"
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          >
            {orbitAngles.map((deg, i) => (
              <span
                key={deg}
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-200 to-sky-400 opacity-80 shadow-[0_0_10px_rgba(34,211,238,0.75)] dark:from-cyan-300 dark:to-sky-500"
                style={{
                  transform: `rotate(${deg}deg) translateY(-4.75rem)`,
                  opacity: 0.55 + (i % 3) * 0.12
                }}
              />
            ))}
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            {orbitAngles.slice(0, 5).map((deg, i) => (
              <span
                key={`o2-${deg}`}
                className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/90 dark:bg-emerald-400/80"
                style={{
                  transform: `rotate(${deg + 24}deg) translateY(-5.35rem)`
                }}
              />
            ))}
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-3 rounded-full border border-sky-400/50 dark:border-sky-400/35"
            animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="relative flex h-[8.25rem] w-[8.25rem] items-center justify-center overflow-hidden rounded-full border border-white/50 bg-white shadow-[0_20px_60px_-15px_rgba(14,165,233,0.45),0_0_0_1px_rgba(56,189,248,0.15)] ring-2 ring-sky-300/70 dark:border-slate-600/80 dark:bg-slate-900 dark:shadow-[0_24px_70px_-18px_rgba(34,211,238,0.35),0_0_0_1px_rgba(56,189,248,0.12)] dark:ring-sky-500/45"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/14"
              animate={{ x: ['-130%', '170%'] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', repeatDelay: 1.6 }}
            />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.55),transparent_55%)] dark:bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.08),transparent_50%)]"
              animate={{ opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="relative z-10 select-none text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary-600 via-sky-500 to-cyan-400 dark:from-primary-300 dark:via-sky-300 dark:to-cyan-200"
              style={{
                filter: `url(#o2glow-${uid}) drop-shadow(0 0 14px rgba(34, 211, 238, 0.45))`
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              O<sub className="align-baseline text-[0.62em] font-black">2</sub>
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.09, delayChildren: 0.12 }
            }
          }}
        >
          <motion.h3
            className="mb-3 text-3xl font-black tabular-nums text-gray-900 dark:text-white sm:text-4xl"
            variants={{
              hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
              show: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-primary-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent dark:from-primary-300 dark:via-sky-300 dark:to-cyan-200"
              animate={
                !isInView
                  ? {}
                  : {
                      textShadow: [
                        '0 0 0px rgba(56,189,248,0), 0 0 0px rgba(45,212,191,0)',
                        '0 0 28px rgba(56,189,248,0.45), 0 0 40px rgba(45,212,191,0.25)',
                        '0 0 0px rgba(56,189,248,0), 0 0 0px rgba(45,212,191,0)'
                      ]
                    }
              }
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {pct.toFixed(1)}% чистоты
            </motion.span>
          </motion.h3>

          <motion.div
            className="mx-auto mb-2 w-full max-w-[260px] origin-center"
            variants={{
              hidden: { opacity: 0, scaleX: 0.3 },
              show: {
                opacity: 1,
                scaleX: 1,
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            <div className="relative h-3 overflow-hidden rounded-full border border-white/40 bg-slate-200/80 shadow-inner dark:border-slate-600/60 dark:bg-slate-800/95">
              <div
                className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-500 shadow-[0_0_20px_rgba(45,212,191,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] dark:shadow-[0_0_24px_rgba(34,211,238,0.45)]"
                style={{ width: `${Math.min(100, (pct / 99.5) * 100)}%` }}
              >
                <motion.div
                  className="pointer-events-none absolute inset-0 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ['-80%', '220%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400/95">
              уровень чистоты
            </p>
          </motion.div>

          <motion.p
            className="max-w-xs text-gray-600 dark:text-gray-300"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
            }}
          >
            Медицинский класс кислорода
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center gap-2"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.4 } }
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.65)] dark:from-sky-300 dark:to-cyan-300"
                animate={{
                  y: [0, -7, 0],
                  opacity: [0.35, 1, 0.35],
                  scale: [1, 1.35, 1],
                  boxShadow: [
                    '0 0 6px rgba(34,211,238,0.4)',
                    '0 0 16px rgba(34,211,238,0.85)',
                    '0 0 6px rgba(34,211,238,0.4)'
                  ]
                }}
                transition={{
                  duration: 1.25 + i * 0.08,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Качество',
      description: 'Мы гарантируем высочайшее качество нашей продукции и соответствие всем международным стандартам'
    },
    {
      icon: Users,
      title: 'Клиентоориентированность',
      description: 'Наши клиенты - это наш приоритет. Мы всегда готовы помочь и найти индивидуальное решение'
    },
    {
      icon: Target,
      title: 'Надежность',
      description: 'Мы работаем с проверенными поставщиками и используем только сертифицированные материалы'
    },
    {
      icon: TrendingUp,
      title: 'Инновации',
      description: 'Постоянно развиваемся и внедряем новые технологии для улучшения качества обслуживания'
    }
  ]

  const team = [
    {
      name: 'Александр Петров',
      position: 'Генеральный директор',
      experience: '15 лет опыта',
      image: '/api/placeholder/200/200',
      description: 'Эксперт в области газовой промышленности с многолетним опытом управления'
    },
    {
      name: 'Мария Сидорова',
      position: 'Технический директор',
      experience: '12 лет опыта',
      image: '/api/placeholder/200/200',
      description: 'Специалист по контролю качества и техническим стандартам'
    },
    {
      name: 'Дмитрий Козлов',
      position: 'Менеджер по продажам',
      experience: '8 лет опыта',
      image: '/api/placeholder/200/200',
      description: 'Опытный менеджер с глубоким пониманием потребностей клиентов'
    },
    {
      name: 'Елена Волкова',
      position: 'Менеджер по логистике',
      experience: '10 лет опыта',
      image: '/api/placeholder/200/200',
      description: 'Специалист по организации доставки и складскому учету'
    }
  ]

  const achievements = [
    { number: '500+', label: 'Довольных клиентов', icon: Users },
    { number: '1000+', label: 'Поставленных баллонов', icon: Truck },
    { number: '5+', label: 'Лет на рынке', icon: Clock },
    { number: '99.5%', label: 'Чистота кислорода', icon: Award }
  ]

  const certifications = [
    'ISO 9001:2015 - Система менеджмента качества',
    'ISO 14001:2015 - Система экологического менеджмента',
    'OHSAS 18001 - Система менеджмента охраны труда',
    'ГОСТ Р 55853-2013 - Медицинские газы',
    'Сертификат соответствия ТР ТС 032/2013'
  ]

  return (
    <div className="pt-16 min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-oxygen-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              О компании{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-oxygen-600">
                OxygenStore
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Мы — ведущий поставщик качественных баллонов с кислородом в России. 
              Наша миссия — обеспечить надежное снабжение медицинских учреждений 
              и промышленных предприятий высококачественным кислородом.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Наша миссия
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Мы стремимся стать самым надежным партнером в области поставки 
                кислорода, обеспечивая высочайшее качество продукции и превосходный 
                сервис для наших клиентов.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Наша цель — способствовать улучшению качества медицинского обслуживания 
                и повышению эффективности промышленных процессов через поставку 
                качественного кислорода.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Забота о здоровье
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Мы понимаем важность качественного кислорода для здоровья людей
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <MissionPurityShowcase />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Наши ценности
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Принципы, которыми мы руководствуемся в нашей работе каждый день
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Наши достижения
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Цифры, которые говорят о качестве нашей работы
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {achievement.number}
                </div>
                <div className="text-primary-100">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Наша команда
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Профессионалы с многолетним опытом работы в газовой промышленности
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="text-center bg-gray-50 dark:bg-slate-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-oxygen-100 dark:from-primary-900/20 dark:to-oxygen-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                  {member.position}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {member.experience}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Сертификации и лицензии
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Мы имеем все необходимые сертификаты и лицензии для работы с медицинскими газами
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-oxygen-600 dark:from-primary-700 dark:to-oxygen-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Готовы работать с нами?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для получения подробной информации о наших услугах и продукции
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Связаться с нами
              </motion.a>
              <motion.a
                href="/catalog"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Посмотреть каталог
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About




