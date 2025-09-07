'use client'

import React, { useState } from 'react'
import { ChevronDown, Calendar, CheckCircle, X } from 'lucide-react'

interface PayScheduleProps {
  onSave?: (data: any) => void
  onBack?: () => void
}

export default function PaySchedule({ onSave, onBack }: PayScheduleProps) {
  const [formData, setFormData] = useState({
    payFrequency: 'Every week',
    scheduleType: 'EVERY WEEK', // Visual selection
    firstPayDate: '01-08-2025',
    firstPayPeriodEndDate: '02-09-2025'
  })
  
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const payFrequencies = [
    'Every week',
    'Every other week', 
    'Twice per month',
    'Monthly'
  ]

  // Mapping between dropdown and visual schedule
  const frequencyToScheduleMap: { [key: string]: string } = {
    'Every week': 'EVERY WEEK',
    'Every other week': 'EVERY OTHER WEEK',
    'Twice per month': 'TWICE A MONTH',
    'Monthly': 'EVERY MONTH'
  }

  const scheduleToFrequencyMap: { [key: string]: string } = {
    'EVERY WEEK': 'Every week',
    'EVERY OTHER WEEK': 'Every other week',
    'TWICE A MONTH': 'Twice per month',
    'EVERY MONTH': 'Monthly',
    'EVERY QUARTER': 'Quarterly'
  }

  const scheduleOptions = [
    {
      id: 'EVERY WEEK',
      label: 'EVERY WEEK',
      calendar: generateWeeklyCalendar()
    },
    {
      id: 'EVERY OTHER WEEK',
      label: 'EVERY OTHER WEEK', 
      calendar: generateBiWeeklyCalendar()
    },
    {
      id: 'TWICE A MONTH',
      label: 'TWICE A MONTH',
      calendar: generateTwiceMonthlyCalendar()
    },
    {
      id: 'EVERY MONTH',
      label: 'EVERY MONTH',
      calendar: generateMonthlyCalendar()
    },
    {
      id: 'EVERY QUARTER',
      label: 'EVERY QUARTER',
      calendar: generateQuarterlyCalendar()
    }
  ]

  function generateWeeklyCalendar() {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-0.5 text-xs text-gray-500 font-medium">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center h-4 flex items-center justify-center">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({length: 14}, (_, i) => {
            const dayNum = i < 7 ? i + 1 : i - 6;
            return (
              <div key={i} className={`h-5 text-xs flex items-center justify-center rounded ${
                i === 4 || i === 11 ? 'bg-yellow-300 font-medium' : 'bg-gray-100'
              }`}>
                {dayNum}
              </div>
            );
          })}
        </div>
      </div>
    )
  }

  function generateBiWeeklyCalendar() {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-0.5 text-xs text-gray-500 font-medium">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center h-4 flex items-center justify-center">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({length: 14}, (_, i) => {
            const dayNum = i < 7 ? i + 1 : i - 6;
            return (
              <div key={i} className={`h-5 text-xs flex items-center justify-center rounded ${
                i === 4 ? 'bg-yellow-300 font-medium' : 'bg-gray-100'
              }`}>
                {dayNum}
              </div>
            );
          })}
        </div>
      </div>
    )
  }

  function generateTwiceMonthlyCalendar() {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-0.5 text-xs text-gray-500 font-medium">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center h-4 flex items-center justify-center">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({length: 28}, (_, i) => (
            <div key={i} className={`h-5 text-xs flex items-center justify-center rounded ${
              i === 14 || i === 27 ? 'bg-yellow-300 font-medium' : 'bg-gray-100'
            }`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    )
  }

  function generateMonthlyCalendar() {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-0.5 text-xs text-gray-500 font-medium">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center h-4 flex items-center justify-center">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({length: 28}, (_, i) => (
            <div key={i} className={`h-5 text-xs flex items-center justify-center rounded ${
              i === 27 ? 'bg-yellow-300 font-medium' : 'bg-gray-100'
            }`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    )
  }

  function generateQuarterlyCalendar() {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="text-center">
            <div className="text-gray-500 mb-1 font-medium">JAN</div>
            <div className="bg-gray-100 h-6 rounded"></div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 mb-1 font-medium">FEB</div>
            <div className="bg-gray-100 h-6 rounded"></div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 mb-1 font-medium">MAR</div>
            <div className="bg-yellow-300 h-6 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="text-center">
            <div className="text-gray-500 mb-1 font-medium">APR</div>
            <div className="bg-gray-100 h-6 rounded"></div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 mb-1 font-medium">MAY</div>
            <div className="bg-gray-100 h-6 rounded"></div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 mb-1 font-medium">JUN</div>
            <div className="bg-yellow-300 h-6 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === 'payFrequency') {
      // Sync schedule type when frequency changes
      const scheduleType = frequencyToScheduleMap[value] || value
      setFormData(prev => ({ ...prev, [field]: value, scheduleType }))
    } else if (field === 'scheduleType') {
      // Sync frequency when schedule type changes
      const payFrequency = scheduleToFrequencyMap[value] || formData.payFrequency
      setFormData(prev => ({ ...prev, [field]: value, payFrequency }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSave = () => {
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
    onSave?.(formData)
  }

  const formatDate = (value: string) => {
    // Remove all non-digits and format as MM-DD-YYYY
    const digits = value.replace(/\D/g, '')
    if (digits.length >= 8) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 8)}`
    } else if (digits.length >= 4) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`
    } else if (digits.length >= 2) {
      return `${digits.slice(0, 2)}-${digits.slice(2)}`
    }
    return digits
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="text-green-600" size={20} />
          <span className="text-green-800 font-medium">Pay schedule saved successfully</span>
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
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Pay Schedule</h2>
        <p className="text-gray-700">
          Why do we need to ask for this? We need to know when to pay your employees. Some states have 
          laws around when you must pay your employees. Please choose pay schedules that are legal for your 
          employees.
        </p>
      </div>

      {/* Pay Frequency Dropdown */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Pay Frequency</label>
          <div className="relative">
            <button
              onClick={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
              className="input-field w-full max-w-md flex items-center justify-between bg-gray-100"
            >
              <span className="text-gray-900">{formData.payFrequency}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            
            {showFrequencyDropdown && (
              <div className="absolute z-10 w-full max-w-md mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {payFrequencies.map((frequency, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleInputChange('payFrequency', frequency)
                      setShowFrequencyDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                      frequency === 'Every week' ? 'bg-gray-900 text-white hover:bg-gray-800' : ''
                    }`}
                  >
                    {frequency}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual Pay Schedule Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Pay Schedule</h3>
          <p className="text-gray-700 mb-4">How often do you pay your employees?*</p>
          
          <div className="grid grid-cols-5 gap-3">
            {scheduleOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleInputChange('scheduleType', option.id)}
                className={`p-3 border-2 rounded-lg transition-colors min-h-[120px] ${
                  formData.scheduleType === option.id 
                    ? 'border-gray-900 bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="space-y-3 h-full flex flex-col">
                  <div className="flex-1 flex items-center justify-center">
                    {option.calendar}
                  </div>
                  <div className="text-xs font-medium text-gray-700 text-center">
                    {option.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Date Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">First pay date</label>
          <div className="relative">
            <input
              type="text"
              value={formData.firstPayDate}
              onChange={(e) => handleInputChange('firstPayDate', formatDate(e.target.value))}
              placeholder="01-08-2025"
              className="input-field w-full max-w-md pr-10"
              maxLength={10}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">First pay period end date</label>
          <div className="relative">
            <input
              type="text"
              value={formData.firstPayPeriodEndDate}
              onChange={(e) => handleInputChange('firstPayPeriodEndDate', formatDate(e.target.value))}
              placeholder="02-09-2025"
              className="input-field w-full max-w-md pr-10"
              maxLength={10}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            The last date of the first pay period to help calculate future pay periods. This can be the same date as the first pay date.
          </p>
        </div>
      </div>

      {/* Save Button and Validation */}
      <div className="space-y-4">
        <div className="flex justify-start">
          <button 
            onClick={handleSave}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Save
          </button>
        </div>
        
        <div className="text-right">
          <span className="text-red-500 text-sm">All fields are mandatory</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button 
          onClick={onBack}
          className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Back to Overview
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
