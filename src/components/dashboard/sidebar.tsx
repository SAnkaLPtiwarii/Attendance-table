// src/components/dashboard/sidebar.tsx
import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard,
  Users,
  FileText,
  HelpCircle,
  BarChart,
  Settings
} from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-60 min-h-screen bg-white border-r">
      <div className="p-4">
        <div className="text-xl font-bold text-primary">Quyl.</div>
      </div>
      <nav className="mt-6">
        <div className="px-4 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem icon={Users} label="Students" active />
          <SidebarItem icon={FileText} label="Chapter" />
          <SidebarItem icon={HelpCircle} label="Help" />
          <SidebarItem icon={BarChart} label="Reports" />
          <SidebarItem icon={Settings} label="Settings" />
        </div>
      </nav>
    </div>
  )
}

interface SidebarItemProps {
  icon: any
  label: string
  active?: boolean
}

function SidebarItem({ icon: Icon, label, active }: SidebarItemProps) {
  return (
    <Link
      href="#"
      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50'
        }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  )
}