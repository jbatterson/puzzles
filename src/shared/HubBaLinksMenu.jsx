import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { CHROME_ACTION_ARIA_LABELS, CHROME_ASSET_URLS } from '@shared-contracts/chromeUi.js'
import { HEADER_ACTIONS } from '@shared-contracts/headerActions.js'

const INK = '#1a3d5b'

const iconStyle = {
  fontSize: '1.05rem',
  lineHeight: 1,
  width: '1.25rem',
  textAlign: 'center',
  color: INK,
}

const LINKS = [
  {
    key: 'books',
    label: 'BOOKS',
    href: 'https://beastacademy.com/books',
    iconClass: 'fa-solid fa-book',
  },
  {
    key: 'online',
    label: 'ONLINE LEARNING',
    href: 'https://beastacademy.com/online',
    iconClass: 'fa-solid fa-laptop',
  },
  {
    key: 'schools',
    label: 'FOR SCHOOLS',
    href: 'https://outreach.classroom.beastacademy.com/',
    iconClass: 'fa-solid fa-school',
  },
]

/** Hub top-left cube SVG: Beast Academy program links (dropdown, same interaction as puzzle gear menu). */
export default function HubBaLinksMenu() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const btnRef = useRef(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      const root = rootRef.current
      if (!root || root.contains(e.target)) return
      setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown, true)
    }
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  return (
    <div ref={rootRef} className="puzzle-chrome-menu-root">
      <button
        ref={btnRef}
        type="button"
        className="titlebar-cubebtn"
        aria-label={CHROME_ACTION_ARIA_LABELS[HEADER_ACTIONS.LINKS]}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <img src={CHROME_ASSET_URLS.CUBE_ICON} alt="" aria-hidden="true" />
      </button>

      {open ? (
        <div
          id={menuId}
          className="puzzle-chrome-menu-panel puzzle-chrome-menu-panel--hub-left"
          aria-label="Beast Academy programs"
        >
          <div className="hub-ba-links-menu-header">Advanced math for ages 6-13</div>
          {LINKS.map(({ key, label, href, iconClass }) => (
            <a
              key={key}
              className="hub-ba-links-menu-link"
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={() => close()}
            >
              <i className={iconClass} style={iconStyle} aria-hidden />
              <span className="puzzle-chrome-menu-row-text">{label}</span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  )
}
