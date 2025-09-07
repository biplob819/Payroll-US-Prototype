'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { 
  Shield, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Users,
  Settings,
  Eye,
  EyeOff,
  DollarSign,
  Calendar,
  FileText,
  Download,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Heart,
  Car,
  Home,
  Briefcase,
  ArrowRight,
  ChevronDown
} from 'lucide-react'

// Types
interface Benefit {
  id: string
  name: string
  type: 'retirement' | 'cafeteria' | 'health' | 'fsa' | 'hsa'
  plan: string
  taxability: 'pre-tax' | 'post-tax'
  enrolledEmployees: number
  totalContribution: number
  status: 'active' | 'inactive'
  description?: string
  createdDate: string
  lastModified: string
}

interface Employee {
  id: string
  name: string
  email: string
  avatar: string
  employeeContribution: number
  employerContribution: number
  contributionType: 'fixed' | 'percentage'
  enrolledDate: string
}

interface BenefitType {
  id: string
  label: string
  icon: React.ReactNode
  plans: BenefitPlan[]
}

interface BenefitPlan {
  id: string
  name: string
  taxability: 'pre-tax' | 'post-tax'
  description: string
}

// Sample data
const benefitTypes: BenefitType[] = [
  {
    id: 'retirement',
    label: 'Retirement Plan',
    icon: <Briefcase size={20} />,
    plans: [
      { id: '401k', name: '401(k)', taxability: 'pre-tax', description: 'Traditional 401(k) retirement savings plan' },
      { id: 'roth401k', name: 'Roth 401(k)', taxability: 'post-tax', description: 'Roth 401(k) with after-tax contributions' },
      { id: 'simpleIra', name: 'Simple IRA', taxability: 'pre-tax', description: 'Simplified Employee Pension plan' },
      { id: '457', name: '457', taxability: 'pre-tax', description: 'Deferred compensation plan for government employees' },
      { id: 'roth457', name: 'Roth 457', taxability: 'post-tax', description: 'After-tax deferred compensation plan' },
      { id: '403b', name: '403(b)', taxability: 'pre-tax', description: 'Tax-sheltered annuity plan' },
      { id: 'roth403b', name: 'Roth 403(b)', taxability: 'post-tax', description: 'After-tax 403(b) plan' }
    ]
  },
  {
    id: 'cafeteria',
    label: 'Cafeteria Plan (Section 125)',
    icon: <Heart size={20} />,
    plans: [
      { id: 'vision', name: 'Vision Insurance', taxability: 'pre-tax', description: 'Vision care coverage' },
      { id: 'dental', name: 'Dental Insurance', taxability: 'pre-tax', description: 'Dental care coverage' },
      { id: 'disability', name: 'Disability Insurance', taxability: 'pre-tax', description: 'Short and long-term disability coverage' },
      { id: 'accident', name: 'Accident Insurance', taxability: 'pre-tax', description: 'Accidental injury coverage' },
      { id: 'cancer', name: 'Cancer Insurance', taxability: 'pre-tax', description: 'Cancer treatment coverage' },
      { id: 'criticalIllness', name: 'Critical Illness Insurance', taxability: 'pre-tax', description: 'Critical illness coverage' },
      { id: 'hospital', name: 'Hospital Insurance', taxability: 'pre-tax', description: 'Hospital stay coverage' },
      { id: 'life', name: 'Life Insurance', taxability: 'pre-tax', description: 'Life insurance coverage' },
      { id: 'medicalOther', name: 'Other Medical Insurance', taxability: 'pre-tax', description: 'Additional medical coverage' }
    ]
  },
  {
    id: 'fsa',
    label: 'Flexible Spending Account',
    icon: <DollarSign size={20} />,
    plans: [
      { id: 'medicalFsa', name: 'Medical Care FSA', taxability: 'pre-tax', description: 'Medical expense reimbursement account' },
      { id: 'dependentFsa', name: 'Dependent Care FSA', taxability: 'pre-tax', description: 'Dependent care expense reimbursement account' }
    ]
  },
  {
    id: 'hsa',
    label: 'Health Savings Account',
    icon: <Shield size={20} />,
    plans: [
      { id: 'hsa', name: 'Health Savings Account', taxability: 'pre-tax', description: 'Tax-advantaged medical savings account' }
    ]
  },
  {
    id: 'health',
    label: 'Health Insurance',
    icon: <Heart size={20} />,
    plans: [
      { id: 'medical', name: 'Medical Insurance [FIT Exempted]', taxability: 'pre-tax', description: 'Comprehensive health insurance coverage' }
    ]
  }
]

const dummyBenefits: Benefit[] = [
  {
    id: '1',
    name: 'Zylker Dental Cover',
    type: 'cafeteria',
    plan: 'Dental Insurance (Pre-tax)',
    taxability: 'pre-tax',
    enrolledEmployees: 1,
    totalContribution: 25.00,
    status: 'active',
    description: 'Comprehensive dental insurance coverage for employees and their families',
    createdDate: '2024-01-15',
    lastModified: '2024-12-15'
  },
  {
    id: '2',
    name: 'Company 401k Plan',
    type: 'retirement',
    plan: '401(k)',
    taxability: 'pre-tax',
    enrolledEmployees: 8,
    totalContribution: 2450.00,
    status: 'active',
    description: 'Traditional 401(k) retirement savings plan with company matching',
    createdDate: '2024-01-01',
    lastModified: '2024-11-30'
  },
  {
    id: '3',
    name: 'Health Savings Account',
    type: 'hsa',
    plan: 'Health Savings Account',
    taxability: 'pre-tax',
    enrolledEmployees: 12,
    totalContribution: 1200.00,
    status: 'active',
    description: 'Tax-advantaged medical savings account for qualified medical expenses',
    createdDate: '2024-02-01',
    lastModified: '2024-12-01'
  },
  {
    id: '4',
    name: 'Vision Care Plan',
    type: 'cafeteria',
    plan: 'Vision Insurance (Pre-tax)',
    taxability: 'pre-tax',
    enrolledEmployees: 6,
    totalContribution: 180.00,
    status: 'active',
    description: 'Vision care coverage including eye exams and glasses',
    createdDate: '2024-03-01',
    lastModified: '2024-10-15'
  },
  {
    id: '5',
    name: 'Life Insurance Plan',
    type: 'cafeteria',
    plan: 'Life Insurance (Pre-tax)',
    taxability: 'pre-tax',
    enrolledEmployees: 0,
    totalContribution: 0,
    status: 'inactive',
    description: 'Basic life insurance coverage for employees',
    createdDate: '2024-01-15',
    lastModified: '2024-08-20'
  }
]

// Sample employees for the selected benefit
const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'Daniel Alpert',
    email: 'daniel.alpert@zylker.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    employeeContribution: 5.00,
    employerContribution: 20.00,
    contributionType: 'fixed',
    enrolledDate: '2024-01-15'
  }
]

export default function BenefitsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditContributionModal, setShowEditContributionModal] = useState(false)
  const [showRemoveEmployeeModal, setShowRemoveEmployeeModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [benefits, setBenefits] = useState<Benefit[]>(dummyBenefits)
  const [enrolledEmployees, setEnrolledEmployees] = useState<{[benefitId: string]: Employee[]}>({
    '1': sampleEmployees // Only Zylker Dental Cover has enrolled employees initially
  })

  // Filter benefits based on search and filters
  const filteredBenefits = benefits.filter(benefit => {
    const matchesSearch = benefit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          benefit.plan.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || benefit.type === selectedType
    const matchesStatus = selectedStatus === 'all' || benefit.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleBenefitClick = (benefit: Benefit) => {
    setSelectedBenefit(benefit)
  }

  const handleAddBenefit = () => {
    setShowAddModal(true)
  }

  const handleEnrollEmployee = () => {
    setShowEnrollModal(true)
  }

  const handleEditBenefit = () => {
    setShowEditModal(true)
  }

  const handleMarkInactive = () => {
    if (selectedBenefit) {
      setBenefits(prev => prev.map(b => 
        b.id === selectedBenefit.id 
          ? { ...b, status: 'inactive' as const }
          : b
      ))
      setSelectedBenefit({ ...selectedBenefit, status: 'inactive' })
      setShowDropdown(false)
    }
  }

  const handleDeleteBenefit = () => {
    setShowDeleteModal(true)
    setShowDropdown(false)
  }

  const confirmDeleteBenefit = () => {
    if (selectedBenefit) {
      setBenefits(prev => prev.filter(b => b.id !== selectedBenefit.id))
      setSelectedBenefit(null)
      setShowDeleteModal(false)
    }
  }

  const getTypeIcon = (type: string) => {
    const typeConfig = benefitTypes.find(t => t.id === type)
    return typeConfig?.icon || <Shield size={20} />
  }

  const getTypeColor = (type: string) => {
    const colors = {
      retirement: 'bg-blue-100 text-blue-800',
      cafeteria: 'bg-green-100 text-green-800',
      health: 'bg-red-100 text-red-800',
      fsa: 'bg-purple-100 text-purple-800',
      hsa: 'bg-orange-100 text-orange-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="flex h-full">
            {/* Benefits List */}
            <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Benefits</h1>
                    <p className="text-sm text-gray-600">Manage employee benefits</p>
                  </div>
                  <button
                    onClick={handleAddBenefit}
                    className="flex items-center px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Plus size={16} className="mr-2" />
                    Add
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search benefits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="retirement">Retirement Plan</option>
                      <option value="cafeteria">Cafeteria Plan</option>
                      <option value="health">Health Insurance</option>
                      <option value="fsa">FSA</option>
                      <option value="hsa">HSA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="flex-1 overflow-y-auto">
                {filteredBenefits.map((benefit) => (
                  <div
                    key={benefit.id}
                    onClick={() => handleBenefitClick(benefit)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedBenefit?.id === benefit.id ? 'bg-gray-100 border-l-4 border-l-gray-900' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg ${getTypeColor(benefit.type)}`}>
                          {getTypeIcon(benefit.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{benefit.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{benefit.plan}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Users size={12} className="mr-1" />
                                {benefit.enrolledEmployees}
                              </span>
                              <span className="flex items-center">
                                <DollarSign size={12} className="mr-1" />
                                ${benefit.totalContribution.toFixed(2)}
                              </span>
                            </div>
                            <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                              benefit.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {benefit.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredBenefits.length === 0 && (
                  <div className="p-8 text-center">
                    <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No benefits found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm || selectedType !== 'all' || selectedStatus !== 'all'
                        ? 'Try adjusting your search or filters'
                        : 'Get started by adding your first benefit plan'
                      }
                    </p>
                    {!searchTerm && selectedType === 'all' && selectedStatus === 'all' && (
                      <button
                        onClick={handleAddBenefit}
                        className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Benefit
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Benefit Details */}
            <div className="flex-1 flex flex-col">
              {selectedBenefit ? (
                <>
                  {/* Header */}
                  <div className="p-6 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${getTypeColor(selectedBenefit.type)}`}>
                          {getTypeIcon(selectedBenefit.type)}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{selectedBenefit.name}</h2>
                          <p className="text-gray-600">{selectedBenefit.plan}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedBenefit.enrolledEmployees === 0 && (
                          <button
                            onClick={handleEnrollEmployee}
                            className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            <UserPlus size={16} className="mr-2" />
                            Enroll Employee
                          </button>
                        )}
                        <div className="relative">
                          <button 
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <MoreHorizontal size={20} />
                          </button>
                          {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                              <button
                                onClick={() => {
                                  handleEditBenefit()
                                  setShowDropdown(false)
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Edit size={16} className="mr-3" />
                                Edit
                              </button>
                              {selectedBenefit?.status === 'active' && (
                                <button
                                  onClick={handleMarkInactive}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <EyeOff size={16} className="mr-3" />
                                  Mark as Inactive
                                </button>
                              )}
                              <hr className="my-1" />
                              <button
                                onClick={handleDeleteBenefit}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                disabled={selectedBenefit?.enrolledEmployees > 0}
                              >
                                <Trash2 size={16} className="mr-3" />
                                Delete
                              </button>
                              {selectedBenefit?.enrolledEmployees > 0 && (
                                <p className="px-4 py-1 text-xs text-gray-500">
                                  Remove enrolled employees first
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Employees Enrolled</p>
                            <p className="text-2xl font-bold text-gray-900">{selectedBenefit.enrolledEmployees}</p>
                          </div>
                          <Users className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Total Contribution</p>
                            <p className="text-2xl font-bold text-gray-900">${selectedBenefit.totalContribution.toFixed(2)}</p>
                          </div>
                          <DollarSign className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Tax Treatment</p>
                            <p className="text-lg font-semibold text-gray-900 capitalize">{selectedBenefit.taxability}</p>
                          </div>
                          <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Status</p>
                            <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                              selectedBenefit.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {selectedBenefit.status}
                            </span>
                          </div>
                          <Settings className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto">
                    {selectedBenefit.enrolledEmployees > 0 ? (
                      <EnrolledEmployeesView
                        employees={enrolledEmployees[selectedBenefit.id] || []}
                        benefit={selectedBenefit}
                        onEnrollEmployee={handleEnrollEmployee}
                        onEditContribution={(employee) => {
                          setSelectedEmployee(employee)
                          setShowEditContributionModal(true)
                        }}
                        onRemoveEmployee={(employee) => {
                          setSelectedEmployee(employee)
                          setShowRemoveEmployeeModal(true)
                        }}
                      />
                    ) : (
                      <EmptyStateView onEnrollEmployee={handleEnrollEmployee} />
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <Shield className="mx-auto h-16 w-16 text-gray-400 mb-6" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Benefit</h3>
                    <p className="text-gray-600 mb-6">Choose a benefit from the list to view details and manage enrollments</p>
                    <button
                      onClick={handleAddBenefit}
                      className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <Plus size={20} className="mr-2" />
                      Add New Benefit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddBenefitModal
          benefitTypes={benefitTypes}
          onClose={() => setShowAddModal(false)}
          onSave={(benefitData) => {
            const newBenefit: Benefit = {
              id: (benefits.length + 1).toString(),
              name: benefitData.name,
              type: benefitData.type,
              plan: benefitData.plan,
              taxability: benefitData.taxability,
              enrolledEmployees: 0,
              totalContribution: 0,
              status: 'active',
              description: `${benefitData.plan} benefit plan`,
              createdDate: new Date().toISOString().split('T')[0],
              lastModified: new Date().toISOString().split('T')[0]
            }
            setBenefits(prev => [...prev, newBenefit])
            setSelectedBenefit(newBenefit) // Select the newly created benefit
            setShowAddModal(false)
          }}
        />
      )}

      {showEnrollModal && selectedBenefit && (
        <EnrollEmployeeModal
          benefit={selectedBenefit}
          enrolledEmployees={enrolledEmployees[selectedBenefit.id] || []}
          onClose={() => setShowEnrollModal(false)}
          onSave={(enrollmentData) => {
            // Find employee data
            const employeeData = {
              id: enrollmentData.employeeId,
              name: enrollmentData.employeeName,
              email: enrollmentData.employeeEmail,
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
              employeeContribution: enrollmentData.employeeContribution,
              employerContribution: enrollmentData.employerContribution,
              contributionType: enrollmentData.employeeContributionType,
              enrolledDate: new Date().toISOString().split('T')[0]
            }
            
            // Add employee to enrolled employees
            setEnrolledEmployees(prev => ({
              ...prev,
              [selectedBenefit.id]: [...(prev[selectedBenefit.id] || []), employeeData]
            }))
            
            // Update benefit with new enrollment
            const currentEmployees = enrolledEmployees[selectedBenefit.id] || []
            const updatedBenefit = {
              ...selectedBenefit,
              enrolledEmployees: currentEmployees.length + 1,
              totalContribution: selectedBenefit.totalContribution + enrollmentData.employeeContribution + enrollmentData.employerContribution
            }
            setBenefits(prev => prev.map(b => 
              b.id === selectedBenefit.id ? updatedBenefit : b
            ))
            setSelectedBenefit(updatedBenefit)
            setShowEnrollModal(false)
          }}
        />
      )}

      {showEditModal && selectedBenefit && (
        <EditBenefitModal
          benefit={selectedBenefit}
          benefitTypes={benefitTypes}
          onClose={() => setShowEditModal(false)}
          onSave={(benefitData) => {
            setBenefits(prev => prev.map(b => 
              b.id === selectedBenefit.id 
                ? { ...b, ...benefitData }
                : b
            ))
            setSelectedBenefit({ ...selectedBenefit, ...benefitData })
            setShowEditModal(false)
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedBenefit && (
        <DeleteConfirmationModal
          benefitName={selectedBenefit.name}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDeleteBenefit}
        />
      )}

      {/* Edit Contribution Modal */}
      {showEditContributionModal && selectedEmployee && selectedBenefit && (
        <EditContributionModal
          employee={selectedEmployee}
          benefit={selectedBenefit}
          onClose={() => setShowEditContributionModal(false)}
          onSave={(updatedEmployee) => {
            // Update employee contribution
            setEnrolledEmployees(prev => ({
              ...prev,
              [selectedBenefit.id]: (prev[selectedBenefit.id] || []).map(emp => 
                emp.id === selectedEmployee.id ? updatedEmployee : emp
              )
            }))
            
            // Update benefit total contribution
            const currentEmployees = enrolledEmployees[selectedBenefit.id] || []
            const totalContribution = currentEmployees.reduce((sum, emp) => 
              sum + (emp.id === selectedEmployee.id ? updatedEmployee.employeeContribution + updatedEmployee.employerContribution : emp.employeeContribution + emp.employerContribution), 0
            )
            
            const updatedBenefit = { ...selectedBenefit, totalContribution }
            setBenefits(prev => prev.map(b => 
              b.id === selectedBenefit.id ? updatedBenefit : b
            ))
            setSelectedBenefit(updatedBenefit)
            setShowEditContributionModal(false)
          }}
        />
      )}

      {/* Remove Employee Modal */}
      {showRemoveEmployeeModal && selectedEmployee && selectedBenefit && (
        <RemoveEmployeeModal
          employee={selectedEmployee}
          benefit={selectedBenefit}
          onClose={() => setShowRemoveEmployeeModal(false)}
          onConfirm={() => {
            // Remove employee from enrolled employees
            setEnrolledEmployees(prev => ({
              ...prev,
              [selectedBenefit.id]: (prev[selectedBenefit.id] || []).filter(emp => emp.id !== selectedEmployee.id)
            }))
            
            // Update benefit stats
            const remainingEmployees = (enrolledEmployees[selectedBenefit.id] || []).filter(emp => emp.id !== selectedEmployee.id)
            const totalContribution = remainingEmployees.reduce((sum, emp) => sum + emp.employeeContribution + emp.employerContribution, 0)
            
            const updatedBenefit = {
              ...selectedBenefit,
              enrolledEmployees: remainingEmployees.length,
              totalContribution
            }
            setBenefits(prev => prev.map(b => 
              b.id === selectedBenefit.id ? updatedBenefit : b
            ))
            setSelectedBenefit(updatedBenefit)
            setShowRemoveEmployeeModal(false)
          }}
        />
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  )
}

// Enrolled Employees View Component
function EnrolledEmployeesView({ 
  employees, 
  benefit,
  onEnrollEmployee, 
  onEditContribution,
  onRemoveEmployee 
}: {
  employees: Employee[]
  benefit: Benefit
  onEnrollEmployee: () => void
  onEditContribution: (employee: Employee) => void
  onRemoveEmployee: (employee: Employee) => void
}) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Enrolled Employees</h3>
        <button
          onClick={onEnrollEmployee}
          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <UserPlus size={16} className="mr-2" />
          Enroll Employee
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee's Contribution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer's Contribution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={employee.avatar}
                          alt={employee.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${employee.employeeContribution.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">per pay period</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${employee.employerContribution.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">per pay period</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEditContribution(employee)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onRemoveEmployee(employee)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Empty State View Component
function EmptyStateView({ onEnrollEmployee }: { onEnrollEmployee: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">You haven't enrolled any employee to this benefit yet.</h3>
        <p className="text-gray-600 mb-6">
          Enroll employees to start offering this benefit and track contributions.
        </p>
        <button
          onClick={onEnrollEmployee}
          className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <UserPlus size={20} className="mr-2" />
          Enroll Employee
        </button>
      </div>
    </div>
  )
}

// Add Benefit Modal Component
function AddBenefitModal({ 
  benefitTypes, 
  onClose, 
  onSave 
}: { 
  benefitTypes: BenefitType[]
  onClose: () => void
  onSave: (data: any) => void
}) {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('')
  const [benefitName, setBenefitName] = useState('')

  const selectedTypeData = benefitTypes.find(type => type.id === selectedType)
  const selectedPlanData = selectedTypeData?.plans.find(plan => plan.id === selectedPlan)

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    setStep(2)
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    setStep(3)
  }

  const handleSave = () => {
    if (!benefitName || !selectedPlan) return

    onSave({
      name: benefitName,
      type: selectedType,
      plan: selectedPlanData?.name,
      planId: selectedPlan,
      taxability: selectedPlanData?.taxability
    })
  }

  const resetToStep = (stepNum: number) => {
    setStep(stepNum)
    if (stepNum === 1) {
      setSelectedType('')
      setSelectedPlan('')
      setBenefitName('')
    } else if (stepNum === 2) {
      setSelectedPlan('')
      setBenefitName('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add Benefit</h2>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>1</div>
                  <span className="text-sm text-gray-600">Choose Type</span>
                </div>
                <ArrowRight className="text-gray-400" size={16} />
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>2</div>
                  <span className="text-sm text-gray-600">Select Plan</span>
                </div>
                <ArrowRight className="text-gray-400" size={16} />
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 3 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>3</div>
                  <span className="text-sm text-gray-600">Name Benefit</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {step === 1 && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Choose Benefit Type</h3>
                <p className="text-gray-600">Select the category of benefit you want to add</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefitTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                        {type.icon}
                      </div>
                      <h4 className="font-semibold text-gray-900">{type.label}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{type.plans.length} plan{type.plans.length > 1 ? 's' : ''} available</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && selectedTypeData && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select {selectedTypeData.label}</h3>
                  <p className="text-gray-600">Choose the specific plan you want to offer</p>
                </div>
                <button
                  onClick={() => resetToStep(1)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Change Type
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTypeData.plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan.id)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        plan.taxability === 'pre-tax'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {plan.taxability}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && selectedPlanData && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Name Your Benefit</h3>
                  <p className="text-gray-600">Give this benefit a name that your employees will recognize</p>
                </div>
                <button
                  onClick={() => resetToStep(2)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Change Plan
                </button>
              </div>

              {/* Selected Plan Summary */}
              <div className="p-4 bg-gray-50 rounded-lg mb-6">
                <div className="flex items-center space-x-3">
                  {selectedTypeData?.icon}
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedPlanData.name}</h4>
                    <p className="text-sm text-gray-600">{selectedPlanData.description}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                      selectedPlanData.taxability === 'pre-tax'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedPlanData.taxability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Benefit Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefit Name *
                </label>
                <input
                  type="text"
                  value={benefitName}
                  onChange={(e) => setBenefitName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="e.g., Company Health Plan, Executive Dental Coverage"
                  autoFocus
                />
                <p className="text-sm text-gray-500 mt-1">This is how the benefit will appear to employees</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          
          <div className="flex space-x-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !selectedType || step === 2 && !selectedPlan}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  (step === 1 && selectedType) || (step === 2 && selectedPlan)
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={!benefitName}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  benefitName
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Create Benefit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Enroll Employee Modal Component
function EnrollEmployeeModal({
  benefit,
  enrolledEmployees,
  onClose,
  onSave
}: {
  benefit: Benefit
  enrolledEmployees: Employee[]
  onClose: () => void
  onSave: (data: any) => void
}) {
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [employeeContribution, setEmployeeContribution] = useState('')
  const [employeeContributionType, setEmployeeContributionType] = useState('fixed')
  const [employerContribution, setEmployerContribution] = useState('')
  const [employerContributionType, setEmployerContributionType] = useState('fixed')

  // Sample employees - in real app, this would come from props or API
  const allEmployees = [
    { id: '1', name: 'Daniel Alpert', email: 'daniel.alpert@zylker.com' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
    { id: '3', name: 'Michael Brown', email: 'michael.brown@company.com' },
    { id: '4', name: 'Emily Davis', email: 'emily.davis@company.com' },
    { id: '5', name: 'David Wilson', email: 'david.wilson@company.com' }
  ]
  
  // Filter out already enrolled employees
  const availableEmployees = allEmployees.filter(emp => 
    !enrolledEmployees.some(enrolled => enrolled.id === emp.id)
  )

  const handleSave = () => {
    if (!selectedEmployee || !employeeContribution || !employerContribution) return

    const selectedEmployeeData = availableEmployees.find(emp => emp.id === selectedEmployee)
    
    onSave({
      employeeId: selectedEmployee,
      employeeName: selectedEmployeeData?.name || '',
      employeeEmail: selectedEmployeeData?.email || '',
      employeeContribution: parseFloat(employeeContribution),
      employeeContributionType,
      employerContribution: parseFloat(employerContribution),
      employerContributionType
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Enroll Employee</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {availableEmployees.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All employees are enrolled</h3>
              <p className="text-gray-600">All available employees are already enrolled in this benefit plan.</p>
            </div>
          ) : (
            <>
              {/* Employee Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name *
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="">Select an employee</option>
                  {availableEmployees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

          {/* Employee Contribution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee's Contribution
            </label>
            <div className="flex space-x-2">
              <select
                value={employeeContributionType}
                onChange={(e) => setEmployeeContributionType(e.target.value as 'fixed' | 'percentage')}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="fixed">Fixed amount</option>
                <option value="percentage">Percentage</option>
              </select>
              <input
                type="number"
                value={employeeContribution}
                onChange={(e) => setEmployeeContribution(e.target.value)}
                step="0.01"
                min="0"
                placeholder="5.00"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <span className="flex items-center px-3 py-2 text-sm text-gray-600">
                per pay period
              </span>
            </div>
          </div>

          {/* Employer Contribution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employer's Contribution
            </label>
            <div className="flex space-x-2">
              <select
                value={employerContributionType}
                onChange={(e) => setEmployerContributionType(e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="fixed">Fixed amount</option>
                <option value="percentage">Percentage</option>
              </select>
              <input
                type="number"
                value={employerContribution}
                onChange={(e) => setEmployerContribution(e.target.value)}
                step="0.01"
                min="0"
                placeholder="25.00"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <span className="flex items-center px-3 py-2 text-sm text-gray-600">
                per pay period
              </span>
            </div>
          </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">
                  <span className="text-red-600 font-medium">*</span> indicates mandatory fields
                </p>
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {availableEmployees.length === 0 ? 'Close' : 'Cancel'}
          </button>
          {availableEmployees.length > 0 && (
            <button
              onClick={handleSave}
              disabled={!selectedEmployee || !employeeContribution || !employerContribution}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedEmployee && employeeContribution && employerContribution
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Edit Benefit Modal Component
function EditBenefitModal({
  benefit,
  benefitTypes,
  onClose,
  onSave
}: {
  benefit: Benefit
  benefitTypes: BenefitType[]
  onClose: () => void
  onSave: (data: any) => void
}) {
  const [benefitName, setBenefitName] = useState(benefit.name)

  const handleSave = () => {
    onSave({
      id: benefit.id,
      name: benefitName
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Edit {benefit.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Benefit Plan Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Current Benefit Plan</h4>
            <p className="text-gray-900">{benefit.plan}</p>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-2 ${
              benefit.taxability === 'pre-tax'
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {benefit.taxability}
            </span>
          </div>

          {/* Benefit Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benefit Name *
            </label>
            <input
              type="text"
              value={benefitName}
              onChange={(e) => setBenefitName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!benefitName}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              benefitName
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

// Delete Confirmation Modal Component
function DeleteConfirmationModal({
  benefitName,
  onClose,
  onConfirm
}: {
  benefitName: string
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete Benefit</h2>
            <p className="text-gray-600">
              Are you sure you want to delete "<strong>{benefitName}</strong>"? This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Edit Contribution Modal Component
function EditContributionModal({
  employee,
  benefit,
  onClose,
  onSave
}: {
  employee: Employee
  benefit: Benefit
  onClose: () => void
  onSave: (updatedEmployee: Employee) => void
}) {
  const [employeeContribution, setEmployeeContribution] = useState(employee.employeeContribution.toString())
  const [employeeContributionType, setEmployeeContributionType] = useState(employee.contributionType)
  const [employerContribution, setEmployerContribution] = useState(employee.employerContribution.toString())
  const [employerContributionType] = useState('fixed')

  const handleSave = () => {
    const updatedEmployee = {
      ...employee,
      employeeContribution: parseFloat(employeeContribution),
      employerContribution: parseFloat(employerContribution),
      contributionType: employeeContributionType as 'fixed' | 'percentage'
    }
    onSave(updatedEmployee)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Edit {benefit.name} for {employee.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Employee Info */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <img
              className="h-10 w-10 rounded-full"
              src={employee.avatar}
              alt={employee.name}
            />
            <div>
              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
              <div className="text-sm text-gray-500">{employee.email}</div>
            </div>
          </div>

          {/* Employee Contribution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee's Contribution
            </label>
            <div className="flex space-x-2">
              <select
                value={employeeContributionType}
                onChange={(e) => setEmployeeContributionType(e.target.value as 'fixed' | 'percentage')}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="fixed">Fixed amount</option>
                <option value="percentage">Percentage</option>
              </select>
              <input
                type="number"
                value={employeeContribution}
                onChange={(e) => setEmployeeContribution(e.target.value)}
                step="0.01"
                min="0"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <span className="flex items-center px-3 py-2 text-sm text-gray-600">
                per pay period
              </span>
            </div>
          </div>

          {/* Employer Contribution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employer's Contribution
            </label>
            <div className="flex space-x-2">
              <select
                value={employerContributionType}
                disabled
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              >
                <option value="fixed">Fixed amount</option>
                <option value="percentage">Percentage</option>
              </select>
              <input
                type="number"
                value={employerContribution}
                onChange={(e) => setEmployerContribution(e.target.value)}
                step="0.01"
                min="0"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <span className="flex items-center px-3 py-2 text-sm text-gray-600">
                per pay period
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

// Remove Employee Modal Component
function RemoveEmployeeModal({
  employee,
  benefit,
  onClose,
  onConfirm
}: {
  employee: Employee
  benefit: Benefit
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Remove Employee</h2>
            <p className="text-gray-600">
              Are you sure you want to remove <strong>{employee.name}</strong> from <strong>{benefit.name}</strong>?
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This will stop their contributions and remove them from the benefit plan.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Yes, Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
