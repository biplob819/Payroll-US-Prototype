'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import FederalTaxInfo from '@/components/FederalTaxInfo'
import BankInfo from '@/components/BankInfo'
import PaySchedule from '@/components/PaySchedule'
import PriorPayroll from '@/components/PriorPayroll'
import StateTaxInfo from '@/components/StateTaxInfo'
import { 
  MapPin, 
  FileText, 
  Building, 
  CreditCard, 
  Shield,
  Calendar,
  Plus,
  Edit,
  Users,
  X,
  CheckCircle,
  Database
} from 'lucide-react'

export default function PayrollConfigurePage() {
  const [activeTab, setActiveTab] = useState('work-locations')
  const [showModal, setShowModal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const tabs = [
    { id: 'work-locations', label: 'Work Locations', icon: <MapPin size={16} /> },
    { id: 'federal-tax', label: 'Federal Tax Info', icon: <FileText size={16} /> },
    { id: 'pay-schedule', label: 'Pay Schedule', icon: <Calendar size={16} /> },
    { id: 'state-tax', label: 'State Tax Info', icon: <Building size={16} /> },
    { id: 'bank-info', label: 'Bank Info', icon: <CreditCard size={16} /> },
    { id: 'prior-payroll', label: 'Prior Payroll', icon: <Database size={16} /> }
  ]

  const AddWorkLocationModal = () => {
    if (!showModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Add Work Location</h3>
            <button 
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1
              </label>
              <input 
                type="text" 
                className="input-field w-full"
                placeholder="Enter street address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2 (Optional)
              </label>
              <input 
                type="text" 
                className="input-field w-full"
                placeholder="Apartment, suite, etc."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input 
                  type="text" 
                  className="input-field w-full"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select className="input-field w-full">
                  <option>Select State</option>
                  <option>New York</option>
                  <option>California</option>
                  <option>Texas</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input 
                type="text" 
                className="input-field w-full"
                placeholder="ZIP Code"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="filing-address" className="rounded" />
              <label htmlFor="filing-address" className="text-sm text-gray-700">
                Use as filing address
              </label>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button 
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  setShowModal(false)
                  showSuccess('Work location added successfully')
                }}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Add Location
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const renderWorkLocationsTab = () => {
    return (
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Work Locations</h2>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Work Location</span>
            </button>
          </div>
          <p className="text-gray-600">
            Please add your mailing and filing address, along with any other addresses where your employees are physically working in the United States.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            We'll need one mailing and filing address to complete your payroll setup.
          </p>
        </div>

        {/* Organization Address Card */}
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Organization Address</h3>
              <div className="text-gray-600 space-y-1">
                <p>1300, Zyker Park</p>
                <p>West Virginia Avenue</p>
                <p>Amsterdam, New York 12010</p>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <Users size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">6 Employees</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  FILING ADDRESS
                </span>
              </div>
            </div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center space-x-2">
              <Edit size={16} />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Mailing and Filing Address Section */}
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mailing and filing address</h3>
              <div className="text-gray-600 space-y-1">
                <p>525 20th Street</p>
                <p>San Francisco, CA 94107</p>
              </div>
            </div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center space-x-2">
              <Edit size={16} />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center pt-6 border-t border-gray-200">
          <button 
            onClick={() => showSuccess('All addresses confirmed successfully')}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            I've added all addresses
          </button>
        </div>
      </div>
    )
  }

  const renderBlankTab = (tabName: string) => {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{tabName}</h3>
        <p className="text-gray-600">This section is coming soon.</p>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'work-locations':
        return renderWorkLocationsTab()
      case 'federal-tax':
        return <FederalTaxInfo 
          onBack={() => setActiveTab('work-locations')} 
          onSave={() => setActiveTab('pay-schedule')}
        />
      case 'pay-schedule':
        return <PaySchedule 
          onBack={() => setActiveTab('federal-tax')} 
          onSave={() => setActiveTab('state-tax')}
        />
      case 'state-tax':
        return <StateTaxInfo 
          onBack={() => setActiveTab('pay-schedule')} 
          onSave={() => setActiveTab('bank-info')}
        />
      case 'bank-info':
        return <BankInfo 
          onBack={() => setActiveTab('state-tax')} 
          onSave={() => setActiveTab('prior-payroll')}
        />
      case 'prior-payroll':
        return <PriorPayroll 
          onBack={() => setActiveTab('bank-info')} 
          onSave={() => showSuccess('Prior payroll configuration saved successfully')}
        />
      default:
        return renderWorkLocationsTab()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex">
            {/* Content */}
            <div className="flex-1 p-8">
              <div className="max-w-6xl">
                {/* Page Header */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Configure Payroll
                  </h1>
                  <p className="text-gray-600">
                    Set up your payroll configuration including work locations, tax information, and banking details
                  </p>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8">
                  <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                    <nav className="flex">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                            activeTab === tab.id
                              ? 'bg-white text-gray-900 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-white hover:bg-opacity-50'
                          }`}
                        >
                          {tab.icon}
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Success Message */}
                {showSuccessMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3 mb-6">
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="text-green-800 font-medium">{successMessage}</span>
                    <button 
                      onClick={() => setShowSuccessMessage(false)}
                      className="ml-auto text-green-600 hover:text-green-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Tab Content */}
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  {renderTabContent()}
                </div>
              </div>
            </div>
            
          </div>
        </main>
      </div>
      
      {/* Modal */}
      <AddWorkLocationModal />
    </div>
  )
}
