'use client'

import React, { useState } from 'react'
import { ChevronDown, X, CheckCircle } from 'lucide-react'

interface FederalTaxInfoProps {
  onSave?: (data: any) => void
  onBack?: () => void
}

export default function FederalTaxInfo({ onSave, onBack }: FederalTaxInfoProps) {
  const [formData, setFormData] = useState({
    industry: '',
    federalEIN: '',
    taxPayerType: '',
    federalFilingForm: '941',
    legalEntityName: ''
  })
  
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false)
  const [showTaxPayerDropdown, setShowTaxPayerDropdown] = useState(false)
  const [showFilingFormDropdown, setShowFilingFormDropdown] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [industrySearch, setIndustrySearch] = useState('')

  const industries = [
    'Software Publishers',
    'Softwood Veneer and Plywood Manufacturing',
    'Computer and Computer Peripheral Equipment and Software Merchant Wholesalers',
    'Soft Drink Manufacturing',
    'Upholstered Household Furniture Manufacturing',
    'Custom Computer Programming Services',
    'Siding Contractors'
  ]

  const taxPayerTypes = [
    'C-Corporation',
    'S-Corporation', 
    'Sole proprietor',
    'LLC',
    'LLP',
    'Limited partnership',
    'Co-ownership',
    'Association',
    'Trusteeship',
    'General partnership',
    'Joint venture',
    'Non-Profit'
  ]

  const filingForms = [
    { value: '941', label: '941 - Employer\'s Quarterly Federal Tax Return' },
    { value: '944', label: '944 - Employer\'s Annual Federal Tax Return' }
  ]

  const filteredIndustries = industries.filter(industry =>
    industry.toLowerCase().includes(industrySearch.toLowerCase())
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
    onSave?.(formData)
  }

  const formatEIN = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    
    // Format as XX-XXXXXXX
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 9)}`
    }
    return digits
  }

  const handleEINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatEIN(e.target.value)
    handleInputChange('federalEIN', formatted)
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="text-green-600" size={20} />
          <span className="text-green-800 font-medium">Federal tax details saved successfully</span>
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
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Federal tax information</h2>
      </div>

      {/* Industry Selection */}
      <div className="space-y-4">
        <div>
          <p className="text-gray-700 mb-4">
            Select the industry that best matches your business. If you're between options, pick the one that reflects your main source of income.
          </p>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">Industry</label>
            <p className="text-sm text-gray-600 mb-2">Search by keyword or NAICS code</p>
            
            <div className="relative">
              <input
                type="text"
                value={industrySearch}
                onChange={(e) => {
                  setIndustrySearch(e.target.value)
                  setShowIndustryDropdown(true)
                }}
                onFocus={() => setShowIndustryDropdown(true)}
                placeholder="Soft"
                className="input-field w-full pr-10"
              />
              <ChevronDown 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                size={16} 
              />
              
              {showIndustryDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredIndustries.map((industry, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleInputChange('industry', industry)
                        setIndustrySearch(industry)
                        setShowIndustryDropdown(false)
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div>
          <p className="text-gray-700 mb-4">
            Enter your entity type and the legal name of your company. You can find this info on your{' '}
            <a href="#" className="text-blue-600 underline">FEIN assignment form (Form CP575)</a>. 
            We need this to file and pay your taxes correctly.
          </p>
        </div>

        {/* Federal EIN */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Federal EIN</label>
          <p className="text-sm text-gray-600 mb-2">
            Your company's Federal Employer Identification Number (EIN). If you don't have one, please{' '}
            <a href="#" className="text-blue-600 underline">apply online</a>.
          </p>
          <input
            type="text"
            value={formData.federalEIN}
            onChange={handleEINChange}
            placeholder="__-_______"
            className="input-field w-full max-w-md"
            maxLength={10}
          />
        </div>

        {/* Tax Payer Type */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Tax payer type</label>
          <p className="text-sm text-gray-600 mb-2">Some common types are Sole Prop, LLC, and S-Corp.</p>
          
          <div className="relative">
            <button
              onClick={() => setShowTaxPayerDropdown(!showTaxPayerDropdown)}
              className="input-field w-full max-w-md flex items-center justify-between"
            >
              <span className={formData.taxPayerType ? 'text-gray-900' : 'text-gray-500'}>
                {formData.taxPayerType || 'Select tax payer type'}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            
            {showTaxPayerDropdown && (
              <div className="absolute z-10 w-full max-w-md mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {taxPayerTypes.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleInputChange('taxPayerType', type)
                      setShowTaxPayerDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                      type === 'Sole proprietor' ? 'bg-gray-900 text-white hover:bg-gray-800' : ''
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Federal Filing Form */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Federal filing form</label>
          <p className="text-sm text-gray-600 mb-2">
            To learn more about the different Federal Tax Form filings for payroll, please review the{' '}
            <a href="#" className="text-blue-600 underline">IRS website</a>.
          </p>
          
          <div className="relative">
            <button
              onClick={() => setShowFilingFormDropdown(!showFilingFormDropdown)}
              className="input-field w-full max-w-md flex items-center justify-between"
            >
              <span className="text-gray-900">
                {filingForms.find(form => form.value === formData.federalFilingForm)?.label || 
                 '941 - Employer\'s Quarterly Federal Tax Return'}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            
            {showFilingFormDropdown && (
              <div className="absolute z-10 w-full max-w-md mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {filingForms.map((form, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleInputChange('federalFilingForm', form.value)
                      setShowFilingFormDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                      form.value === '941' ? 'bg-gray-900 text-white hover:bg-gray-800' : ''
                    }`}
                  >
                    {form.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Legal Entity Name */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Legal entity name</label>
          <p className="text-sm text-gray-600 mb-2">Make sure this is your legal name, not your DBA.</p>
          <input
            type="text"
            value={formData.legalEntityName}
            onChange={(e) => handleInputChange('legalEntityName', e.target.value)}
            placeholder="Intersite"
            className="input-field w-full max-w-md"
          />
        </div>
      </div>

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
