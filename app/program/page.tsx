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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 relative">
      <AdminExportButton />
      <HelpIcon />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="flex justify-center mb-8">
            <SPGLogo />
          </div>

          <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
            <p>{t('programBelief')}</p>
            <p>{t('programSince2007')}</p>
            <p className="text-center text-lg font-semibold text-black py-2">
              {t('programGlobalMeals')}
            </p>
            <p>{t('programEveryProduct')}</p>
            <p>{t('programPartners')}</p>
            <p>{t('programFuture')}</p>
          </div>

          <MealsCounter className="mb-8" />

          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push('/product')}
              className="btn-spg px-8 py-3 rounded-md font-medium text-lg"
            >
              {t('selectProductButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
