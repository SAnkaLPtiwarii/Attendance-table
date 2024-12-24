'use client'

import { useStudentStore } from '@/store/students'
import { StatusBadge } from './status-badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Search } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { EditStudentDialog } from './edit-student-dialog'
import { toast } from 'sonner'
import { CourseBadge } from './course-badge'

export const StudentTable = () => {
  const { students, getFilteredStudents, deleteStudent, toggleStatus, fetchStudents, searchTerm } = useStudentStore()
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return students;

    const term = searchTerm.toLowerCase();
    return students.filter(student =>
      student.name.toLowerCase().includes(term) ||
      student.cohort.toLowerCase().includes(term) ||
      student.courses.some(course =>
        course.type.toLowerCase().includes(term)
      )
    );
  }, [students, searchTerm]);
  const handleEdit = (studentId: string) => {
    setEditingStudentId(studentId)
  }

  const handleDelete = async (studentId: string) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return
    }

    try {
      setIsDeleting(true)
      await deleteStudent(studentId)
      toast.success('Student deleted successfully')
    } catch (error) {
      console.error('Failed to delete student:', error)
      toast.error('Failed to delete student')
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    })
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Enhanced Header */}
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Cohort
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Courses
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date Joined
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-5 w-20"></th>
            </tr>
          </thead>

          {/* Enhanced Body */}
          <tbody className="divide-y divide-gray-100">
            {Array.isArray(filteredStudents) && filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-blue-50/30 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-800">{student.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1 inline-block">
                    {student.cohort}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {student.courses.map((course) => (
                      <CourseBadge key={course.id} type={course.type} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-600">
                    {formatDate(student.dateJoined)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-600">
                    {formatDate(student.lastLogin)}
                    <div className="text-xs text-gray-400 mt-1">{formatTime(student.lastLogin)}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge
                    id={student.id}
                    status={student.status}
                    showText
                    onToggle={toggleStatus}
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 hover:bg-blue-50 rounded-full transition-colors"
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <span className="animate-spin">⌛</span>
                        ) : (
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 p-1">
                      <DropdownMenuItem
                        onClick={() => handleEdit(student.id)}
                        className="cursor-pointer rounded-md font-medium text-sm hover:bg-blue-50"
                      >
                        <span className="text-gray-700">Edit Student</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(student.id)}
                        disabled={isDeleting}
                        className="cursor-pointer rounded-md font-medium text-sm hover:bg-red-50 text-red-600 focus:text-red-700"
                      >
                        {isDeleting ? 'Deleting...' : 'Delete Student'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Empty State */}
      {(!Array.isArray(filteredStudents) || filteredStudents.length === 0) && (
        <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="h-14 w-14 rounded-full bg-white shadow-lg flex items-center justify-center mb-4 border border-gray-100">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm font-medium">
            {searchTerm
              ? 'No students found matching your search'
              : 'No students added yet'}
          </p>
        </div>
      )}

      {editingStudentId && (
        <EditStudentDialog
          studentId={editingStudentId}
          open={!!editingStudentId}
          onClose={() => setEditingStudentId(null)}
        />
      )}
    </div>
  )
}