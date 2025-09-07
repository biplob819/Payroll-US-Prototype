'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { 
  Calculator, 
  FileText, 
  Eye,
  X,
  AlertCircle,
  Calendar,
  DollarSign,
  Clock,
  ChevronRight,
  Building,
  Users,
  Download,
  Settings,
  CheckCircle,
  MapPin,
  Plus,
  Edit,
  Search
} from 'lucide-react'

interface TaxLiability {
  id: string
  name: string
  amount: number
  status: 'PENDING' | 'FILED' | 'OVERDUE'
  dueDate: string
  depositPeriod: string
  filingStatus: string
}

interface TaxForm {
  id: string
  formName: string
  filingStatus: 'Pending' | 'Filed' | 'Overdue'
  dueDate: string
  depositPeriod: string
  description: string
}

const dummyTaxLiabilities: TaxLiability[] = [
  {
    id: '1',
    name: 'Massachusetts Paid Family and Medical Leave - Employee',
    amount: 36.80,
    status: 'PENDING',
    dueDate: 'Pending',
    depositPeriod: '03 Nov 2024 - 09 Nov 2024',
    filingStatus: 'Pending'
  },
  {
    id: '2',
    name: 'Massachusetts State Tax',
    amount: 367.09,
    status: 'PENDING',
    dueDate: 'Pending',
    depositPeriod: '03 Nov 2024 - 09 Nov 2024',
    filingStatus: 'Pending'
  },
  {
    id: '3',
    name: 'Federal Income Tax',
    amount: 1388.84,
    status: 'PENDING',
    dueDate: 'Pending',
    depositPeriod: '03 Nov 2024 - 09 Nov 2024',
    filingStatus: 'Pending'
  },
  {
    id: '4',
    name: 'Medicare',
    amount: 116.00,
    status: 'PENDING',
    dueDate: 'Pending',
    depositPeriod: '03 Nov 2024 - 09 Nov 2024',
    filingStatus: 'Pending'
  }
]

const dummyTaxForms: TaxForm[] = [
  {
    id: '1',
    formName: 'Form 941 - Quarterly Federal Tax Return',
    filingStatus: 'Pending',
    dueDate: '2024-01-31',
    depositPeriod: 'Q4 2024',
    description: 'Employer\'s quarterly federal tax return reporting income taxes, Social Security tax, and Medicare tax withheld from employees\' paychecks.'
  },
  {
    id: '2',
    formName: 'Form 940 - Annual Federal Unemployment Tax',
    filingStatus: 'Filed',
    dueDate: '2024-01-31',
    depositPeriod: '2024',
    description: 'Annual return used to report and pay Federal Unemployment Tax Act (FUTA) tax.'
  },
  {
    id: '3',
    formName: 'Massachusetts Form UI-1A',
    filingStatus: 'Pending',
    dueDate: '2024-01-31',
    depositPeriod: 'Q4 2024',
    description: 'Massachusetts quarterly unemployment insurance contribution and wage report.'
  },
  {
    id: '4',
    formName: 'Form W-2 - Wage and Tax Statement',
    filingStatus: 'Overdue',
    dueDate: '2024-01-31',
    depositPeriod: '2024',
    description: 'Annual wage and tax statement for employees showing wages paid and taxes withheld.'
  }
]

interface StateTaxInfo {
  id: string
  state: string
  stateCode: string
  status: 'configured' | 'missing' | 'partial'
  employeeCount: number
  registrations?: {
    edd?: string
    sui?: string
    sdi?: string
  }
  taxRates?: {
    unemployment?: number
    disability?: number
    paidFamilyLeave?: number
    transit?: number
  }
  lastUpdated?: string
  employees?: string[]
}

const usStatesData: StateTaxInfo[] = [
  {
    id: 'ca',
    state: 'California',
    stateCode: 'CA',
    status: 'configured',
    employeeCount: 8,
    registrations: {
      edd: '111-1111-1',
      sui: 'CA-123456789',
      sdi: 'SDI-987654321'
    },
    taxRates: {
      unemployment: 1.4,
      disability: 0.9,
      paidFamilyLeave: 1.2,
      transit: 0.0
    },
    lastUpdated: '2024-01-01',
    employees: ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson', 'Lisa Anderson', 'Mark Thompson', 'Rachel Green']
  },
  {
    id: 'tx',
    state: 'Texas',
    stateCode: 'TX',
    status: 'configured',
    employeeCount: 12,
    registrations: {
      edd: 'TX-555-4444',
      sui: 'TX-987654321'
    },
    taxRates: {
      unemployment: 2.7,
      disability: 0.0,
      paidFamilyLeave: 0.0
    },
    lastUpdated: '2024-01-15',
    employees: ['James Wilson', 'Maria Garcia', 'Robert Johnson', 'Patricia Brown', 'Christopher Davis', 'Jennifer Miller', 'Michael Wilson', 'Linda Anderson', 'William Taylor', 'Barbara Thomas', 'Richard Jackson', 'Susan White']
  },
  {
    id: 'ny',
    state: 'New York',
    stateCode: 'NY',
    status: 'configured',
    employeeCount: 4,
    registrations: {
      edd: 'NY-123-456-789',
      sui: 'NY-987654321',
      sdi: 'NY-123456789'
    },
    taxRates: {
      unemployment: 4.1,
      disability: 0.5,
      paidFamilyLeave: 0.5
    },
    lastUpdated: '2023-12-01',
    employees: ['Mary Johnson', 'Thomas Anderson', 'Jessica Williams', 'Daniel Martinez']
  },
  // Add more states with partial or missing configurations
  {
    id: 'fl',
    state: 'Florida',
    stateCode: 'FL',
    status: 'partial',
    employeeCount: 0,
    registrations: {
      edd: 'FL-999-888'
    },
    taxRates: {
      unemployment: 2.7
    },
    lastUpdated: '2023-11-15'
  },
  {
    id: 'wa',
    state: 'Washington',
    stateCode: 'WA',
    status: 'missing',
    employeeCount: 0
  },
  // Adding the remaining 45 states with varying statuses
  { id: 'al', state: 'Alabama', stateCode: 'AL', status: 'missing', employeeCount: 0 },
  { id: 'ak', state: 'Alaska', stateCode: 'AK', status: 'missing', employeeCount: 0 },
  { id: 'az', state: 'Arizona', stateCode: 'AZ', status: 'missing', employeeCount: 0 },
  { id: 'ar', state: 'Arkansas', stateCode: 'AR', status: 'missing', employeeCount: 0 },
  { id: 'co', state: 'Colorado', stateCode: 'CO', status: 'partial', employeeCount: 2, registrations: { edd: 'CO-123' }, employees: ['Alex Johnson', 'Chris Davis'] },
  { id: 'ct', state: 'Connecticut', stateCode: 'CT', status: 'missing', employeeCount: 0 },
  { id: 'de', state: 'Delaware', stateCode: 'DE', status: 'missing', employeeCount: 0 },
  { id: 'ga', state: 'Georgia', stateCode: 'GA', status: 'partial', employeeCount: 1, employees: ['Jordan Smith'] },
  { id: 'hi', state: 'Hawaii', stateCode: 'HI', status: 'missing', employeeCount: 0 },
  { id: 'id', state: 'Idaho', stateCode: 'ID', status: 'missing', employeeCount: 0 },
  { id: 'il', state: 'Illinois', stateCode: 'IL', status: 'configured', employeeCount: 3, registrations: { edd: 'IL-456' }, taxRates: { unemployment: 3.2 }, employees: ['Taylor Brown', 'Morgan Davis', 'Casey Wilson'] },
  { id: 'in', state: 'Indiana', stateCode: 'IN', status: 'missing', employeeCount: 0 },
  { id: 'ia', state: 'Iowa', stateCode: 'IA', status: 'missing', employeeCount: 0 },
  { id: 'ks', state: 'Kansas', stateCode: 'KS', status: 'missing', employeeCount: 0 },
  { id: 'ky', state: 'Kentucky', stateCode: 'KY', status: 'missing', employeeCount: 0 },
  { id: 'la', state: 'Louisiana', stateCode: 'LA', status: 'missing', employeeCount: 0 },
  { id: 'me', state: 'Maine', stateCode: 'ME', status: 'missing', employeeCount: 0 },
  { id: 'md', state: 'Maryland', stateCode: 'MD', status: 'missing', employeeCount: 0 },
  { id: 'ma', state: 'Massachusetts', stateCode: 'MA', status: 'configured', employeeCount: 6, registrations: { edd: 'MA-789' }, taxRates: { unemployment: 2.5, paidFamilyLeave: 0.75 }, employees: ['Andrew Miller', 'Sophie Anderson', 'Ryan Taylor', 'Emma Johnson', 'Noah Williams', 'Olivia Brown'] },
  { id: 'mi', state: 'Michigan', stateCode: 'MI', status: 'missing', employeeCount: 0 },
  { id: 'mn', state: 'Minnesota', stateCode: 'MN', status: 'missing', employeeCount: 0 },
  { id: 'ms', state: 'Mississippi', stateCode: 'MS', status: 'missing', employeeCount: 0 },
  { id: 'mo', state: 'Missouri', stateCode: 'MO', status: 'missing', employeeCount: 0 },
  { id: 'mt', state: 'Montana', stateCode: 'MT', status: 'missing', employeeCount: 0 },
  { id: 'ne', state: 'Nebraska', stateCode: 'NE', status: 'missing', employeeCount: 0 },
  { id: 'nv', state: 'Nevada', stateCode: 'NV', status: 'missing', employeeCount: 0 },
  { id: 'nh', state: 'New Hampshire', stateCode: 'NH', status: 'missing', employeeCount: 0 },
  { id: 'nj', state: 'New Jersey', stateCode: 'NJ', status: 'partial', employeeCount: 1, employees: ['Sam Rodriguez'] },
  { id: 'nm', state: 'New Mexico', stateCode: 'NM', status: 'missing', employeeCount: 0 },
  { id: 'nc', state: 'North Carolina', stateCode: 'NC', status: 'missing', employeeCount: 0 },
  { id: 'nd', state: 'North Dakota', stateCode: 'ND', status: 'missing', employeeCount: 0 },
  { id: 'oh', state: 'Ohio', stateCode: 'OH', status: 'missing', employeeCount: 0 },
  { id: 'ok', state: 'Oklahoma', stateCode: 'OK', status: 'missing', employeeCount: 0 },
  { id: 'or', state: 'Oregon', stateCode: 'OR', status: 'partial', employeeCount: 2, employees: ['Blake Johnson', 'Quinn Davis'] },
  { id: 'pa', state: 'Pennsylvania', stateCode: 'PA', status: 'missing', employeeCount: 0 },
  { id: 'ri', state: 'Rhode Island', stateCode: 'RI', status: 'missing', employeeCount: 0 },
  { id: 'sc', state: 'South Carolina', stateCode: 'SC', status: 'missing', employeeCount: 0 },
  { id: 'sd', state: 'South Dakota', stateCode: 'SD', status: 'missing', employeeCount: 0 },
  { id: 'tn', state: 'Tennessee', stateCode: 'TN', status: 'missing', employeeCount: 0 },
  { id: 'ut', state: 'Utah', stateCode: 'UT', status: 'missing', employeeCount: 0 },
  { id: 'vt', state: 'Vermont', stateCode: 'VT', status: 'missing', employeeCount: 0 },
  { id: 'va', state: 'Virginia', stateCode: 'VA', status: 'missing', employeeCount: 0 },
  { id: 'wv', state: 'West Virginia', stateCode: 'WV', status: 'missing', employeeCount: 0 },
  { id: 'wi', state: 'Wisconsin', stateCode: 'WI', status: 'missing', employeeCount: 0 },
  { id: 'wy', state: 'Wyoming', stateCode: 'WY', status: 'missing', employeeCount: 0 }
]

export default function TaxesAndFormsPage() {
  const [activeTab, setActiveTab] = useState('taxes')
  const [selectedTaxDetail, setSelectedTaxDetail] = useState<TaxLiability | null>(null)
  const [selectedFormDetail, setSelectedFormDetail] = useState<TaxForm | null>(null)
  const [showTaxDetailPanel, setShowTaxDetailPanel] = useState(false)
  const [showFormDetailModal, setShowFormDetailModal] = useState(false)
  const [statesData] = useState<StateTaxInfo[]>(usStatesData)
  const [selectedState, setSelectedState] = useState<StateTaxInfo | null>(null)
  const [showStateDetailModal, setShowStateDetailModal] = useState(false)
  const [stateSearchTerm, setStateSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const tabs = [
    { id: 'taxes', label: 'Taxes', icon: <Calculator size={16} /> },
    { id: 'forms', label: 'Forms', icon: <FileText size={16} /> },
    { id: 'state-tax', label: 'State Tax Info', icon: <Building size={16} /> }
  ]

  const handleViewTaxDetails = (tax: TaxLiability) => {
    setSelectedTaxDetail(tax)
    setShowTaxDetailPanel(true)
  }

  const handleViewFormDetails = (form: TaxForm) => {
    setSelectedFormDetail(form)
    setShowFormDetailModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-orange-100 text-orange-800'
      case 'filed':
        return 'bg-green-100 text-green-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleViewStateDetails = (state: StateTaxInfo) => {
    setSelectedState(state)
    setShowStateDetailModal(true)
  }

  const getStateStatusColor = (status: string) => {
    switch (status) {
      case 'configured':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'partial':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'missing':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'configured':
        return <CheckCircle className="text-green-500" size={16} />
      case 'partial':
        return <AlertCircle className="text-orange-500" size={16} />
      case 'missing':
        return <X className="text-red-500" size={16} />
      default:
        return <AlertCircle className="text-gray-500" size={16} />
    }
  }

  const filteredStates = statesData.filter(state => {
    const matchesSearch = state.state.toLowerCase().includes(stateSearchTerm.toLowerCase()) ||
                         state.stateCode.toLowerCase().includes(stateSearchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || state.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const renderStateTaxTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">State Tax Configuration</h2>
          <p className="text-gray-600 mt-1">Configure tax information for all 50 US states</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
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

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <AlertCircle className="text-orange-600" size={16} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Partial Setup</h3>
              <p className="text-2xl font-bold text-gray-900">
                {statesData.filter(s => s.status === 'partial').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <X className="text-red-600" size={16} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Not Configured</h3>
              <p className="text-2xl font-bold text-gray-900">
                {statesData.filter(s => s.status === 'missing').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
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
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search states..."
              value={stateSearchTerm}
              onChange={(e) => setStateSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        >
          <option value="all">All States</option>
          <option value="configured">Configured</option>
          <option value="partial">Partial Setup</option>
          <option value="missing">Not Configured</option>
        </select>
      </div>

      {/* States Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStates.map((state) => (
          <div
            key={state.id}
            onClick={() => handleViewStateDetails(state)}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{state.state}</h3>
                  <p className="text-sm text-gray-600">{state.stateCode}</p>
                </div>
              </div>
              {getStatusIcon(state.status)}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Employees</span>
                <span className="font-medium text-gray-900">{state.employeeCount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getStateStatusColor(state.status)}`}>
                  {state.status === 'missing' ? 'Not Configured' : 
                   state.status === 'partial' ? 'Partial Setup' : 'Configured'}
                </span>
                {state.employeeCount > 0 && (
                  <button className="text-blue-600 hover:text-blue-800 text-xs">
                    View Employees
                  </button>
                )}
              </div>

              {state.lastUpdated && (
                <p className="text-xs text-gray-500">
                  Updated: {new Date(state.lastUpdated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTaxesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Tax Liabilities</h2>
          <p className="text-gray-600 mt-1">View and manage your tax obligations</p>
        </div>
      </div>

      {/* Tax Breakdown Panel */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Massachusetts Paid Family and Medical...</h3>
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
            PENDING
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Deposit Period</label>
            <p className="text-gray-900">03 Nov 2024 - 09 Nov 2024</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Total Tax Amount</label>
            <p className="text-gray-900">$36.80</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Due Date</label>
            <p className="text-gray-900">Pending</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Tax Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">PAY PERIOD</span>
              <span className="text-gray-600">TAX AMOUNT</span>
              <span className="text-gray-600">STATUS</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-900">03 Nov 2024 - 09 Nov 2024</span>
              <span className="text-gray-900">$36.80</span>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Liabilities List */}
      <div className="space-y-3">
        {dummyTaxLiabilities.map((tax) => (
          <div key={tax.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900">{tax.name}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tax.status)}`}>
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
              <button 
                onClick={() => handleViewTaxDetails(tax)}
                className="ml-4 flex items-center space-x-1 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <Eye size={16} />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderFormsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Tax Forms</h2>
          <p className="text-gray-600 mt-1">View all applicable forms with filing details</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">Form Details</h3>
            <p className="text-sm text-blue-800">
              In this section, you can view all applicable forms along with details such as Form Name, Filing Status, Due Date, Deposit Period, and more. Click "View Details" to examine the official tax form pre-filled with your filing details.
            </p>
          </div>
        </div>
      </div>

      {/* Forms List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Form Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Filing Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deposit Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyTaxForms.map((form) => (
              <tr key={form.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{form.formName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(form.filingStatus)}`}>
                    {form.filingStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1 text-gray-400" />
                    {new Date(form.dueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {form.depositPeriod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleViewFormDetails(form)}
                    className="flex items-center space-x-1 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

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
            <div className={`flex-1 p-8 transition-all duration-300 ${showTaxDetailPanel ? 'mr-96' : ''}`}>
              <div className="max-w-6xl">
                {/* Page Header */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Taxes and Forms
                  </h1>
                  <p className="text-gray-600">
                    Manage tax liabilities and view tax forms
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

                {/* Tab Content */}
                <div>
                  {activeTab === 'taxes' && renderTaxesTab()}
                  {activeTab === 'forms' && renderFormsTab()}
                  {activeTab === 'state-tax' && renderStateTaxTab()}
                </div>
              </div>
            </div>

            {/* Tax Detail Right Panel */}
            {showTaxDetailPanel && selectedTaxDetail && (
              <TaxDetailPanel 
                tax={selectedTaxDetail} 
                onClose={() => setShowTaxDetailPanel(false)} 
              />
            )}
          </div>
        </main>
      </div>

      {/* Form Detail Modal */}
      {showFormDetailModal && selectedFormDetail && (
        <FormDetailModal 
          form={selectedFormDetail} 
          onClose={() => setShowFormDetailModal(false)} 
        />
      )}

      {/* State Detail Modal */}
      {showStateDetailModal && selectedState && (
        <StateDetailModal 
          state={selectedState} 
          onClose={() => setShowStateDetailModal(false)} 
        />
      )}
    </div>
  )
}

// Tax Detail Right Panel Component
function TaxDetailPanel({ tax, onClose }: { tax: TaxLiability, onClose: () => void }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-orange-100 text-orange-800'
      case 'filed':
        return 'bg-green-100 text-green-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex-shrink-0 overflow-y-auto">
      <div className="h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Tax Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Calculator size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">Tax Liability</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Tax Name & Status */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">{tax.name}</h3>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(tax.status)}`}>
                {tax.status}
              </span>
            </div>

            {/* Key Details */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Amount Due</span>
                  <DollarSign size={16} className="text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">${tax.amount.toFixed(2)}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Due Date</span>
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <p className="text-base font-semibold text-gray-900">{tax.dueDate}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Deposit Period</span>
                  <Clock size={16} className="text-gray-400" />
                </div>
                <p className="text-base font-semibold text-gray-900">{tax.depositPeriod}</p>
              </div>
            </div>

            {/* Tax Breakdown */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Tax Breakdown</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Pay Period</span>
                    <span className="text-gray-600">Amount</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium text-sm">{tax.depositPeriod}</span>
                    <span className="text-gray-900 font-semibold">${tax.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">Payment Information</h4>
                  <p className="text-sm text-blue-800">
                    This tax liability will be automatically processed according to your payment schedule. 
                    You will receive a notification once the payment has been submitted.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm">
                Process Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Form Detail Modal Component
function FormDetailModal({ form, onClose }: { form: TaxForm, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-900">Tax Form Details</h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{form.formName}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Filing Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(form.filingStatus)}`}>
                    {form.filingStatus}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Due Date</label>
                  <p className="text-gray-900">{new Date(form.dueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Deposit Period</label>
                  <p className="text-gray-900">{form.depositPeriod}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
                <p className="text-gray-700">{form.description}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-center">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Official Tax Form</h3>
                <p className="text-gray-600 mb-4">
                  The official tax form will be displayed here, pre-filled with your filing details.
                </p>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Download Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// State Detail Modal Component
function StateDetailModal({ state, onClose }: { state: StateTaxInfo, onClose: () => void }) {
  const getStateStatusColor = (status: string) => {
    switch (status) {
      case 'configured':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'partial':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'missing':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const exportEmployeeList = () => {
    if (!state.employees || state.employees.length === 0) return
    
    const csvContent = [
      ['Employee Name', 'State', 'Status'],
      ...state.employees.map(emp => [emp, state.state, 'Active'])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${state.state}_employees.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <MapPin className="text-blue-600" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{state.state} Tax Configuration</h1>
                <p className="text-gray-600">{state.stateCode} · {state.employeeCount} employees</p>
              </div>
            </div>
            <button
              onClick={onClose}
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
                  <span className={`px-3 py-1 text-sm font-medium rounded border ${getStateStatusColor(state.status)}`}>
                    {state.status === 'missing' ? 'Not Configured' : 
                     state.status === 'partial' ? 'Partial Setup' : 'Fully Configured'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                    <Settings size={16} className="mr-2" />
                    Configure
                  </button>
                  {state.employeeCount > 0 && (
                    <button 
                      onClick={exportEmployeeList}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download size={16} className="mr-2" />
                      Export List
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Registration Information */}
            {state.registrations && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {state.registrations.edd && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">EDD Account</span>
                        <CheckCircle className="text-green-500" size={16} />
                      </div>
                      <p className="text-gray-900 font-mono">{state.registrations.edd}</p>
                    </div>
                  )}
                  {state.registrations.sui && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">SUI Number</span>
                        <CheckCircle className="text-green-500" size={16} />
                      </div>
                      <p className="text-gray-900 font-mono">{state.registrations.sui}</p>
                    </div>
                  )}
                  {state.registrations.sdi && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">SDI Number</span>
                        <CheckCircle className="text-green-500" size={16} />
                      </div>
                      <p className="text-gray-900 font-mono">{state.registrations.sdi}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tax Rates */}
            {state.taxRates && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Rates</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tax Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state.taxRates.unemployment !== undefined && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Unemployment Insurance
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {state.taxRates.unemployment}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <CheckCircle className="text-green-500" size={16} />
                          </td>
                        </tr>
                      )}
                      {state.taxRates.disability !== undefined && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Disability Insurance
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {state.taxRates.disability}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <CheckCircle className="text-green-500" size={16} />
                          </td>
                        </tr>
                      )}
                      {state.taxRates.paidFamilyLeave !== undefined && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Paid Family Leave
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {state.taxRates.paidFamilyLeave}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <CheckCircle className="text-green-500" size={16} />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Employees List */}
            {state.employees && state.employees.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Employees ({state.employees.length})
                  </h3>
                  <button 
                    onClick={exportEmployeeList}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Export List
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {state.employees.map((employee, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Users size={14} className="text-gray-400" />
                        <span className="text-gray-900">{employee}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {state.lastUpdated && (
              <div className="text-sm text-gray-500 border-t pt-4">
                Last updated: {new Date(state.lastUpdated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
