'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AdminExportButton from '@/components/AdminExportButton'
import HelpIcon from '@/components/HelpIcon'
import MealsCounter from '@/components/MealsCounter'
import { useLanguage } from '@/lib/languageContext'

export default function ConfirmationPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [orderNumber, setOrderNumber] = useState<string>('')
  const [orderMeals, setOrderMeals] = useState<string>('')

  useEffect(() => {
    const orderNum = sessionStorage.getItem('orderNumber')
    if (!orderNum) {
      router.push('/')
      return
    }
    setOrderNumber(orderNum)
    setOrderMeals(sessionStorage.getItem('orderMeals') || '')
  }, [router])

  return (
    <>
      <AdminExportButton />
      <HelpIcon />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center border border-gray-200">
          <div className="mb-6">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('orderConfirmed')}</h1>
            <p className="text-gray-600">{t('thankYouOrder')}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-4">
            <p className="text-sm text-gray-600 mb-2">{t('yourOrderNumber')}</p>
            <p className="text-2xl font-bold text-black">{orderNumber}</p>
          </div>

          {orderMeals && (
            <p className="text-gray-700 mb-6">
              {t('mealsFromOrder').replace('{count}', orderMeals)}
            </p>
          )}

          <div className="mb-6">
            <MealsCounter variant="compact" />
          </div>

          <p className="text-sm text-gray-600 mb-6">{t('screenshotInfo')}</p>

          <a
            href={`mailto:?subject=${encodeURIComponent(t('emailSubject').replace('{orderNumber}', orderNumber))}&body=${encodeURIComponent(t('emailBody').replace('{orderNumber}', orderNumber).replace(/\n/g, '\r\n'))}`}
            onClick={() => {
              setTimeout(() => {
                sessionStorage.clear()
              }, 100)
            }}
            className="w-full btn-spg py-2 px-4 rounded-md font-medium inline-block text-center"
          >
            {t('emailConfirmation')}
          </a>
        </div>
      </div>
    </>
  )
}
