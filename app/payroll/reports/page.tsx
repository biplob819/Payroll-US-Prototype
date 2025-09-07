'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Users,
  DollarSign,
  TrendingUp,
  Shield,
  Calculator,
  Receipt,
  Activity,
  BarChart3,
  PieChart,
  Search,
  ChevronDown,
  Eye,
  Lock,
  FileSpreadsheet,
  X,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock
} from 'lucide-react'

// Types
interface DateRange {
  period: 'this-week' | 'this-month' | 'this-quarter' | 'this-year' | 
          'previous-week' | 'previous-month' | 'previous-quarter' | 'previous-year' | 'custom'
  startDate?: string
  endDate?: string
}

interface ExportOptions {
  format: 'pdf' | 'csv' | 'xlsx'
  password?: string
  usePassword: boolean
}

// Dummy Data
const dummyPayrollSummary = {
  earnings: 156750.00,
  benefits: 23500.00,
  deductions: 18200.00,
  taxes: 34250.00,
  netPay: 127800.00,
  payPeriods: 12,
  employees: 24
}

const dummyEmployeePaySummary = [
  {
    employeeName: 'Daniel Alpert',
    paidHours: 160,
    grossPay: 8000.00,
    benefits: 1200.00,
    deductions: 800.00,
    taxes: 1600.00,
    businessExpenses: 150.00,
    netPay: 6950.00
  },
  {
    employeeName: 'Sarah Johnson',
    paidHours: 160,
    grossPay: 7500.00,
    benefits: 1100.00,
    deductions: 750.00,
    taxes: 1500.00,
    businessExpenses: 200.00,
    netPay: 6450.00
  },
  {
    employeeName: 'Michael Brown',
    paidHours: 155,
    grossPay: 5800.00,
    benefits: 850.00,
    deductions: 580.00,
    taxes: 1160.00,
    businessExpenses: 100.00,
    netPay: 4810.00
  },
  {
    employeeName: 'Emily Davis',
    paidHours: 120,
    grossPay: 4250.00,
    benefits: 600.00,
    deductions: 425.00,
    taxes: 850.00,
    businessExpenses: 75.00,
    netPay: 3550.00
  },
  {
    employeeName: 'David Wilson',
    paidHours: 160,
    grossPay: 6250.00,
    benefits: 950.00,
    deductions: 625.00,
    taxes: 1250.00,
    businessExpenses: 125.00,
    netPay: 5200.00
  }
]

const dummySalaryStatement = [
  {
    employeeId: 'EP-0004',
    employeeName: 'Daniel Alpert',
    regularPay: 7200.00,
    overtimePay: 600.00,
    doubleTimePay: 200.00,
    bonus: 0.00,
    commission: 0.00,
    grossPay: 8000.00,
    federalIncomeTax: 1200.00,
    medicare: 116.00,
    stateTax: 320.00,
    fica: 496.00,
    netPay: 5868.00
  },
  {
    employeeId: 'EP-0005',
    employeeName: 'Sarah Johnson',
    regularPay: 6800.00,
    overtimePay: 500.00,
    doubleTimePay: 200.00,
    bonus: 0.00,
    commission: 0.00,
    grossPay: 7500.00,
    federalIncomeTax: 1125.00,
    medicare: 108.75,
    stateTax: 300.00,
    fica: 465.00,
    netPay: 5501.25
  }
]

const dummyBenefits = [
  {
    benefitName: 'Health Insurance',
    employeeContribution: 2400.00,
    employerContribution: 7200.00,
    totalContribution: 9600.00
  },
  {
    benefitName: '401(k) Plan',
    employeeContribution: 4800.00,
    employerContribution: 2400.00,
    totalContribution: 7200.00
  },
  {
    benefitName: 'Dental Insurance',
    employeeContribution: 480.00,
    employerContribution: 720.00,
    totalContribution: 1200.00
  },
  {
    benefitName: 'Vision Insurance',
    employeeContribution: 240.00,
    employerContribution: 360.00,
    totalContribution: 600.00
  }
]

const dummyDeductions = [
  {
    employeeName: 'Daniel Alpert',
    contribution: 800.00
  },
  {
    employeeName: 'Sarah Johnson',
    contribution: 750.00
  },
  {
    employeeName: 'Michael Brown',
    contribution: 580.00
  },
  {
    employeeName: 'Emily Davis',
    contribution: 425.00
  },
  {
    employeeName: 'David Wilson',
    contribution: 625.00
  }
]

const dummyTaxSummary = [
  {
    taxName: 'Federal Income Tax',
    employeeContribution: 18750.00,
    employerContribution: 0.00,
    totalContribution: 18750.00
  },
  {
    taxName: 'Social Security',
    employeeContribution: 9720.00,
    employerContribution: 9720.00,
    totalContribution: 19440.00
  },
  {
    taxName: 'Medicare',
    employeeContribution: 2273.00,
    employerContribution: 2273.00,
    totalContribution: 4546.00
  },
  {
    taxName: 'State Income Tax',
    employeeContribution: 6262.00,
    employerContribution: 0.00,
    totalContribution: 6262.00
  },
  {
    taxName: 'Unemployment Tax',
    employeeContribution: 0.00,
    employerContribution: 1245.00,
    totalContribution: 1245.00
  }
]

const dummyTaxPayments = [
  {
    taxName: 'Federal Income Tax',
    amount: 18750.00
  },
  {
    taxName: 'Social Security',
    amount: 19440.00
  },
  {
    taxName: 'Medicare',
    amount: 4546.00
  },
  {
    taxName: 'State Income Tax',
    amount: 6262.00
  },
  {
    taxName: 'Unemployment Tax',
    amount: 1245.00
  }
]

const dummyJournalEntries = [
  {
    date: '2024-01-15',
    type: 'Payroll Journal',
    description: 'Salaries and Employee Wages',
    debit: 156750.00,
    credit: 0.00
  },
  {
    date: '2024-01-15',
    type: 'Payroll Journal',
    description: 'Payroll Tax Payable',
    debit: 0.00,
    credit: 34250.00
  },
  {
    date: '2024-01-15',
    type: 'Wage Payment',
    description: 'Bank Account',
    debit: 0.00,
    credit: 127800.00
  },
  {
    date: '2024-01-30',
    type: 'Tax Payment',
    description: 'Federal Tax Payment',
    debit: 18750.00,
    credit: 0.00
  }
]

const dummyActivityLogs = [
  {
    time: '2024-01-15 09:30:00',
    activity: 'Payroll processed for pay period ending 01/15/2024',
    description: 'User: HR Admin | Processed payroll for 24 employees | Total: $127,800.00'
  },
  {
    time: '2024-01-12 14:22:00',
    activity: 'Employee Sarah Johnson added to system',
    description: 'User: HR Manager | Added new employee | Department: Engineering'
  },
  {
    time: '2024-01-10 11:45:00',
    activity: 'Benefits configuration updated',
    description: 'User: Benefits Admin | Updated health insurance contribution rates'
  },
  {
    time: '2024-01-08 16:15:00',
    activity: 'Tax settings modified',
    description: 'User: Payroll Specialist | Updated state tax rates for 2024'
  },
  {
    time: '2024-01-05 10:30:00',
    activity: 'Employee Michael Brown salary updated',
    description: 'User: HR Manager | Salary changed from $68,000 to $70,000 annually'
  }
]

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('payroll-summary')
  const [dateRange, setDateRange] = useState<DateRange>({ period: 'this-month' })
  const [showExportModal, setShowExportModal] = useState(false)
  const [currentReportType, setCurrentReportType] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false)
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [tabScrollPosition, setTabScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const tabs = [
    { id: 'payroll-summary', label: 'Payroll Summary', icon: <PieChart size={16} /> },
    { id: 'employee-pay', label: 'Employee Pay Summary', icon: <Users size={16} /> },
    { id: 'salary-statement', label: 'Salary Statement', icon: <Receipt size={16} /> },
    { id: 'benefits', label: 'Benefits Summary', icon: <Shield size={16} /> },
    { id: 'deductions', label: 'Deductions', icon: <Calculator size={16} /> },
    { id: 'tax-summary', label: 'Tax Summary', icon: <FileText size={16} /> },
    { id: 'tax-payments', label: 'Tax Payments', icon: <DollarSign size={16} /> },
    { id: 'journal', label: 'Payroll Journal', icon: <BarChart3 size={16} /> },
    { id: 'activity-logs', label: 'Activity Logs', icon: <Activity size={16} /> }
  ]

  const handleExport = (reportType: string) => {
    setCurrentReportType(reportType)
    setShowExportModal(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getPeriodText = (period: string) => {
    const periodMap: Record<string, string> = {
      'this-week': 'This Week',
      'this-month': 'This Month',
      'this-quarter': 'This Quarter', 
      'this-year': 'This Year',
      'previous-week': 'Previous Week',
      'previous-month': 'Previous Month',
      'previous-quarter': 'Previous Quarter',
      'previous-year': 'Previous Year',
      'custom': 'Custom Period'
    }
    return periodMap[period] || 'This Month'
  }

  const handleDateRangeChange = (period: any) => {
    if (period === 'custom') {
      setShowCustomDatePicker(true)
      setShowDateFilter(false)
    } else {
      setDateRange({ period })
      setShowDateFilter(false)
      setShowCustomDatePicker(false)
    }
  }

  const applyCustomDateRange = () => {
    if (customStartDate && customEndDate) {
      setDateRange({ 
        period: 'custom',
        startDate: customStartDate,
        endDate: customEndDate
      })
      setShowCustomDatePicker(false)
    }
  }

  const scrollTabs = (direction: 'left' | 'right') => {
    const tabContainer = document.getElementById('tab-container')
    if (tabContainer) {
      const scrollAmount = 200
      const newScrollLeft = direction === 'left' 
        ? tabContainer.scrollLeft - scrollAmount
        : tabContainer.scrollLeft + scrollAmount
      
      tabContainer.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
      
      // Update scroll indicators
      setTimeout(() => {
        setCanScrollLeft(tabContainer.scrollLeft > 0)
        setCanScrollRight(
          tabContainer.scrollLeft < (tabContainer.scrollWidth - tabContainer.clientWidth)
        )
      }, 300)
    }
  }

  React.useEffect(() => {
    const tabContainer = document.getElementById('tab-container')
    if (tabContainer) {
      const updateScrollIndicators = () => {
        setCanScrollLeft(tabContainer.scrollLeft > 0)
        setCanScrollRight(
          tabContainer.scrollLeft < (tabContainer.scrollWidth - tabContainer.clientWidth)
        )
      }
      
      updateScrollIndicators()
      tabContainer.addEventListener('scroll', updateScrollIndicators)
      
      return () => tabContainer.removeEventListener('scroll', updateScrollIndicators)
    }
  }, [])

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
                <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                <p className="text-gray-600 mt-2">Analyze your payroll and employee data with comprehensive reports</p>
              </div>
              
              {/* Enhanced Date Filter */}
              <div className="flex space-x-3">
                <div className="relative">
                  <button
                    onClick={() => setShowDateFilter(!showDateFilter)}
                    className="flex items-center px-6 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <CalendarDays size={18} className="mr-3 text-gray-500" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {dateRange.period === 'custom' && dateRange.startDate ? 
                          `${new Date(dateRange.startDate).toLocaleDateString()} - ${new Date(dateRange.endDate!).toLocaleDateString()}` :
                          getPeriodText(dateRange.period)
                        }
                      </div>
                      <div className="text-xs text-gray-500">Click to change period</div>
                    </div>
                    <ChevronDown size={16} className="ml-3 text-gray-400" />
                  </button>
                  
                  {showDateFilter && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-20">
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Clock size={16} className="mr-2 text-gray-500" />
                          Select Time Period
                        </h3>
                        
                        {/* Quick Select Buttons */}
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {[
                            { value: 'this-week', label: 'This Week', icon: '📅' },
                            { value: 'this-month', label: 'This Month', icon: '📊' },
                            { value: 'this-quarter', label: 'This Quarter', icon: '📈' },
                            { value: 'this-year', label: 'This Year', icon: '📋' },
                            { value: 'previous-week', label: 'Previous Week', icon: '⏪' },
                            { value: 'previous-month', label: 'Previous Month', icon: '⏮️' },
                            { value: 'previous-quarter', label: 'Previous Quarter', icon: '⏯️' },
                            { value: 'previous-year', label: 'Previous Year', icon: '⏹️' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleDateRangeChange(option.value)}
                              className={`flex items-center px-3 py-2.5 text-sm rounded-lg border transition-colors ${
                                dateRange.period === option.value 
                                  ? 'bg-gray-100 border-gray-400 text-gray-900 font-medium' 
                                  : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                              }`}
                            >
                              <span className="mr-2">{option.icon}</span>
                              {option.label}
                            </button>
                          ))}
                        </div>
                        
                        {/* Custom Range Button */}
                        <div className="border-t pt-4">
                          <button
                            onClick={() => handleDateRangeChange('custom')}
                            className="w-full flex items-center justify-center px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                          >
                            <Calendar size={16} className="mr-2" />
                            Custom Date Range
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Tabs with Navigation */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <div className="flex items-center">
                  {/* Left scroll button */}
                  <button
                    onClick={() => scrollTabs('left')}
                    className={`flex-shrink-0 p-2 mx-2 rounded-lg transition-colors ${
                      canScrollLeft 
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                    disabled={!canScrollLeft}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {/* Tabs container */}
                  <div className="flex-1 overflow-hidden">
                    <nav 
                      id="tab-container"
                      className="flex space-x-6 px-4 overflow-x-auto scrollbar-hide"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center py-4 px-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap min-w-fit ${
                            activeTab === tab.id
                              ? 'border-gray-800 text-gray-800 bg-gray-50'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className={`p-1.5 rounded-md mr-3 ${
                            activeTab === tab.id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {tab.icon}
                          </span>
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Right scroll button */}
                  <button
                    onClick={() => scrollTabs('right')}
                    className={`flex-shrink-0 p-2 mx-2 rounded-lg transition-colors ${
                      canScrollRight 
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                    disabled={!canScrollRight}
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Scroll indicators */}
                  <div className="flex space-x-1 mr-4">
                    {canScrollLeft && (
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    )}
                    {canScrollRight && (
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'payroll-summary' && (
                  <PayrollSummaryTab 
                    data={dummyPayrollSummary}
                    onExport={() => handleExport('Payroll Summary')}
                    dateRange={dateRange}
                    formatCurrency={formatCurrency}
                  />
                )}
                
                {activeTab === 'employee-pay' && (
                  <EmployeePayTab 
                    data={dummyEmployeePaySummary}
                    onExport={() => handleExport('Employee Pay Summary')}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    formatCurrency={formatCurrency}
                  />
                )}
                
                {activeTab === 'salary-statement' && (
                  <SalaryStatementTab 
                    data={dummySalaryStatement}
                    onExport={() => handleExport('Salary Statement')}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    formatCurrency={formatCurrency}
                  />
                )}
                
                {activeTab === 'benefits' && (
                  <BenefitsTab 
                    data={dummyBenefits}
                    onExport={() => handleExport('Benefits Summary')}
                    formatCurrency={formatCurrency}
                  />
                )}
                
                {activeTab === 'deductions' && (
                  <DeductionsTab 
                    data={dummyDeductions}
                    onExport={() => handleExport('Employee Deductions')}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    formatCurrency={formatCurrency}
                  />
                )}
                
                {activeTab === 'tax-summary' && (
                  <TaxSummaryTab 
                    data={dummyTaxSummary}
                    onExport={() => handleExport('Tax Summary')}
                    formatCurrency={formatCurrency}
                    totalEmployees={24}
                    totalWages={156750.00}
                  />
                )}
                
                {activeTab === 'tax-payments' && (
                  <TaxPaymentsTab 
                    data={dummyTaxPayments}
                    onExport={() => handleExport('Tax Payments')}
                    formatCurrency={formatCurrency}
                  />
                )}
                
                {activeTab === 'journal' && (
                  <JournalTab 
                    data={dummyJournalEntries}
                    onExport={() => handleExport('Payroll Journal')}
                    formatCurrency={formatCurrency}
                  />
                )}
                
                {activeTab === 'activity-logs' && (
                  <ActivityLogsTab 
                    data={dummyActivityLogs}
                    onExport={() => handleExport('Activity Logs')}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Custom Date Picker Modal */}
      {showCustomDatePicker && (
        <CustomDatePickerModal 
          startDate={customStartDate}
          endDate={customEndDate}
          setStartDate={setCustomStartDate}
          setEndDate={setCustomEndDate}
          onApply={applyCustomDateRange}
          onClose={() => setShowCustomDatePicker(false)}
        />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal 
          reportType={currentReportType}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  )
}

// Tab Components
function PayrollSummaryTab({ data, onExport, dateRange, formatCurrency }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Payroll Summary</h2>
          <p className="text-gray-600 mt-1">Overview of payroll data for the selected period</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
              <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(data.earnings)}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Deductions</h3>
              <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(data.deductions + data.taxes)}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Calculator className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Net Pay</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(data.netPay)}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pay Components Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Component
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { component: 'Earnings', amount: data.earnings, color: 'text-green-600' },
                { component: 'Benefits', amount: data.benefits, color: 'text-blue-600' },
                { component: 'Deductions', amount: data.deductions, color: 'text-orange-600' },
                { component: 'Taxes', amount: data.taxes, color: 'text-red-600' },
                { component: 'Total Net Pay', amount: data.netPay, color: 'text-gray-900 font-semibold' }
              ].map((item) => (
                <tr key={item.component}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.component}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${item.color}`}>
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {((item.amount / data.earnings) * 100).toFixed(1)}%
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

function EmployeePayTab({ data, onExport, searchTerm, setSearchTerm, formatCurrency }: any) {
  const filteredData = data.filter((emp: any) =>
    emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Employees' Pay Summary</h2>
          <p className="text-gray-600 mt-1">Individual employee pay details for the selected period</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
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

      {/* Employee Pay Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid Hours
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Pay
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Benefits
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taxes
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expenses
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((emp: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {emp.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {emp.paidHours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(emp.grossPay)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 text-right">
                    {formatCurrency(emp.benefits)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 text-right">
                    {formatCurrency(emp.deductions)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                    {formatCurrency(emp.taxes)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right">
                    {formatCurrency(emp.businessExpenses)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                    {formatCurrency(emp.netPay)}
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

function SalaryStatementTab({ data, onExport, searchTerm, setSearchTerm, formatCurrency }: any) {
  const filteredData = data.filter((emp: any) =>
    emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Employees' Salary Statement</h2>
          <p className="text-gray-600 mt-1">Detailed breakdown of salary components for each employee</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
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

      {/* Earnings Table */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Components</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Regular Pay
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overtime Pay
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Double Time
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bonus
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Pay
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((emp: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {emp.employeeId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {emp.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(emp.regularPay)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(emp.overtimePay)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(emp.doubleTimePay)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(emp.bonus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(emp.commission)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 text-right">
                    {formatCurrency(emp.grossPay)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Components Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Components</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Federal Income Tax
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medicare
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State Tax
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FICA
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((emp: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {emp.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                    {formatCurrency(emp.federalIncomeTax)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                    {formatCurrency(emp.medicare)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                    {formatCurrency(emp.stateTax)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                    {formatCurrency(emp.fica)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                    {formatCurrency(emp.netPay)}
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

function BenefitsTab({ data, onExport, formatCurrency }: any) {
  const totalEmployeeContrib = data.reduce((sum: number, item: any) => sum + item.employeeContribution, 0)
  const totalEmployerContrib = data.reduce((sum: number, item: any) => sum + item.employerContribution, 0)
  const totalContrib = data.reduce((sum: number, item: any) => sum + item.totalContribution, 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Benefits Summary</h2>
          <p className="text-gray-600 mt-1">Overview of employee benefits contributions</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Employee Contributions</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">{formatCurrency(totalEmployeeContrib)}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Employer Contributions</h3>
              <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(totalEmployerContrib)}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Benefits Value</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalContrib)}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-gray-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Benefit Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Contribution
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer Contribution
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Contribution
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((benefit: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {benefit.benefitName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 text-right">
                    {formatCurrency(benefit.employeeContribution)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right">
                    {formatCurrency(benefit.employerContribution)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                    {formatCurrency(benefit.totalContribution)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 text-right">
                  {formatCurrency(totalEmployeeContrib)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 text-right">
                  {formatCurrency(totalEmployerContrib)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                  {formatCurrency(totalContrib)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function DeductionsTab({ data, onExport, searchTerm, setSearchTerm, formatCurrency }: any) {
  const filteredData = data.filter((emp: any) =>
    emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalDeductions = data.reduce((sum: number, emp: any) => sum + emp.contribution, 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Employee Deductions</h2>
          <p className="text-gray-600 mt-1">Summary of deductions made from employee pay</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Deductions</h3>
              <p className="text-2xl font-bold text-orange-600 mt-1">{formatCurrency(totalDeductions)}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calculator className="text-orange-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Employees Affected</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{data.length}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="text-gray-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Average Deduction</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalDeductions / data.length)}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
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

      {/* Deductions Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Contribution
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((emp: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {emp.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 text-right">
                    {formatCurrency(emp.contribution)}
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

function TaxSummaryTab({ data, onExport, formatCurrency, totalEmployees, totalWages }: any) {
  const totalEmployeeContrib = data.reduce((sum: number, item: any) => sum + item.employeeContribution, 0)
  const totalEmployerContrib = data.reduce((sum: number, item: any) => sum + item.employerContribution, 0)
  const totalContrib = data.reduce((sum: number, item: any) => sum + item.totalContribution, 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Tax Summary</h2>
          <p className="text-gray-600 mt-1">Overview of tax contributions by employees and employers</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Paid Employees</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalEmployees}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Subject Wages</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalWages)}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Employee Tax Contributions</h3>
              <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(totalEmployeeContrib)}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Calculator className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Employer Tax Contributions</h3>
              <p className="text-2xl font-bold text-orange-600 mt-1">{formatCurrency(totalEmployerContrib)}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Shield className="text-orange-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Tax Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tax Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Contribution
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer Contribution
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Contribution
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((tax: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {tax.taxName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                    {formatCurrency(tax.employeeContribution)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 text-right">
                    {formatCurrency(tax.employerContribution)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                    {formatCurrency(tax.totalContribution)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600 text-right">
                  {formatCurrency(totalEmployeeContrib)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600 text-right">
                  {formatCurrency(totalEmployerContrib)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                  {formatCurrency(totalContrib)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function TaxPaymentsTab({ data, onExport, formatCurrency }: any) {
  const totalFederalState = data.reduce((sum: number, item: any) => sum + item.amount, 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Tax Payments Summary</h2>
          <p className="text-gray-600 mt-1">Overview of all tax payments made during the selected period</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Tax Payments</h3>
              <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(totalFederalState)}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Receipt className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Payment Types</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{data.length}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="text-gray-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Tax Payments Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tax Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount ($)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((payment: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.taxName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                    {formatCurrency(payment.amount)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 border-t-2 border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  Total Amount Paid (Federal + State)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600 text-right">
                  {formatCurrency(totalFederalState)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function JournalTab({ data, onExport, formatCurrency }: any) {
  const totalDebits = data.reduce((sum: number, entry: any) => sum + entry.debit, 0)
  const totalCredits = data.reduce((sum: number, entry: any) => sum + entry.credit, 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Payroll Journal Summary</h2>
          <p className="text-gray-600 mt-1">Comprehensive record of payroll-related financial transactions</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Debits</h3>
              <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(totalDebits)}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Credits</h3>
              <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(totalCredits)}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Journal Entries</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{data.length}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-gray-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Journal Entries Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Transaction Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Debit
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((entry: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.date}</div>
                    <div className="text-sm text-gray-500">{entry.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                    {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right">
                    {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 border-t-2 border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900" colSpan={2}>
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600 text-right">
                  {formatCurrency(totalDebits)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 text-right">
                  {formatCurrency(totalCredits)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ActivityLogsTab({ data, onExport, searchTerm, setSearchTerm }: any) {
  const filteredData = data.filter((log: any) =>
    log.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Activity Logs</h2>
          <p className="text-gray-600 mt-1">Detailed log of all activities in your Mindbody Payroll organization</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Filter size={16} className="mr-2" />
          Customize Report
        </button>
      </div>

      {/* Activity Logs Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((log: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(log.time).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{new Date(log.time).toLocaleTimeString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.activity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.description}
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

// Custom Date Picker Modal Component
function CustomDatePickerModal({ 
  startDate, 
  endDate, 
  setStartDate, 
  setEndDate, 
  onApply, 
  onClose 
}: {
  startDate: string
  endDate: string
  setStartDate: (date: string) => void
  setEndDate: (date: string) => void
  onApply: () => void
  onClose: () => void
}) {
  const today = new Date().toISOString().split('T')[0]
  const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const isValidRange = startDate && endDate && new Date(startDate) <= new Date(endDate)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <CalendarDays size={20} className="mr-3 text-gray-600" />
            Custom Date Range
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Date Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={oneYearAgo}
                max={endDate || today}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                max={today}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Quick Select Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Select
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Last 7 Days', days: 7 },
                { label: 'Last 30 Days', days: 30 },
                { label: 'Last 3 Months', days: 90 },
                { label: 'Last 6 Months', days: 180 }
              ].map((option) => {
                const startDate = new Date(Date.now() - option.days * 24 * 60 * 60 * 1000)
                const endDate = new Date()
                return (
                  <button
                    key={option.label}
                    onClick={() => {
                      setStartDate(startDate.toISOString().split('T')[0])
                      setEndDate(endDate.toISOString().split('T')[0])
                    }}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-gray-700"
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Preview */}
          {isValidRange && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Selected Range Preview</h4>
              <p className="text-sm text-gray-600">
                From <span className="font-medium">{new Date(startDate).toLocaleDateString()}</span> to{' '}
                <span className="font-medium">{new Date(endDate).toLocaleDateString()}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days selected
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onApply}
              disabled={!isValidRange}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isValidRange
                  ? 'bg-gray-800 text-white hover:bg-gray-900'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Apply Range
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export Modal Component
function ExportModal({ reportType, onClose }: { reportType: string, onClose: () => void }) {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    password: '',
    usePassword: false
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  const handleExport = () => {
    if (exportOptions.usePassword && exportOptions.password.length < 6) {
      return
    }

    setIsExporting(true)
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      setExportComplete(true)
      
      // Create and download dummy file
      const timestamp = new Date().toISOString().split('T')[0]
      const filename = `${reportType.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.${exportOptions.format}`
      
      const blob = new Blob([`${reportType} Report - Generated on ${new Date().toLocaleString()}`], { 
        type: 'text/plain' 
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(url)
      
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 2000)
  }

  if (exportComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Export Complete!</h3>
          <p className="text-gray-600">
            Your {reportType} report has been downloaded successfully.
          </p>
        </div>
      </div>
    )
  }

  if (isExporting) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-800 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Exporting Report...</h3>
          <p className="text-gray-600">
            Please wait while we generate your {reportType} report.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Export {reportType}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Format
            </label>
            <div className="space-y-2">
              {[
                { value: 'pdf', label: 'PDF', icon: <FileText size={16} /> },
                { value: 'csv', label: 'CSV', icon: <FileSpreadsheet size={16} /> },
                { value: 'xlsx', label: 'Excel (XLSX)', icon: <FileSpreadsheet size={16} /> }
              ].map((format) => (
                <label key={format.value} className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value={format.value}
                    checked={exportOptions.format === format.value}
                    onChange={(e) => setExportOptions({...exportOptions, format: e.target.value as any})}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                  />
                  <span className="ml-3 flex items-center text-sm text-gray-700">
                    {format.icon}
                    <span className="ml-2">{format.label}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Password Protection */}
          <div>
            <label className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={exportOptions.usePassword}
                onChange={(e) => setExportOptions({...exportOptions, usePassword: e.target.checked})}
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 flex items-center">
                <Lock size={16} className="mr-1" />
                Protect this file with a password
              </span>
            </label>
            
            {exportOptions.usePassword && (
              <input
                type="password"
                placeholder="Enter password (minimum 6 characters)"
                value={exportOptions.password}
                onChange={(e) => setExportOptions({...exportOptions, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
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
              onClick={handleExport}
              disabled={exportOptions.usePassword && exportOptions.password.length < 6}
              className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                (!exportOptions.usePassword || exportOptions.password.length >= 6)
                  ? 'bg-gray-800 text-white hover:bg-gray-900'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
