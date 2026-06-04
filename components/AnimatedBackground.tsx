'use client'

/**
 * AnimatedBackground — gray SPG emblems bouncing across the login screen.
 * Motion uses translation only (no rotation) so emblems stay upright.
 */
const EMBLEM_SRC = '/images/spg-emblem-black.png'
const EMBLEM_SIZE = 36

// Spread emblems across the viewport with varied bounce timings
const EMBLEMS = [
  { top: '4%', left: '3%', duration: 18, delay: 0, variant: 1 },
  { top: '8%', left: '18%', duration: 22, delay: 1.2, variant: 2 },
  { top: '6%', left: '42%', duration: 20, delay: 0.4, variant: 3 },
  { top: '10%', left: '68%', duration: 24, delay: 2.1, variant: 4 },
  { top: '5%', left: '88%', duration: 19, delay: 0.8, variant: 1 },
  { top: '22%', left: '6%', duration: 26, delay: 1.6, variant: 3 },
  { top: '18%', left: '28%', duration: 21, delay: 3.2, variant: 2 },
  { top: '25%', left: '52%', duration: 23, delay: 0.2, variant: 4 },
  { top: '20%', left: '78%', duration: 17, delay: 2.8, variant: 1 },
  { top: '24%', left: '92%', duration: 25, delay: 1.4, variant: 3 },
  { top: '38%', left: '2%', duration: 20, delay: 0.6, variant: 2 },
  { top: '42%', left: '22%', duration: 27, delay: 2.4, variant: 4 },
  { top: '35%', left: '46%', duration: 22, delay: 1.8, variant: 1 },
  { top: '40%', left: '64%', duration: 19, delay: 3.6, variant: 3 },
  { top: '36%', left: '84%', duration: 24, delay: 0.9, variant: 2 },
  { top: '55%', left: '8%', duration: 21, delay: 2.2, variant: 4 },
  { top: '58%', left: '32%', duration: 18, delay: 1.1, variant: 1 },
  { top: '52%', left: '55%', duration: 26, delay: 3.0, variant: 3 },
  { top: '56%', left: '72%', duration: 23, delay: 0.5, variant: 2 },
  { top: '50%', left: '90%', duration: 20, delay: 2.6, variant: 4 },
  { top: '72%', left: '4%', duration: 25, delay: 1.7, variant: 1 },
  { top: '68%', left: '20%', duration: 19, delay: 3.4, variant: 3 },
  { top: '75%', left: '38%', duration: 22, delay: 0.3, variant: 2 },
  { top: '70%', left: '58%', duration: 28, delay: 2.0, variant: 4 },
  { top: '78%', left: '76%', duration: 17, delay: 1.5, variant: 1 },
  { top: '74%', left: '94%', duration: 24, delay: 3.8, variant: 3 },
  { top: '88%', left: '12%', duration: 21, delay: 2.3, variant: 2 },
  { top: '92%', left: '35%', duration: 26, delay: 0.7, variant: 4 },
  { top: '86%', left: '50%', duration: 18, delay: 3.1, variant: 1 },
  { top: '90%', left: '68%', duration: 23, delay: 1.9, variant: 3 },
  { top: '94%', left: '86%', duration: 20, delay: 2.7, variant: 2 },
] as const

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-200" />

      {EMBLEMS.map((emblem, index) => (
        <img
          key={index}
          src={EMBLEM_SRC}
          alt=""
          aria-hidden
          className={`absolute emblem-gray emblem-bounce-${emblem.variant}`}
          style={{
            top: emblem.top,
            left: emblem.left,
            width: EMBLEM_SIZE,
            height: EMBLEM_SIZE,
            animationDuration: `${emblem.duration}s`,
            animationDelay: `${emblem.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
