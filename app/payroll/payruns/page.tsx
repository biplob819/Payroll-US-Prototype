'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { 
  DollarSign, 
  Users, 
  Calendar, 
  Check, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Plus,
  FileText,
  CreditCard,
  Settings,
  Eye,
  Edit3,
  Download,
  Filter,
  Search,
  Calculator,
  Shield,
  X
} from 'lucide-react'

// Mock data for payroll runs
const mockPayrollRuns = [
  {
    id: 1,
    period: '01 Nov 2024 - 15 Nov 2024',
    payDate: '30 Nov 2024',
    status: 'draft',
    type: 'Regular Payroll',
    employeeCount: 3,
    grossPay: 14160.26,
    netPay: 8756.65,
    taxes: 5358.61,
    deductions: 45.00,
    employees: [
      {
        id: 'EP-3011',
        name: 'Biplob Chakraborty',
        hours: 40.00,
        grossPay: 2859.77,
        netPay: 2859.77,
        paymentMode: 'Check',
        status: 'Yet To Pay'
      },
      {
        id: 'EP-0004', 
        name: 'Daniel Alpert',
        hours: 40.00,
        grossPay: 2724.52,
        netPay: 2724.52,
        paymentMode: 'Direct Deposit',
        status: 'Paid',
        paidDate: '15 Nov 2024'
      },
      {
        id: 'EP-0012',
        name: 'Richard Kagel',
        hours: 40.00,
        grossPay: 3172.36,
        netPay: 3172.36,
        paymentMode: 'Check',
        status: 'Yet To Pay'
      }
    ]
  },
  {
    id: 2,
    period: '16 Nov 2024 - 30 Nov 2024',
    payDate: '05 Nov 2024',
    status: 'ready',
    type: 'Regular Payroll',
    employeeCount: 1,
    grossPay: 8774.00,
    netPay: 4829.61,
    taxes: 3944.39,
    deductions: 0.00,
    employees: [
      {
        id: 'EP-0003',
        name: 'Ryan Timothy',
        hours: 40.00,
        grossPay: 8000.00,
        netPay: 4829.61,
        paymentMode: 'Check',
        status: 'Yet To Pay'
      }
    ]
  },
  {
    id: 7,
    period: 'Q4 2024',
    payDate: '15 Dec 2024',
    status: 'draft',
    type: 'Bonus Payroll',
    employeeCount: 5,
    grossPay: 25000.00,
    netPay: 19500.00,
    taxes: 5500.00,
    deductions: 0.00,
    employees: [
      {
        id: 'EP-3011',
        name: 'Biplob Chakraborty',
        hours: 0,
        grossPay: 5000.00,
        netPay: 3900.00,
        paymentMode: 'Direct Deposit',
        status: 'Yet To Pay'
      },
      {
        id: 'EP-0004',
        name: 'Daniel Alpert',
        hours: 0,
        grossPay: 5000.00,
        netPay: 3900.00,
        paymentMode: 'Direct Deposit',
        status: 'Yet To Pay'
      },
      {
        id: 'EP-0012',
        name: 'Richard Kagel',
        hours: 0,
        grossPay: 5000.00,
        netPay: 3900.00,
        paymentMode: 'Check',
        status: 'Yet To Pay'
      },
      {
        id: 'MP-01',
        name: 'Olivia Brown',
        hours: 0,
        grossPay: 5000.00,
        netPay: 3900.00,
        paymentMode: 'Direct Deposit',
        status: 'Yet To Pay'
      },
      {
        id: 'MP-02',
        name: 'Michael Smith',
        hours: 0,
        grossPay: 5000.00,
        netPay: 3900.00,
        paymentMode: 'Check',
        status: 'Yet To Pay'
      }
    ]
  },
  {
    id: 8,
    period: '10 Nov 2024 - 12 Nov 2024',
    payDate: '20 Nov 2024',
    status: 'ready',
    type: 'Off-Cycle Payroll',
    employeeCount: 2,
    grossPay: 3500.00,
    netPay: 2625.00,
    taxes: 875.00,
    deductions: 0.00,
    employees: [
      {
        id: 'EP-0004',
        name: 'Daniel Alpert',
        hours: 20.00,
        grossPay: 1500.00,
        netPay: 1125.00,
        paymentMode: 'Direct Deposit',
        status: 'Yet To Pay'
      },
      {
        id: 'MP-01',
        name: 'Olivia Brown',
        hours: 25.00,
        grossPay: 2000.00,
        netPay: 1500.00,
        paymentMode: 'Check',
        status: 'Yet To Pay'
      }
    ]
  },
  {
    id: 3,
    period: '25 Oct 2024 - 08 Nov 2024',
    payDate: '15 Nov 2024',
    status: 'approved',
    type: 'Regular Payroll',
    employeeCount: 2,
    grossPay: 8834.08,
    netPay: 5595.27,
    taxes: 3238.81,
    deductions: 0.00,
    employees: [
      {
        id: 'EP-0011',
        name: 'Biplob Chakraborty',
        hours: 40.00,
        grossPay: 2862.96,
        netPay: 2862.96,
        paymentMode: 'Check',
        status: 'Yet To Pay'
      },
      {
        id: 'EP-0004', 
        name: 'Daniel Alpert',
        hours: 40.00,
        grossPay: 2732.31,
        netPay: 2732.31,
        paymentMode: 'Direct Deposit',
        status: 'Yet To Pay'
      }
    ]
  },
  {
    id: 6,
    period: '03 Nov 2024 - 09 Nov 2024',
    payDate: '20 Nov 2024',
    status: 'paid',
    type: 'Regular Payroll',
    employeeCount: 2,
    grossPay: 8834.08,
    netPay: 5595.27,
    taxes: 3238.81,
    deductions: 0.00,
    employees: [
      {
        id: 'EP-0011',
        name: 'Biplob Chakraborty',
        hours: 40.00,
        grossPay: 2862.96,
        netPay: 2862.96,
        paymentMode: 'Check',
        status: 'Paid',
        paidDate: '20 Nov 2024'
      },
      {
        id: 'EP-0004', 
        name: 'Daniel Alpert',
        hours: 40.00,
        grossPay: 2732.31,
        netPay: 2732.31,
        paymentMode: 'Direct Deposit',
        status: 'Paid',
        paidDate: '20 Nov 2024'
      }
    ]
  },
  {
    id: 4,
    period: '15 Oct 2024 - 31 Oct 2024',
    payDate: '05 Nov 2024',
    status: 'paid',
    type: 'Bonus Payroll',
    employeeCount: 3,
    grossPay: 15000.00,
    netPay: 11700.00,
    taxes: 3300.00,
    deductions: 0.00,
    employees: [
      {
        id: 'EP-0011',
        name: 'Biplob Chakraborty',
        hours: 0,
        grossPay: 5000.00,
        netPay: 3900.00,
        paymentMode: 'Direct Deposit',
        status: 'Paid',
        paidDate: '05 Nov 2024'
      },
      {
        id: 'EP-0004', 
        name: 'Daniel Alpert',
        hours: 0,
        grossPay: 5000.00,
        netPay: 3900.00,
        paymentMode: 'Direct Deposit',
        status: 'Paid',
        paidDate: '05 Nov 2024'
      },
      {
        id: 'EP-0012',
        name: 'Richard Kagel',
        hours: 0,
        grossPay: 5000.00,
        netPay: 3900.00,
        paymentMode: 'Check',
        status: 'Paid',
        paidDate: '05 Nov 2024'
      }
    ]
  },
  {
    id: 5,
    period: '01 Oct 2024 - 15 Oct 2024',
    payDate: '20 Oct 2024',
    status: 'paid',
    type: 'Off-Cycle Payroll',
    employeeCount: 1,
    grossPay: 2500.00,
    netPay: 1875.00,
    taxes: 625.00,
    deductions: 0.00,
    employees: [
      {
        id: 'MP-01',
        name: 'Olivia Brown',
        hours: 40.00,
        grossPay: 2500.00,
        netPay: 1875.00,
        paymentMode: 'Check',
        status: 'Paid',
        paidDate: '20 Oct 2024'
      }
    ]
  }
]

const statusConfig = {
  draft: { color: 'bg-gray-100 text-gray-800', icon: Edit3, label: 'Draft' },
  ready: { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'Ready' },
  approved: { color: 'bg-green-100 text-green-800', icon: Check, label: 'Approved' },
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle, label: 'Pending Approval' },
  paid: { color: 'bg-green-100 text-green-800', icon: Check, label: 'Paid' }
}

export default function PayRunsPage() {
  const [selectedRun, setSelectedRun] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showAddHours, setShowAddHours] = useState(false)
  const [activeTab, setActiveTab] = useState('runs')
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [approvalType, setApprovalType] = useState('')
  const [showCreateDropdown, setShowCreateDropdown] = useState(false)
  const [showBonusForm, setShowBonusForm] = useState(false)
  const [showOffCycleForm, setShowOffCycleForm] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">Pay Runs</h1>
                      <p className="text-gray-600">Manage and process employee payroll</p>
                    </div>
                     <div className="relative">
                       <button 
                         className="btn-primary flex items-center space-x-2"
                         onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                       >
                         <Plus size={20} />
                         <span>Create Pay Run</span>
                         <ChevronRight size={16} className={`transform transition-transform ${showCreateDropdown ? 'rotate-90' : ''}`} />
                       </button>
                       {showCreateDropdown && (
                         <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                           <div className="py-1">
                             <button 
                               className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                               onClick={() => {
                                 setShowCreateDropdown(false)
                                 // Handle regular payroll creation
                                 console.log('Creating regular payroll')
                               }}
                             >
                               <DollarSign size={16} />
                               <span>Regular Payroll</span>
                             </button>
                             <button 
                               className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                               onClick={() => {
                                 setShowCreateDropdown(false)
                                 setShowBonusForm(true)
                               }}
                             >
                               <Plus size={16} />
                               <span>Bonus Payroll</span>
                             </button>
                             <button 
                               className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                               onClick={() => {
                                 setShowCreateDropdown(false)
                                 setShowOffCycleForm(true)
                               }}
                             >
                               <Clock size={16} />
                               <span>Off Cycle Payrun</span>
                             </button>
                           </div>
                         </div>
                       )}
                     </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                  <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                    <nav className="flex">
                      <button
                        onClick={() => setActiveTab('runs')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                          activeTab === 'runs'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white hover:bg-opacity-50'
                        }`}
                      >
                        <DollarSign size={16} />
                        <span>Run Payroll</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('history')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                          activeTab === 'history'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white hover:bg-opacity-50'
                        }`}
                      >
                        <FileText size={16} />
                        <span>Payroll History</span>
                      </button>
                    </nav>
                  </div>
                </div>

                {/* Main Content */}
                {showOffCycleForm ? (
                  <OffCyclePayrollForm 
                    onBack={() => setShowOffCycleForm(false)}
                    onSave={(offCycleData: any) => {
                      console.log('Saving off-cycle payroll:', offCycleData)
                      setShowOffCycleForm(false)
                    }}
                  />
                ) : showBonusForm ? (
                  <BonusPayrollForm 
                    onBack={() => setShowBonusForm(false)}
                    onSave={(bonusData: any) => {
                      console.log('Saving bonus payroll:', bonusData)
                      setShowBonusForm(false)
                      // Here you would normally save to your backend
                      // and optionally redirect to the created bonus payroll
                    }}
                  />
                ) : selectedRun ? (
                  <PayrollDetails 
                    payroll={selectedRun} 
                    onBack={() => setSelectedRun(null)}
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                    showAddHours={showAddHours}
                    setShowAddHours={setShowAddHours}
                    setShowApprovalModal={setShowApprovalModal}
                    setShowPaymentModal={setShowPaymentModal}
                    setApprovalType={setApprovalType}
                  />
                ) : (
                  <PayrollList 
                    payrolls={mockPayrollRuns}
                    onSelectRun={setSelectedRun}
                    activeTab={activeTab}
                  />
                )}

                {/* Modals */}
                {showApprovalModal && (
                  <ApprovalModal 
                    payroll={selectedRun}
                    approvalType={approvalType}
                    onClose={() => setShowApprovalModal(false)}
                    onConfirm={() => {
                      console.log('Payroll approved')
                      setShowApprovalModal(false)
                    }}
                  />
                )}

                {showPaymentModal && (
                  <PaymentModal 
                    payroll={selectedRun}
                    onClose={() => setShowPaymentModal(false)}
                    onConfirm={() => {
                      console.log('Payment recorded')
                      setShowPaymentModal(false)
                    }}
                  />
                )}
              </div>
            </div>
        </main>
      </div>
    </div>
  )
}

// Bonus Payroll Form Component
function BonusPayrollForm({ onBack, onSave }: { onBack: () => void; onSave: (data: any) => void }) {
  const [bonusData, setBonusData] = useState({
    payPeriod: '',
    payDate: '',
    notes: '',
    employees: [
      { id: 'EP-3011', name: 'Biplob Chakraborty', department: 'Engineering', bonusAmount: '', included: true },
      { id: 'EP-0004', name: 'Daniel Alpert', department: 'Marketing', bonusAmount: '', included: true },
      { id: 'EP-0012', name: 'Richard Kagel', department: 'Sales', bonusAmount: '', included: true },
      { id: 'MP-01', name: 'Olivia Brown', department: 'HR', bonusAmount: '', included: true },
      { id: 'MP-02', name: 'Michael Smith', department: 'Finance', bonusAmount: '', included: true }
    ]
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleEmployeeBonusChange = (employeeId: string, bonusAmount: string) => {
    setBonusData(prev => ({
      ...prev,
      employees: prev.employees.map(emp => 
        emp.id === employeeId ? { ...emp, bonusAmount } : emp
      )
    }))
  }

  const handleEmployeeToggle = (employeeId: string) => {
    setBonusData(prev => ({
      ...prev,
      employees: prev.employees.map(emp => 
        emp.id === employeeId ? { ...emp, included: !emp.included } : emp
      )
    }))
  }

  const calculateTotalBonus = () => {
    return bonusData.employees
      .filter(emp => emp.included && emp.bonusAmount)
      .reduce((total, emp) => total + parseFloat(emp.bonusAmount || '0'), 0)
  }

  const calculateSupplementalTax = (bonusAmount: number) => {
    return bonusAmount * 0.22 // 22% federal supplemental tax rate
  }

  const calculateNetBonus = (bonusAmount: number) => {
    const tax = calculateSupplementalTax(bonusAmount)
    return bonusAmount - tax
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const hasAnyBonus = bonusData.employees.some(emp => emp.included && emp.bonusAmount)
    
    if (!hasAnyBonus) {
      newErrors.employees = 'At least one employee must have a bonus amount'
    }
    
    if (!bonusData.payDate) {
      newErrors.payDate = 'Pay date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveDraft = () => {
    if (validateForm()) {
      onSave({ ...bonusData, status: 'draft' })
    }
  }

  const handleSaveAndContinue = () => {
    if (validateForm()) {
      onSave({ ...bonusData, status: 'ready' })
    }
  }

  const totalGrossBonus = calculateTotalBonus()
  const totalSupplementalTax = calculateSupplementalTax(totalGrossBonus)
  const totalNetBonus = calculateNetBonus(totalGrossBonus)
  const includedEmployeeCount = bonusData.employees.filter(emp => emp.included).length

  return (
    <div className="space-y-6">
      {/* Back Button and Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronRight size={20} className="rotate-180 mr-1" />
          Back to Pay Runs
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Bonus Payroll</h1>
          <p className="text-gray-600">Process bonus payments outside the regular payroll cycle</p>
        </div>
      </div>

      {/* Federal Tax Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="text-blue-600 mr-2 mt-0.5" size={16} />
          <div className="text-sm">
            <p className="text-blue-900 font-medium">Important Tax Information</p>
            <p className="text-blue-800 mt-1">
              Bonus payments are subject to the federal supplemental tax rate of 22%. This rate will be automatically applied to all bonus amounts.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bonus Payroll Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pay Period (Optional)
                </label>
                <select 
                  className="input-field w-full"
                  value={bonusData.payPeriod}
                  onChange={(e) => setBonusData(prev => ({ ...prev, payPeriod: e.target.value }))}
                >
                  <option value="">Select pay period</option>
                  <option value="Q4 2024">Q4 2024</option>
                  <option value="November 2024">November 2024</option>
                  <option value="December 2024">December 2024</option>
                  <option value="Annual 2024">Annual 2024</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pay Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className={`input-field w-full ${errors.payDate ? 'border-red-300' : ''}`}
                  value={bonusData.payDate}
                  onChange={(e) => setBonusData(prev => ({ ...prev, payDate: e.target.value }))}
                />
                {errors.payDate && <p className="text-red-500 text-xs mt-1">{errors.payDate}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                className="input-field w-full h-20 resize-none"
                placeholder="Add any notes or comments about this bonus payroll..."
                value={bonusData.notes}
                onChange={(e) => setBonusData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>

          {/* Employee Bonus Selection */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Employee Bonus Amounts</h3>
              <p className="text-sm text-gray-600">
                {includedEmployeeCount} of {bonusData.employees.length} employees selected
              </p>
            </div>

            {errors.employees && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{errors.employees}</p>
              </div>
            )}

            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bonus Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tax (22%)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Bonus
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Include
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bonusData.employees.map((employee) => {
                    const bonusAmount = parseFloat(employee.bonusAmount || '0')
                    const tax = calculateSupplementalTax(bonusAmount)
                    const netBonus = calculateNetBonus(bonusAmount)

                    return (
                      <tr key={employee.id} className={`hover:bg-gray-50 ${!employee.included ? 'opacity-50' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-1">$</span>
                            <input
                              type="number"
                              className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                              placeholder="0.00"
                              step="0.01"
                              min="0"
                              value={employee.bonusAmount}
                              onChange={(e) => handleEmployeeBonusChange(employee.id, e.target.value)}
                              disabled={!employee.included}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${tax.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${netBonus.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              checked={employee.included}
                              onChange={() => handleEmployeeToggle(employee.id)}
                            />
                          </label>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bonus Payroll Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Employees</span>
                <span className="text-sm font-medium text-gray-900">{includedEmployeeCount}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Total Gross Bonus</span>
                <span className="text-sm font-medium text-gray-900">${totalGrossBonus.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Supplemental Tax (22%)</span>
                <span className="text-sm font-medium text-red-600">${totalSupplementalTax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-gray-900">Total Net Bonus</span>
                <span className="text-sm font-bold text-green-600">${totalNetBonus.toFixed(2)}</span>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  onClick={handleSaveDraft}
                >
                  Save Draft
                </button>
                
                <button
                  className="w-full btn-primary text-sm"
                  onClick={handleSaveAndContinue}
                >
                  Save and Continue
                </button>
              </div>

              {bonusData.payDate && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Pay Date:</strong> {new Date(bonusData.payDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Off-Cycle Payroll Form Component
function OffCyclePayrollForm({ onBack, onSave }: { onBack: () => void; onSave: (data: any) => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [offCycleData, setOffCycleData] = useState({
    payFrequency: '',
    payPeriodStart: '',
    payPeriodEnd: '',
    payDate: '',
    benefitPreferences: {
      includeBenefits: true,
      includeDeductions: true
    },
    employees: []
  })
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const payFrequencies = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'bi-weekly', label: 'Bi-weekly' },
    { value: 'semi-monthly', label: 'Semi-monthly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ]

  const availableEmployees = [
    { id: 'EP-3011', name: 'Biplob Chakraborty', department: 'Engineering', payType: 'hourly', rate: 40.00 },
    { id: 'EP-0004', name: 'Daniel Alpert', department: 'Marketing', payType: 'salary', rate: 75000 },
    { id: 'EP-0012', name: 'Richard Kagel', department: 'Sales', payType: 'hourly', rate: 35.00 },
    { id: 'MP-01', name: 'Olivia Brown', department: 'HR', payType: 'salary', rate: 65000 },
    { id: 'MP-02', name: 'Michael Smith', department: 'Finance', payType: 'hourly', rate: 45.00 }
  ]

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!offCycleData.payFrequency) newErrors.payFrequency = 'Pay frequency is required'
    if (!offCycleData.payPeriodStart) newErrors.payPeriodStart = 'Pay period start date is required'
    if (!offCycleData.payPeriodEnd) newErrors.payPeriodEnd = 'Pay period end date is required'
    if (!offCycleData.payDate) newErrors.payDate = 'Pay date is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (selectedEmployees.length === 0) {
      newErrors.employees = 'At least one employee must be added to the payroll'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3)
    }
  }

  const handleSave = () => {
    onSave({
      ...offCycleData,
      employees: selectedEmployees,
      status: 'draft'
    })
  }

  const addEmployee = (employee: any) => {
    const newEmployee = {
      ...employee,
      regularHours: '',
      overtimeHours: '',
      doubleTimeHours: '',
      additionalRoles: [],
      earnings: {
        bonus: '',
        commission: ''
      }
    }
    setSelectedEmployees([...selectedEmployees, newEmployee])
  }

  const removeEmployee = (employeeId: string) => {
    setSelectedEmployees(selectedEmployees.filter(emp => emp.id !== employeeId))
  }

  const updateEmployeeHours = (employeeId: string, field: string, value: string) => {
    setSelectedEmployees(selectedEmployees.map(emp => 
      emp.id === employeeId ? { ...emp, [field]: value } : emp
    ))
  }

  const updateEmployeeEarnings = (employeeId: string, field: string, value: string) => {
    setSelectedEmployees(selectedEmployees.map(emp => 
      emp.id === employeeId ? { 
        ...emp, 
        earnings: { ...emp.earnings, [field]: value }
      } : emp
    ))
  }

  const calculateEmployeeTotal = (employee: any) => {
    const regularPay = parseFloat(employee.regularHours || '0') * employee.rate
    const overtimePay = parseFloat(employee.overtimeHours || '0') * employee.rate * 1.5
    const doubleTimePay = parseFloat(employee.doubleTimeHours || '0') * employee.rate * 2
    const bonus = parseFloat(employee.earnings.bonus || '0')
    const commission = parseFloat(employee.earnings.commission || '0')
    
    return regularPay + overtimePay + doubleTimePay + bonus + commission
  }

  const calculateTotalPayroll = () => {
    return selectedEmployees.reduce((total, emp) => total + calculateEmployeeTotal(emp), 0)
  }

  if (currentStep === 1) {
    return (
      <div className="space-y-6">
        {/* Back Button and Header */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronRight size={20} className="rotate-180 mr-1" />
            Back to Pay Runs
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Off-Cycle Payroll</h1>
            <p className="text-gray-600">Issue payments outside your regular pay schedule</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
            <span className="ml-2 text-sm font-medium text-blue-600">Setup</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
            <span className="ml-2 text-sm text-gray-600">Add Employees</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
            <span className="ml-2 text-sm text-gray-600">Review</span>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="text-blue-600 mr-2 mt-0.5" size={16} />
            <div className="text-sm">
              <p className="text-blue-900 font-medium">Off-Cycle Payroll Requirements</p>
              <p className="text-blue-800 mt-1">
                Pay period specification is mandatory for off-cycle payrolls and must follow your configured pay frequency. 
                This ensures proper compliance and accurate tax calculations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pay Schedule Configuration */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pay Schedule Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pay Frequency <span className="text-red-500">*</span>
                </label>
                <select 
                  className={`input-field w-full ${errors.payFrequency ? 'border-red-300' : ''}`}
                  value={offCycleData.payFrequency}
                  onChange={(e) => setOffCycleData(prev => ({ ...prev, payFrequency: e.target.value }))}
                >
                  <option value="">Select pay frequency</option>
                  {payFrequencies.map(freq => (
                    <option key={freq.value} value={freq.value}>{freq.label}</option>
                  ))}
                </select>
                {errors.payFrequency && <p className="text-red-500 text-xs mt-1">{errors.payFrequency}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pay Period Start <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className={`input-field w-full ${errors.payPeriodStart ? 'border-red-300' : ''}`}
                    value={offCycleData.payPeriodStart}
                    onChange={(e) => setOffCycleData(prev => ({ ...prev, payPeriodStart: e.target.value }))}
                  />
                  {errors.payPeriodStart && <p className="text-red-500 text-xs mt-1">{errors.payPeriodStart}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pay Period End <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className={`input-field w-full ${errors.payPeriodEnd ? 'border-red-300' : ''}`}
                    value={offCycleData.payPeriodEnd}
                    onChange={(e) => setOffCycleData(prev => ({ ...prev, payPeriodEnd: e.target.value }))}
                  />
                  {errors.payPeriodEnd && <p className="text-red-500 text-xs mt-1">{errors.payPeriodEnd}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pay Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className={`input-field w-full ${errors.payDate ? 'border-red-300' : ''}`}
                  value={offCycleData.payDate}
                  onChange={(e) => setOffCycleData(prev => ({ ...prev, payDate: e.target.value }))}
                />
                {errors.payDate && <p className="text-red-500 text-xs mt-1">{errors.payDate}</p>}
              </div>
            </div>
          </div>

          {/* Benefit and Deduction Preferences */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefit & Deduction Preferences</h3>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Configure whether to include employee benefits and deductions for this off-cycle payroll.
              </p>

              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                  checked={offCycleData.benefitPreferences.includeBenefits}
                  onChange={(e) => setOffCycleData(prev => ({
                    ...prev,
                    benefitPreferences: {
                      ...prev.benefitPreferences,
                      includeBenefits: e.target.checked
                    }
                  }))}
                />
                <div className="ml-2">
                  <span className="text-sm text-gray-700 font-medium">Include Employee Benefits</span>
                  <p className="text-xs text-gray-500 mt-1">Health insurance, retirement contributions, etc.</p>
                </div>
              </label>

              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                  checked={offCycleData.benefitPreferences.includeDeductions}
                  onChange={(e) => setOffCycleData(prev => ({
                    ...prev,
                    benefitPreferences: {
                      ...prev.benefitPreferences,
                      includeDeductions: e.target.checked
                    }
                  }))}
                />
                <div className="ml-2">
                  <span className="text-sm text-gray-700 font-medium">Include Employee Deductions</span>
                  <p className="text-xs text-gray-500 mt-1">Loan repayments, garnishments, etc.</p>
                </div>
              </label>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex">
                  <AlertCircle className="text-yellow-600 mr-2 mt-0.5" size={16} />
                  <div className="text-sm">
                    <p className="text-yellow-800 font-medium">Important Note</p>
                    <p className="text-yellow-700 mt-1">
                      These preferences will apply to all employees added to this off-cycle payroll. 
                      You can modify individual employee settings in the next step.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={onBack}
          >
            Cancel
          </button>
          <button 
            className="btn-primary"
            onClick={handleNextStep}
          >
            Next: Add Employees
          </button>
        </div>
      </div>
    )
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        {/* Back Button and Header */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentStep(1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronRight size={20} className="rotate-180 mr-1" />
            Back to Setup
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Employees to Off-Cycle Payroll</h1>
            <p className="text-gray-600">Select and configure employee details for this payroll</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              <Check size={16} />
            </div>
            <span className="ml-2 text-sm font-medium text-green-600">Setup</span>
          </div>
          <div className="w-8 h-0.5 bg-green-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
            <span className="ml-2 text-sm font-medium text-blue-600">Add Employees</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
            <span className="ml-2 text-sm text-gray-600">Review</span>
          </div>
        </div>

        {errors.employees && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{errors.employees}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Employees */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Employees</h3>
            <div className="space-y-3">
              {availableEmployees
                .filter(emp => !selectedEmployees.find(selected => selected.id === emp.id))
                .map(employee => (
                <div key={employee.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-600">{employee.department}</p>
                    <p className="text-xs text-gray-500">
                      {employee.payType === 'hourly' ? `$${employee.rate}/hr` : `$${employee.rate.toLocaleString()}/year`}
                    </p>
                  </div>
                  <button
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    onClick={() => addEmployee(employee)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Employees Configuration */}
          <div className="lg:col-span-2">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Selected Employees ({selectedEmployees.length})
              </h3>
              
              {selectedEmployees.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No employees selected yet</p>
                  <p className="text-sm">Add employees from the list on the left</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedEmployees.map(employee => (
                    <div key={employee.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{employee.name}</h4>
                          <p className="text-sm text-gray-600">{employee.department} • {employee.id}</p>
                        </div>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => removeEmployee(employee.id)}
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {employee.payType === 'hourly' && (
                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">Earning Hours</h5>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Regular Hours</label>
                              <input
                                type="number"
                                className="input-field w-full"
                                placeholder="0.00"
                                step="0.01"
                                value={employee.regularHours}
                                onChange={(e) => updateEmployeeHours(employee.id, 'regularHours', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Overtime Hours</label>
                              <input
                                type="number"
                                className="input-field w-full"
                                placeholder="0.00"
                                step="0.01"
                                value={employee.overtimeHours}
                                onChange={(e) => updateEmployeeHours(employee.id, 'overtimeHours', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Double Time Hours</label>
                              <input
                                type="number"
                                className="input-field w-full"
                                placeholder="0.00"
                                step="0.01"
                                value={employee.doubleTimeHours}
                                onChange={(e) => updateEmployeeHours(employee.id, 'doubleTimeHours', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Additional Earnings</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Bonus</label>
                            <input
                              type="number"
                              className="input-field w-full"
                              placeholder="0.00"
                              step="0.01"
                              value={employee.earnings.bonus}
                              onChange={(e) => updateEmployeeEarnings(employee.id, 'bonus', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Commission</label>
                            <input
                              type="number"
                              className="input-field w-full"
                              placeholder="0.00"
                              step="0.01"
                              value={employee.earnings.commission}
                              onChange={(e) => updateEmployeeEarnings(employee.id, 'commission', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total Gross Pay:</span>
                          <span className="font-semibold text-gray-900">${calculateEmployeeTotal(employee).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setCurrentStep(1)}
          >
            Previous
          </button>
          <div className="space-x-3">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={handleSave}
            >
              Save Draft
            </button>
            <button 
              className="btn-primary"
              onClick={handleNextStep}
            >
              Continue to Review
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Step 3: Review
  return (
    <div className="space-y-6">
      {/* Back Button and Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setCurrentStep(2)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronRight size={20} className="rotate-180 mr-1" />
          Back to Add Employees
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Review Off-Cycle Payroll</h1>
          <p className="text-gray-600">Review all details before submitting for approval</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            <Check size={16} />
          </div>
          <span className="ml-2 text-sm font-medium text-green-600">Setup</span>
        </div>
        <div className="w-8 h-0.5 bg-green-600"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            <Check size={16} />
          </div>
          <span className="ml-2 text-sm font-medium text-green-600">Add Employees</span>
        </div>
        <div className="w-8 h-0.5 bg-green-600"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
          <span className="ml-2 text-sm font-medium text-blue-600">Review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pay Period Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pay Period Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Pay Frequency</label>
                <p className="text-gray-900 capitalize">{offCycleData.payFrequency}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Pay Date</label>
                <p className="text-gray-900">{new Date(offCycleData.payDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Period Start</label>
                <p className="text-gray-900">{new Date(offCycleData.payPeriodStart).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Period End</label>
                <p className="text-gray-900">{new Date(offCycleData.payPeriodEnd).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Employee Summary */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Summary</h3>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedEmployees.map(employee => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.payType === 'hourly' ? 
                          `${parseFloat(employee.regularHours || 0) + parseFloat(employee.overtimeHours || 0) + parseFloat(employee.doubleTimeHours || 0)}` : 
                          'Salary'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${(parseFloat(employee.earnings.bonus || 0) + parseFloat(employee.earnings.commission || 0)).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${calculateEmployeeTotal(employee).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="card sticky top-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Employees</span>
              <span className="text-sm font-medium text-gray-900">{selectedEmployees.length}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Total Gross Pay</span>
              <span className="text-sm font-medium text-gray-900">${calculateTotalPayroll().toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Estimated Taxes</span>
              <span className="text-sm font-medium text-red-600">${(calculateTotalPayroll() * 0.25).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-900">Estimated Net Pay</span>
              <span className="text-sm font-bold text-green-600">${(calculateTotalPayroll() * 0.75).toFixed(2)}</span>
            </div>

            <div className="pt-4 space-y-3">
              <button
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                onClick={handleSave}
              >
                Save Draft
              </button>
              
              <button
                className="w-full btn-primary text-sm"
                onClick={() => onSave({
                  ...offCycleData,
                  employees: selectedEmployees,
                  status: 'ready'
                })}
              >
                Submit for Approval
              </button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Pay Date:</strong> {new Date(offCycleData.payDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-blue-800 mt-1">
                <strong>Benefits:</strong> {offCycleData.benefitPreferences.includeBenefits ? 'Included' : 'Excluded'}
              </p>
              <p className="text-xs text-blue-800">
                <strong>Deductions:</strong> {offCycleData.benefitPreferences.includeDeductions ? 'Included' : 'Excluded'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setCurrentStep(2)}
        >
          Previous
        </button>
      </div>
    </div>
  )
}

// Journal Action Modal Component
function JournalActionModal({ action, payroll, onClose, onConfirm }: { action: string; payroll: any; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {action === 'post' ? 'Post Journal Entries' : 'Delete Journal Entries'}
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to {action === 'post' ? 'post' : 'delete'} journal entries for {payroll.payPeriod}?
        </p>
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            {action === 'post' ? 'Post' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Payroll List Component
function PayrollList({ payrolls, onSelectRun, activeTab }: { payrolls: any[]; onSelectRun: (run: any) => void; activeTab: string }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const filteredPayrolls = payrolls.filter(payroll => {
    if (activeTab === 'history') {
      // Only show completed payrolls in history
      const isCompleted = payroll.status === 'paid'
      if (!isCompleted) return false
    } else {
      // Only show active payrolls in runs tab
      const isActive = ['draft', 'ready', 'approved', 'pending'].includes(payroll.status)
      if (!isActive) return false
    }

    const matchesSearch = payroll.period.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || payroll.status === filterStatus
    const matchesType = filterType === 'all' || payroll.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  if (activeTab === 'history') {
    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search payroll periods..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Regular Payroll">Regular Payroll</option>
              <option value="Bonus Payroll">Bonus Payroll</option>
              <option value="Off-Cycle Payroll">Off-Cycle Payroll</option>
            </select>
          </div>
        </div>

        {/* History Table */}
        <div className="card">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payrun Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayrolls.map((payroll) => {
                  const status = (statusConfig as any)[payroll.status]
                  const StatusIcon = status.icon

                  return (
                    <tr key={payroll.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onSelectRun(payroll)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{payroll.payDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payroll.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payroll.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon size={12} className="mr-1" />
                          {status.label.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPayrolls.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Payroll History</h3>
            <p className="text-gray-600">No completed payrolls found matching your criteria.</p>
          </div>
        )}
      </div>
    )
  }

  // Current payrolls (runs tab)
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search payroll periods..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="ready">Ready</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Regular Payroll">Regular</option>
            <option value="Bonus Payroll">Bonus</option>
            <option value="Off-Cycle Payroll">Off-Cycle</option>
          </select>
        </div>
      </div>

      {/* Payroll Cards */}
      <div className="grid gap-4">
        {filteredPayrolls.map((payroll) => {
          const status = (statusConfig as any)[payroll.status]
          const StatusIcon = status.icon

          return (
            <div key={payroll.id} className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelectRun(payroll)}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{payroll.period}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          payroll.type === 'Regular Payroll' ? 'bg-blue-100 text-blue-800' :
                          payroll.type === 'Bonus Payroll' ? 'bg-purple-100 text-purple-800' :
                          payroll.type === 'Off-Cycle Payroll' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {payroll.type === 'Regular Payroll' ? 'Regular' :
                           payroll.type === 'Bonus Payroll' ? 'Bonus' :
                           payroll.type === 'Off-Cycle Payroll' ? 'Off-Cycle' : 
                           payroll.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Pay Date: {payroll.payDate}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                        <StatusIcon size={16} className="mr-1" />
                        {status.label}
                      </span>
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">{payroll.employeeCount}</p>
                      <p className="text-sm text-gray-600">Employees</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-900">${payroll.grossPay.toLocaleString()}</p>
                      <p className="text-sm text-blue-600">Gross Pay</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-900">${payroll.netPay.toLocaleString()}</p>
                      <p className="text-sm text-green-600">Net Pay</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-900">${payroll.taxes.toLocaleString()}</p>
                      <p className="text-sm text-orange-600">Taxes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredPayrolls.length === 0 && (
        <div className="text-center py-12">
          <DollarSign size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Payrolls</h3>
          <p className="text-gray-600">No active payrolls found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

// Payroll Details Component
function PayrollDetails({ payroll, onBack, selectedEmployee, setSelectedEmployee, showAddHours, setShowAddHours, setShowApprovalModal, setShowPaymentModal, setApprovalType }: { payroll: any; onBack: () => void; selectedEmployee: any; setSelectedEmployee: (emp: any) => void; showAddHours: boolean; setShowAddHours: (show: boolean) => void; setShowApprovalModal: (show: boolean) => void; setShowPaymentModal: (show: boolean) => void; setApprovalType: (type: string) => void }) {
  const status = (statusConfig as any)[payroll.status]
  const StatusIcon = status.icon
  const [showActionsDropdown, setShowActionsDropdown] = useState(false)
  const [showEmployeeActions, setShowEmployeeActions] = useState<Record<string, boolean>>({})
  const [showJournalModal, setShowJournalModal] = useState(false)
  const [journalAction, setJournalAction] = useState('')

  const isHistoryView = payroll.status === 'paid'

  const toggleEmployeeActions = (employeeId: string) => {
    setShowEmployeeActions(prev => ({
      ...prev,
      [employeeId]: !prev[employeeId]
    }))
  }

  const handleSendPayStub = (employeeId = null) => {
    if (employeeId) {
      console.log(`Sending pay stub to employee ${employeeId}`)
    } else {
      console.log('Sending pay stubs to all employees')
    }
    // Close dropdowns
    setShowActionsDropdown(false)
    setShowEmployeeActions({})
  }

  const handleDownloadPayStub = (employeeId: string) => {
    console.log(`Downloading pay stub for employee ${employeeId}`)
    setShowEmployeeActions(prev => ({ ...prev, [employeeId]: false }))
  }

  const handleJournalAction = (action: string) => {
    setJournalAction(action)
    setShowJournalModal(true)
    setShowActionsDropdown(false)
  }

  return (
    <div className="space-y-6">
      {/* Back Button and Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronRight size={20} className="rotate-180 mr-1" />
          Back to Pay Runs
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Regular Payroll</h1>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
              <StatusIcon size={16} className="mr-1" />
              {status.label}
            </span>
          </div>
          <p className="text-gray-600">Period: {payroll.period}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {isHistoryView ? (
            <>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => handleSendPayStub()}
              >
                Send Pay Stub
              </button>
              <div className="relative">
                <button 
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                >
                  <Settings size={20} />
                </button>
                {showActionsDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                      <button 
                        className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center space-x-2"
                        onClick={() => handleJournalAction('post')}
                      >
                        <FileText size={16} />
                        <span>Post Journal Entries</span>
                      </button>
                      <button 
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        onClick={() => handleJournalAction('delete')}
                      >
                        <X size={16} />
                        <span>Delete Journal Entries</span>
                      </button>
                      <button 
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        onClick={() => {
                          console.log('Downloading journal entries')
                          setShowActionsDropdown(false)
                        }}
                      >
                        <Download size={16} />
                        <span>Download Journal Entries</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {payroll.status === 'draft' && (
                <>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Save Draft
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setApprovalType('submit')
                      setShowApprovalModal(true)
                    }}
                  >
                    Submit for Approval
                  </button>
                </>
              )}
              {payroll.status === 'ready' && (
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setApprovalType('process')
                    setShowApprovalModal(true)
                  }}
                >
                  Process Pay Run
                </button>
              )}
              {payroll.status === 'approved' && (
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  onClick={() => setShowPaymentModal(true)}
                >
                  Mark as Paid
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="text-gray-600" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{payroll.employeeCount}</p>
          <p className="text-sm text-gray-600">Employees</p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="text-blue-600" size={24} />
          </div>
          <p className="text-2xl font-bold text-blue-900 mb-1">${payroll.grossPay.toLocaleString()}</p>
          <p className="text-sm text-blue-600">Payroll Cost</p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="text-green-600" size={24} />
          </div>
          <p className="text-2xl font-bold text-green-900 mb-1">${payroll.netPay.toLocaleString()}</p>
          <p className="text-sm text-green-600">Employees Net Pay</p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="text-orange-600" size={24} />
          </div>
          <p className="text-sm text-gray-600 mb-1">Pay Day</p>
          <p className="text-lg font-semibold text-gray-900">{payroll.payDate.split(' ').slice(0, 2).join(' ')}</p>
          <p className="text-sm text-gray-500">{payroll.payDate.split(' ')[2]}</p>
        </div>
      </div>

      {/* Taxes & Deductions Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Taxes & Deductions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Taxes (Employee + Employer)</span>
            <span className="font-semibold text-gray-900">${payroll.taxes.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Benefits (Employee + Employer)</span>
            <span className="font-semibold text-gray-900">$0.00</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Deductions</span>
            <span className="font-semibold text-gray-900">${payroll.deductions.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
          <nav className="flex">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 bg-white text-gray-900 shadow-sm">
              <Users size={16} />
              <span>Employee Summary</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-white hover:bg-opacity-50">
              <Calculator size={16} />
              <span>Tax Summary</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-white hover:bg-opacity-50">
              <Shield size={16} />
              <span>Benefits & Deductions Summary</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Employee Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Employees</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Filter size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Download size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benefits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payroll.employees.map((employee: any) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {employee.paymentMode === 'Check' ? (
                        <CreditCard size={16} className="text-gray-400 mr-2" />
                      ) : (
                        <DollarSign size={16} className="text-green-600 mr-2" />
                      )}
                      <span className="text-sm text-gray-900">{employee.paymentMode}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.hours}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${employee.grossPay.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$0.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$0.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$0.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${employee.netPay.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.status === 'Paid' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check size={12} className="mr-1" />
                        Paid {employee.paidDate && `on ${employee.paidDate}`}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock size={12} className="mr-1" />
                        Yet To Pay
                      </span>
                    )}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center space-x-2">
                       {isHistoryView ? (
                         <div className="relative">
                           <button 
                             className="text-blue-600 hover:text-blue-900 text-sm px-3 py-1 border border-blue-600 rounded hover:bg-blue-50"
                             onClick={() => toggleEmployeeActions(employee.id)}
                           >
                             View
                           </button>
                           {showEmployeeActions[employee.id] && (
                             <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                               <div className="py-1">
                                 <button 
                                   className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                   onClick={() => handleDownloadPayStub(employee.id)}
                                 >
                                   <Download size={16} />
                                   <span>Download Pay Stub</span>
                                 </button>
                                 <button 
                                   className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                   onClick={() => handleSendPayStub(employee.id)}
                                 >
                                   <FileText size={16} />
                                   <span>Send Pay Stub</span>
                                 </button>
                               </div>
                             </div>
                           )}
                         </div>
                       ) : (
                         <>
                           <button 
                             className="text-blue-600 hover:text-blue-900 text-sm"
                             onClick={() => setSelectedEmployee(employee)}
                           >
                             <Eye size={16} />
                           </button>
                           {payroll.status === 'draft' && (
                             <button 
                               className="text-gray-600 hover:text-gray-900 text-sm"
                               onClick={() => {
                                 setSelectedEmployee(employee)
                                 setShowAddHours(true)
                               }}
                             >
                               <Plus size={16} />
                             </button>
                           )}
                         </>
                       )}
                     </div>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Detail Panel */}
      {selectedEmployee && (
        <EmployeeDetailPanel 
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)}
          showAddHours={showAddHours}
          setShowAddHours={setShowAddHours}
        />
      )}

      {/* Journal Action Modal */}
      {showJournalModal && (
        <JournalActionModal 
          action={journalAction}
          payroll={payroll}
          onClose={() => setShowJournalModal(false)}
          onConfirm={() => {
            console.log(`${journalAction === 'post' ? 'Posting' : 'Deleting'} journal entries`)
            setShowJournalModal(false)
          }}
        />
      )}
    </div>
  )
}

// Employee Detail Panel Component
function EmployeeDetailPanel({ employee, onClose, showAddHours, setShowAddHours }: { employee: any; onClose: () => void; showAddHours: boolean; setShowAddHours: (show: boolean) => void }) {
  const [additionalHours, setAdditionalHours] = useState({
    jobRole: '',
    regularHours: '',
    overtimeHours: '',
    doubleTimeHours: ''
  })

  const handleSaveHours = () => {
    // Logic to save additional hours
    console.log('Saving additional hours:', additionalHours)
    setShowAddHours(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{employee.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <Plus size={24} className="rotate-45" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Employee Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                <p className="text-sm text-gray-900">{employee.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                <p className="text-sm text-gray-900">{employee.paymentMode}</p>
              </div>
            </div>

            {/* Earning Hours */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Earning Hours</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Primary Job Role ($40.00 Per Hour)</span>
                    <span className="text-sm font-medium text-gray-900">HH:MM</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Regular Hours</label>
                      <p className="text-sm font-medium text-gray-900">{employee.hours}</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Overtime</label>
                      <p className="text-sm font-medium text-gray-900">00:00</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Double Time</label>
                      <p className="text-sm font-medium text-gray-900">00:00</p>
                    </div>
                  </div>
                </div>

                {/* Additional Job Hours Section */}
                {showAddHours && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Add Additional Job Hours</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Job Role</label>
                        <select 
                          className="input-field w-full"
                          value={additionalHours.jobRole}
                          onChange={(e) => setAdditionalHours({...additionalHours, jobRole: e.target.value})}
                        >
                          <option value="">Select job role</option>
                          <option value="hardware-engineer">Hardware Engineer ($100.00 Per Hour)</option>
                          <option value="software-engineer">Software Engineer ($90.00 Per Hour)</option>
                          <option value="project-manager">Project Manager ($85.00 Per Hour)</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Regular Hours</label>
                          <input 
                            type="number" 
                            className="input-field w-full"
                            placeholder="30:00"
                            value={additionalHours.regularHours}
                            onChange={(e) => setAdditionalHours({...additionalHours, regularHours: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Overtime</label>
                          <input 
                            type="number" 
                            className="input-field w-full"
                            placeholder="00:00"
                            value={additionalHours.overtimeHours}
                            onChange={(e) => setAdditionalHours({...additionalHours, overtimeHours: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Double Time</label>
                          <input 
                            type="number" 
                            className="input-field w-full"
                            placeholder="00:00"
                            value={additionalHours.doubleTimeHours}
                            onChange={(e) => setAdditionalHours({...additionalHours, doubleTimeHours: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button 
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => setShowAddHours(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          className="btn-primary"
                          onClick={handleSaveHours}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {!showAddHours && (
                  <button 
                    className="mt-4 flex items-center text-blue-600 hover:text-blue-700 text-sm"
                    onClick={() => setShowAddHours(true)}
                  >
                    <Plus size={16} className="mr-1" />
                    Add Additional Job Hours
                  </button>
                )}
              </div>
            </div>

            {/* Earnings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Earnings</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Primary Job Role - Regular Pay</span>
                  <span className="text-sm font-medium text-gray-900">${employee.grossPay.toLocaleString()}</span>
                </div>
                <button className="mt-3 flex items-center text-blue-600 hover:text-blue-700 text-sm">
                  <Plus size={16} className="mr-1" />
                  Add Earning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Approval Modal Component
function ApprovalModal({ payroll, approvalType, onClose, onConfirm }: { payroll: any; approvalType: string; onClose: () => void; onConfirm: (data: any) => void }) {
  const [approvalData, setApprovalData] = useState({
    comments: ''
  })

  const getModalTitle = () => {
    switch(approvalType) {
      case 'submit': return 'Submit Payroll for Approval'
      case 'process': return 'Process Pay Run'
      default: return 'Approve Payroll'
    }
  }

  const getModalDescription = () => {
    switch(approvalType) {
      case 'submit': return 'Are you sure you want to submit this payroll for approval? Once submitted, you cannot make changes until it\'s approved or rejected.'
      case 'process': return 'Ready to process this pay run? This will calculate final amounts and prepare for payment distribution.'
      default: return 'Please review the payroll details and confirm approval.'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{getModalTitle()}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <Plus size={24} className="rotate-45" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Payroll Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Period:</span>
                  <span className="text-gray-900">{payroll.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees:</span>
                  <span className="text-gray-900">{payroll.employeeCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cost:</span>
                  <span className="font-semibold text-gray-900">${payroll.grossPay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Pay:</span>
                  <span className="font-semibold text-gray-900">${payroll.netPay.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm">{getModalDescription()}</p>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comments (Optional)</label>
              <textarea 
                className="input-field w-full h-20 resize-none"
                placeholder="Add any notes or comments..."
                value={approvalData.comments}
                onChange={(e) => setApprovalData({...approvalData, comments: e.target.value})}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={onConfirm}
              >
                {approvalType === 'submit' ? 'Submit for Approval' : approvalType === 'process' ? 'Process Pay Run' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Payment Modal Component
function PaymentModal({ payroll, onClose, onConfirm }: { payroll: any; onClose: () => void; onConfirm: (data: any) => void }) {
  const [paymentData, setPaymentData] = useState({
    paidThroughAccount: 'Business Checking Account',
    paymentMode: 'Direct Deposit',
    sendNotifications: true,
    paymentDate: new Date().toISOString().split('T')[0]
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Record Payment</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <Plus size={24} className="rotate-45" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Payment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Period:</span>
                  <span className="text-gray-900">{payroll.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees:</span>
                  <span className="text-gray-900">{payroll.employeeCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Net Pay:</span>
                  <span className="font-semibold text-gray-900">${payroll.netPay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Taxes:</span>
                  <span className="font-semibold text-gray-900">${payroll.taxes.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paid Through Account</label>
                <select 
                  className="input-field w-full"
                  value={paymentData.paidThroughAccount}
                  onChange={(e) => setPaymentData({...paymentData, paidThroughAccount: e.target.value})}
                >
                  <option value="Business Checking Account">Business Checking Account</option>
                  <option value="Payroll Account">Payroll Account</option>
                  <option value="Operating Account">Operating Account</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                <select 
                  className="input-field w-full"
                  value={paymentData.paymentMode}
                  onChange={(e) => setPaymentData({...paymentData, paymentMode: e.target.value})}
                >
                  <option value="Direct Deposit">Direct Deposit</option>
                  <option value="Check">Check</option>
                  <option value="Cash">Cash</option>
                  <option value="Wire Transfer">Wire Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                <input 
                  type="date" 
                  className="input-field w-full"
                  value={paymentData.paymentDate}
                  onChange={(e) => setPaymentData({...paymentData, paymentDate: e.target.value})}
                />
              </div>

              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                  checked={paymentData.sendNotifications}
                  onChange={(e) => setPaymentData({...paymentData, sendNotifications: e.target.checked})}
                />
                <div className="ml-2">
                  <span className="text-sm text-gray-700 font-medium">Send pay stub notification email to all employees</span>
                  <p className="text-xs text-gray-500 mt-1">Employees will receive an email with their pay stub attached</p>
                </div>
              </label>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="text-yellow-600 mr-2 mt-0.5" size={16} />
                <div className="text-sm">
                  <p className="text-yellow-800 font-medium">Important Note</p>
                  <p className="text-yellow-700 mt-1">
                    This will mark all employees as paid and generate tax forms under the Taxes module. 
                    Ensure all payment information is correct before proceeding.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                onClick={onConfirm}
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
