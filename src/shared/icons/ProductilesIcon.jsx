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
                    x="81.19"
                    y="80.96"
                    width="58.3"
                    height="58.3"
                    fill="#c066c7"
                />
                <path d="M136.99,83.46v53.3h-53.3v-53.3h53.3M141.99,78.46h-63.3v63.3h63.3v-63.3h0Z"/>
            </g>

            <g>
                <rect
                    x="10.51"
                    y="80.96"
                    width="58.3"
                    height="58.3"
                    fill="#c066c7"
                />
                <path d="M66.31,83.46v53.3H13.01v-53.3h53.3M71.31,78.46H8.01v63.3h63.3v-63.3h0Z"/>
            </g>

            <g>
                <rect
                    x="10.51"
                    y="10.73"
                    width="128.99"
                    height="58.3"
                    fill="#f26419"
                />
                <path d="M136.99,13.23v53.3H13.01V13.23h123.99M141.99,8.23H8.01v63.3h133.99V8.23h0Z"/>
            </g>
        </svg>
    )
}