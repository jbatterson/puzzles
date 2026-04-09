export const HEADER_ACTIONS = Object.freeze({
  HOME: 'home',
  LINKS: 'links',
  STATS: 'stats',
  HELP: 'help',
})

export function ensureHeaderActions(actions = {}) {
  const fallback = () => {}
  return {
    [HEADER_ACTIONS.HOME]:
      typeof actions[HEADER_ACTIONS.HOME] === 'function' ? actions[HEADER_ACTIONS.HOME] : fallback,
    [HEADER_ACTIONS.LINKS]:
      typeof actions[HEADER_ACTIONS.LINKS] === 'function'
        ? actions[HEADER_ACTIONS.LINKS]
        : fallback,
    [HEADER_ACTIONS.STATS]:
      typeof actions[HEADER_ACTIONS.STATS] === 'function'
        ? actions[HEADER_ACTIONS.STATS]
        : fallback,
    [HEADER_ACTIONS.HELP]:
      typeof actions[HEADER_ACTIONS.HELP] === 'function' ? actions[HEADER_ACTIONS.HELP] : fallback,
  }
}
