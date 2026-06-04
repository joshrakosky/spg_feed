'use client'

import { useState } from 'react'

export default function HelpIcon() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowHelp(true)}
        className="fixed top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center bg-black text-white font-bold text-lg transition-opacity shadow-md z-40 hover:opacity-90"
        aria-label="Help"
      >
        ?
      </button>

      {showHelp && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          onClick={() => setShowHelp(false)}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">Help & Contact</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="space-y-4 text-black">
              <div>
                <p className="text-sm mb-2 font-medium">For site questions:</p>
                <a href="mailto:mpp.ecomm@proforma.com" className="hover:underline font-medium">
                  mpp.ecomm@proforma.com
                </a>
              </div>
              <div>
                <p className="text-sm mb-2 font-medium">For order questions:</p>
                <a href="mailto:metroinfo@proforma.com" className="hover:underline font-medium">
                  metroinfo@proforma.com
                </a>
              </div>
              <div>
                <p className="text-sm mb-2 font-medium">Phone:</p>
                <a href="tel:317-885-0077" className="hover:underline font-medium">
                  317-885-0077
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
