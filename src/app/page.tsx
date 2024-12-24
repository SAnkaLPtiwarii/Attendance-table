// src/app/page.tsx
'use client'

import { useEffect } from 'react'
import { Header } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { StudentTable } from '@/components/dashboard/student-table'
import { useStudentStore } from '@/store/students'

export default function DashboardPage() {
  const { fetchStudents } = useStudentStore()

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <StudentTable />
        </main>
      </div>
    </div>
  )
}
