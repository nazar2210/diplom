import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Star, MessageSquarePlus, User } from 'lucide-react'
import { useReviews } from '../contexts/ReviewsContext'
import { useNotifications } from '../contexts/NotificationContext'

const StarRow = ({ value, onChange, interactive }) => {
  if (!interactive) {
    return (
      <div className="flex items-center gap-0.5" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              n <= value
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          className="p-0.5 rounded cursor-pointer hover:scale-110 transition-transform"
          aria-label={`${n} из 5`}
        >
          <Star
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              n <= value
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

const ProductReviewsPanel = ({ productId, productName }) => {
  const { getReviews, addReview } = useReviews()
  const { success, error } = useNotifications()
  const reviews = useMemo(() => getReviews(productId), [getReviews, productId])

  const [authorName, setAuthorName] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const formatDate = (d) => {
    try {
      return new Date(d).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    } catch {
      return d
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed.length < 8) {
      error('Слишком короткий отзыв', {
        description: 'Напишите хотя бы пару предложений (от 8 символов).'
      })
      return
    }
    setSubmitting(true)
    addReview(productId, { authorName, rating, text: trimmed })
    setText('')
    setAuthorName('')
    setRating(5)
    setSubmitting(false)
    success('Отзыв опубликован', { description: 'Спасибо за обратную связь!' })
  }

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquarePlus className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Отзывы покупателей
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          · {reviews.length}{' '}
          {reviews.length === 1 ? 'отзыв' : reviews.length < 5 ? 'отзыва' : 'отзывов'}
        </span>
      </div>

      <div className="space-y-4 mb-8 max-h-72 overflow-y-auto pr-1">
        {reviews.map((r, i) => (
          <motion.article
            key={r.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-xl bg-gray-50 dark:bg-slate-700/60 p-4 border border-gray-100 dark:border-slate-600"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {r.authorName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(r.date)}
                  </p>
                </div>
              </div>
              <StarRow value={r.rating} interactive={false} />
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
              {r.text}
            </p>
          </motion.article>
        ))}
      </div>

      <div className="rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-slate-800/80 p-4 sm:p-5">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
          Написать отзыв{productName ? ` — ${productName}` : ''}
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ваше имя
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              maxLength={80}
              placeholder="Как к вам обращаться"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Оценка
            </span>
            <StarRow value={rating} onChange={setRating} interactive />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Текст отзыва
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              required
              minLength={8}
              maxLength={2000}
              placeholder="Расскажите о качестве, доставке или использовании…"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm resize-y min-h-[100px]"
            />
          </div>
          <motion.button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold text-sm transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            Отправить отзыв
          </motion.button>
        </form>
      </div>
    </div>
  )
}

export default ProductReviewsPanel
