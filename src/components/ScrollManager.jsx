import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Saat pindah halaman: kalau URL punya #anchor (misal /#menu-list) gulir ke bagian itu,
// kalau tidak, kembali ke atas halaman.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }
    let tries = 0
    const timer = setInterval(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      tries += 1
      if (target || tries > 20) {
        clearInterval(timer)
        target?.scrollIntoView({ behavior: 'smooth' })
      }
    }, 50)
    return () => clearInterval(timer)
  }, [pathname, hash])

  return null
}
