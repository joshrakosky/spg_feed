// Simon Property Group logo for SPG FEED program

'use client'

import { useState } from 'react'

export default function SPGLogo({ className = '' }: { className?: string }) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div
        className={`font-bold text-black ${className}`}
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          letterSpacing: '-0.02em',
        }}
      >
        Simon Property Group
      </div>
    )
  }

  return (
    <img
      src="/images/simon-logo.jpg"
      alt="Simon Property Group"
      className={className}
      onError={() => setImageError(true)}
      style={{ maxWidth: '100%', height: 'auto', maxHeight: '80px' }}
    />
  )
}
