'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  Calendar, 
  BookOpen, 
  MapPin, 
  CheckSquare, 
  Users, 
  ShoppingBag, 
  BarChart3, 
  Megaphone, 
  Package, 
  UserCheck, 
  Settings,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Menu,
  FileText,
  TrendingUp,
  UserPlus,
  Calculator,
  Shield,
  FolderOpen,
  PieChart,
  User
} from 'lucide-react'

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  href?: string
  children?: MenuItem[]
  isActive?: boolean
  isDivider?: boolean
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home size={20} />,
    href: '/',
    children: [
      { id: 'dashboard', label: 'Dashboard', icon: <Home size={16} />, href: '/', isActive: true },
      { id: 'setup', label: 'Setup Checklist', icon: <CheckSquare size={16} />, href: '/setup' }
    ]
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: <Calendar size={20} />,
    href: '/appointments'
  },
  {
    id: 'courses',
    label: 'Courses',
    icon: <BookOpen size={20} />,
    href: '/courses'
  },
  {
    id: 'rooms',
    label: 'Rooms',
    icon: <MapPin size={20} />,
    href: '/rooms'
  },
  {
    id: 'checkin',
    label: 'Check In',
    icon: <UserCheck size={20} />,
    href: '/checkin'
  },
  {
    id: 'divider1',
    label: '',
    icon: null,
    isDivider: true
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: <Users size={20} />,
    href: '/clients'
  },
  {
    id: 'pos',
    label: 'Point of Sale',
    icon: <ShoppingBag size={20} />,
    href: '/pos'
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: <BarChart3 size={20} />,
    href: '/insights',
    children: [
      { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={16} />, href: '/insights/analytics' },
      { id: 'reports', label: 'Reports', icon: <FileText size={16} />, href: '/insights/reports' }
    ]
  },
  {
    id: 'payroll',
    label: 'Payroll',
    icon: <DollarSign size={20} />,
    href: '/payroll',
    children: [
      { id: 'overview', label: 'Overview', icon: <PieChart size={16} />, href: '/payroll/overview' },
      { id: 'configure', label: 'Configure', icon: <Settings size={16} />, href: '/payroll/configure' },
      { id: 'employees', label: 'Employees', icon: <Users size={16} />, href: '/payroll/employees' },
      { id: 'payruns', label: 'Pay Runs', icon: <DollarSign size={16} />, href: '/payroll/payruns' },
      { id: 'taxes', label: 'Taxes and Forms', icon: <Calculator size={16} />, href: '/payroll/taxes' },
      { id: 'benefits', label: 'Benefits', icon: <Shield size={16} />, href: '/payroll/benefits' },
      { id: 'documents', label: 'Documents', icon: <FolderOpen size={16} />, href: '/payroll/documents' },
      { id: 'payroll-reports', label: 'Reports', icon: <FileText size={16} />, href: '/payroll/reports' }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: <Megaphone size={20} />,
    href: '/marketing',
    children: [
      { id: 'campaigns', label: 'Campaigns', icon: <Megaphone size={16} />, href: '/marketing/campaigns' },
      { id: 'automation', label: 'Automation', icon: <Settings size={16} />, href: '/marketing/automation' }
    ]
  },
  {
    id: 'services',
    label: 'Services & Products',
    icon: <Package size={20} />,
    href: '/services',
    children: [
      { id: 'services-list', label: 'Services', icon: <Package size={16} />, href: '/services/list' },
      { id: 'products', label: 'Products', icon: <ShoppingBag size={16} />, href: '/services/products' }
    ]
  },
  {
    id: 'staff',
    label: 'Staff',
    icon: <Users size={20} />,
    href: '/staff'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />,
    href: '/settings'
  }
]

export default function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Check if we're in employee portal mode
  const isEmployeePortal = pathname.startsWith('/payroll/employee-portal')

  // Get dynamic menu items based on current mode
  const getMenuItems = () => {
    if (isEmployeePortal) {
      // Replace payroll submenu with employee portal items
      return menuItems.map(item => {
        if (item.id === 'payroll') {
          return {
            ...item,
            label: 'My Payroll',
            children: [
              { id: 'employee-home', label: 'Employee self service', icon: <Home size={16} />, href: '/payroll/employee-portal' }
            ]
          }
        }
        return item
      })
    }
    return menuItems
  }

  const currentMenuItems = getMenuItems()

  // Update expanded items based on current path
  useEffect(() => {
    const currentPath = pathname
    const newExpandedItems: string[] = []

    // Find which menu items should be expanded based on current path
    currentMenuItems.forEach(item => {
      if (item.children) {
        const isCurrentPathInSubmenu = item.children.some(child => 
          child.href && currentPath.startsWith(child.href)
        )
        if (isCurrentPathInSubmenu) {
          newExpandedItems.push(item.id)
        }
      }
    })

    // Always expand home by default if no other items are expanded
    if (newExpandedItems.length === 0) {
      newExpandedItems.push('home')
    }

    setExpandedItems(newExpandedItems)
  }, [pathname, isEmployeePortal])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleItemClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id)
    } else if (item.href) {
      // Special handling for Payroll - always redirect to overview
      if (item.id === 'payroll' && !isEmployeePortal) {
        router.push('/payroll/overview')
      } else {
        router.push(item.href)
      }
    }
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    if (item.isDivider) {
      return (
        <div key={item.id} className="my-2">
          <hr className="border-gray-200" />
        </div>
      )
    }

    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const paddingLeft = level === 0 ? 'pl-4' : 'pl-8'
    
    // Check if current item or any of its children is active based on pathname
    const isCurrentlyActive = item.href === pathname || 
      (item.href && pathname.startsWith(item.href) && item.href !== '/') ||
      (item.children && item.children.some(child => 
        child.href === pathname || (child.href && pathname.startsWith(child.href) && child.href !== '/')
      ))

    return (
      <div key={item.id}>
        <div
          className={`flex items-center justify-between ${paddingLeft} pr-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
            isCurrentlyActive 
              ? 'bg-gray-50 text-gray-700' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }`}
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </div>
          {hasChildren && !isCollapsed && (
            <div className="text-gray-400">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
        </div>
        
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 h-screen overflow-y-auto transition-all duration-300`}>
      {/* Header with hamburger menu and logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleCollapse}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          {!isCollapsed && (
            <div className="flex items-center space-x-3 flex-1 ml-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-400 to-green-400">
                <svg width="16" height="16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 20 Q20 10, 30 10 L70 10 Q80 10, 80 20 L80 70 Q80 80, 50 80 Q20 80, 20 50 Z" fill="white" fillOpacity="0.9"/>
                  <circle cx="35" cy="35" r="8" fill="currentColor" fillOpacity="0.8"/>
                  <circle cx="65" cy="35" r="8" fill="currentColor" fillOpacity="0.8"/>
                  <path d="M25 60 Q50 75, 75 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900">Mindbody</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {currentMenuItems.map(item => renderMenuItem(item))}
      </nav>
    </div>
  )
}
