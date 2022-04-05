import { useEffect, useState } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [isCancel, setIsCancel] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch, user } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            // update online status
            const { uid } = user
            await projectFirestore.collection('users').doc(uid).update({ online: false })

            await projectAuth.signOut()

            dispatch({ type: 'LOGOUT'})

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

    return { logout, error, isPending }
}