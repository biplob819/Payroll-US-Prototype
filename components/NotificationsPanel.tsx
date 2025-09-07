'use client'

import React from 'react'
import { AlertCircle, CreditCard, AlertTriangle } from 'lucide-react'

interface NotificationItem {
  id: string
  title: string
  description: string
  type: 'warning' | 'error' | 'info'
  count?: number
  action?: string
}

const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Expiring intro offers',
    description: 'View all',
    type: 'info'
  },
  {
    id: '2',
    title: 'Expiring cards for autopays',
    description: 'View all',
    type: 'error',
    count: 1
  },
  {
    id: '3',
    title: 'Failed autopays',
    description: 'View all',
    type: 'error',
    count: 5
  },
  {
    id: '4',
    title: 'Save 30-40% on your business insurance with Mindbody',
    description: 'Get a customized Mindbody Insurance quote in 30 seconds',
    type: 'info'
  }
]

const getIcon = (type: string) => {
  switch (type) {
    case 'error':
      return <AlertCircle className="text-red-500" size={20} />
    case 'warning':
      return <AlertTriangle className="text-yellow-500" size={20} />
    default:
      return <CreditCard className="text-blue-500" size={20} />
  }
}

const getBadgeColor = (type: string) => {
  switch (type) {
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    default:
      return 'bg-blue-500'
  }
}

export default function NotificationsPanel() {
  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 h-screen overflow-y-auto">
      <div className="p-6 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
      </div>

      <div className="p-4 space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  {notification.count && (
                    <span className={`inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full ${getBadgeColor(notification.type)}`}>
                      {notification.count}
                    </span>
                  )}
                </div>
                <p className="text-sm text-blue-600 mt-1 cursor-pointer hover:text-blue-800">
                  {notification.description}
                </p>
                {notification.id === '4' && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>• Buy online</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>• We'll help you switch AND get you refunded</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>• Fast claim payouts</span>
                    </div>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-800 mt-2">
                      See Savings
                    </button>
                  </div>
                )}
              </div>
              {notification.id === '4' && (
                <button className="text-gray-400 hover:text-gray-600 text-lg">
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
