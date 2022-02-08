import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore, projectStorage } from '../firebase/fbConfig'
import { useAuthContext } from './useAuthContext'

export const useGeekSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()



  const signup = async (email, password, displayName, lastName, picture, jobTitle, description, skills, linkedInUrl, gitHubUrl) => {
    setError(null)
    setIsPending(true)

    const getImageUrl = async (uid, picture) => {
      if (!picture) {
        return Promise.resolve('/default.png')
      }

      const uploadPath = `pictures/${uid}/${picture}`
      const img = await projectStorage.ref(uploadPath).put(picture)
      return await img.ref.getDownloadURL()
    };

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
      const userPic = picture ? picture.displayName : null
      const imgUrl = await getImageUrl(res.user.uid, userPic) 

      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

       // create a user document
       await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        isAGeek: true,
        displayName,
        email,
        lastName,
        photoURL: imgUrl,
        jobTitle,
        description, 
        skills, 
        linkedInUrl, 
        gitHubUrl
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
