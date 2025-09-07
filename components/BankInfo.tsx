'use client'

import React, { useState } from 'react'
import { CheckCircle, X } from 'lucide-react'

interface BankInfoProps {
  onSave?: (data: any) => void
  onBack?: () => void
}

export default function BankInfo({ onSave, onBack }: BankInfoProps) {
  const [formData, setFormData] = useState({
    verificationMethod: 'manual', // 'plaid' or 'manual'
    routingNumber: '123445566',
    accountNumber: '12345678901'
  })
  
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
    onSave?.(formData)
  }

  const formatRoutingNumber = (value: string) => {
    // Remove all non-digits and limit to 9 digits
    return value.replace(/\D/g, '').slice(0, 9)
  }

  const formatAccountNumber = (value: string) => {
    // Remove all non-digits
    return value.replace(/\D/g, '')
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="text-green-600" size={20} />
          <span className="text-green-800 font-medium">Bank information saved successfully</span>
          <button 
            onClick={() => setShowSuccessMessage(false)}
            className="ml-auto text-green-600 hover:text-green-800"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Company bank account</h2>
        <p className="text-gray-700 mb-4">
          We'll use your checking account to debit wages and taxes. The account must be a checking account—credit cards, credit payments, and savings accounts aren't accepted.
        </p>
      </div>

      {/* Verification Method Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Choose how you'd like to enter your bank account information</h3>
        
        <div className="space-y-3">
          {/* Plaid Option */}
          <label className="flex items-start space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="verificationMethod"
              value="plaid"
              checked={formData.verificationMethod === 'plaid'}
              onChange={(e) => handleInputChange('verificationMethod', e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Verify with Plaid (Recommended)</div>
              <div className="text-sm text-gray-600 mt-1">
                We use Plaid (a financial technology service) to securely connect to your bank account. This takes just a couple minutes, so you can run your first payroll faster.
              </div>
            </div>
          </label>

          {/* Manual Option */}
          <label className="flex items-start space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="verificationMethod"
              value="manual"
              checked={formData.verificationMethod === 'manual'}
              onChange={(e) => handleInputChange('verificationMethod', e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Enter bank account information manually</div>
            </div>
          </label>
        </div>
      </div>

      {/* Manual Bank Account Entry */}
      {formData.verificationMethod === 'manual' && (
        <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
          {/* Bank Check Illustration */}
          <div className="flex justify-center mb-6">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 w-80">
              <div className="space-y-4">
                {/* Check Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                    <div className="h-2 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="text-right">
                    <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="border border-gray-300 px-2 py-1 text-xs">1053</div>
                  </div>
                </div>
                
                {/* Check Body */}
                <div className="space-y-3">
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
                
                {/* MICR Line */}
                <div className="border-t pt-3 flex justify-between text-xs font-mono">
                  <div>
                    <div className="text-gray-600 mb-1">Routing Number</div>
                    <div className="font-bold">⚹123456789⚹</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Account Number</div>
                    <div className="font-bold">⚹12345678901⚹</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 mb-1"></div>
                    <div className="font-bold">1053</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Routing number (9 digits)
              </label>
              <input
                type="text"
                value={formData.routingNumber}
                onChange={(e) => handleInputChange('routingNumber', formatRoutingNumber(e.target.value))}
                placeholder="123445566"
                className="input-field w-full max-w-md"
                maxLength={9}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Account number
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', formatAccountNumber(e.target.value))}
                placeholder="12345678901"
                className="input-field w-full max-w-md"
              />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              By selecting Save & continue, I acknowledge I won't be able to run payroll for up to 2 business days until the bank verification completes.
            </p>
          </div>
        </div>
      )}

      {/* Plaid Integration Placeholder */}
      {formData.verificationMethod === 'plaid' && (
        <div className="p-8 bg-gray-50 rounded-lg text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect with Plaid</h3>
          <p className="text-gray-600 mb-4">
            Click the button below to securely connect your bank account through Plaid.
          </p>
          <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Connect Bank Account
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button 
          onClick={onBack}
          className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Back
        </button>
        <button 
          onClick={handleSave}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Save & continue
        </button>
      </div>
    </div>
  )
}
