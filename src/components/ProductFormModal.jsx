import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save } from 'lucide-react'
import { PRODUCT_CATEGORIES } from '../data/defaultProducts'
import { assetUrl } from '../utils/assetUrl'

const emptyForm = {
  name: '',
  category: 'medical',
  price: '',
  originalPrice: '',
  description: '',
  features: '',
  imageFile: 'medical-oxygen-10l-promo.png',
  inStock: true,
  isNew: false
}

const ProductFormModal = ({ isOpen, onClose, onSubmit, product, mode = 'add' }) => {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    if (mode === 'edit' && product) {
      const imageFile = product.image?.includes('/')
        ? product.image.split('/').filter(Boolean).pop()
        : product.image || ''

      setForm({
        name: product.name || '',
        category: product.category || 'medical',
        price: String(product.price ?? ''),
        originalPrice: String(product.originalPrice ?? product.price ?? ''),
        description: product.description || '',
        features: (product.features || []).join(', '),
        imageFile: imageFile.replace(/^\.\//, ''),
        inStock: product.inStock !== false,
        isNew: Boolean(product.isNew)
      })
    } else {
      setForm(emptyForm)
    }
  }, [isOpen, mode, product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const price = Number(form.price)
    const originalPrice = Number(form.originalPrice) || price

    if (!form.name.trim()) return
    if (!price || price <= 0) return

    setSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const payload = {
        name: form.name.trim(),
        category: form.category,
        price,
        originalPrice,
        description: form.description.trim(),
        features: form.features
          .split(',')
          .map((f) => f.trim())
          .filter(Boolean),
        image: assetUrl(form.imageFile.trim()),
        inStock: form.inStock,
        isNew: form.isNew
      }

      onSubmit(payload)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  const title = mode === 'edit' ? 'Редактирование товара' : 'Добавление товара'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Название *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Категория *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Цена, ₽ *
                    </label>
                    <input
                      name="price"
                      type="number"
                      min="1"
                      value={form.price}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Старая цена, ₽
                    </label>
                    <input
                      name="originalPrice"
                      type="number"
                      min="1"
                      value={form.originalPrice}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Описание
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Особенности (через запятую)
                  </label>
                  <input
                    name="features"
                    value={form.features}
                    onChange={handleChange}
                    placeholder="99.5% чистоты, Медицинский класс"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Файл изображения (из public/)
                  </label>
                  <input
                    name="imageFile"
                    value={form.imageFile}
                    onChange={handleChange}
                    placeholder="medical-oxygen-10l-promo.png"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
                  />
                </div>

                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={form.inStock}
                      onChange={handleChange}
                      className="rounded border-gray-300"
                    />
                    В наличии
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={form.isNew}
                      onChange={handleChange}
                      className="rounded border-gray-300"
                    />
                    Новинка
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-lg"
                  >
                    <Save className="w-5 h-5" />
                    {saving ? 'Сохранение...' : mode === 'edit' ? 'Сохранить' : 'Добавить'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProductFormModal
