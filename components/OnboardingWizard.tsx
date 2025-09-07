'use client'

import React from 'react'
import { Info } from 'lucide-react'

export default function OnboardingWizard() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
      <div className="flex items-start space-x-3">
        <Info className="text-blue-600 mt-1" size={20} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Onboarding Wizard
          </h3>
          <p className="text-gray-700 mb-4">
            This section is only visible to ADMIN. Customers will not see this unless you ENABLE the wizard for them.
          </p>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Add Onboarding Wizard
          </button>
        </div>
      </div>
    </div>
  )
}
