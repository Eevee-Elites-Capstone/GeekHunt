import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/fbConfig'
import { useAuthContext } from './useAuthContext'

export const useGeekForm = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const geekForm = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { geekForm, error, isPending }
}
