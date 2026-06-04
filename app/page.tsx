'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SPGLogo from '@/components/SPGLogo'
import AdminExportButton from '@/components/AdminExportButton'
import HelpIcon from '@/components/HelpIcon'
import AnimatedBackground from '@/components/AnimatedBackground'
import { useLanguage } from '@/lib/languageContext'

const ADMIN_CODE = 'admin'

export default function LandingPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code.trim()) {
      setError(t('accessCodeRequired'))
      return
    }

    if (code !== ADMIN_CODE) {
      setError(t('accessCodeInvalid'))
      return
    }

    sessionStorage.setItem('accessGranted', 'true')
    sessionStorage.setItem('adminAuth', 'true')

    router.push('/program')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <AnimatedBackground />
      <AdminExportButton />
      <HelpIcon />
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 py-10 border border-gray-200">
        <div className="text-center mb-6">
          <div className="mb-6 flex justify-center">
            <SPGLogo className="text-xl" />
          </div>
          <p className="text-gray-600">{t('enterAccessCode')}</p>
        </div>

        <form onSubmit={handleStart} className="space-y-6">
          <div>
            <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-2">
              {t('accessCode')}
            </label>
            <input
              type="text"
              id="accessCode"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError('')
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
              placeholder={t('accessCodePlaceholder')}
              required
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full btn-spg py-3 px-4 rounded-md transition-colors font-medium"
          >
            {t('startShopping')}
          </button>
        </form>
      </div>
    </div>
  )
}
