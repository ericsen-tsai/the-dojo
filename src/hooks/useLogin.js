import { useEffect, useState } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [isCancel, setIsCancel] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            await projectFirestore.collection('users').doc(res.user.uid).update({ online: true })

            dispatch({ type: 'LOGIN', payload: res.user})
            
            if (!isCancel) {
                setIsPending(false)
                setError(null)
            }

            
        } catch(err) {
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

    return { login, error, isPending }
}