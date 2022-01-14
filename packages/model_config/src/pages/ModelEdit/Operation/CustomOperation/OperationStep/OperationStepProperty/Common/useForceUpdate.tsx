
import { useCallback, useState } from 'react'

const useForceUpdate = () => {
  // TODO: 必要性？
  const [, forceUpdate] = useState(0)
  const callback = useCallback(() => {
    forceUpdate(v => ++v)
  }, [])
  return callback
}

export default useForceUpdate
