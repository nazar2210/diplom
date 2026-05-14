/**
 * URL к статике из `public/` с учётом Vite `base`
 * (на GitHub Pages проект живёт в `/RepoName/`, а не в корне домена).
 */
export function assetUrl(path) {
  const clean = String(path).replace(/^\//, '')
  const base = import.meta.env.BASE_URL ?? '/'

  if (base === './') {
    return clean ? `./${clean}` : './'
  }
  if (base === '/' || base === '') {
    return `/${clean}`
  }
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`
}

/** Для <img src> товаров: учёт base + старые пути вида `/file.jpg` из localStorage. */
export function publicImageSrc(src) {
  if (!src) return ''
  if (/^https?:\/\//i.test(src)) return src
  if (src.startsWith('/api/')) return src
  // только один сегмент пути — ошибочный «абсолют от корня домена»
  if (/^\/[^/]+$/.test(src)) return assetUrl(src.slice(1))
  return src
}
