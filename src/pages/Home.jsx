import React, { useEffect, useMemo, useRef, useState, useId } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import ProductIcon from '../components/ProductIcon'
import { 
  ArrowRight, 
  Shield, 
  Truck, 
  Award, 
  Users,
  CheckCircle
} from 'lucide-react'

const heroLetterVariants = {
  hidden: {
    opacity: 0,
    y: 52,
    scale: 0.78,
    rotateX: -48,
    filter: 'blur(12px)'
  },
  visible: (custom) => {
    const i = custom?.i ?? 0
    const oxygen = custom?.oxygen ?? false
    return {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: oxygen ? 380 : 300,
        damping: oxygen ? 20 : 24,
        delay: i * 0.032 + 0.06
      }
    }
  }
}

function HeroOxygenTitle() {
  const { part1, part2, part3 } = useMemo(() => {
    const line1 = 'Качественный '
    const oxygen = 'кислород'
    const line2 = 'для ваших нужд'
    const toItems = (text, oxygen) => {
      const items = []
      for (const char of text) {
        items.push({ char, oxygen })
      }
      return items
    }
    let i = 0
    const part1 = toItems(line1, false).map((it) => ({ ...it, i: i++ }))
    const part2 = toItems(oxygen, true).map((it) => ({ ...it, i: i++ }))
    const part3 = toItems(line2, false).map((it) => ({ ...it, i: i++ }))
    return { part1, part2, part3 }
  }, [])

  const renderLetters = (items) =>
    items.map((item, idx) => (
      <motion.span
        key={`${item.i}-${idx}`}
        custom={{ i: item.i, oxygen: item.oxygen }}
        variants={heroLetterVariants}
        className={clsx(
          'inline-block align-baseline will-change-transform',
          item.oxygen &&
            'text-transparent bg-clip-text bg-gradient-to-br from-primary-500 via-sky-400 to-cyan-300 dark:from-primary-300 dark:via-sky-300 dark:to-cyan-200 drop-shadow-[0_0_14px_rgba(56,189,248,0.35)] dark:drop-shadow-[0_0_18px_rgba(34,211,238,0.25)]',
          !item.oxygen && 'text-gray-900 dark:text-white'
        )}
        style={item.char === ' ' ? { width: '0.32em' } : undefined}
      >
        {item.char === ' ' ? '\u00A0' : item.char}
      </motion.span>
    ))

  return (
    <motion.h1
      className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center lg:text-left leading-[1.2] [perspective:1100px] [transform-style:preserve-3d] hyphens-none"
      initial="hidden"
      animate="visible"
    >
      {/* nowrap по строкам: буквы inline-block иначе рвутся посередине слова */}
      <span className="inline-block max-w-full whitespace-nowrap align-baseline">
        {renderLetters(part1)}
        {renderLetters(part2)}
      </span>
      <br />
      <span className="inline-block max-w-full whitespace-nowrap align-baseline">
        {renderLetters(part3)}
      </span>
    </motion.h1>
  )
}

/** Баллон O₂ в hero — металл, свечение, счётчик, параллакс, пузырьки (главная страница) */
function HeroOxygenTank() {
  const uid = useId().replace(/:/g, '')
  const rootRef = useRef(null)
  const [pct, setPct] = useState(0)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 45, damping: 22 })
  const sy = useSpring(my, { stiffness: 45, damping: 22 })
  const tiltY = useTransform(sx, [-72, 72], [-10, 10])
  const tiltX = useTransform(sy, [-72, 72], [8, -8])

  useEffect(() => {
    const t0 = performance.now()
    const d = 2400
    let id
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / d)
      const e = 1 - (1 - p) ** 3
      setPct(Math.round(e * 995) / 10)
      if (p < 1) id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  const sparks = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: 12 + ((i * 41) % 76),
        top: 14 + ((i * 29) % 72),
        delay: (i % 8) * 0.18,
        dur: 2.1 + (i % 4) * 0.35,
        size: 2 + (i % 3)
      })),
    []
  )

  const streams = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => ({
        id: i,
        x: 38 + ((i * 37) % 24),
        delay: i * 0.22,
        dur: 2.6 + (i % 4) * 0.45,
        s: 3 + (i % 4)
      })),
    []
  )

  const handleMove = (e) => {
    const el = rootRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 90)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 90)
  }

  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={rootRef}
      className="relative flex min-h-[22rem] w-full max-w-lg items-center justify-center lg:justify-end lg:pr-4"
      style={{ perspective: 1100 }}
      initial={{ opacity: 0, x: 56, rotateY: -12 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <svg
        className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
        aria-hidden
      >
        <defs>
          <filter id={`hero-o2-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <motion.div
        className="pointer-events-none absolute -inset-16 rounded-full bg-gradient-to-br from-cyan-400/35 via-sky-500/25 to-primary-500/30 blur-3xl dark:from-cyan-500/20 dark:via-sky-600/15 dark:to-primary-600/20"
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {streams.map((b) => (
        <motion.div
          key={b.id}
          className="pointer-events-none absolute bottom-[18%] z-[2] rounded-full bg-gradient-to-t from-emerald-300/60 to-sky-400/50 shadow-[0_0_10px_rgba(45,212,191,0.45)] dark:from-emerald-400/45 dark:to-sky-400/35"
          style={{
            left: `${b.x}%`,
            width: b.s,
            height: b.s,
            marginLeft: -b.s / 2
          }}
          animate={{
            y: [0, -260, -300],
            opacity: [0, 0.7, 0],
            scale: [0.5, 1.1, 0.85],
            x: [0, (b.id % 2 === 0 ? 1 : -1) * 12, 0]
          }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            delay: b.delay,
            ease: [0.2, 0.85, 0.4, 1]
          }}
        />
      ))}

      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="pointer-events-none absolute z-[3] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)] dark:bg-cyan-200"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1.15, 0.3]
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut'
          }}
        />
      ))}

      <motion.div
        className="relative z-10"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          className="relative h-80 w-64 overflow-hidden rounded-t-[7rem] rounded-b-2xl bg-gradient-to-br from-slate-300 via-slate-100 to-slate-500 shadow-[0_28px_60px_-12px_rgba(14,165,233,0.35),0_0_0_1px_rgba(148,163,184,0.35),inset_0_1px_0_rgba(255,255,255,0.5)] dark:from-slate-800 dark:via-slate-700 dark:to-slate-950 dark:shadow-[0_32px_70px_-14px_rgba(34,211,238,0.25),0_0_0_1px_rgba(51,65,85,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="pointer-events-none absolute inset-0 dark:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 35%, transparent 65%, rgba(71,85,105,0.25) 100%)'
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 hidden dark:block"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(15,23,42,0.5) 100%)'
            }}
          />
          <div className="pointer-events-none absolute inset-y-10 left-3 w-14 rounded-full bg-gradient-to-r from-white/50 to-transparent opacity-70 blur-md dark:from-white/15" />
          <div className="pointer-events-none absolute inset-y-6 right-2 w-16 bg-gradient-to-l from-slate-600/50 to-transparent dark:from-slate-900/60" />

          <div className="absolute top-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-slate-500 shadow-inner ring-2 ring-slate-400/80 dark:bg-slate-600 dark:ring-slate-500" />
            <div className="h-14 w-2 rounded-full bg-gradient-to-b from-slate-400 to-slate-500 shadow-md dark:from-slate-600 dark:to-slate-700" />
          </div>

          <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <span
              className="select-none text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary-600 via-sky-500 to-cyan-500 dark:from-primary-300 dark:via-sky-300 dark:to-cyan-200"
              style={{
                filter: `url(#hero-o2-${uid}) drop-shadow(0 0 18px rgba(34,211,238,0.45))`
              }}
            >
              O<sub className="align-baseline text-[0.58em] font-black">2</sub>
            </span>
            <motion.span
              className="mt-2 text-base font-bold tabular-nums text-primary-600 dark:text-primary-300"
              animate={{
                textShadow: [
                  '0 0 0px rgba(56,189,248,0)',
                  '0 0 20px rgba(56,189,248,0.5)',
                  '0 0 0px rgba(56,189,248,0)'
                ]
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {pct.toFixed(1)}%
            </motion.span>
          </div>

          <div className="absolute bottom-5 left-4 right-4 z-20">
            <div className="mb-1 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              <span>Заполнение</span>
              <span className="text-emerald-600 dark:text-emerald-400">чистота</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full border border-white/50 bg-slate-300/90 shadow-inner dark:border-slate-600 dark:bg-slate-800/95">
              <motion.div
                className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-500 shadow-[0_0_14px_rgba(45,212,191,0.55)]"
                style={{ width: `${Math.min(100, (pct / 99.5) * 100)}%` }}
              >
                <motion.div
                  className="pointer-events-none absolute inset-0 skew-x-[-14deg] bg-gradient-to-r from-transparent via-white/45 to-transparent"
                  animate={{ x: ['-60%', '180%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // Инициализация AOS для анимаций при скролле
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => {
        AOS.default.init({
          duration: 1000,
          once: true,
          offset: 100
        })
      }).catch(() => {
        // AOS не критичен для работы приложения
        console.log('AOS library not available')
      })
    }
  }, [])

  const features = [
    {
      icon: Shield,
      title: 'Высокое качество',
      description: 'Все баллоны проходят строгий контроль качества и соответствуют международным стандартам'
    },
    {
      icon: Truck,
      title: 'Быстрая доставка',
      description: 'Доставляем кислородные баллоны по всей России в кратчайшие сроки'
    },
    {
      icon: Award,
      title: 'Сертификация',
      description: 'Наша продукция имеет все необходимые сертификаты и лицензии'
    },
    {
      icon: Users,
      title: 'Опытная команда',
      description: 'Профессиональные специалисты с многолетним опытом работы'
    }
  ]

  const products = [
    {
      name: 'Медицинский кислород 10л',
      price: '7,500 ₽',
      image: '/api/placeholder/300/200',
      features: ['99.5% чистоты', 'Медицинский класс', 'Быстрая доставка']
    },
    {
      name: 'Промышленный кислород 40л',
      price: '15,000 ₽',
      image: '/api/placeholder/300/200',
      features: ['99.2% чистоты', 'Промышленный класс', 'Большой объем']
    },
    {
      name: 'Портативный баллон 5л',
      price: '4,500 ₽',
      image: '/api/placeholder/300/200',
      features: ['Компактный', 'Легкий', 'Удобный']
    }
  ]

  const stats = [
    { number: '500+', label: 'Довольных клиентов' },
    { number: '1000+', label: 'Поставленных баллонов' },
    { number: '5+', label: 'Лет опыта' },
    { number: '24/7', label: 'Поддержка клиентов' }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-oxygen-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          {/* Floating Bubbles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-200 dark:bg-primary-800 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <HeroOxygenTitle />
              
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                OxygenStore — ваш надежный поставщик медицинского и промышленного кислорода. 
                Мы обеспечиваем высокое качество продукции и быструю доставку по всей России.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link
                  to="/catalog"
                  className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Смотреть каталог
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Связаться с нами
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — анимированный баллон (HeroOxygenTank) */}
            <HeroOxygenTank />
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Почему выбирают нас
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Мы обеспечиваем высочайшее качество кислорода и превосходный сервис для наших клиентов
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
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
              Популярные товары
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Выберите подходящий баллон с кислородом из нашего широкого ассортимента
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-60 sm:h-64 bg-gradient-to-br from-primary-100 to-oxygen-100 dark:from-primary-900/20 dark:to-oxygen-900/20 flex items-center justify-center">
                  <ProductIcon category="medical" className="w-20 h-20 sm:w-24 sm:h-24" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                    {product.price}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/catalog"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-center block"
                  >
                    Подробнее
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-100">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
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
              Готовы заказать кислород?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами прямо сейчас и получите консультацию по выбору подходящего баллона
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Связаться с нами
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Смотреть каталог
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home



