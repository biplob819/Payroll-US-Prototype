'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { 
  ArrowLeft, 
  Edit, 
  MoreHorizontal, 
  Trash2,
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  DollarSign,
  Clock,
  FileText,
  Download,
  Plus,
  Eye,
  Settings,
  X,
  Save,
  CheckCircle,
  AlertCircle,
  Filter
} from 'lucide-react'

// Mock employee data - in real app, this would come from API/database
const employeeData = {
  'EP-0004': {
    id: 'EP-0004',
    employeeId: 'EP-0004',
    firstName: 'Daniel',
    lastName: 'Alpert',
    email: 'daniel.alpert@zylker.com',
    personalEmail: 'daniel.alpert@gmail.com',
    phone: '617 405 7840',
    designation: 'Hardware Engineer',
    department: 'Engineering',
    workLocation: 'Organization Address',
    startDate: '01 Jan 2020',
    employeeType: 'Paid by the hour',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    
    // Personal Details
    ssn: 'XXX-XX-4367',
    dateOfBirth: '24 Oct 1998',
    residentialAddress: {
      street: '382 W Fourth St',
      city: 'Boston',
      state: 'Massachusetts',
      zipCode: '02127'
    },
    
    // Federal Tax Withholding
    federalTax: {
      multipleJobsOrSpouse: false,
      filingStatus: 'Single or Married, filing separately',
      deductions: 400.00,
      otherIncome: 0.00,
      dependentAmount: 0.00,
      additionalWithholding: 0.00
    },
    
    // Massachusetts Tax Withholding
    massachusettsTax: {
      allowances: 0,
      additionalWithholdings: 0.00,
      fullTimeStudent: false,
      headOfHousehold: false,
      blindnessStatus: false,
      spouseBlindness: false
    },
    
    // Payment Information
    payment: {
      mode: 'Direct Deposit',
      status: 'Success',
      routingNumber: '091000019',
      bankName: 'Zylker Bank',
      accountNumber: '8000',
      accountType: 'Savings'
    },
    
    // Compensation
    compensation: {
      regularPay: {
        amount: 100.00,
        period: 'Per Hour'
      },
      otherEarnings: [
        {
          id: '1',
          title: 'Hardware Engineer - Regular Pay',
          amount: 100.00,
          period: 'Per Hour'
        },
        {
          id: '2', 
          title: 'Trainer - Regular Pay',
          amount: 75.00,
          period: 'Per Hour'
        }
      ],
      benefits: [
        {
          id: '1',
          name: 'Zylker Dental Cover',
          employeeContribution: 5.00,
          employerContribution: 20.00
        }
      ],
      deductions: [
        {
          id: '1',
          name: 'Salary Correction',
          type: 'One-time deduction',
          amount: 12.50
        }
      ],
      sickLeavePolicy: {
        earningMethod: 'At the beginning of each year',
        add: '60:00 hours every year',
        maximumBalance: '120:00 hours',
        currentBalance: '32:00 hours'
      }
    },
    
    // Pay Stubs
    payStubs: [
      {
        id: '1',
        payDate: '20 Nov 2024',
        payPeriod: '03 Nov 2024 - 09 Nov 2024',
        fiscalYear: '2024',
        grossPay: 4000.00,
        netPay: 2732.31,
        totalDeductions: 1267.69,
        deductions: {
          fica: 248.00,
          federalIncomeTax: 768.00,
          medicare: 58.00,
          massachusettsStateTax: 184.00,
          massachusettsPaidFamilyAndMedicalLeave: 16.40
        }
      }
    ]
  }
}

export default function EmployeeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const employeeId = params.id as string
  
  const [activeTab, setActiveTab] = useState('overview')
  const [employee, setEmployee] = useState(employeeData[employeeId as keyof typeof employeeData])
  
  // Modals and forms state
  const [showBasicInfoModal, setShowBasicInfoModal] = useState(false)
  const [showPersonalDetailsModal, setShowPersonalDetailsModal] = useState(false)
  const [showFederalTaxModal, setShowFederalTaxModal] = useState(false)
  const [showStateTaxModal, setShowStateTaxModal] = useState(false)
  const [showPaymentInfoModal, setShowPaymentInfoModal] = useState(false)
  const [showSickLeaveModal, setShowSickLeaveModal] = useState(false)
  const [showTerminateModal, setShowTerminateModal] = useState(false)
  const [showAddBenefitModal, setShowAddBenefitModal] = useState(false)
  const [showAddDeductionModal, setShowAddDeductionModal] = useState(false)
  const [showAddEarningModal, setShowAddEarningModal] = useState(false)
  const [showPaystubModal, setShowPaystubModal] = useState(false)
  const [showDownloadPaystubModal, setShowDownloadPaystubModal] = useState(false)
  const [showEditRegularPayModal, setShowEditRegularPayModal] = useState(false)
  
  if (!employee) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <div className="container mx-auto px-6 py-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Employee Not Found</h1>
                <button
                  onClick={() => router.back()}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Go Back
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'compensation', label: 'Compensation' },
    { id: 'paystubs', label: 'Pay Stubs & Forms' }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {/* Header with back button and employee info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <button
                  onClick={() => router.back()}
                  className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover mr-4"
                    src={employee.profilePicture}
                    alt={`${employee.firstName} ${employee.lastName}`}
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {employee.firstName} {employee.lastName}
                    </h1>
                    <p className="text-gray-600">
                      {employee.designation} • Emp. ID: {employee.employeeId}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => {
                    router.push('/payroll/employees')
                    // Set the active tab to add-employee when navigating
                    setTimeout(() => {
                      const addEmployeeTab = document.querySelector('[data-tab="add-employee"]') as HTMLButtonElement
                      if (addEmployeeTab) addEmployeeTab.click()
                    }, 100)
                  }}
                  className="flex items-center px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900"
                >
                  <Plus size={16} className="mr-2" />
                  Add
                </button>
                <button
                  onClick={() => setShowTerminateModal(true)}
                  className="flex items-center px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Terminate Employee
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-gray-800 text-gray-800'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <OverviewTab 
                    employee={employee}
                    setEmployee={setEmployee}
                    setShowBasicInfoModal={setShowBasicInfoModal}
                    setShowPersonalDetailsModal={setShowPersonalDetailsModal}
                    setShowFederalTaxModal={setShowFederalTaxModal}
                    setShowStateTaxModal={setShowStateTaxModal}
                    setShowPaymentInfoModal={setShowPaymentInfoModal}
                  />
                )}
                
                {activeTab === 'compensation' && (
                  <CompensationTab 
                    employee={employee}
                    setEmployee={setEmployee}
                    setShowSickLeaveModal={setShowSickLeaveModal}
                    setShowAddBenefitModal={setShowAddBenefitModal}
                    setShowAddDeductionModal={setShowAddDeductionModal}
                    setShowAddEarningModal={setShowAddEarningModal}
                    setShowEditRegularPayModal={setShowEditRegularPayModal}
                  />
                )}
                
                {activeTab === 'paystubs' && (
                  <PayStubsTab 
                    employee={employee}
                    setShowPaystubModal={setShowPaystubModal}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {showBasicInfoModal && (
        <BasicInfoModal 
          employee={employee}
          setEmployee={setEmployee}
          onClose={() => setShowBasicInfoModal(false)}
        />
      )}
      
      {showPersonalDetailsModal && (
        <PersonalDetailsModal 
          employee={employee}
          setEmployee={setEmployee}
          onClose={() => setShowPersonalDetailsModal(false)}
        />
      )}
      
      {showFederalTaxModal && (
        <FederalTaxModal 
          employee={employee}
          setEmployee={setEmployee}
          onClose={() => setShowFederalTaxModal(false)}
        />
      )}
      
      {showStateTaxModal && (
        <StateTaxModal 
          employee={employee}
          setEmployee={setEmployee}
          onClose={() => setShowStateTaxModal(false)}
        />
      )}
      
      {showPaymentInfoModal && (
        <PaymentInfoModal 
          employee={employee}
          setEmployee={setEmployee}
          onClose={() => setShowPaymentInfoModal(false)}
        />
      )}
      
      {showSickLeaveModal && (
        <SickLeaveModal 
          employee={employee}
          setEmployee={setEmployee}
          onClose={() => setShowSickLeaveModal(false)}
        />
      )}
      
      {showAddBenefitModal && (
        <AddBenefitModal 
          employee={employee}
          setEmployee={setEmployee}
          onClose={() => setShowAddBenefitModal(false)}
        />
      )}
      
      {showAddDeductionModal && (
        <AddDeductionModal 
          employee={employee}
          setEmployee={setEmployee}
          onClose={() => setShowAddDeductionModal(false)}
        />
      )}
      
      {showAddEarningModal && (
        <AddEarningModal 
          employee={employee}
          setEmployee={setEmployee}
          onClose={() => setShowAddEarningModal(false)}
        />
      )}
      
      {showTerminateModal && (
        <TerminateEmployeeModal 
          employee={employee}
          onClose={() => setShowTerminateModal(false)}
        />
      )}
      
      {showPaystubModal && (
        <PaystubModal 
          employee={employee}
          onClose={() => setShowPaystubModal(false)}
        />
      )}
      
      {showEditRegularPayModal && (
        <EditRegularPayModal 
          employee={employee}
          setEmployee={setEmployee}
          onClose={() => setShowEditRegularPayModal(false)}
        />
      )}
    </div>
  )
}

// Overview Tab Component
function OverviewTab({ 
  employee, 
  setEmployee, 
  setShowBasicInfoModal, 
  setShowPersonalDetailsModal, 
  setShowFederalTaxModal, 
  setShowStateTaxModal,
  setShowPaymentInfoModal 
}: any) {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          <button
            onClick={() => setShowBasicInfoModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <Edit size={16} />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
              <p className="text-gray-900">{employee.firstName} {employee.lastName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Work Location</label>
              <p className="text-gray-900">{employee.workLocation}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Date of Joining</label>
              <p className="text-gray-900">{employee.startDate}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Organization Address</label>
              <p className="text-gray-900">{employee.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Employee Type</label>
              <p className="text-gray-900">{employee.employeeType}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Portal Access</label>
              <p className="text-gray-900">
                <span className="text-gray-500">Disabled</span>{' '}
                <button className="text-blue-600 hover:text-blue-800 ml-1">(Enable)</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
          <button
            onClick={() => setShowPersonalDetailsModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <Edit size={16} />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">SSN</label>
              <p className="text-gray-900">
                {employee.ssn}{' '}
                <button className="text-blue-600 hover:text-blue-800 text-sm">(Show SSN)</button>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Residential Address</label>
              <p className="text-gray-900">
                {employee.residentialAddress.street}<br />
                {employee.residentialAddress.city}, {employee.residentialAddress.state} - {employee.residentialAddress.zipCode}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
              <p className="text-gray-900">{employee.dateOfBirth}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Personal Email Address</label>
              <p className="text-gray-900">{employee.personalEmail}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Information Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Federal Tax Withholding */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Federal Tax Withholding</h3>
            <button
              onClick={() => setShowFederalTaxModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Edit size={16} />
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Multiple Jobs or Spouse Works</label>
                <p className="text-gray-900">{employee.federalTax.multipleJobsOrSpouse ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Federal Filing Status</label>
                <p className="text-gray-900">{employee.federalTax.filingStatus}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Deductions</label>
                <p className="text-gray-900">${employee.federalTax.deductions.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Other Income</label>
                <p className="text-gray-900">${employee.federalTax.otherIncome.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Dependent Amount</label>
                <p className="text-gray-900">${employee.federalTax.dependentAmount.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Additional Withholding Amount</label>
                <p className="text-gray-900">${employee.federalTax.additionalWithholding.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Massachusetts Tax Withholding */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Massachusetts Tax Withholding</h3>
            <button
              onClick={() => setShowStateTaxModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Edit size={16} />
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">MA allowances</label>
                <p className="text-gray-900">{employee.massachusettsTax.allowances}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">MA additional withholdings</label>
                <p className="text-gray-900">${employee.massachusettsTax.additionalWithholdings.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">MA full-time student status</label>
                <p className="text-gray-900">{employee.massachusettsTax.fullTimeStudent ? 'true' : 'false'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">MA head of household status</label>
                <p className="text-gray-900">{employee.massachusettsTax.headOfHousehold ? 'true' : 'false'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">MA blindness status</label>
                <p className="text-gray-900">{employee.massachusettsTax.blindnessStatus ? 'true' : 'false'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">MA spouse blindness</label>
                <p className="text-gray-900">{employee.massachusettsTax.spouseBlindness ? 'true' : 'false'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
          <button
            onClick={() => setShowPaymentInfoModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <Edit size={16} />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Payment Mode</label>
              <p className="text-gray-900">{employee.payment.mode}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Bank Name</label>
              <p className="text-gray-900">{employee.payment.bankName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
              <p className="text-gray-900">
                <span className="inline-flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  {employee.payment.status}
                </span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Account Number</label>
              <p className="text-gray-900">{employee.payment.accountNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Routing Number</label>
              <p className="text-gray-900">{employee.payment.routingNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Account Type</label>
              <p className="text-gray-900">{employee.payment.accountType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Compensation Tab Component
function CompensationTab({ 
  employee, 
  setEmployee, 
  setShowSickLeaveModal, 
  setShowAddBenefitModal, 
  setShowAddDeductionModal,
  setShowAddEarningModal,
  setShowEditRegularPayModal 
}: any) {
  return (
    <div className="space-y-6">
      {/* Salary and wages */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Salary and wages</h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div>
              <h4 className="font-medium text-gray-900">Regular Pay</h4>
              <p className="text-2xl font-bold text-gray-900">
                ${employee.compensation.regularPay.amount.toFixed(2)} {employee.compensation.regularPay.period}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowEditRegularPayModal(true)}
            className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Edit size={16} className="mr-2" />
            Edit
          </button>
        </div>

        {/* Other Earnings */}
        {employee.compensation.otherEarnings && employee.compensation.otherEarnings.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Other Earnings</h4>
            <div className="space-y-3">
              {employee.compensation.otherEarnings.map((earning: any) => (
                <div key={earning.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{earning.title}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-gray-900">${earning.amount.toFixed(2)} {earning.period}</p>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowAddEarningModal(true)}
          className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Plus size={16} className="mr-2" />
          Earning
        </button>
      </div>

      {/* Paid Time Off */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Paid Time Off</h3>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Sick Leave Policy</h4>
            <button
              onClick={() => setShowSickLeaveModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Edit size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Earning Method</label>
              <p className="text-gray-900">{employee.compensation.sickLeavePolicy.earningMethod}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Add</label>
              <p className="text-gray-900">{employee.compensation.sickLeavePolicy.add}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Maximum Balance</label>
              <p className="text-gray-900">{employee.compensation.sickLeavePolicy.maximumBalance}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Current Balance</label>
              <p className="text-gray-900">{employee.compensation.sickLeavePolicy.currentBalance}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Benefits</h3>
          <button
            onClick={() => setShowAddBenefitModal(true)}
            className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Plus size={16} className="mr-2" />
            Add New
          </button>
        </div>

        {employee.compensation.benefits && employee.compensation.benefits.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Benefit Name</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Employees' Contribution</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Employer's Contribution</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employee.compensation.benefits.map((benefit: any) => (
                  <tr key={benefit.id} className="border-b border-gray-100">
                    <td className="py-4 text-gray-900">{benefit.name}</td>
                    <td className="py-4 text-gray-900">${benefit.employeeContribution.toFixed(2)}</td>
                    <td className="py-4 text-gray-900">${benefit.employerContribution.toFixed(2)}</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-400 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No benefits added yet</p>
        )}
      </div>

      {/* Deductions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Deductions</h3>
          <button
            onClick={() => setShowAddDeductionModal(true)}
            className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Plus size={16} className="mr-2" />
            Add New
          </button>
        </div>

        {employee.compensation.deductions && employee.compensation.deductions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Deduction Name</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Deduction Amount</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employee.compensation.deductions.map((deduction: any) => (
                  <tr key={deduction.id} className="border-b border-gray-100">
                    <td className="py-4 text-gray-900">{deduction.name}</td>
                    <td className="py-4 text-gray-900">{deduction.type}</td>
                    <td className="py-4 text-gray-900">${deduction.amount.toFixed(2)}</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-400 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No deductions added yet</p>
        )}
      </div>

      {/* Policy Options */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">You can also add following to the employee</h3>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowAddBenefitModal(true)}
            className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <User size={16} className="mr-2" />
            Benefits
          </button>
          <button
            onClick={() => setShowAddDeductionModal(true)}
            className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FileText size={16} className="mr-2" />
            Deductions
          </button>
          <button
            onClick={() => setShowSickLeaveModal(true)}
            className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Calendar size={16} className="mr-2" />
            Sick Leave Policy
          </button>
          <button className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Clock size={16} className="mr-2" />
            Vacation Leave Policy
          </button>
        </div>
      </div>
    </div>
  )
}

// Pay Stubs Tab Component
function PayStubsTab({ employee, setShowPaystubModal }: any) {
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  return (
    <div className="space-y-6">
      {/* Header with filter */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Pay Stubs</h3>
        <div className="flex items-center">
          <Filter size={16} className="mr-2 text-gray-400" />
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent">
            <option>Fiscal Year: 2024</option>
            <option>Fiscal Year: 2023</option>
          </select>
        </div>
      </div>

      {/* Pay Stubs Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employee.payStubs.map((payStub: any) => (
              <tr key={payStub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payStub.payDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payStub.payPeriod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowPaystubModal(true)}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => setShowDownloadModal(true)}
                      className="text-gray-700 hover:text-gray-900 border border-gray-600 rounded px-2 py-1"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <DownloadPayStubModal onClose={() => setShowDownloadModal(false)} />
      )}
    </div>
  )
}

// All Modal Components would continue here...
// I'll implement the key modals to demonstrate the functionality

// Basic Info Modal
function BasicInfoModal({ employee, setEmployee, onClose }: any) {
  const [formData, setFormData] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    middleName: '',
    employeeId: employee.employeeId,
    startDate: employee.startDate,
    email: employee.email,
    phone: employee.phone,
    designation: employee.designation,
    workLocation: employee.workLocation,
    employeeType: employee.employeeType,
    amount: employee.compensation.regularPay.amount,
    payPeriod: employee.compensation.regularPay.period.toLowerCase().replace(' ', '')
  })

  const handleSave = () => {
    setEmployee({
      ...employee,
      firstName: formData.firstName,
      lastName: formData.lastName,
      employeeId: formData.employeeId,
      startDate: formData.startDate,
      email: formData.email,
      phone: formData.phone,
      designation: formData.designation,
      workLocation: formData.workLocation,
      employeeType: formData.employeeType,
      compensation: {
        ...employee.compensation,
        regularPay: {
          amount: formData.amount,
          period: formData.payPeriod
        }
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Daniel's basic information</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Employee Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name*</label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="Daniel"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                  placeholder="Middle Name"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Alpert"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Day of Work*</label>
                <input
                  type="text"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID*</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Email*</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation*</label>
                <select
                  value={formData.designation}
                  onChange={(e) => setFormData({...formData, designation: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="Hardware Engineer">Hardware Engineer</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Product Manager">Product Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Location*</label>
                <select
                  value={formData.workLocation}
                  onChange={(e) => setFormData({...formData, workLocation: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="Organization Address">Organization Address</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            {/* Compensation Details */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compensation Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee Type*</label>
                <select
                  value={formData.employeeType}
                  onChange={(e) => setFormData({...formData, employeeType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="Paid by the hour">Paid by the hour</option>
                  <option value="Salaried">Salaried</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount*</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-lg">
                      $
                    </span>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pay Period*</label>
                  <select
                    value={formData.payPeriod}
                    onChange={(e) => setFormData({...formData, payPeriod: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="perhour">per hour</option>
                    <option value="perday">per day</option>
                    <option value="perweek">per week</option>
                    <option value="permonth">per month</option>
                    <option value="peryear">per year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
              >
                <Save size={16} className="mr-2" />
                Save
              </button>
            </div>

            <p className="text-sm text-red-500 text-right">* indicates mandatory fields</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Personal Details Modal
function PersonalDetailsModal({ employee, setEmployee, onClose }: any) {
  const [formData, setFormData] = useState({
    ssn: employee.ssn,
    dateOfBirth: employee.dateOfBirth,
    personalEmail: employee.personalEmail,
    street: employee.residentialAddress.street,
    city: employee.residentialAddress.city,
    state: employee.residentialAddress.state,
    zipCode: employee.residentialAddress.zipCode
  })

  const handleSave = () => {
    setEmployee({
      ...employee,
      ssn: formData.ssn,
      dateOfBirth: formData.dateOfBirth,
      personalEmail: formData.personalEmail,
      residentialAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Daniel's personal information</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SSN*</label>
              <input
                type="text"
                value={formData.ssn}
                onChange={(e) => setFormData({...formData, ssn: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth*</label>
                <input
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Personal Email Address</label>
                <input
                  type="email"
                  value={formData.personalEmail}
                  onChange={(e) => setFormData({...formData, personalEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Residential Address*</label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({...formData, street: e.target.value})}
                  placeholder="382 W"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value="Fourth St"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <div className="grid grid-cols-3 gap-3">
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="California">California</option>
                    <option value="New York">New York</option>
                  </select>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Boston"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    placeholder="02127"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
              >
                <Save size={16} className="mr-2" />
                Save
              </button>
            </div>

            <p className="text-sm text-red-500 text-right">* indicates mandatory fields</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Additional modals would continue here...
// For brevity, I'm implementing the key modals to demonstrate functionality

// Stub modals for other functionality
function FederalTaxModal({ employee, setEmployee, onClose }: any) {
  const [formData, setFormData] = useState({
    multipleJobsOrSpouse: employee.federalTax.multipleJobsOrSpouse,
    filingStatus: employee.federalTax.filingStatus,
    deductions: employee.federalTax.deductions,
    otherIncome: employee.federalTax.otherIncome,
    dependentAmount: employee.federalTax.dependentAmount,
    additionalWithholding: employee.federalTax.additionalWithholding
  })

  const handleSave = () => {
    setEmployee({
      ...employee,
      federalTax: {
        ...employee.federalTax,
        ...formData
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Federal Tax Withholding</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.multipleJobsOrSpouse}
                  onChange={(e) => setFormData({...formData, multipleJobsOrSpouse: e.target.checked})}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Multiple Jobs or Spouse Works</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Federal Filing Status*</label>
              <select
                value={formData.filingStatus}
                onChange={(e) => setFormData({...formData, filingStatus: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="Single or Married, filing separately">Single or Married, filing separately</option>
                <option value="Married filing jointly">Married filing jointly</option>
                <option value="Head of household">Head of household</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deductions ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.deductions}
                  onChange={(e) => setFormData({...formData, deductions: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Other Income ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.otherIncome}
                  onChange={(e) => setFormData({...formData, otherIncome: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dependent Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.dependentAmount}
                  onChange={(e) => setFormData({...formData, dependentAmount: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Withholding ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.additionalWithholding}
                  onChange={(e) => setFormData({...formData, additionalWithholding: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>

          <p className="text-sm text-red-500 text-right mt-2">* indicates mandatory fields</p>
        </div>
      </div>
    </div>
  )
}

function StateTaxModal({ employee, setEmployee, onClose }: any) {
  const [formData, setFormData] = useState({
    allowances: employee.massachusettsTax.allowances,
    additionalWithholdings: employee.massachusettsTax.additionalWithholdings,
    fullTimeStudent: employee.massachusettsTax.fullTimeStudent,
    headOfHousehold: employee.massachusettsTax.headOfHousehold,
    blindnessStatus: employee.massachusettsTax.blindnessStatus,
    spouseBlindness: employee.massachusettsTax.spouseBlindness
  })

  const handleSave = () => {
    setEmployee({
      ...employee,
      massachusettsTax: {
        ...employee.massachusettsTax,
        ...formData
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Massachusetts Tax Withholding</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">MA allowances</label>
                <input
                  type="number"
                  value={formData.allowances}
                  onChange={(e) => setFormData({...formData, allowances: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">MA additional withholdings ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.additionalWithholdings}
                  onChange={(e) => setFormData({...formData, additionalWithholdings: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.fullTimeStudent}
                  onChange={(e) => setFormData({...formData, fullTimeStudent: e.target.checked})}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">MA full-time student status</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.headOfHousehold}
                  onChange={(e) => setFormData({...formData, headOfHousehold: e.target.checked})}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">MA head of household status</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.blindnessStatus}
                  onChange={(e) => setFormData({...formData, blindnessStatus: e.target.checked})}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">MA blindness status</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.spouseBlindness}
                  onChange={(e) => setFormData({...formData, spouseBlindness: e.target.checked})}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">MA spouse blindness</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentInfoModal({ employee, setEmployee, onClose }: any) {
  const [formData, setFormData] = useState({
    mode: employee.payment.mode,
    bankName: employee.payment.bankName,
    accountNumber: employee.payment.accountNumber,
    accountType: employee.payment.accountType,
    routingNumber: employee.payment.routingNumber
  })

  const handleSave = () => {
    setEmployee({
      ...employee,
      payment: {
        ...employee.payment,
        ...formData
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Payment Information</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Mode*</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({...formData, mode: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="Direct Deposit">Direct Deposit</option>
                <option value="Check">Check</option>
                <option value="Cash">Cash</option>
              </select>
            </div>

            {formData.mode === 'Direct Deposit' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name*</label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type*</label>
                    <select
                      value={formData.accountType}
                      onChange={(e) => setFormData({...formData, accountType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="Checking">Checking</option>
                      <option value="Savings">Savings</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Routing Number*</label>
                    <input
                      type="text"
                      value={formData.routingNumber}
                      onChange={(e) => setFormData({...formData, routingNumber: e.target.value})}
                      placeholder="9 digits"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Number*</label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>

          <p className="text-sm text-red-500 text-right mt-2">* indicates mandatory fields</p>
        </div>
      </div>
    </div>
  )
}

function SickLeaveModal({ employee, setEmployee, onClose }: any) {
  const [formData, setFormData] = useState({
    earningMethod: employee.compensation.sickLeavePolicy.earningMethod,
    add: '60:00',
    maximumBalance: '120:00',
    currentBalance: '32:00'
  })

  const handleSave = () => {
    setEmployee({
      ...employee,
      compensation: {
        ...employee.compensation,
        sickLeavePolicy: {
          ...employee.compensation.sickLeavePolicy,
          add: `${formData.add} hours every year`,
          maximumBalance: `${formData.maximumBalance} hours`,
          currentBalance: `${formData.currentBalance} hours`
        }
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Sick Leave Policy</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Earning Method*</label>
              <select
                value={formData.earningMethod}
                onChange={(e) => setFormData({...formData, earningMethod: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="At the beginning of each year">At the beginning of each year</option>
                <option value="Accrual per pay period">Accrual per pay period</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Add*</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={formData.add}
                  onChange={(e) => setFormData({...formData, add: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <span className="text-gray-500">hours every year</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Balance</label>
              <input
                type="text"
                value={formData.maximumBalance}
                onChange={(e) => setFormData({...formData, maximumBalance: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Balance*</label>
              <input
                type="text"
                value={formData.currentBalance}
                onChange={(e) => setFormData({...formData, currentBalance: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>

          <p className="text-sm text-red-500 text-right mt-2">* indicates mandatory fields</p>
        </div>
      </div>
    </div>
  )
}

function AddBenefitModal({ employee, setEmployee, onClose }: any) {
  const [formData, setFormData] = useState({
    name: 'Zylker Dental Cover',
    employeeContribution: 5.00,
    employerContribution: 20.00
  })

  const handleSave = () => {
    const newBenefit = {
      id: Date.now().toString(),
      ...formData
    }
    setEmployee({
      ...employee,
      compensation: {
        ...employee.compensation,
        benefits: [...(employee.compensation.benefits || []), newBenefit]
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add Benefit</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Benefit Name*</label>
              <select
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="Zylker Dental Cover">Zylker Dental Cover</option>
                <option value="Health Insurance">Health Insurance</option>
                <option value="Life Insurance">Life Insurance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employees' Contribution</label>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Fixed amount</span>
                <input
                  type="number"
                  value={formData.employeeContribution}
                  onChange={(e) => setFormData({...formData, employeeContribution: parseFloat(e.target.value)})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <span className="text-gray-500">per pay period</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employer's Contribution</label>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Fixed amount</span>
                <input
                  type="number"
                  value={formData.employerContribution}
                  onChange={(e) => setFormData({...formData, employerContribution: parseFloat(e.target.value)})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <span className="text-gray-500">per pay period</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddDeductionModal({ employee, setEmployee, onClose }: any) {
  const [formData, setFormData] = useState({
    name: 'Salary Correction',
    amount: 12.50
  })

  const handleSave = () => {
    const newDeduction = {
      id: Date.now().toString(),
      ...formData,
      type: 'One-time deduction'
    }
    setEmployee({
      ...employee,
      compensation: {
        ...employee.compensation,
        deductions: [...(employee.compensation.deductions || []), newDeduction]
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add Deduction</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select a Deduction*</label>
              <select
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="Salary Correction">Salary Correction</option>
                <option value="Loan Repayment">Loan Repayment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                ⚠️ This is an one time deduction based on the following configuration.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount*</label>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Fixed amount</span>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>

          <p className="text-sm text-red-500 text-right mt-2">* indicates mandatory fields</p>
        </div>
      </div>
    </div>
  )
}

function AddEarningModal({ employee, setEmployee, onClose }: any) {
  const [formData, setFormData] = useState({
    jobRole: 'Product Tester',
    amount: 80.00,
    period: 'per hour'
  })

  const handleSave = () => {
    const newEarning = {
      id: Date.now().toString(),
      title: `${formData.jobRole} - Regular Pay`,
      amount: formData.amount,
      period: formData.period === 'per hour' ? 'Per Hour' : formData.period
    }
    setEmployee({
      ...employee,
      compensation: {
        ...employee.compensation,
        otherEarnings: [...(employee.compensation.otherEarnings || []), newEarning]
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">New Earning</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Role</label>
              <select
                value={formData.jobRole}
                onChange={(e) => setFormData({...formData, jobRole: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="Product Tester">Product Tester</option>
                <option value="Consultant">Consultant</option>
                <option value="Trainer">Trainer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="per hour">per hour</option>
                  <option value="per day">per day</option>
                  <option value="per week">per week</option>
                  <option value="per month">per month</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TerminateEmployeeModal({ employee, onClose }: any) {
  const [formData, setFormData] = useState({
    lastWorkingDay: '16 Nov 2024',
    paySchedule: 'regularSchedule',
    payDate: '30 Nov 2024',
    personalEmail: 'daniel.alpert@gmail.com',
    notes: 'Check for any dues and process final payment by the end of November 2024.'
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Terminate Daniel Alpert</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Working Day*</label>
              <input
                type="text"
                value={formData.lastWorkingDay}
                onChange={(e) => setFormData({...formData, lastWorkingDay: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">When do you want to settle the final pay?</label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paySchedule"
                    value="regularSchedule"
                    checked={formData.paySchedule === 'regularSchedule'}
                    onChange={(e) => setFormData({...formData, paySchedule: e.target.value})}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Pay as per the regular pay schedule</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paySchedule"
                    value="givenDate"
                    checked={formData.paySchedule === 'givenDate'}
                    onChange={(e) => setFormData({...formData, paySchedule: e.target.value})}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Pay on a given date</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Pay Date:*</label>
              <input
                type="text"
                value={formData.payDate}
                onChange={(e) => setFormData({...formData, payDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Personal Email Address*</label>
              <div className="flex">
                <input
                  type="text"
                  value="daniel.alpert"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-lg">
                  @gmail.com
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
              >
                Proceed
              </button>
            </div>

            <p className="text-sm text-red-500 text-right">* indicates mandatory fields</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaystubModal({ employee, onClose }: any) {
  const payStub = employee.payStubs[0] // Get the first pay stub

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Paystub for {payStub.payPeriod}
            </h2>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
                Print
              </button>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Pay Stub Content */}
          <div className="bg-white border border-gray-300 rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Zylker Corp</h1>
              <p className="text-gray-600">345 Oak St, Springfield, Massachusetts 01139 U.S.A</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">EMPLOYEE</h3>
                <p className="text-gray-700">Name: Daniel Alpert</p>
                <p className="text-gray-700">Employee ID: XXX-XX-4367</p>
                <p className="text-gray-700">Pay period: {payStub.payPeriod}</p>
                <p className="text-gray-700">Pay Date: {payStub.payDate}</p>
                <p className="text-gray-700">Pay period: 1 (first biweekly) (40 hours worked)</p>
              </div>
              <div className="text-right">
                <h3 className="font-semibold text-gray-900 mb-2">YOUR NET PAY IS</h3>
                <p className="text-3xl font-bold text-gray-900">${payStub.netPay.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">EARNINGS</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Regular Pay</span>
                    <div className="text-right">
                      <div>RATE OR PAY</div>
                      <div>$100.00 Per Hour</div>
                    </div>
                    <div className="text-right">
                      <div>HOURS</div>
                      <div>40.00</div>
                    </div>
                    <div className="text-right">
                      <div>AMOUNT</div>
                      <div>$4,000.00</div>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-2 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>TOTAL GROSS PAY</span>
                    <span>$4,000.00</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">DEDUCTIONS</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>FICA</span>
                    <div className="text-right">
                      <div>RATE OR PAY</div>
                      <div>$248.00</div>
                    </div>
                    <div className="text-right">
                      <div>AMOUNT</div>
                      <div>$248.00</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Federal Income Tax</span>
                    <div className="text-right">
                      <div>$768.00</div>
                    </div>
                    <div className="text-right">
                      <div>$768.00</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Medicare</span>
                    <div className="text-right">
                      <div>$58.00</div>
                    </div>
                    <div className="text-right">
                      <div>$58.00</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Massachusetts State Tax</span>
                    <div className="text-right">
                      <div>$184.00</div>
                    </div>
                    <div className="text-right">
                      <div>$184.00</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Massachusetts Paid Family and Medical Leave - Employee</span>
                    <div className="text-right">
                      <div>$16.40</div>
                    </div>
                    <div className="text-right">
                      <div>$16.40</div>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-2 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>YEAR TO DATE</span>
                    <span>$1,267.69</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Net Pay (Total Gross Pay - Total Deduction)</span>
                <span>${payStub.netPay.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Download Pay Stub Modal
function DownloadPayStubModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    protectWithPassword: true,
    password: ''
  })

  const handleExport = () => {
    // Simulate download
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Download Pay Stub</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">You can protect the pay stub with a password to keep the data secure.</p>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.protectWithPassword}
                onChange={(e) => setFormData({...formData, protectWithPassword: e.target.checked})}
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">Protect this file with a password</span>
            </label>

            {formData.protectWithPassword && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Edit Regular Pay Modal
function EditRegularPayModal({ employee, setEmployee, onClose }: any) {
  const [formData, setFormData] = useState({
    amount: employee.compensation.regularPay.amount,
    period: employee.compensation.regularPay.period.toLowerCase().replace(' ', '')
  })

  const handleSave = () => {
    setEmployee({
      ...employee,
      compensation: {
        ...employee.compensation,
        regularPay: {
          amount: formData.amount,
          period: formData.period === 'perhour' ? 'Per Hour' : formData.period
        }
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Regular Pay</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount*</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-lg">
                    $
                  </span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pay Period*</label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="perhour">per hour</option>
                  <option value="perday">per day</option>
                  <option value="perweek">per week</option>
                  <option value="permonth">per month</option>
                  <option value="peryear">per year</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>

          <p className="text-sm text-red-500 text-right mt-2">* indicates mandatory fields</p>
        </div>
      </div>
    </div>
  )
}
