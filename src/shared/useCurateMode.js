import { useState, useEffect } from 'react'
import { parseCurateParams } from './curateRoster.js'

/**
 * @param {{ tier: string, indexInTier: number, puzzle: unknown }[]} roster
 */
export function useCurateModeFromRoster(roster) {
  const curateMode =
    typeof window !== 'undefined' && parseCurateParams(window.location.search).curate

  const [curateIdx, setCurateIdx] = useState(() => {
    if (typeof window === 'undefined') return 0
    const { i } = parseCurateParams(window.location.search)
    const max = Math.max(0, roster.length - 1)
    return Math.min(Math.max(0, i), max)
  })

  useEffect(() => {
    if (!curateMode) return
    const url = new URL(window.location.href)
    url.searchParams.set('curate', '1')
    url.searchParams.set('i', String(curateIdx))
    window.history.replaceState(null, '', url)
  }, [curateMode, curateIdx])

  const exitCurateHref =
    typeof window !== 'undefined' ? `${window.location.pathname}${window.location.hash}` : '.'

  return { curateMode, curateIdx, setCurateIdx, exitCurateHref }
}
