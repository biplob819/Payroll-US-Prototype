'use client'

import React, { useState } from 'react'
import { 
  MapPin, 
  Users, 
  Settings, 
  ChevronRight,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Building,
  FileText,
  Calendar,
  DollarSign,
  Eye,
  Edit3,
  Download,
  X,
  ChevronDown
} from 'lucide-react'

interface Employee {
  id: string
  name: string
  email: string
  position: string
  status: 'active' | 'inactive'
}

interface StateTax {
  id: string
  name: string
  abbreviation: string
  employeeCount: number
  status: 'configured' | 'partial' | 'missing'
  employees: Employee[]
  taxRate?: number
  registrationNumber?: string
  lastUpdated?: string
}

// Mock data for 50 US states with employee counts
const statesData: StateTax[] = [
  {
    id: 'AL',
    name: 'Alabama',
    abbreviation: 'AL',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'AK',
    name: 'Alaska',
    abbreviation: 'AK',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'AZ',
    name: 'Arizona',
    abbreviation: 'AZ',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'AR',
    name: 'Arkansas',
    abbreviation: 'AR',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'CA',
    name: 'California',
    abbreviation: 'CA',
    employeeCount: 3,
    status: 'configured',
    taxRate: 1.4,
    registrationNumber: '111-1111',
    lastUpdated: '2024-01-15',
    employees: [
      {
        id: 'emp1',
        name: 'Biplob Chakraborty',
        email: 'biplob.chakraborty@playlist.com',
        position: 'Sr. Product Manager',
        status: 'active'
      },
      {
        id: 'emp2',
        name: 'John Doe',
        email: 'john.doe@company.com',
        position: 'Software Engineer',
        status: 'active'
      },
      {
        id: 'emp3',
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        position: 'Designer',
        status: 'active'
      }
    ]
  },
  {
    id: 'CO',
    name: 'Colorado',
    abbreviation: 'CO',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'CT',
    name: 'Connecticut',
    abbreviation: 'CT',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'DE',
    name: 'Delaware',
    abbreviation: 'DE',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'FL',
    name: 'Florida',
    abbreviation: 'FL',
    employeeCount: 1,
    status: 'partial',
    employees: [
      {
        id: 'emp4',
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        position: 'Sales Manager',
        status: 'active'
      }
    ]
  },
  {
    id: 'GA',
    name: 'Georgia',
    abbreviation: 'GA',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  // Continue with remaining states...
  {
    id: 'HI',
    name: 'Hawaii',
    abbreviation: 'HI',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'ID',
    name: 'Idaho',
    abbreviation: 'ID',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'IL',
    name: 'Illinois',
    abbreviation: 'IL',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'IN',
    name: 'Indiana',
    abbreviation: 'IN',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'IA',
    name: 'Iowa',
    abbreviation: 'IA',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'KS',
    name: 'Kansas',
    abbreviation: 'KS',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'KY',
    name: 'Kentucky',
    abbreviation: 'KY',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'LA',
    name: 'Louisiana',
    abbreviation: 'LA',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'ME',
    name: 'Maine',
    abbreviation: 'ME',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'MD',
    name: 'Maryland',
    abbreviation: 'MD',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'MA',
    name: 'Massachusetts',
    abbreviation: 'MA',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'MI',
    name: 'Michigan',
    abbreviation: 'MI',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'MN',
    name: 'Minnesota',
    abbreviation: 'MN',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'MS',
    name: 'Mississippi',
    abbreviation: 'MS',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'MO',
    name: 'Missouri',
    abbreviation: 'MO',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'MT',
    name: 'Montana',
    abbreviation: 'MT',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'NE',
    name: 'Nebraska',
    abbreviation: 'NE',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'NV',
    name: 'Nevada',
    abbreviation: 'NV',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'NH',
    name: 'New Hampshire',
    abbreviation: 'NH',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'NJ',
    name: 'New Jersey',
    abbreviation: 'NJ',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'NM',
    name: 'New Mexico',
    abbreviation: 'NM',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'NY',
    name: 'New York',
    abbreviation: 'NY',
    employeeCount: 2,
    status: 'partial',
    employees: [
      {
        id: 'emp5',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        position: 'Marketing Manager',
        status: 'active'
      },
      {
        id: 'emp6',
        name: 'David Lee',
        email: 'david.lee@company.com',
        position: 'Developer',
        status: 'active'
      }
    ]
  },
  {
    id: 'NC',
    name: 'North Carolina',
    abbreviation: 'NC',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'ND',
    name: 'North Dakota',
    abbreviation: 'ND',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'OH',
    name: 'Ohio',
    abbreviation: 'OH',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'OK',
    name: 'Oklahoma',
    abbreviation: 'OK',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'OR',
    name: 'Oregon',
    abbreviation: 'OR',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'PA',
    name: 'Pennsylvania',
    abbreviation: 'PA',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'RI',
    name: 'Rhode Island',
    abbreviation: 'RI',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'SC',
    name: 'South Carolina',
    abbreviation: 'SC',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'SD',
    name: 'South Dakota',
    abbreviation: 'SD',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'TN',
    name: 'Tennessee',
    abbreviation: 'TN',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'TX',
    name: 'Texas',
    abbreviation: 'TX',
    employeeCount: 1,
    status: 'partial',
    employees: [
      {
        id: 'emp7',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@company.com',
        position: 'HR Manager',
        status: 'active'
      }
    ]
  },
  {
    id: 'UT',
    name: 'Utah',
    abbreviation: 'UT',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'VT',
    name: 'Vermont',
    abbreviation: 'VT',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'VA',
    name: 'Virginia',
    abbreviation: 'VA',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'WA',
    name: 'Washington',
    abbreviation: 'WA',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'WV',
    name: 'West Virginia',
    abbreviation: 'WV',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'WI',
    name: 'Wisconsin',
    abbreviation: 'WI',
    employeeCount: 0,
    status: 'missing',
    employees: []
  },
  {
    id: 'WY',
    name: 'Wyoming',
    abbreviation: 'WY',
    employeeCount: 0,
    status: 'missing',
    employees: []
  }
]

interface StateTaxInfoProps {
  onBack?: () => void
  onSave?: () => void
}

export default function StateTaxInfo({ onBack, onSave }: StateTaxInfoProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState<StateTax | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showStateDetail, setShowStateDetail] = useState(false)
  const [showEmployeeDetail, setShowEmployeeDetail] = useState(false)
  const [showCaliforniaConfig, setShowCaliforniaConfig] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'all' | 'configured' | 'partial' | 'missing'>('all')

  // California configuration state
  const [californiaConfig, setCaliforniaConfig] = useState({
    eddNumber: '111-1111',
    taxRateReceived: true,
    unemploymentRate: 1.4,
    ettRate: 0.0,
    filingStatus: 'single',
    withholdingAllowance: '',
    additionalWithholding: 0.0,
    newHireReport: true
  })

  const filteredStates = statesData.filter(state => {
    const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         state.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || state.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'configured':
        return <CheckCircle className="text-green-600" size={16} />
      case 'partial':
        return <AlertTriangle className="text-orange-600" size={16} />
      case 'missing':
        return <XCircle className="text-red-600" size={16} />
      default:
        return <XCircle className="text-gray-400" size={16} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'configured':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'partial':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'missing':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const handleStateClick = (state: StateTax) => {
    setSelectedState(state)
    if (state.id === 'CA') {
      setShowCaliforniaConfig(true)
    } else {
      setShowStateDetail(true)
    }
  }

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowEmployeeDetail(true)
  }

  const renderCaliforniaConfiguration = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">California tax requirements</h1>
            <button
              onClick={() => setShowCaliforniaConfig(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-8">
            {/* Registrations Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Registrations</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EDD Account Number
                  </label>
                  <p className="text-sm text-blue-600 mb-2">
                    If your business has ever run a payroll in California, you should already have an EDD number. If not, learn how to register with the EDD.
                  </p>
                  <input
                    type="text"
                    value={californiaConfig.eddNumber}
                    onChange={(e) => setCaliforniaConfig({...californiaConfig, eddNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="111-1111"
                  />
                </div>
              </div>
            </div>

            {/* Tax Rates Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tax Rates</h2>
              <p className="text-sm text-gray-600 mb-4">Effective: Jan 1, 2025</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Have you received your tax rates from your state agency?
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Your state agency will assign tax rates to your company, but it can take a few weeks to receive them after you set up your tax account.
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="taxRateReceived"
                        checked={californiaConfig.taxRateReceived}
                        onChange={() => setCaliforniaConfig({...californiaConfig, taxRateReceived: true})}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="taxRateReceived"
                        checked={!californiaConfig.taxRateReceived}
                        onChange={() => setCaliforniaConfig({...californiaConfig, taxRateReceived: false})}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unemployment tax rate (between 1.5% and 6.2%)
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    This is the tax rate assigned to you by the state agency—we'll use it to withhold the right unemployment taxes from your payrolls. Learn how to find your rate.
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={californiaConfig.unemploymentRate}
                      onChange={(e) => setCaliforniaConfig({...californiaConfig, unemploymentRate: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ETT Rate
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    You can check your ETT rate online using your EDD number. Most companies are assigned a rate of 0.1%.
                  </p>
                  <select
                    value={californiaConfig.ettRate}
                    onChange={(e) => setCaliforniaConfig({...californiaConfig, ettRate: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={0.0}>0.0%</option>
                    <option value={0.1}>0.1%</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Employee State Taxes */}
            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-green-900 mb-1">Employee's federal tax details saved successfully</h3>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">Employee state taxes</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">California</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filing status
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    The Head of Household status applies to unmarried individuals who have a relative living with them in their home. If unsure, read the CA Filing Status explanation.
                  </p>
                  <select
                    value={californiaConfig.filingStatus}
                    onChange={(e) => setCaliforniaConfig({...californiaConfig, filingStatus: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="head-of-household">Head of Household</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withholding allowance
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    This value is needed to calculate the employee's CA income tax withholding. If unsure, use the CA DE-4 form to calculate the value manually.
                  </p>
                  <input
                    type="text"
                    value={californiaConfig.withholdingAllowance}
                    onChange={(e) => setCaliforniaConfig({...californiaConfig, withholdingAllowance: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional withholding
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    You can withhold an additional amount of California income taxes here.
                  </p>
                  <input
                    type="number"
                    step="0.1"
                    value={californiaConfig.additionalWithholding}
                    onChange={(e) => setCaliforniaConfig({...californiaConfig, additionalWithholding: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File a new hire report?
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    State law requires you to file a new hire report within 20 days of hiring or re-hiring an employee.
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="newHireReport"
                        checked={californiaConfig.newHireReport}
                        onChange={() => setCaliforniaConfig({...californiaConfig, newHireReport: true})}
                        className="mr-2"
                      />
                      Yes, file the state new hire report for me.
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="newHireReport"
                        checked={!californiaConfig.newHireReport}
                        onChange={() => setCaliforniaConfig({...californiaConfig, newHireReport: false})}
                        className="mr-2"
                      />
                      No, I have already filed.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
            <button
              onClick={() => setShowCaliforniaConfig(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => {
                setShowCaliforniaConfig(false)
                // Stay on the same tab - don't call onSave
              }}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (showCaliforniaConfig) {
    return renderCaliforniaConfiguration()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">State tax requirements</h2>
          <p className="text-gray-600 mt-1">We need a few more details</p>
          <p className="text-gray-600 text-sm">Please enter your missing tax details below.</p>
        </div>
      </div>

      {/* Warning Message */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-orange-600 mt-1" size={20} />
          <div>
            <h3 className="font-medium text-orange-900 mb-1">Self-onboarding employees can change your company tax requirements</h3>
            <p className="text-sm text-orange-800">
              If your employees are self-onboarding and enter details that change your company's state tax requirements (such as a home address in a new state), you may need to complete state tax setup again.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <CheckCircle className="text-green-600" size={16} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Configured</h3>
              <p className="text-2xl font-bold text-gray-900">
                {statesData.filter(s => s.status === 'configured').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <AlertTriangle className="text-orange-600" size={16} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Partial Setup</h3>
              <p className="text-2xl font-bold text-gray-900">
                {statesData.filter(s => s.status === 'partial').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <XCircle className="text-red-600" size={16} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Missing Info</h3>
              <p className="text-2xl font-bold text-gray-900">
                {statesData.filter(s => s.status === 'missing').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Users className="text-blue-600" size={16} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Employees</h3>
              <p className="text-2xl font-bold text-gray-900">
                {statesData.reduce((sum, s) => sum + s.employeeCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All States</option>
              <option value="configured">Configured</option>
              <option value="partial">Partial Setup</option>
              <option value="missing">Missing Info</option>
            </select>
          </div>
        </div>
      </div>

      {/* States Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStates.map((state) => (
          <div
            key={state.id}
            onClick={() => handleStateClick(state)}
            className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
              state.employeeCount > 0 ? 'ring-2 ring-blue-100' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">{state.abbreviation}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{state.name}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    {getStatusIcon(state.status)}
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(state.status)}`}>
                      {state.status === 'configured' ? 'Configured' :
                       state.status === 'partial' ? 'Partial' : 'Missing'}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users size={14} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  {state.employeeCount} {state.employeeCount === 1 ? 'employee' : 'employees'}
                </span>
              </div>
              {state.employeeCount > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleStateClick(state)
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Configure
                </button>
              )}
            </div>

            {/* Employee list preview */}
            {state.employees.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-500 mb-2">Employees:</p>
                <div className="space-y-1">
                  {state.employees.slice(0, 2).map((employee) => (
                    <div key={employee.id} className="flex items-center text-xs text-gray-600">
                      <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                        <span className="text-[8px] text-gray-600">{employee.name.charAt(0)}</span>
                      </div>
                      <span className="truncate">{employee.name}</span>
                    </div>
                  ))}
                  {state.employees.length > 2 && (
                    <p className="text-xs text-gray-500">+{state.employees.length - 2} more</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex items-center justify-end pt-6 border-t border-gray-200">
        <button 
          onClick={onSave}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Save and Continue
        </button>
      </div>

      {/* State Detail Modal */}
      {showStateDetail && selectedState && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-gray-900">{selectedState.name} Tax Configuration</h1>
                <button
                  onClick={() => setShowStateDetail(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Status Overview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Configuration Status</h3>
                      <span className={`px-3 py-1 text-sm font-medium rounded border ${getStatusColor(selectedState.status)}`}>
                        {selectedState.status === 'missing' ? 'Not Configured' : 
                         selectedState.status === 'partial' ? 'Partial Setup' : 'Fully Configured'}
                      </span>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                      <Settings size={16} className="mr-2" />
                      Configure
                    </button>
                  </div>
                </div>

                {/* Employees Section */}
                {selectedState.employees.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Employees in {selectedState.name} ({selectedState.employees.length})
                    </h3>
                    <div className="space-y-2">
                      {selectedState.employees.map((employee) => (
                        <div 
                          key={employee.id}
                          onClick={() => handleEmployeeClick(employee)}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">{employee.name.charAt(0)}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{employee.name}</h4>
                              <p className="text-sm text-gray-600">{employee.position}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              employee.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {employee.status}
                            </span>
                            <ChevronRight size={16} className="text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowStateDetail(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
