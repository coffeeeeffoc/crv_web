import { useEffect, useRef } from 'react'

export const usePrevious = (value: any) => {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  console.log('usePrevious', ref)
  return ref.current
}
