import { useEffect, useState } from 'react'
import {
  SUITE_DASHBOARD_PREFS_KEY,
  SUITE_PREFS_UPDATED_EVENT,
} from '@shared-contracts/suiteDashboardPreferences.js'

/** Bumps when `suiteDashboardPreferences` changes (same tab or another tab). */
export default function useSuitePrefsEpoch() {
  const [epoch, setEpoch] = useState(0)
  useEffect(() => {
    const bump = () => setEpoch((n) => n + 1)
    const onStorage = (e) => {
      if (e.key === SUITE_DASHBOARD_PREFS_KEY || e.key === null) bump()
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener(SUITE_PREFS_UPDATED_EVENT, bump)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener(SUITE_PREFS_UPDATED_EVENT, bump)
    }
  }, [])
  return epoch
}
