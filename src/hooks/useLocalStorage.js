import { useEffect, useState } from 'react'

// useState yang otomatis tersimpan di localStorage.
// Nilai awal dibaca sekali (lazy initializer), lalu setiap perubahan disimpan lagi.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch (error) {
      console.error(`Gagal membaca ${key} dari localStorage:`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Gagal menyimpan ${key} ke localStorage:`, error)
    }
  }, [key, value])

  return [value, setValue]
}
