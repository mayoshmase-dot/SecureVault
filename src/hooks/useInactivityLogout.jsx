import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const TIMEOUT = 10 * 60 * 1000 // 10 دقايق

export default function useInactivityLogout() {
    const logout = useAuthStore((state) => state.logout)
    const token = useAuthStore((state) => state.token)
    const navigate = useNavigate()
    const timer = useRef(null)

    const resetTimer = () => {
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            logout()
            navigate('/login')
        }, TIMEOUT)
    }

    useEffect(() => {
        if (!token) return

        const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click']

        events.forEach(e => window.addEventListener(e, resetTimer))
        resetTimer()

        return () => {
            events.forEach(e => window.removeEventListener(e, resetTimer))
            if (timer.current) clearTimeout(timer.current)
        }
    }, [token])
}