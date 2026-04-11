/**
 * Vitest global setup — runs before every test file in the shared-contracts suite.
 *
 * Node 25 ships a built-in localStorage that requires --localstorage-file to point at
 * a valid path before .clear() is available. jsdom does not fully override it in that
 * version, leaving tests with a half-functional stub. This setup replaces globalThis.localStorage
 * with a proper in-memory implementation so every test gets a clean, spec-compliant store.
 */

class InMemoryStorage {
  #store = new Map()

  getItem(key) {
    return this.#store.has(key) ? this.#store.get(key) : null
  }

  setItem(key, value) {
    this.#store.set(String(key), String(value))
  }

  removeItem(key) {
    this.#store.delete(String(key))
  }

  clear() {
    this.#store.clear()
  }

  get length() {
    return this.#store.size
  }

  key(index) {
    return [...this.#store.keys()][index] ?? null
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: new InMemoryStorage(),
  writable: true,
  configurable: true,
})
