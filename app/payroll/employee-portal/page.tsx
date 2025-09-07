'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { 
  User,
  FileText,
  DollarSign,
  Receipt,
  Calendar,
  Home,
  Bell,
  Award,
  Clock,
  Banknote,
  TrendingUp,
  Download,
  ChevronDown,
  Building,
  Phone,
  Mail,
  CreditCard
} from 'lucide-react'

export default function EmployeePortalPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('pay-stubs')

  const quickActions = [
    {
      id: 'view-profile',
      title: 'View Profile',
      description: 'Update your personal information',
      icon: <User className="text-blue-600" size={20} />,
      href: '/payroll/employee-portal/profile'
    },
    {
      id: 'pay-stubs',
      title: 'Pay Stubs',
      description: 'View and download pay stubs',
      icon: <Receipt className="text-green-600" size={20} />,
      href: '/payroll/employee-portal/pay-stubs'
    },
    {
      id: 'compensation',
      title: 'Compensation',
      description: 'View salary and benefits',
      icon: <DollarSign className="text-purple-600" size={20} />,
      href: '/payroll/employee-portal/compensation'
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'Access your documents',
      icon: <FileText className="text-orange-600" size={20} />,
      href: '/payroll/employee-portal/documents'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'pay_stub',
      title: 'New Pay Stub Available',
      description: 'Pay period: Nov 03 - Nov 09, 2024',
      date: '2024-11-20',
      icon: <Receipt className="text-green-600" size={16} />
    },
    {
      id: 2,
      type: 'document',
      title: 'W-2 Form Ready',
      description: 'Your 2024 W-2 form is now available',
      date: '2024-11-15',
      icon: <FileText className="text-blue-600" size={16} />
    },
    {
      id: 3,
      type: 'benefit',
      title: 'Open Enrollment Reminder',
      description: 'Benefits enrollment ends Dec 31, 2024',
      date: '2024-11-10',
      icon: <Award className="text-purple-600" size={16} />
    }
  ]

  const handleQuickAction = (href: string) => {
    router.push(href)
  }

  const renderPayStubsContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Pay Stubs</h3>
        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded px-3 py-1 text-sm">
            <option>Fiscal Year - 2024</option>
          </select>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pay Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pay Period</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gross Pay</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Pay</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 text-sm text-blue-600">20 Nov 2024</td>
              <td className="px-4 py-3 text-sm text-gray-900">03 Nov 2024 - 09 Nov 2024</td>
              <td className="px-4 py-3 text-sm text-gray-900">$4,000.00</td>
              <td className="px-4 py-3 text-sm text-gray-900">$2,862.96</td>
              <td className="px-4 py-3">
                <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                  <Download size={14} className="mr-1" />
                  Download
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderProfileContent = () => (
    <div className="space-y-8">
      {/* Main Profile Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="text-gray-400" size={32} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Biplob Chakraborty</h2>
            <p className="text-gray-600 mb-4">Sr. Product manager, EP-001</p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>biplob.chakraborty@playlist.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={14} />
                <span>DOJ - 01 Aug 2020</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building size={14} />
                <span>Organization Address</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} />
                <span>Paid by the hour</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div>
        <div className="border-b border-red-500 pb-2 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Calendar size={16} className="text-gray-400" />
              <label className="text-sm font-medium text-gray-600">Date of Birth</label>
            </div>
            <p className="text-gray-900 font-medium">16 Apr 1990</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Phone size={16} className="text-gray-400" />
              <label className="text-sm font-medium text-gray-600">Mobile Number</label>
            </div>
            <p className="text-gray-500">-</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Mail size={16} className="text-gray-400" />
              <label className="text-sm font-medium text-gray-600">Contact Mail</label>
            </div>
            <p className="text-gray-500">-</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-3 block">SSN</label>
            <div className="flex items-center space-x-2">
              <p className="text-gray-900">XXX-XX-5578</p>
              <button className="text-blue-600 text-xs cursor-pointer hover:text-blue-800">
                (Show SSN)
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600 mb-3 block">Address</label>
            <p className="text-gray-900">161, Public Alley 425, Boston, Massachusetts - 02118</p>
          </div>
        </div>
      </div>

      {/* Payment Information Section */}
      <div>
        <div className="border-b border-blue-500 pb-2 mb-6">
          <h4 className="text-lg font-semibold text-gray-900">Payment Information</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-3 block">Payment Mode</label>
            <div className="flex items-center space-x-2">
              <CreditCard size={16} className="text-gray-400" />
              <p className="text-gray-900 font-medium">Check</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCompensationContent = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <DollarSign className="text-green-600" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Salary and wages</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">$100.00</span>
            <span className="text-gray-600">Per Hour</span>
          </div>
          <p className="text-sm text-gray-600">Regular Pay</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-gray-400" />
          <span className="font-medium text-gray-900">Paid Time Off</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
              </div>
              <span className="font-medium text-gray-900">Sick Leave Policy</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Earning Method</span>
                <span className="text-gray-900">At the beginning of each year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Add</span>
                <span className="text-gray-900">60:00 hours every year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Maximum Balance</span>
                <span className="text-gray-900">120:00 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Balance</span>
                <span className="text-gray-900">32:00 hours</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Unused hours will be carried over to the next year.</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
              </div>
              <span className="font-medium text-gray-900">Vacation Leave Policy</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Earning Method</span>
                <span className="text-gray-900">At the beginning of each year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Add</span>
                <span className="text-gray-900">60:00 hours every year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Maximum Balance</span>
                <span className="text-gray-900">120:00 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Balance</span>
                <span className="text-gray-900">20:00 hours</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Unused hours will be reset at the end of the year.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDocumentsContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
      <p className="text-gray-600 text-sm">Access your personal documents and company policies.</p>
      <button 
        onClick={() => router.push('/payroll/employee-portal/documents')}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        View All Documents →
      </button>
    </div>
  )

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'pay-stubs':
        return renderPayStubsContent()
      case 'view-profile':
        return renderProfileContent()
      case 'compensation':
        return renderCompensationContent()
      case 'documents':
        return renderDocumentsContent()
      default:
        return renderPayStubsContent()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              {/* Welcome Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        Welcome, Biplob Chakraborty
                      </h1>
                      <p className="text-gray-600">Sr. Product manager at Playlist</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push('/payroll/overview')}
                    className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    <DollarSign size={16} className="mr-2" />
                    Go to Payroll
                  </button>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Bell className="text-blue-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-blue-900 mb-1">Employee Self Service Portal</h3>
                      <p className="text-sm text-blue-800">
                        Access your personal information, pay stubs, tax documents, and more. 
                        If you need assistance, contact HR or your payroll administrator.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Tabs */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  {/* Tab Navigation */}
                  <div className="border-b border-gray-200">
                    <div className="flex space-x-0">
                      {quickActions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => setActiveTab(action.id)}
                          className={`flex-1 px-6 py-4 text-center border-r border-gray-200 last:border-r-0 transition-colors relative ${
                            activeTab === action.id 
                              ? 'text-blue-600 bg-blue-50' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <div className="mb-2">
                              {React.cloneElement(action.icon as React.ReactElement, {
                                className: activeTab === action.id 
                                  ? 'text-blue-600' 
                                  : (action.icon as React.ReactElement).props.className
                              })}
                            </div>
                            <h3 className="font-medium text-sm">{action.title}</h3>
                          </div>
                          {activeTab === action.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tab Content */}
                  <div className="p-6">
                    {renderActiveTabContent()}
                  </div>
                </div>
              </div>

              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Recent Pay Stub */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Recent Pay Stub</h3>
                    <Receipt className="text-gray-400" size={20} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pay Period:</span>
                      <span className="text-gray-900">03 Nov 2024 - 09 Nov 2024</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Paid On:</span>
                      <span className="text-gray-900">20 Nov 2024</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-600">Net Pay:</span>
                      <span className="text-gray-900">$2,862.96</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push('/payroll/employee-portal/pay-stubs')}
                    className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Pay Stub →
                  </button>
                </div>

                {/* Time Off Summary */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Time Off Balance</h3>
                    <Calendar className="text-gray-400" size={20} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Sick Leave</span>
                        <span className="text-gray-900">32 hrs</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Vacation Leave</span>
                        <span className="text-gray-900">20 hrs</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits Overview */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Benefits</h3>
                    <Award className="text-gray-400" size={20} />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Health Insurance</span>
                      <span className="text-green-600">✓ Enrolled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">401(k) Plan</span>
                      <span className="text-green-600">✓ Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Life Insurance</span>
                      <span className="text-green-600">✓ Enrolled</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push('/payroll/employee-portal/compensation')}
                    className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Benefits →
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 py-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
