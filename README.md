# Payroll Dashboard

A modern business management dashboard built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Dashboard Layout**: Clean, modern interface with sidebar navigation
- **Payroll Management**: New dedicated payroll section for managing employee compensation
- **Insights & Analytics**: Business metrics and performance tracking
- **Notifications Panel**: Real-time alerts and updates
- **Onboarding Wizard**: Admin-controlled customer onboarding flow

## Menu Structure

The dashboard includes the following navigation items:

- **Home** (with Dashboard and Setup Checklist)
- **Appointments**
- **Courses**
- **Rooms**
- **Check In**
- **Clients**
- **Point of Sale**
- **Insights**
- **Payroll** ⭐ *New menu item*
- **Marketing**
- **Services & Products**
- **Staff**
- **Settings**

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Dashboard home page
│   └── payroll/
│       └── page.tsx         # Payroll management page
├── components/
│   ├── Header.tsx           # Top navigation bar
│   ├── Sidebar.tsx          # Left navigation menu
│   ├── NotificationsPanel.tsx # Right notifications panel
│   ├── OnboardingWizard.tsx # Admin onboarding component
│   └── InsightsSnapshot.tsx # Analytics dashboard
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library

## Key Components

### Sidebar Navigation
- Collapsible menu items
- Active state management
- Hierarchical navigation structure
- **New Payroll menu item** positioned below Insights

### Dashboard Layout
- Three-column layout (Sidebar, Main Content, Notifications)
- Responsive design
- Consistent spacing and typography

### Payroll Section
- Quick action cards for common tasks
- Recent payroll runs history
- Employee management integration
- Timesheet tracking capabilities

## Customization

The dashboard is built with modularity in mind. You can:

- Add new menu items by updating the `menuItems` array in `Sidebar.tsx`
- Customize colors and styling in `tailwind.config.js`
- Add new pages by creating files in the `app/` directory
- Extend components in the `components/` directory

## License

This project is for demonstration purposes.
