import { useState, useEffect } from "react"

function getSavedValue (key, initialValue) {
  let savedValue
  if (localStorage.getItem(key) !== "undefined") savedValue = JSON.parse(localStorage.getItem(key))
  if (savedValue) return savedValue

  if (typeof initialValue == 'function') return initialValue()
  return initialValue
}

export default function useLocalStorage (key, initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}