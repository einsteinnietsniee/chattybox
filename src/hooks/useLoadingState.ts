import { useState } from "react"

function useLoadingState() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleStartLoading = () => {
    setLoading(true)
    setError('')
  }

  const handleStopLoading = () => {
    setLoading(false)
  }

  const handleError = (error: string) => {
    setLoading(false)
    setError(error)
  }

  return { error, loading, handleStartLoading, handleStopLoading, handleError }
}

export default useLoadingState
