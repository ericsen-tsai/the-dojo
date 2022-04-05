import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [isCancel, setIsCancel] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error('Could not complete signup')
            }
            
            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const imgUrl = await img.ref.getDownloadURL()

            await res.user.updateProfile({ displayName, photoURL: imgUrl })

            // create a user document
            await projectFirestore.collection('users').doc(res.user.uid).set({
                online: true,
                displayName,
                photoURL: imgUrl
            })

            dispatch({ type:'LOGIN', payload: res.user})

            if (!isCancel) {
                setIsPending(false)
                setError(null)
            }
            
        } catch (err) {
            if (!isCancel) {
                setError(err.message)
                console.log(err.message)
                setIsPending(false)
            }
            
        }
    }

    useEffect(() => {
        return () => setIsCancel(true)
    }, [])

    return { error, isPending, signup }
}