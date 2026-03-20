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
            <g>
                <rect
                    x="80.96"
                    y="10.51"
                    width="58.3"
                    height="58.3"
                    fill="#33658a"
                />
                <path d="M136.77,13.01v53.3h-53.3V13.01h53.3M141.77,8.01h-63.3v63.3h63.3V8.01h0Z"/>
            </g>

            <g>
                <rect
                    x="80.96"
                    y="81.19"
                    width="58.3"
                    height="58.3"
                    fill="#33658a"
                />
                <path d="M136.77,83.69v53.3h-53.3v-53.3h53.3M141.77,78.69h-63.3v63.3h63.3v-63.3h0Z"/>
            </g>

            <g>
                <rect
                    x="10.73"
                    y="10.51"
                    width="58.3"
                    height="128.99"
                    fill="#f26419"
                />
                <path d="M66.54,13.01v123.99H13.23V13.01h53.3M71.54,8.01H8.23v133.99h63.3V8.01h0Z"/>
            </g>
        </svg>
    )
}