'use client'

import { createContext, useContext, ReactNode } from 'react'

interface LanguageContextType {
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// English-only strings for SPG FEED program
const translations: Record<string, string> = {
  enterAccessCode: 'Enter the admin code to access the program.',
  accessCode: 'Admin code',
  accessCodePlaceholder: 'Enter admin code',
  accessCodeRequired: 'Please enter the admin code',
  accessCodeInvalid: 'Invalid code. Please try again.',
  startShopping: 'Enter →',
  selectProduct: 'Select Your Tote',
  chooseProduct: 'Choose one FEED tote to continue',
  pleaseSelectProduct: 'Please select a tote',
  continueShipping: 'Continue to Shipping →',
  loadingProducts: 'Loading products...',
  providesMeals: 'Provides {count} school meals',
  shippingInfo: 'Shipping Information',
  provideShipping: 'Please provide your shipping details',
  shippingInstructions: 'Enter the address where your order should be shipped.',
  emailAddress: 'Email Address',
  emailRequiredAtCheckout: 'Required for order confirmation and tracking',
  fullName: 'Full Name',
  phoneNumber: 'Phone Number',
  phoneRequired: 'Please enter your phone number.',
  streetAddress: 'Street Address',
  addressLine2: 'Address Line 2',
  city: 'City',
  state: 'State',
  zipCode: 'ZIP Code',
  country: 'Country',
  validEmail: 'Please enter a valid email address',
  fillRequiredFields: 'Please fill in all required address fields',
  continueReview: 'Continue to Review →',
  reviewOrder: 'Review Your Order',
  reviewInfo:
    'Please review your tote selection and shipping information before submitting.',
  selectedProduct: 'Selected Tote',
  schoolMealsImpact: 'School meals from this order',
  submitOrder: 'Submit Order →',
  submitting: 'Submitting...',
  orderConfirmed: 'Order Confirmed!',
  thankYouOrder: 'Thank you for supporting the SPG FEED program',
  yourOrderNumber: 'Your Order Number:',
  mealsFromOrder: 'Your order provides {count} school meals for children worldwide.',
  screenshotInfo:
    'Screenshot this page or email yourself your order number using the button below',
  emailConfirmation: 'Email Order Confirmation',
  emailSubject: 'SPG FEED Order Confirmation - {orderNumber}',
  emailBody:
    'Thank you for your SPG FEED order!\n\nYour Order Number: {orderNumber}\n\nThis order helps provide school meals for children around the world.\n\nPlease save this order number for your records.',
  programBelief:
    'We believe the things you buy should work harder for you, the planet, and our future.',
  programSince2007:
    'Since 2007, FEED has made continuous donations to end childhood hunger and has stretched to meet environmental goals in how we operate.',
  programGlobalMeals: "You've helped give 128 million meals since 2007",
  programEveryProduct:
    'Every FEED product provides school meals to children — sometimes their only meal that day.',
  programPartners:
    'Your purchases support our on-the-ground partners working to alleviate hunger crises and chronic malnutrition through school feeding programs. A healthy child in the classroom grows into an educated adult with a better chance of a well-paying job. Ending childhood hunger helps lift children and their families out of generational poverty.',
  programFuture:
    "The meals your FEED purchases help provide are more than just calories; they're a chance at a better future.",
  selectProductButton: 'Select Product →',
  backToProgram: '← Back to Program',
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => translations[key] || key

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
