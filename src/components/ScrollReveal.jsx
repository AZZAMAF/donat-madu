import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Efek "muncul pelan" saat elemen ber-atribut data-reveal masuk layar.
// - Kartu yang bersebelahan muncul bergantian (stagger) lewat --reveal-delay.
// - Elemen yang baru dirender (menu selesai dimuat, ganti filter) ikut dipantau.
// - Setelah tampil, atribut dilepas supaya efek hover kartu kembali normal.
export default function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.removeAttribute('data-reveal'))
      return undefined
    }

    const show = (el) => {
      el.classList.add('is-visible')
      const delay = parseInt(el.style.getPropertyValue('--reveal-delay'), 10) || 0
      setTimeout(() => {
        el.removeAttribute('data-reveal')
        el.classList.remove('is-visible')
        el.style.removeProperty('--reveal-delay')
      }, 800 + delay)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          io.unobserve(entry.target)
          show(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    const watch = (root) => {
      root.querySelectorAll('[data-reveal]:not([data-reveal-watched])').forEach((el) => {
        el.setAttribute('data-reveal-watched', '')
        // Urutan di antara saudara yang juga punya data-reveal → jeda bergantian (maks 4 langkah).
        const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal')) : [el]
        const index = Math.max(0, siblings.indexOf(el))
        el.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`)
        io.observe(el)
      })
    }

    watch(document)
    const mo = new MutationObserver(() => watch(document))
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}
