import { useEffect } from 'react'

/** Registers Escape → onClose while `show` is true. */
export function useModalEscape(show, onClose) {
    useEffect(() => {
        if (!show) return
        const onKey = (e) => {
            if (e.key === 'Escape') onClose?.()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [show, onClose])
}
