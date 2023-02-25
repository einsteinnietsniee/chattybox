import { useEffect, useRef } from 'react'

export function useMemoCompare<T>(next: T, compare: (prev?: T, curr?: T) => boolean | undefined) {
  const previousRef = useRef<T>()
  const previous = previousRef.current

  const isEqual = compare(previous, next)

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next
    }
  })

  return isEqual ? previous : next
}
