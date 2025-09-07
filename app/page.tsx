import React from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import NotificationsPanel from '@/components/NotificationsPanel'
import OnboardingWizard from '@/components/OnboardingWizard'
import InsightsSnapshot from '@/components/InsightsSnapshot'

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex">
            {/* Dashboard Content */}
            <div className="flex-1 p-8">
              <div className="max-w-6xl">
                {/* Welcome Message */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Great to see you, Biplob!
                  </h1>
                </div>

                {/* Onboarding Wizard */}
                <OnboardingWizard />

                {/* Insights Snapshot */}
                <InsightsSnapshot />
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
