'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import AdminExportButton from '@/components/AdminExportButton'
import HelpIcon from '@/components/HelpIcon'
import MealsCounter from '@/components/MealsCounter'
import { useLanguage } from '@/lib/languageContext'

export default function ShippingPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const accessGranted = sessionStorage.getItem('accessGranted')
    const product = sessionStorage.getItem('product')
    if (!accessGranted || !product) {
      router.push('/')
      return
    }

    const savedShipping = sessionStorage.getItem('shipping')
    if (savedShipping) {
      try {
        const parsed = JSON.parse(savedShipping)
        setFormData((prev) => ({ ...prev, ...parsed }))
      } catch {
        // use empty form
      }
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.email.includes('@')) {
      setError(t('validEmail'))
      return
    }

    if (!formData.name?.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!formData.phone?.trim()) {
      setError(t('phoneRequired'))
      return
    }

    if (
      !formData.address?.trim() ||
      !formData.city?.trim() ||
      !formData.state?.trim() ||
      !formData.zip?.trim() ||
      !formData.country?.trim()
    ) {
      setError(t('fillRequiredFields'))
      return
    }

    sessionStorage.setItem('orderEmail', formData.email.toLowerCase())
    sessionStorage.setItem('shipping', JSON.stringify(formData))
    router.push('/review')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const inputClass =
    'w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white'

  return (
    <>
      <AdminExportButton />
      <HelpIcon />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 text-center">
            <MealsCounter variant="compact" />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('shippingInfo')}</h1>
              <p className="text-gray-600">{t('shippingInstructions')}</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('emailAddress')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="your.email@example.com"
                />
                <p className="mt-1 text-xs text-gray-500">{t('emailRequiredAtCheckout')}</p>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('fullName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('phoneNumber')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="(555) 555-5555"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('streetAddress')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('addressLine2')}
                </label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('city')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('state')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('zipCode')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('country')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => router.push('/product')}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  ← Back
                </button>
                <button type="submit" className="btn-spg px-6 py-2 rounded-md font-medium">
                  {t('continueReview')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
