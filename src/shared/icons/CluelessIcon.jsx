import React from 'react'

export default function Icon({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="12.6"
        y="12.08"
        width="41.36"
        height="41.36"
        transform="translate(66.04 -.52) rotate(90)"
        fill="#faa80a"
        stroke="black"
        strokeWidth="5"
        strokeMiterlimit="3"
      />

      <rect
        x="96.04"
        y="12.08"
        width="41.36"
        height="41.36"
        transform="translate(149.48 -83.96) rotate(90)"
        fill="#faa80a"
        stroke="black"
        strokeWidth="5"
        strokeMiterlimit="3"
      />

      {/* center square (black via default fill) */}
      <rect
        x="54.32"
        y="53.8"
        width="41.36"
        height="41.36"
        transform="translate(149.48 -.52) rotate(90)"
        stroke="black"
        strokeWidth="5"
        strokeMiterlimit="3"
      />

      <rect
        x="12.6"
        y="95.51"
        width="41.36"
        height="41.36"
        transform="translate(149.48 82.91) rotate(90)"
        fill="#faa80a"
        stroke="black"
        strokeWidth="5"
        strokeMiterlimit="3"
      />

      <rect
        x="96.04"
        y="95.51"
        width="41.36"
        height="41.36"
        transform="translate(232.91 -.52) rotate(90)"
        fill="#faa80a"
        stroke="black"
        strokeWidth="5"
        strokeMiterlimit="3"
      />
    </svg>
  )
}
