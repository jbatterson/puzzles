import { useEffect } from 'react'
import { ensureSuiteGameTimerStart } from '../../shared-contracts/suiteCompletionTimer.js'

/**
 * Start persisted session timer on first daily load while the set is still in progress.
 * @param {string} gameKey
 * @param {string} dateKey
 * @param {{ track: boolean, alreadyFullyComplete: boolean }} opts
 */
export default function useSuiteCompletionTimer(gameKey, dateKey, opts) {
	const { track, alreadyFullyComplete } = opts
	useEffect(() => {
		ensureSuiteGameTimerStart(gameKey, dateKey, { track, alreadyFullyComplete })
	}, [gameKey, dateKey, track, alreadyFullyComplete])
}
