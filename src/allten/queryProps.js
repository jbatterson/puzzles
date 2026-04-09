import qs from 'query-string'

/**
 * Mirrors legacy `puzzlegames/allten/index.html` query parsing for `?n=`, targets, and rule flags.
 * @param {string} search - `window.location.search`
 */
export function computePropsFromQueryString(search) {
  const parsed = qs.parse(search.startsWith('?') ? search.slice(1) : search)
  const props = { rules: {} }

  const n = String(parsed.n || '')
  if (/^[0-9]{4}$/.test(n)) {
    props.start = n.split('').map((a) => parseInt(a, 10))
  } else if (/^[0-9,]+$/.test(n)) {
    props.start = n.split(',').map((a) => parseInt(a, 10))
  } else if (n) {
    throw new Error(
      'URL must include ?n=abcd, where abcd is 4 digits or a comma separated list of numbers.'
    )
  }

  if (parsed.targets) {
    const targets = String(parsed.targets)
      .split(',')
      .map((a) => parseInt(a, 10))
    const allOk =
      targets.length > 0 && targets.length <= 10 && targets.every((t) => Number.isFinite(t))
    if (allOk) {
      props.targets = targets
    }
  }

  if (parsed.forbidOps) {
    const forbidOpsStr = String(parsed.forbidOps)
    props.rules.forbidOps = [
      forbidOpsStr.includes('a') ? '+' : null,
      forbidOpsStr.includes('s') ? '-' : null,
      forbidOpsStr.includes('m') ? '*' : null,
      forbidOpsStr.includes('d') ? '/' : null,
    ].filter(Boolean)
  }
  if (parsed.forbidParens) {
    props.rules.forbidParens = true
  }
  if (parsed.forbidConcat) {
    props.rules.forbidConcat = true
  } else if (props.start && props.start.some((n) => n >= 10 || n < 0)) {
    props.rules.forbidConcat = true
  }
  if (parsed.singleOps) {
    props.rules.singleOps = true
  }
  if (parsed.opLimit) {
    const opLimit = parseInt(String(parsed.opLimit), 10)
    if (Number.isFinite(opLimit) && opLimit > 0) {
      props.rules.opLimit = opLimit
    }
  }
  if (parsed.impossible) {
    const impossible = parseInt(String(parsed.impossible), 10)
    if (Number.isFinite(impossible) && impossible > 0) {
      props.rules.impossible = impossible
    }
  }

  return props
}
