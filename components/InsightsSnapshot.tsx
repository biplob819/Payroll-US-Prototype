'use client'

import React from 'react'
import { TrendingUp, HelpCircle } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  subtitle?: string
  hasTooltip?: boolean
}

function MetricCard({ title, value, change, changeType, subtitle, hasTooltip }: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600 flex items-center space-x-1">
          <span>{title}</span>
          {hasTooltip && <HelpCircle size={14} className="text-gray-400" />}
        </h3>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-gray-900">
          {value}
        </div>
        
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
            <TrendingUp size={14} />
            <span>{change}</span>
          </div>
        )}
        
        {subtitle && (
          <div className="text-sm text-gray-500">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}

export default function InsightsSnapshot() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Insights snapshot</h2>
      </div>

      {/* Analytics Banner */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Get business insights that matter now
              </h3>
              <p className="text-gray-600">
                See your sales, visits, and membership data in one simple view. Spot opportunities and make smart decisions to grow your business faster.
              </p>
            </div>
          </div>
          <button className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors font-medium whitespace-nowrap">
            Go to Analytics 2.0
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center space-x-4">
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option>This month t...</option>
          <option>Last month</option>
          <option>This quarter</option>
          <option>Last quarter</option>
        </select>
        
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option>Location / Onlin...</option>
          <option>Location 1</option>
          <option>Location 2</option>
        </select>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Gift Cards/Payment o...</span>
          <HelpCircle size={14} className="text-gray-400" />
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>At Rede...</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>At Time o...</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Net Sales (USD)"
          value="510"
          change="21.4% vs Prev Year"
          changeType="positive"
          hasTooltip={true}
        />
        
        <MetricCard
          title="Total Visits"
          value="null"
          hasTooltip={true}
        />
        
        <MetricCard
          title="Active Members"
          value="9"
          subtitle="0.0% Sep 06 vs Sep 05, 2025"
          hasTooltip={true}
        />
      </div>
    </div>
  )
}
