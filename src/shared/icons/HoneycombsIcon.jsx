import React from 'react'
import { HONEYCOMBS_BEE_ART_INNER_HTML } from './honeycombsBeeArtSvg.js'

export default function Icon({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: HONEYCOMBS_BEE_ART_INNER_HTML }}
    />
  )
}
