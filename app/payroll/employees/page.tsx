'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import AddEmployeeForm from '@/components/AddEmployeeForm'
import { 
  Users, 
  Plus, 
  Upload, 
  Mail, 
  Settings, 
  Search, 
  Filter, 
  Download, 
  SortAsc, 
  SortDesc,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  Phone,
  Building,
  User,
  CheckCircle,
  X,
  FileText,
  Sync,
  Clock,
  Globe,
  Lock,
  Database,
  ArrowUpDown,
  Server,
  Zap,
  Key,
  RefreshCw,
  AlertCircle,
  Save
} from 'lucide-react'

// Types
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
}

interface SFTPConfig {
  host: string
  port: number
  username: string
  password: string
  protocol: 'sftp' | 'ftps'
  rootDirectory: string
  passiveMode: boolean
}

interface HRISIntegration {
  provider: string
  apiKey: string
  fieldMappings: Record<string, string>
  syncSchedule: 'manual' | 'daily' | 'weekly' | 'monthly'
  lastSync: string | null
}

// Utility function to format dates consistently on server and client
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return dateString // Return original if invalid date
    }
    // Format as MM/DD/YYYY consistently
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  } catch (error) {
    return dateString // Return original if parsing fails
  }
}

// Dummy data
const dummyEmployees: Employee[] = [
  {
    id: 'EP-0004',
    firstName: 'Daniel',
    lastName: 'Alpert',
    email: 'daniel.alpert@zylker.com',
    phone: '617 405 7840',
    designation: 'Hardware Engineer',
    department: 'Engineering',
    workAddress: '525 20th St, San Francisco, CA 94016',
    startDate: '2020-01-01',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    salary: 100,
    employeeType: 'full-time'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 234-5678',
    designation: 'Software Engineer',
    department: 'Engineering',
    workAddress: '525 20th St, San Francisco, CA 94016',
    startDate: '2023-03-20',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    salary: 95000,
    employeeType: 'full-time'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@company.com',
    phone: '+1 (555) 345-6789',
    designation: 'Marketing Specialist',
    department: 'Marketing',
    workAddress: '525 20th St, San Francisco, CA 94016',
    startDate: '2023-02-10',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    salary: 70000,
    employeeType: 'full-time'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 456-7890',
    designation: 'UX Designer',
    department: 'Design',
    workAddress: '525 20th St, San Francisco, CA 94016',
    startDate: '2023-04-05',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    salary: 85000,
    employeeType: 'part-time'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@company.com',
    phone: '+1 (555) 567-8901',
    designation: 'Data Analyst',
    department: 'Analytics',
    workAddress: '525 20th St, San Francisco, CA 94016',
    startDate: '2023-05-12',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    status: 'pending',
    salary: 75000,
    employeeType: 'contractor'
  }
]

const hrisproviders = [
  { id: 'bamboohr', name: 'BambooHR', logo: '🎋' },
  { id: 'adp', name: 'ADP Workforce Now', logo: '🏢' },
  { id: 'paychex', name: 'Paychex', logo: '💼' },
  { id: 'workday', name: 'Workday', logo: '📊' },
  { id: 'namely', name: 'Namely', logo: '👥' }
]

export default function EmployeesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('all-employees')
  const [employees, setEmployees] = useState<Employee[]>(dummyEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortField, setSortField] = useState<keyof Employee>('firstName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [showBulkUpload, setShowBulkUpload] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showSFTPModal, setShowSFTPModal] = useState(false)
  const [showHRISModal, setShowHRISModal] = useState(false)
  const [selectedHRIS, setSelectedHRIS] = useState('')
  const [sftpConfig, setSFTPConfig] = useState<SFTPConfig>({
    host: '',
    port: 22,
    username: '',
    password: '',
    protocol: 'sftp',
    rootDirectory: '/',
    passiveMode: true
  })
  const [hrisIntegration, setHRISIntegration] = useState<HRISIntegration>({
    provider: '',
    apiKey: '',
    fieldMappings: {},
    syncSchedule: 'manual',
    lastSync: null
  })
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)

  // Filter and sort employees
  const filteredEmployees = employees
    .filter(emp => {
      const matchesSearch = `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.designation}`
        .toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDepartment = !filterDepartment || emp.department === filterDepartment
      const matchesStatus = !filterStatus || emp.status === filterStatus
      return matchesSearch && matchesDepartment && matchesStatus
    })
    .sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      const direction = sortDirection === 'asc' ? 1 : -1
      return aVal < bVal ? -direction : aVal > bVal ? direction : 0
    })

  const departments = [...new Set(employees.map(emp => emp.department))]
  const statuses = [...new Set(employees.map(emp => emp.status))]

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const exportEmployees = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Designation', 'Department', 'Start Date', 'Status'],
      ...filteredEmployees.map(emp => [
        `${emp.firstName} ${emp.lastName}`,
        emp.email,
        emp.phone,
        emp.designation,
        emp.department,
        emp.startDate,
        emp.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employees.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleEmployeePreview = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowEmployeeDetails(true)
  }

  const handleEmployeeEdit = (employee: Employee) => {
    router.push(`/payroll/employees/${employee.id}`)
  }

  const handleEmployeeNameClick = (employee: Employee) => {
    router.push(`/payroll/employees/${employee.id}`)
  }

  const tabs = [
    { id: 'all-employees', label: 'All Employees', icon: <Users size={16} /> },
    { id: 'add-employee', label: 'Add Employee', icon: <Plus size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
                <p className="text-gray-600 mt-2">Manage your workforce efficiently</p>
              </div>
              {activeTab === 'all-employees' && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowBulkUpload(true)}
                    className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <Upload size={16} className="mr-2" />
                    Bulk Upload
                  </button>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Mail size={16} className="mr-2" />
                    Send Invitations
                  </button>
                </div>
              )}
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      data-tab={tab.id}
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

            {/* Tabs Content Container */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200">
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'all-employees' && (
                  <AllEmployeesTab
                    employees={filteredEmployees}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterDepartment={filterDepartment}
                    setFilterDepartment={setFilterDepartment}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    departments={departments}
                    statuses={statuses}
                    handleSort={handleSort}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    exportEmployees={exportEmployees}
                    handleEmployeePreview={handleEmployeePreview}
                    handleEmployeeEdit={handleEmployeeEdit}
                    handleEmployeeNameClick={handleEmployeeNameClick}
                  />
                )}
                
                {activeTab === 'add-employee' && (
                  <AddEmployeeTab employees={employees} setEmployees={setEmployees} />
                )}
                
                {activeTab === 'settings' && (
                  <SettingsTab
                    showSFTPModal={showSFTPModal}
                    setShowSFTPModal={setShowSFTPModal}
                    showHRISModal={showHRISModal}
                    setShowHRISModal={setShowHRISModal}
                    sftpConfig={sftpConfig}
                    setSFTPConfig={setSFTPConfig}
                    hrisIntegration={hrisIntegration}
                    setHRISIntegration={setHRISIntegration}
                    selectedHRIS={selectedHRIS}
                    setSelectedHRIS={setSelectedHRIS}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {showBulkUpload && <BulkUploadModal onClose={() => setShowBulkUpload(false)} />}
      {showInviteModal && <InviteModal onClose={() => setShowInviteModal(false)} employees={employees} />}
      {showEmployeeDetails && selectedEmployee && (
        <EmployeeDetailsModal 
          employee={selectedEmployee} 
          onClose={() => setShowEmployeeDetails(false)} 
        />
      )}
      {showSFTPModal && (
        <SFTPConfigModal
          config={sftpConfig}
          setConfig={setSFTPConfig}
          onClose={() => setShowSFTPModal(false)}
        />
      )}
      {showHRISModal && (
        <HRISConfigModal
          selectedHRIS={selectedHRIS}
          setSelectedHRIS={setSelectedHRIS}
          integration={hrisIntegration}
          setIntegration={setHRISIntegration}
          onClose={() => setShowHRISModal(false)}
        />
      )}
    </div>
  )
}

// All Employees Tab Component
function AllEmployeesTab({
  employees,
  searchTerm,
  setSearchTerm,
  filterDepartment,
  setFilterDepartment,
  filterStatus,
  setFilterStatus,
  departments,
  statuses,
  handleSort,
  sortField,
  sortDirection,
  exportEmployees,
  handleEmployeePreview,
  handleEmployeeEdit,
  handleEmployeeNameClick
}: any) {
  return (
    <div>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          
          <button
            onClick={exportEmployees}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('firstName')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Employee</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('designation')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Designation</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('department')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Department</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('startDate')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Start Date</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee: Employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={employee.profilePicture}
                          alt={`${employee.firstName} ${employee.lastName}`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          <button
                            onClick={() => handleEmployeeNameClick(employee)}
                            className="hover:text-blue-600 text-left"
                          >
                            {employee.firstName} {employee.lastName}
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {employee.workAddress.split(',')[0]}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(employee.startDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      employee.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : employee.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEmployeePreview(employee)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEmployeeEdit(employee)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
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

// Add Employee Tab Component
function AddEmployeeTab({ employees, setEmployees }: any) {
  return (
    <AddEmployeeForm employees={employees} setEmployees={setEmployees} />
  )
}

// Settings Tab Component
function SettingsTab({
  showSFTPModal,
  setShowSFTPModal,
  showHRISModal,
  setShowHRISModal,
  sftpConfig,
  setSFTPConfig,
  hrisIntegration,
  setHRISIntegration,
  selectedHRIS,
  setSelectedHRIS
}: any) {
  return (
    <div className="space-y-8">
      {/* SFTP Configuration Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Server className="h-6 w-6 text-gray-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">File Transfer Configuration (SFTP)</h3>
              <p className="text-sm text-gray-600">Configure secure file transfer settings for data exchange</p>
            </div>
          </div>
          <button
            onClick={() => setShowSFTPModal(true)}
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Settings size={16} className="mr-2" />
            Configure SFTP
          </button>
        </div>
        
        {sftpConfig.host ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">SFTP Configured</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Host: {sftpConfig.host}:{sftpConfig.port} ({sftpConfig.protocol.toUpperCase()})
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-yellow-800">SFTP Not Configured</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Configure SFTP settings for secure file transfer and data synchronization.
            </p>
          </div>
        )}
      </div>

      {/* HRIS Integration Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Database className="h-6 w-6 text-purple-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">HRIS Integration</h3>
              <p className="text-sm text-gray-600">Sync employee data with your HR Information System</p>
            </div>
          </div>
          <button
            onClick={() => setShowHRISModal(true)}
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Add Integration
          </button>
        </div>

        {hrisIntegration.provider ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">
                    Connected to {hrisproviders.find(p => p.id === hrisIntegration.provider)?.name}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-900">
                    <RefreshCw size={14} className="mr-1" />
                    Sync Now
                  </button>
                  <button className="flex items-center px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                    <Settings size={14} className="mr-1" />
                    Configure
                  </button>
                </div>
              </div>
              <p className="text-sm text-green-700 mt-2">
                Last sync: {hrisIntegration.lastSync || 'Never'} | 
                Schedule: {hrisIntegration.syncSchedule}
              </p>
            </div>

            {/* Sync Schedule Settings */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Sync Schedule</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {['manual', 'hourly', 'daily', 'weekly', 'monthly'].map((schedule) => (
                  <label key={schedule} className="flex items-center">
                    <input
                      type="radio"
                      name="syncSchedule"
                      value={schedule}
                      checked={hrisIntegration.syncSchedule === schedule}
                      onChange={(e) => setHRISIntegration({...hrisIntegration, syncSchedule: e.target.value})}
                      className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{schedule}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <Database className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-600">No HRIS Integration</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Connect your HRIS system to automatically sync employee data.
            </p>
          </div>
        )}
      </div>

      {/* Supported HRIS Providers */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported HRIS Providers</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {hrisproviders.map((provider) => (
            <div key={provider.id} className="text-center p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="text-2xl mb-2">{provider.logo}</div>
              <p className="text-xs font-medium text-gray-700">{provider.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Modal Components
function BulkUploadModal({ onClose }: { onClose: () => void }) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!uploadedFile) return
    
    setIsUploading(true)
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setTimeout(() => {
            onClose()
          }, 1000)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const downloadTemplate = () => {
    const csvContent = [
      ['First Name', 'Last Name', 'Email', 'Phone', 'Designation', 'Department', 'Start Date', 'Salary'],
      ['John', 'Doe', 'john.doe@company.com', '+1 (555) 123-4567', 'Software Engineer', 'Engineering', '2024-01-15', '95000'],
      ['Jane', 'Smith', 'jane.smith@company.com', '+1 (555) 234-5678', 'Product Manager', 'Product', '2024-01-20', '110000']
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employee_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Bulk Upload Employees</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Upload Instructions</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Upload a CSV or Excel file with employee data</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Required columns: First Name, Last Name, Email, Phone, Designation, Department</li>
              <li>• Optional columns: Start Date, Salary, Work Address</li>
            </ul>
          </div>

          {/* Template Download */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Need a template?</h4>
                <p className="text-sm text-gray-600">Download our CSV template to get started</p>
              </div>
              <button
                onClick={downloadTemplate}
                className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Download size={16} className="mr-2" />
                Download Template
              </button>
            </div>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="space-y-3">
                <FileText className="mx-auto h-12 w-12 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Drag and drop your file here, or{' '}
                    <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-500">CSV, Excel files up to 10MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!uploadedFile || isUploading}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                uploadedFile && !isUploading
                  ? 'bg-gray-800 text-white hover:bg-gray-900'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload Employees'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InviteModal({ onClose, employees }: { onClose: () => void, employees?: Employee[] }) {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [inviteMessage, setInviteMessage] = useState(`Hi there!

You've been invited to join our team. Please click the link below to complete your employee profile and provide the necessary information for payroll setup.

This invitation will expire in 7 days.

Best regards,
HR Team`)
  const [isSending, setIsSending] = useState(false)
  const [sentCount, setSentCount] = useState(0)

  const handleEmployeeToggle = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    )
  }

  const handleSendInvites = () => {
    if (selectedEmployees.length === 0) return

    setIsSending(true)
    // Simulate sending invitations
    setTimeout(() => {
      setSentCount(selectedEmployees.length)
      setIsSending(false)
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 2000)
  }

  if (sentCount > 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Invitations Sent!</h3>
          <p className="text-gray-600">
            Successfully sent {sentCount} invitation{sentCount > 1 ? 's' : ''} to employees.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Send Employee Invitations</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Employee Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select Employees to Invite
            </label>
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg">
              {employees && employees.map((employee) => (
                <label key={employee.id} className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => handleEmployeeToggle(employee.id)}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <div className="ml-3 flex items-center">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={employee.profilePicture}
                      alt={`${employee.firstName} ${employee.lastName}`}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{employee.email}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Selected employees will receive an invitation to complete their profile.
            </p>
          </div>

          {/* Invitation Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invitation Message
            </label>
            <textarea
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e.target.value)}
              className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Email Preview</h4>
            <div className="text-sm text-gray-600 whitespace-pre-line">
              {inviteMessage}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendInvites}
              disabled={selectedEmployees.length === 0 || isSending}
              className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedEmployees.length > 0 && !isSending
                  ? 'bg-gray-800 text-white hover:bg-gray-900'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSending ? (
                <>
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail size={16} className="mr-2" />
                  Send Invitations
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SFTPConfigModal({ config, setConfig, onClose }: any) {
  const [formData, setFormData] = useState(config)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null)

  const handleSave = () => {
    setConfig(formData)
    onClose()
  }

  const testConnection = () => {
    setIsTestingConnection(true)
    // Simulate connection test
    setTimeout(() => {
      setTestResult(Math.random() > 0.3 ? 'success' : 'error')
      setIsTestingConnection(false)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">SFTP Configuration</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* SFTP Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SFTP Host *
              </label>
              <input
                type="text"
                value={formData.host}
                onChange={(e) => setFormData({...formData, host: e.target.value})}
                placeholder="sftp.example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Port *
              </label>
              <input
                type="number"
                value={formData.port}
                onChange={(e) => setFormData({...formData, port: parseInt(e.target.value)})}
                placeholder="22"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="your-username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Protocol
              </label>
              <select
                value={formData.protocol}
                onChange={(e) => setFormData({...formData, protocol: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="sftp">SFTP</option>
                <option value="ftps">FTPS</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Root Directory
              </label>
              <input
                type="text"
                value={formData.rootDirectory}
                onChange={(e) => setFormData({...formData, rootDirectory: e.target.value})}
                placeholder="/home/user/files"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.passiveMode}
                  onChange={(e) => setFormData({...formData, passiveMode: e.target.checked})}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Passive Mode</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Passive mode is recommended for connections through firewalls
              </p>
            </div>
          </div>

          {/* Test Connection */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Test Connection</h4>
              <button
                onClick={testConnection}
                disabled={isTestingConnection || !formData.host || !formData.username}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  formData.host && formData.username && !isTestingConnection
                    ? 'bg-gray-800 text-white hover:bg-gray-900'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isTestingConnection ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Zap size={16} className="mr-2" />
                    Test Connection
                  </>
                )}
              </button>
            </div>

            {testResult && (
              <div className={`p-3 rounded-lg ${
                testResult === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center">
                  {testResult === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  )}
                  <span className={`text-sm font-medium ${
                    testResult === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {testResult === 'success' 
                      ? 'Connection successful!' 
                      : 'Connection failed. Please check your settings.'
                    }
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 border-t pt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
            >
              <Save size={16} className="mr-2" />
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function HRISConfigModal({ selectedHRIS, setSelectedHRIS, integration, setIntegration, onClose }: any) {
  const [step, setStep] = useState(1)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncComplete, setSyncComplete] = useState(false)
  const [formData, setFormData] = useState({
    provider: selectedHRIS,
    apiKey: '',
    apiUrl: '',
    fieldMappings: {
      name: '',
      designation: '',
      costCenter: '',
      department: '',
      email: '',
      phone: '',
      startDate: '',
      salary: '',
      employeeId: '',
      status: ''
    }
  })

  const mindbodyPayrollFields = [
    { key: 'name', label: 'Full Name', required: true },
    { key: 'designation', label: 'Job Title/Designation', required: true },
    { key: 'costCenter', label: 'Cost Center', required: true },
    { key: 'department', label: 'Department', required: true },
    { key: 'email', label: 'Email Address', required: true },
    { key: 'phone', label: 'Phone Number', required: false },
    { key: 'startDate', label: 'Start Date', required: true },
    { key: 'salary', label: 'Salary/Rate', required: true },
    { key: 'employeeId', label: 'Employee ID', required: true },
    { key: 'status', label: 'Employment Status', required: true }
  ]

  const handleProviderSelect = (providerId: string) => {
    setFormData({...formData, provider: providerId})
    setSelectedHRIS(providerId)
    setStep(2)
  }

  const handleSave = () => {
    setIsSyncing(true)
    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false)
      setSyncComplete(true)
      setIntegration({
        ...integration,
        provider: formData.provider,
        apiKey: formData.apiKey,
        fieldMappings: formData.fieldMappings,
        lastSync: new Date().toISOString()
      })
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 3000)
  }

  if (syncComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Successfully Synced!</h3>
          <p className="text-gray-600">
            HRIS integration configured and initial sync completed successfully.
          </p>
        </div>
      </div>
    )
  }

  if (isSyncing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
          <RefreshCw className="mx-auto h-16 w-16 text-gray-600 mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Syncing in Progress...</h3>
          <p className="text-gray-600">
            Connecting to {hrisproviders.find(p => p.id === formData.provider)?.name} and syncing employee data.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">HRIS Integration Setup</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Select Your HRIS Provider</h4>
              <p className="text-gray-600 mb-6">Choose your HR Information System to sync employee data automatically.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hrisproviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider.id)}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-center"
                >
                  <div className="text-4xl mb-3">{provider.logo}</div>
                  <h5 className="font-medium text-gray-900">{provider.name}</h5>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setStep(1)}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                ←
              </button>
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  Configure {hrisproviders.find(p => p.id === formData.provider)?.name}
                </h4>
                <p className="text-gray-600">Enter your API credentials and configure field mappings.</p>
              </div>
            </div>

            {/* API Configuration */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h5 className="font-medium text-gray-900 mb-4">API Configuration</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key *
                  </label>
                  <input
                    type="password"
                    value={formData.apiKey}
                    onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                    placeholder="Enter your API key"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.apiUrl}
                    onChange={(e) => setFormData({...formData, apiUrl: e.target.value})}
                    placeholder="https://api.provider.com/v1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Field Mappings */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h5 className="font-medium text-gray-900 mb-4">Field Mappings</h5>
              <p className="text-sm text-gray-600 mb-6">
                Map your {hrisproviders.find(p => p.id === formData.provider)?.name} fields to Mindbody Payroll fields. This ensures data is imported correctly.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Mindbody Payroll Fields Column */}
                <div>
                  <h6 className="font-medium text-gray-900 mb-4 text-center">Mindbody Payroll Fields</h6>
                  <div className="space-y-3">
                    {mindbodyPayrollFields.map((field) => (
                      <div key={field.key} className="p-3 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">{field.label}</span>
                          {field.required && (
                            <span className="text-xs text-red-500 font-medium">Required</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">Field: {field.key}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partner HRIS Fields Column */}
                <div>
                  <h6 className="font-medium text-gray-900 mb-4 text-center">
                    {hrisproviders.find(p => p.id === formData.provider)?.name} Fields
                  </h6>
                  <div className="space-y-3">
                    {mindbodyPayrollFields.map((field) => (
                      <div key={field.key} className="p-3 bg-white border border-gray-200 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Map to: {field.label}
                        </label>
                        <input
                          type="text"
                          value={formData.fieldMappings[field.key] || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            fieldMappings: {
                              ...formData.fieldMappings,
                              [field.key]: e.target.value
                            }
                          })}
                          placeholder={`Enter ${hrisproviders.find(p => p.id === formData.provider)?.name} field name`}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h6 className="font-medium text-blue-900 mb-2">Mapping Instructions</h6>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Enter the exact field names as they appear in your {hrisproviders.find(p => p.id === formData.provider)?.name} system</li>
                  <li>• Required fields must be mapped for successful synchronization</li>
                  <li>• Field names are case-sensitive</li>
                  <li>• Contact your HRIS administrator if you need help identifying field names</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 border-t pt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.apiKey}
                className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                  formData.apiKey
                    ? 'bg-gray-800 text-white hover:bg-gray-900'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save size={16} className="mr-2" />
                Map Fields & Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Employee Details Modal Component
function EmployeeDetailsModal({ employee, onClose }: { employee: Employee, onClose: () => void }) {
  const router = useRouter()
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Employee Details</h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Employee Header */}
            <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
              <div className="w-16 h-16">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={employee.profilePicture}
                  alt={`${employee.firstName} ${employee.lastName}`}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-gray-600">{employee.designation}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                  employee.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : employee.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Employment Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                  <p className="text-gray-900">{employee.department || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Start Date</label>
                  <p className="text-gray-900">{employee.startDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Work Address</label>
                  <p className="text-gray-900">{employee.workAddress}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Employee Type</label>
                  <p className="text-gray-900 capitalize">{employee.employeeType}</p>
                </div>
              </div>
            </div>

            {/* Compensation Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compensation details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Job title</label>
                  <p className="text-gray-900">{employee.designation}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Rate</label>
                  <p className="text-gray-900">${employee.salary.toFixed(2)} per Hour</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <p className="text-gray-900">{employee.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                  <p className="text-gray-900">{employee.phone}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 border-t border-gray-200">
              <button 
                onClick={() => {
                  onClose()
                  router.push(`/payroll/employees/${employee.id}`)
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Edit employee details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
