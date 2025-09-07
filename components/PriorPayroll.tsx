'use client'

import React, { useState } from 'react'
import { ChevronDown, X, CheckCircle, Clock, Database, FileText, Users, AlertCircle, Info } from 'lucide-react'

interface PriorPayrollProps {
  onSave?: (data: any) => void
  onBack?: () => void
}

export default function PriorPayroll({ onSave, onBack }: PriorPayrollProps) {
  const [formData, setFormData] = useState({
    numberOfEmployees: '',
    previousProvider: '',
    accessMethod: '',
    accountId: '',
    enablePriorPayroll: false,
    reviewTaxLiabilities: false
  })
  
  const [showProviderDropdown, setShowProviderDropdown] = useState(false)
  const [showAccessMethodDropdown, setShowAccessMethodDropdown] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showTaxLiabilitiesModal, setShowTaxLiabilitiesModal] = useState(false)

  const payrollProviders = [
    'ADP',
    'Paychex',
    'QuickBooks Payroll',
    'Gusto',
    'BambooHR',
    'Workday',
    'UltiPro',
    'Paylocity',
    'TriNet',
    'Justworks',
    'Rippling',
    'OnPay',
    'SurePayroll',
    'Patriot Payroll',
    'Other'
  ]

  const accessMethods = [
    { value: 'authorized', label: 'Authorized Access', description: 'We\'ll connect directly with your provider' },
    { value: 'reports', label: 'Provided Reports', description: 'You\'ll upload reports from your provider' },
    { value: 'account-id', label: 'Previous Provider Account ID', description: 'Access using your account credentials' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleEnablePriorPayroll = () => {
    setFormData(prev => ({ ...prev, enablePriorPayroll: true }))
  }

  const handleSave = async () => {
    setIsProcessing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
    onSave?.(formData)
  }

  const isFormValid = () => {
    if (!formData.enablePriorPayroll) return false
    return formData.numberOfEmployees && 
           formData.previousProvider && 
           formData.accessMethod &&
           (formData.accessMethod !== 'account-id' || formData.accountId)
  }

  if (!formData.enablePriorPayroll) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <Database className="w-12 h-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Import Prior Payroll Data</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            You have not checked the option to include prior payroll during setup. In case you 
            need to add prior payroll data for your employees, you can import the necessary 
            details and continue processing payrolls.
          </p>
          <button
            onClick={handleEnablePriorPayroll}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Enable Prior Payroll
          </button>
        </div>

        {/* Information Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Why import prior payroll data?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Ensures accurate year-to-date calculations</li>
                <li>• Maintains compliance with tax reporting requirements</li>
                <li>• Provides complete payroll history for your employees</li>
                <li>• Enables seamless transition from your previous provider</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          <span className="text-green-800 font-medium">Prior payroll configuration saved successfully!</span>
        </div>
      )}

      {/* Processing Message */}
      {isProcessing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
          <Clock className="w-5 h-5 text-blue-600 mr-3 animate-spin" />
          <span className="text-blue-800 font-medium">Processing your payroll profile update...</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Prior Payroll Setup</h2>
        <p className="text-gray-600">
          Configure your previous payroll information to ensure accurate data transfer and tax calculations.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Number of Employees */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Number of Employees
          </label>
          <p className="text-sm text-gray-600 mb-2">
            How many employees did you have with your previous payroll provider?
          </p>
          <input
            type="number"
            value={formData.numberOfEmployees}
            onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
            placeholder="Enter number of employees"
            className="input-field w-full max-w-md"
            min="1"
          />
        </div>

        {/* Previous Payroll Provider */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Previous Payroll Provider
          </label>
          <p className="text-sm text-gray-600 mb-2">
            Select your previous payroll provider from the list below.
          </p>
          <button
            onClick={() => setShowProviderDropdown(!showProviderDropdown)}
            className="input-field w-full max-w-md flex items-center justify-between"
          >
            <span className={formData.previousProvider ? 'text-gray-900' : 'text-gray-500'}>
              {formData.previousProvider || 'Select a provider'}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProviderDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showProviderDropdown && (
            <div className="absolute z-10 mt-1 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="max-h-60 overflow-y-auto">
                {payrollProviders.map((provider) => (
                  <button
                    key={provider}
                    onClick={() => {
                      handleInputChange('previousProvider', provider)
                      setShowProviderDropdown(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {provider}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Payroll History Access Method */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Payroll History Access Method
          </label>
          <p className="text-sm text-gray-600 mb-2">
            Choose how you'd like to provide your payroll history data.
          </p>
          <button
            onClick={() => setShowAccessMethodDropdown(!showAccessMethodDropdown)}
            className="input-field w-full max-w-md flex items-center justify-between"
          >
            <span className={formData.accessMethod ? 'text-gray-900' : 'text-gray-500'}>
              {formData.accessMethod ? accessMethods.find(m => m.value === formData.accessMethod)?.label : 'Choose access method'}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showAccessMethodDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showAccessMethodDropdown && (
            <div className="absolute z-10 mt-1 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="max-h-60 overflow-y-auto">
                {accessMethods.map((method) => (
                  <button
                    key={method.value}
                    onClick={() => {
                      handleInputChange('accessMethod', method.value)
                      setShowAccessMethodDropdown(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">{method.label}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Account ID (conditional) */}
        {formData.accessMethod === 'account-id' && (
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Account ID
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Enter your account ID from your previous payroll provider.
            </p>
            <input
              type="text"
              value={formData.accountId}
              onChange={(e) => handleInputChange('accountId', e.target.value)}
              placeholder="Enter your account ID"
              className="input-field w-full max-w-md"
            />
          </div>
        )}
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>Once you provide this information, we will update your payroll profile as needed.</p>
              <p>After your payroll profile is updated, you'll get access to the <strong>Previous Payroll Provider Access</strong> tool. This allows you to connect with your previous provider's data for easy transfer. Here, you'll see detailed steps on the Prior Payroll screen for setting permissions and adding any necessary users.</p>
              <p>Once setup is complete, we will start transferring your historical data. During this period, payroll processing in Minbody Payroll will be temporarily paused.</p>
              <p className="font-medium">While your data is being transferred, you'll see a <strong>Processing</strong> message. Wait until this is complete before starting new payrolls.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Information */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-900 mb-2">We'll need your full payroll history for 2025</h3>
            <p className="text-sm text-amber-800 mb-3">
              This is so we can accurately calculate and report your taxes through the rest of the year.
            </p>
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-2">What you'll need:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Quarter-to-date (QTD) paystub information from each prior quarter for active and dismissed employees paid this year</li>
                <li>Individual paystubs from the current quarter for active and dismissed employees</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Liabilities Review Toggle */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Tax Liabilities</h3>
            <p className="text-sm text-gray-600">
              Review and submit tax liabilities from your previous payroll provider
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setFormData(prev => ({ ...prev, reviewTaxLiabilities: !prev.reviewTaxLiabilities }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                formData.reviewTaxLiabilities ? 'bg-gray-900' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.reviewTaxLiabilities ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        
        {formData.reviewTaxLiabilities && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowTaxLiabilitiesModal(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Review Tax Liabilities
            </button>
          </div>
        )}
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
          disabled={!isFormValid() || isProcessing}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isFormValid() && !isProcessing
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isProcessing ? 'Processing...' : 'Save & continue'}
        </button>
      </div>

      {/* Tax Liabilities Modal */}
      {showTaxLiabilitiesModal && <TaxLiabilitiesModal onClose={() => setShowTaxLiabilitiesModal(false)} />}
    </div>
  )
}

// Tax Liabilities Modal Component
function TaxLiabilitiesModal({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [payrollData, setPayrollData] = useState({
    checkDate: '08-06-2025',
    payPeriodStart: '02-09-2025',
    payPeriodEnd: '04-09-2025'
  })

  const dummyTaxLiabilities = [
    {
      name: 'Massachusetts Paid Family and Medical Leave - Employee',
      amount: 36.80,
      status: 'PENDING',
      dueDate: 'Pending',
      depositPeriod: '03 Nov 2024 - 09 Nov 2024'
    },
    {
      name: 'Massachusetts State Tax',
      amount: 367.09,
      status: 'PENDING',
      dueDate: 'Pending',
      depositPeriod: '03 Nov 2024 - 09 Nov 2024'
    },
    {
      name: 'Federal Income Tax',
      amount: 1388.84,
      status: 'PENDING',
      dueDate: 'Pending',
      depositPeriod: '03 Nov 2024 - 09 Nov 2024'
    },
    {
      name: 'Medicare',
      amount: 116.00,
      status: 'PENDING',
      dueDate: 'Pending',
      depositPeriod: '03 Nov 2024 - 09 Nov 2024'
    }
  ]

  const renderPayrollDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Previous payroll details</h2>
        <div className="border-b border-gray-200 mb-6"></div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter your payroll dates</h3>
        <p className="text-sm text-gray-600 mb-6">These are the dates your team worked during this payroll period.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Check date
            </label>
            <p className="text-sm text-gray-600 mb-2">The date that your employees were paid.</p>
            <input
              type="date"
              value={payrollData.checkDate}
              onChange={(e) => setPayrollData(prev => ({ ...prev, checkDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Pay period start date
              </label>
              <input
                type="date"
                value={payrollData.payPeriodStart}
                onChange={(e) => setPayrollData(prev => ({ ...prev, payPeriodStart: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Pay period end date
              </label>
              <input
                type="date"
                value={payrollData.payPeriodEnd}
                onChange={(e) => setPayrollData(prev => ({ ...prev, payPeriodEnd: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 mt-8 border-t border-gray-200">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Back
          </button>
          <button 
            onClick={() => setCurrentStep(2)}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Save & continue
          </button>
        </div>
      </div>
    </div>
  )

  const renderPayrollEntriesStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Payroll details for Jun 8, 2025</h2>
        <div className="border-b border-gray-200 mb-6"></div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter earnings and taxes</h3>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Empty state - no employees added yet */}
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No employees added yet. Add employees to continue.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-6 mt-8 border-t border-gray-200">
          <button 
            onClick={() => setCurrentStep(1)}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Back
          </button>
          <button 
            onClick={() => setCurrentStep(3)}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Save & continue
          </button>
        </div>
      </div>
    </div>
  )

  const renderTaxLiabilitiesStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Review and submit tax liabilities</h2>
        <div className="border-b border-gray-200 mb-6"></div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          Since you're switching payroll providers mid-year, we've calculated the amounts you may owe - select what you'd like us to pay on your behalf. If you need to confirm the amounts, ask your current payroll provider for your outstanding tax liabilities.
        </p>
        
        <p className="text-gray-700">
          We will debit your company's bank account for the total tax amount 2 days after you run your first payroll with us.
        </p>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax amounts</h3>
          <p className="text-gray-600 mb-6">Your tax liabilities will be listed here after adding the tax amounts to your previous payrolls</p>

          <div className="space-y-3">
            {dummyTaxLiabilities.map((tax, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{tax.name}</h4>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        {tax.status}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Amount Due:</span> ${tax.amount.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-medium">Due Date:</span> {tax.dueDate}
                      </div>
                      <div>
                        <span className="font-medium">Deposit Period:</span> {tax.depositPeriod}
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center pt-6 mt-8 border-t border-gray-200">
          <button 
            onClick={onClose}
            className="px-8 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Tax Liabilities Review</h1>
              <div className="flex items-center space-x-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                }`}>1</span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                }`}>2</span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 3 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                }`}>3</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {currentStep === 1 && renderPayrollDetailsStep()}
          {currentStep === 2 && renderPayrollEntriesStep()}
          {currentStep === 3 && renderTaxLiabilitiesStep()}
        </div>
      </div>
    </div>
  )
}
