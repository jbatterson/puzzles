import React from 'react'

export default function AllTenIcon({ size = 56 }) {
  const s = size
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="currentColor" strokeWidth="4" />
      <path d="M26 22v24" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M20 28l6-6" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path
        d="M44 22c-6 0-10 6-10 12s4 12 10 12 10-6 10-12-4-12-10-12Z"
        stroke="currentColor"
        strokeWidth="6"
      />
    </svg>
  )
}

