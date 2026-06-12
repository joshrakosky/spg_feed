'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SPGLogo from '@/components/SPGLogo'
import AdminExportButton from '@/components/AdminExportButton'
import HelpIcon from '@/components/HelpIcon'
import MealsCounter from '@/components/MealsCounter'
import { useLanguage } from '@/lib/languageContext'

export default function ProgramPage() {
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    const accessGranted = sessionStorage.getItem('accessGranted')
    if (!accessGranted) {
      router.push('/')
    }
  }, [router])

  return (
    <div className="min-h-screen py-12 px-4 relative">
      <AdminExportButton />
      <HelpIcon />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="flex justify-center mb-8">
            <SPGLogo />
          </div>

          <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
            <p>{t('programBelief')}</p>
            <p>{t('programHistory')}</p>
            <p className="text-lg font-semibold text-black">
              {t('programGlobalMeals')}
            </p>
            <p>{t('programEveryProduct')}</p>

            <div className="py-2">
              <img
                src="/images/FEED_partners.jpg"
                alt="FEED partner organizations including Certified B Corporation, No Kid Hungry, World Food Programme, and Akshaya Patra"
                className="w-full h-auto rounded-md border border-gray-200"
              />
            </div>

            <p>{t('programImpact')}</p>
            <p>{t('programThankYou')}</p>
            <p>{t('programClosing')}</p>
          </div>

          <MealsCounter className="mb-8" />

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                sessionStorage.clear()
                router.push('/')
              }}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {t('backToLogin')}
            </button>
            <button
              type="button"
              onClick={() => router.push('/product')}
              className="btn-spg px-6 py-2 rounded-md font-medium"
            >
              {t('selectProductButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
