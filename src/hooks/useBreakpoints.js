import { useState, useEffect } from 'react';

// Device types: xs, md, lg

export default function useWindowDimensions() {
  const [width, setWidth] = useState(window.innerWidth)
  const [type, setType] = useState('md')

  useEffect(_ => {
    const onWidthChange = () => setWidth(window.innerWidth)
    
    window.addEventListener('resize', onWidthChange)
    return () => window.removeEventListener('resize', onWidthChange)
  }, [])

  useEffect(_ => {
    if (width < 550) setType('xs')
    if (width > 550 && width < 1200) setType('md')
    if (width > 1200) setType('lg')
  }, [width])

  return { width, type }
}