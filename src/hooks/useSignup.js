import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore, projectStorage } from '../firebase/fbConfig'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, lastName, picture) => {
    setError(null)
    setIsPending(true)

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      /**For testing
             console.log(res.user);
            */
      if (!res) {
        throw new Error('Could not complete signup')
      }

      //upload user profile picture
      const uploadPath = `pictures/${res.user.uid}/${picture.displayName}`
      const img = await projectStorage.ref(uploadPath).put(picture)
      const imgUrl = await img.ref.getDownloadURL()

      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

       // create a user document
       await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        email,
        lastName,
        photoURL: imgUrl
      })

      // dispatch signin action
      dispatch({ type: 'SIGNIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch (err) {
      /**For testing
       console.log(err.message);
      */
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}
