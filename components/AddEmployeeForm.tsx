'use client'

import React, { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building, 
  DollarSign,
  Upload,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  designation: string
  department: string
  workAddress: string
  startDate: string
  profilePicture: string
  status: 'active' | 'inactive' | 'pending'
  salary: number
  employeeType: 'full-time' | 'part-time' | 'contractor'
  // Additional fields from screenshots
  middleInitial?: string
  preferredFirstName?: string
  personalEmail?: string
  dateOfBirth?: string
  socialSecurityNumber?: string
  inviteToFillDetails?: boolean
  // Tax information
  filingStatus?: string
  multipleJobs?: boolean
  dependentsTotal?: number
  otherIncome?: number
  deductions?: number
  extraWithholding?: number
  // Payment details
  paymentMethod?: 'direct-deposit' | 'check'
  // Classification
  employeeClassification?: string
  rate?: number
  ratePer?: 'hour' | 'week' | 'month' | 'year' | 'paycheck'
}

interface AddEmployeeFormProps {
  employees: Employee[]
  setEmployees: (employees: Employee[]) => void
}

export default function AddEmployeeForm({ employees, setEmployees }: AddEmployeeFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<Employee>>({
    firstName: '',
    lastName: '',
    middleInitial: '',
    preferredFirstName: '',
    email: '',
    personalEmail: '',
    phone: '',
    designation: '',
    department: '',
    workAddress: '',
    startDate: '',
    dateOfBirth: '',
    socialSecurityNumber: '',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'pending',
    salary: 0,
    employeeType: 'full-time',
    inviteToFillDetails: false,
    filingStatus: 'single',
    multipleJobs: false,
    dependentsTotal: 0,
    otherIncome: 0,
    deductions: 0,
    extraWithholding: 0,
    paymentMethod: 'direct-deposit',
    employeeClassification: 'salary-no-overtime',
    rate: 0,
    ratePer: 'year'
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps = [
    { id: 1, title: 'Personal Details', description: 'Basic employee information' },
    { id: 2, title: 'Compensation', description: 'Job title, salary and classification' },
    { id: 3, title: 'Tax Information', description: 'Federal tax withholdings' },
    { id: 4, title: 'Payment Details', description: 'Payment method and documents' }
  ]

  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Analytics']
  const workAddresses = [
    '525 20th St, San Francisco, CA 94016',
    '1234 Market St, San Francisco, CA 94102',
    '789 Mission St, San Francisco, CA 94103'
  ]

  const handleInputChange = (field: keyof Employee, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required'
        if (!formData.lastName) newErrors.lastName = 'Last name is required'
        if (!formData.email) newErrors.email = 'Work email is required'
        if (!formData.personalEmail) newErrors.personalEmail = 'Personal email is required'
        if (!formData.phone) newErrors.phone = 'Phone number is required'
        if (!formData.startDate) newErrors.startDate = 'Start date is required'
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
        if (!formData.socialSecurityNumber) newErrors.socialSecurityNumber = 'SSN is required'
        break
      case 2:
        if (!formData.designation) newErrors.designation = 'Job title is required'
        if (!formData.department) newErrors.department = 'Department is required'
        if (!formData.workAddress) newErrors.workAddress = 'Work address is required'
        if (!formData.rate || formData.rate <= 0) newErrors.rate = 'Rate is required'
        break
      case 3:
        if (!formData.filingStatus) newErrors.filingStatus = 'Filing status is required'
        break
      case 4:
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const newEmployee: Employee = {
        id: Date.now().toString(),
        firstName: formData.firstName!,
        lastName: formData.lastName!,
        email: formData.email!,
        phone: formData.phone!,
        designation: formData.designation!,
        department: formData.department!,
        workAddress: formData.workAddress!,
        startDate: formData.startDate!,
        profilePicture: formData.profilePicture!,
        status: formData.status!,
        salary: formData.rate! * (formData.ratePer === 'hour' ? 2080 : formData.ratePer === 'month' ? 12 : 1),
        employeeType: formData.employeeType!,
        ...formData
      }

      setEmployees([...employees, newEmployee])
      setShowSuccess(true)
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setShowSuccess(false)
        setCurrentStep(1)
        setFormData({
          firstName: '',
          lastName: '',
          middleInitial: '',
          preferredFirstName: '',
          email: '',
          personalEmail: '',
          phone: '',
          designation: '',
          department: '',
          workAddress: '',
          startDate: '',
          dateOfBirth: '',
          socialSecurityNumber: '',
          profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          status: 'pending',
          salary: 0,
          employeeType: 'full-time',
          inviteToFillDetails: false,
          filingStatus: 'single',
          multipleJobs: false,
          dependentsTotal: 0,
          otherIncome: 0,
          deductions: 0,
          extraWithholding: 0,
          paymentMethod: 'direct-deposit',
          employeeClassification: 'salary-no-overtime',
          rate: 0,
          ratePer: 'year'
        })
      }, 2000)
    }
  }

  if (showSuccess) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Employee Added Successfully!</h3>
        <p className="text-gray-600">The employee has been added to your system.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div         className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
          currentStep >= step.id
            ? 'bg-gray-800 border-gray-800 text-white'
            : 'border-gray-300 text-gray-500'
        }`}>
                {currentStep > step.id ? (
                  <CheckCircle size={16} />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-gray-800' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {currentStep === 1 && (
          <PersonalDetailsStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <CompensationStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            departments={departments}
            workAddresses={workAddresses}
          />
        )}

        {currentStep === 3 && (
          <TaxInformationStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}

        {currentStep === 4 && (
          <PaymentDetailsStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800"
            >
              <Save size={16} className="mr-2" />
              Save Employee
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Step Components
function PersonalDetailsStep({ formData, handleInputChange, errors }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Employee Personal Details</h3>
      <p className="text-sm text-gray-600 mb-6">This information will be used for payroll and taxes, so double-check that it's accurate.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Legal First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Legal first name *
          </label>
          <input
            type="text"
            value={formData.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter legal first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Preferred First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred first name
          </label>
          <input
            type="text"
            value={formData.preferredFirstName || ''}
            onChange={(e) => handleInputChange('preferredFirstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            placeholder="Enter preferred first name"
          />
        </div>

        {/* Middle Initial */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Middle initial (Optional)
          </label>
          <input
            type="text"
            maxLength={1}
            value={formData.middleInitial || ''}
            onChange={(e) => handleInputChange('middleInitial', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            placeholder="M"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last name *
          </label>
          <input
            type="text"
            value={formData.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Work Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work email *
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="employee@company.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Personal Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal email *
          </label>
          <input
            type="email"
            value={formData.personalEmail || ''}
            onChange={(e) => handleInputChange('personalEmail', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.personalEmail ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="personal@email.com"
          />
          <p className="mt-1 text-xs text-gray-500">Use an email that's not associated with your company.</p>
          {errors.personalEmail && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.personalEmail}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone number *
          </label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start date *
          </label>
          <input
            type="date"
            value={formData.startDate || ''}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.startDate}
            </p>
          )}
        </div>

        {/* Social Security Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social security number *
          </label>
          <input
            type="text"
            value={formData.socialSecurityNumber || ''}
            onChange={(e) => handleInputChange('socialSecurityNumber', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.socialSecurityNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123-45-6789"
            maxLength={11}
          />
          <p className="mt-1 text-xs text-red-500">Please make sure the SSN has nine digits and does not include any other characters.</p>
          {errors.socialSecurityNumber && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.socialSecurityNumber}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of birth *
          </label>
          <input
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="mt-1 text-xs text-red-500">Employee must be over 13 years old.</p>
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.dateOfBirth}
            </p>
          )}
        </div>
      </div>

      {/* Invite Toggle */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="inviteEmployee"
            checked={formData.inviteToFillDetails || false}
            onChange={(e) => handleInputChange('inviteToFillDetails', e.target.checked)}
            className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
          />
          <label htmlFor="inviteEmployee" className="ml-3 text-sm font-medium text-gray-700">
            Invite this employee to enter their own details online
          </label>
        </div>
        <p className="mt-1 text-xs text-gray-500 ml-7">
          We'll collect their info so you don't have to. You can always reverse this decision later.
        </p>
      </div>
    </div>
  )
}

function CompensationStep({ formData, handleInputChange, errors, departments, workAddresses }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Employee Compensation Details</h3>
      <p className="text-sm text-gray-600 mb-6">Enter the title, type and salary amount.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job title *
          </label>
          <input
            type="text"
            value={formData.designation || ''}
            onChange={(e) => handleInputChange('designation', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.designation ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Senior Product Manager"
          />
          {errors.designation && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.designation}
            </p>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department *
          </label>
          <select
            value={formData.department || ''}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.department ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select department</option>
            {departments.map((dept: string) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.department}
            </p>
          )}
        </div>

        {/* Employee Classification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee classification *
          </label>
          <select
            value={formData.employeeClassification || ''}
            onChange={(e) => handleInputChange('employeeClassification', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="salary-no-overtime">Salary/No overtime</option>
            <option value="hourly">Hourly</option>
            <option value="contractor">Contractor</option>
          </select>
          <p className="mt-1 text-xs text-blue-600 cursor-pointer hover:underline">
            Learn more about employee classifications.
          </p>
        </div>

        {/* Work Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work address *
          </label>
          <select
            value={formData.workAddress || ''}
            onChange={(e) => handleInputChange('workAddress', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.workAddress ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select work address</option>
            {workAddresses.map((address: string) => (
              <option key={address} value={address}>{address}</option>
            ))}
          </select>
          {errors.workAddress && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.workAddress}
            </p>
          )}
        </div>

        {/* Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate *
          </label>
          <input
            type="number"
            value={formData.rate || ''}
            onChange={(e) => handleInputChange('rate', parseFloat(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.rate ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0"
            min="0"
            step="0.01"
          />
          {errors.rate && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.rate}
            </p>
          )}
        </div>

        {/* Rate Per */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Per *
          </label>
          <select
            value={formData.ratePer || ''}
            onChange={(e) => handleInputChange('ratePer', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="hour">Hour</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="paycheck">Paycheck</option>
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 bg-red-50 rounded-lg">
        <p className="text-sm text-red-600">
          Please check that above information is filled and correct.
        </p>
      </div>
    </div>
  )
}

function TaxInformationStep({ formData, handleInputChange, errors }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Federal Tax Withholdings</h3>
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Step 1: Go to the IRS calculator</h4>
        <p className="text-sm text-gray-600 mb-4">
          A portion of each paycheck is withheld to pay income taxes. To determine how much, first go to the 
          IRS calculator to figure out the answers for each field below.
        </p>
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-2">What to have ready:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Total household income</li>
            <li>Most recent pay stub (if any)</li>
            <li>Most recent tax return</li>
            <li>W-4 form</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-4">Step 2: Set up withholdings</h4>
        <p className="text-sm text-gray-600 mb-4">
          If you select Exempt from withholding, we won't withhold federal income taxes, but we'll still report taxable wages on a W-2. 
          Keep in mind that anyone who claims exemption from withholding needs to submit a new W-4 each year.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Federal Filing Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Federal filing status (1c) *
          </label>
          <select
            value={formData.filingStatus || ''}
            onChange={(e) => handleInputChange('filingStatus', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
              errors.filingStatus ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select filing status</option>
            <option value="single">Single</option>
            <option value="married-filing-jointly">Married filing jointly</option>
            <option value="married-filing-separately">Married filing separately</option>
            <option value="head-of-household">Head of household</option>
          </select>
          {errors.filingStatus && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.filingStatus}
            </p>
          )}
        </div>

        {/* Multiple Jobs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Multiple jobs (2c) (Optional)
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="multipleJobs"
                checked={formData.multipleJobs === true}
                onChange={() => handleInputChange('multipleJobs', true)}
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="multipleJobs"
                checked={formData.multipleJobs === false}
                onChange={() => handleInputChange('multipleJobs', false)}
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">No</span>
            </label>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Includes spouse (if applicable). Answering 2c results in higher withholding, but to preserve privacy, 
            this can be left unchecked. To learn more, read the IRS's instructions.
          </p>
        </div>

        {/* Dependents Total */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dependents total (3) (if applicable) (Optional)
          </label>
          <input
            type="number"
            value={formData.dependentsTotal || ''}
            onChange={(e) => handleInputChange('dependentsTotal', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            placeholder="0"
            min="0"
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter the results for line 3 from the IRS calculator or form W-4.
          </p>
        </div>

        {/* Other Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Other income (4a) (Optional)
          </label>
          <input
            type="number"
            value={formData.otherIncome || ''}
            onChange={(e) => handleInputChange('otherIncome', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            placeholder="0"
            min="0"
            step="0.01"
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter the results for line 4a from the IRS calculator or form W-4.
          </p>
        </div>

        {/* Deductions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deductions (4b) (Optional)
          </label>
          <input
            type="number"
            value={formData.deductions || ''}
            onChange={(e) => handleInputChange('deductions', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            placeholder="0"
            min="0"
            step="0.01"
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter the results for line 4b from the IRS calculator or form W-4.
          </p>
        </div>

        {/* Extra Withholding */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Extra withholding (4c) (Optional)
          </label>
          <input
            type="number"
            value={formData.extraWithholding || ''}
            onChange={(e) => handleInputChange('extraWithholding', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            placeholder="0"
            min="0"
            step="0.01"
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter the results for line 4c from the IRS calculator or form W-4.
          </p>
        </div>
      </div>
    </div>
  )
}

function PaymentDetailsStep({ formData, handleInputChange, errors }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Employee Payment Details</h3>
      <p className="text-sm text-gray-600 mb-6">
        We recommend direct deposit — we can deposit paychecks directly into your employees' bank accounts.
      </p>
      <p className="text-sm text-gray-600 mb-6">
        By selecting check as the payment method you will be required to write a physical check to this 
        employee every payday (we will tell you the exact amount to pay).
      </p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Select payment method: *
        </label>
        <div className="flex space-x-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="direct-deposit"
              checked={formData.paymentMethod === 'direct-deposit'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Direct Deposit</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="check"
              checked={formData.paymentMethod === 'check'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Check</span>
          </label>
        </div>
        {errors.paymentMethod && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.paymentMethod}
          </p>
        )}
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Documents</h4>
        <p className="text-sm text-gray-600 mb-4">
          During onboarding, employees will sign these documents and upload any documents they need to 
          share with you. We'll securely store the signed versions for both of you to access any time.
        </p>
        <p className="text-sm font-medium text-gray-900 mb-4">Gusto automatically includes:</p>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Tax withholding (Form W-4)</p>
              <p className="text-xs text-gray-500">Record employee federal withholding allowance</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Direct deposit authorization</p>
              <p className="text-xs text-gray-500">Lets you pay employee via direct deposit</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">
          Back to Overview
        </button>
        <button className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900">
          Continue to employee state taxes
        </button>
      </div>
    </div>
  )
}
