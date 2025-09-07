import React from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import NotificationsPanel from '@/components/NotificationsPanel'
import { DollarSign, Users, Calendar, FileText } from 'lucide-react'

export default function PayrollPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Main Payroll Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex">
            {/* Payroll Content */}
            <div className="flex-1 p-8">
              <div className="max-w-6xl">
                {/* Page Header */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Payroll Management
                  </h1>
                  <p className="text-gray-600">
                    Manage employee payroll, timesheets, and compensation
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="card hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Run Payroll</h3>
                        <p className="text-sm text-gray-600">Process payments</p>
                      </div>
                    </div>
                  </div>

                  <div className="card hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Employees</h3>
                        <p className="text-sm text-gray-600">Manage staff</p>
                      </div>
                    </div>
                  </div>

                  <div className="card hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Calendar className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Timesheets</h3>
                        <p className="text-sm text-gray-600">Track hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="card hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FileText className="text-orange-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Reports</h3>
                        <p className="text-sm text-gray-600">View analytics</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Payroll Runs */}
                <div className="card">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Payroll Runs</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-gray-900">December 2024 - Bi-weekly</h3>
                        <p className="text-sm text-gray-600">Processed on Dec 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">$12,450.00</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-gray-900">November 2024 - Bi-weekly</h3>
                        <p className="text-sm text-gray-600">Processed on Nov 30, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">$11,890.00</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <h3 className="font-medium text-gray-900">November 2024 - Mid-month</h3>
                        <p className="text-sm text-gray-600">Processed on Nov 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">$11,650.00</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notifications Panel */}
            <NotificationsPanel />
          </div>
        </main>
      </div>
    </div>
  )
}
