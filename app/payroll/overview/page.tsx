'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  UserCheck,
  FileText,
  ArrowRight,
  ExternalLink
} from 'lucide-react'

interface Notification {
  id: string
  type: 'upcoming' | 'pending' | 'alert' | 'info'
  title: string
  message: string
  date: string
  actionRequired?: boolean
  link?: string
}

interface PendingApproval {
  id: string
  type: 'payrun' | 'timesheet' | 'adjustment' | 'bonus'
  title: string
  employee?: string
  amount?: number
  date: string
  priority: 'high' | 'medium' | 'low'
}

const dummyNotifications: Notification[] = [
  {
    id: '1',
    type: 'upcoming',
    title: 'Upcoming Payroll',
    message: 'Next payroll run scheduled for December 31, 2024',
    date: '2024-12-28',
    actionRequired: true,
    link: '/payroll/payruns'
  },
  {
    id: '2',
    type: 'pending',
    title: 'Tax Filing Due',
    message: 'Q4 2024 tax forms due by January 31, 2025',
    date: '2024-12-20',
    actionRequired: true,
    link: '/payroll/taxes'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Missing Timesheets',
    message: '3 employees have not submitted timesheets for current pay period',
    date: '2024-12-26',
    actionRequired: true,
    link: '/payroll/employees'
  },
  {
    id: '4',
    type: 'info',
    title: 'New Employee Added',
    message: 'Sarah Johnson has been added to payroll system',
    date: '2024-12-25',
    actionRequired: false
  }
]

const dummyPendingApprovals: PendingApproval[] = [
  {
    id: '1',
    type: 'payrun',
    title: 'Bi-weekly Payroll - December 2024',
    amount: 12450,
    date: '2024-12-28',
    priority: 'high'
  },
  {
    id: '2',
    type: 'timesheet',
    title: 'Overtime Hours Review',
    employee: 'John Smith',
    amount: 320,
    date: '2024-12-27',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'adjustment',
    title: 'Salary Adjustment Request',
    employee: 'Emily Davis',
    amount: 2000,
    date: '2024-12-26',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'bonus',
    title: 'Performance Bonus',
    employee: 'Michael Brown',
    amount: 1500,
    date: '2024-12-25',
    priority: 'low'
  }
]

export default function PayrollOverviewPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications)
  const [pendingApprovals] = useState<PendingApproval[]>(dummyPendingApprovals)
  const [showAllNotifications, setShowAllNotifications] = useState(false)

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'upcoming':
        return <Clock className="text-blue-500" size={20} />
      case 'pending':
        return <AlertTriangle className="text-orange-500" size={20} />
      case 'alert':
        return <Bell className="text-red-500" size={20} />
      case 'info':
        return <CheckCircle className="text-green-500" size={20} />
      default:
        return <Bell className="text-gray-500" size={20} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getApprovalTypeIcon = (type: string) => {
    switch (type) {
      case 'payrun':
        return <DollarSign className="text-green-600" size={20} />
      case 'timesheet':
        return <Clock className="text-blue-600" size={20} />
      case 'adjustment':
        return <TrendingUp className="text-purple-600" size={20} />
      case 'bonus':
        return <Users className="text-orange-600" size={20} />
      default:
        return <FileText className="text-gray-600" size={20} />
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
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
                {/* Page Header */}
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      Payroll Overview
                    </h1>
                    <p className="text-gray-600">
                      Get a comprehensive view of your payroll metrics and recent activity
                    </p>
                  </div>
                  <button 
                    onClick={() => router.push('/payroll/employee-portal')}
                    className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    <UserCheck size={16} className="mr-2" />
                    Go to Employee Portal
                    <ExternalLink size={14} className="ml-2" />
                  </button>
                </div>

                {/* Notifications */}
                <div className="mb-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Bell className="text-gray-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                          {notifications.filter(n => n.actionRequired).length} Action Required
                        </span>
                      </div>
                      <button 
                        onClick={() => setShowAllNotifications(!showAllNotifications)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {showAllNotifications ? 'Show Less' : 'View All'}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(showAllNotifications ? notifications : notifications.slice(0, 3)).map((notification) => (
                        <div key={notification.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start space-x-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                {notification.actionRequired && (
                                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">
                                    Action Required
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(notification.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {notification.link && (
                              <button className="text-blue-600 hover:text-blue-800 text-sm">
                                <ArrowRight size={16} />
                              </button>
                            )}
                            <button 
                              onClick={() => dismissNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="card">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-600">Total Payroll</h3>
                        <p className="text-2xl font-bold text-gray-900">$45,230</p>
                        <p className="text-sm text-green-600">+12% from last month</p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-600">Active Employees</h3>
                        <p className="text-2xl font-bold text-gray-900">24</p>
                        <p className="text-sm text-gray-500">2 new this month</p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Calendar className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-600">Pay Periods</h3>
                        <p className="text-2xl font-bold text-gray-900">26</p>
                        <p className="text-sm text-gray-500">Bi-weekly schedule</p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-orange-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-600">Avg. Hours/Week</h3>
                        <p className="text-2xl font-bold text-gray-900">32.5</p>
                        <p className="text-sm text-gray-500">Per employee</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="mb-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">Pending Approvals</h2>
                      <span className="text-sm text-gray-600">
                        {pendingApprovals.filter(a => a.priority === 'high').length} High Priority
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pendingApprovals.map((approval) => (
                        <div key={approval.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                {getApprovalTypeIcon(approval.type)}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{approval.title}</h4>
                                {approval.employee && (
                                  <p className="text-sm text-gray-600">Employee: {approval.employee}</p>
                                )}
                              </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(approval.priority)}`}>
                              {approval.priority} priority
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              {approval.amount && (
                                <span className="font-medium text-gray-900">
                                  ${approval.amount.toLocaleString()}
                                </span>
                              )}
                              <span>{new Date(approval.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}</span>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Review
                              </button>
                              <button className="text-gray-600 hover:text-gray-800">
                                <Eye size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="card">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Payroll Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <DollarSign className="text-green-600" size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Payroll processed for December 15, 2024</h3>
                          <p className="text-sm text-gray-600">24 employees • $12,450.00 total</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="text-blue-600" size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">New employee added: Sarah Johnson</h3>
                          <p className="text-sm text-gray-600">Marketing Specialist • $55,000/year</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Calendar className="text-purple-600" size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Timesheet approved for John Smith</h3>
                          <p className="text-sm text-gray-600">40 hours • Week ending Dec 8, 2024</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">3 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </main>
      </div>
    </div>
  )
}
