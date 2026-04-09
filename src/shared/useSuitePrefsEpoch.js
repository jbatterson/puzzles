import { useEffect, useState } from 'react'
import { SUITE_DASHBOARD_PREFS_KEY } from '@shared-contracts/suiteDashboardPreferences.js'

/** Bumps when `suiteDashboardPreferences` changes in another tab (localStorage `storage` event). */
export default function useSuitePrefsEpoch() {
  const [epoch, setEpoch] = useState(0)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === SUITE_DASHBOARD_PREFS_KEY || e.key === null) setEpoch((n) => n + 1)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  return epoch
}
