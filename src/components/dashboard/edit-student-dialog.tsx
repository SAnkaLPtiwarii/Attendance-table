// EditStudentDialog.tsx
'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useStudentStore } from '@/store/students'
import { Label } from "@/components/ui/label"
import { BookOpen, Calculator, X } from 'lucide-react'

interface EditStudentDialogProps {
  studentId: string
  open: boolean
  onClose: () => void
}

export function EditStudentDialog({ studentId, open, onClose }: EditStudentDialogProps) {
  const { students, updateStudent } = useStudentStore()
  const student = students.find(s => s.id === studentId)

  const [formData, setFormData] = useState({
    name: '',
    cohort: '',
    courses: [] as string[]
  })

  useEffect(() => {
    if (student) {
      // Use filter to get unique courses instead of Set
      const uniqueCourses = student.courses
        .map(c => c.type)
        .filter((type, index, self) => self.indexOf(type) === index);

      setFormData({
        name: student.name,
        cohort: student.cohort,
        courses: uniqueCourses
      })
    }
  }, [student])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!student) return

    try {
      // Remove duplicates using filter instead of Set
      const uniqueCourses = formData.courses
        .filter((course, index, self) =>
          self.indexOf(course) === index && Boolean(course)
        )

      console.log('Submitting courses:', uniqueCourses)

      await updateStudent(studentId, {
        name: formData.name,
        cohort: formData.cohort,
        courses: uniqueCourses
      })
      onClose()
    } catch (error) {
      console.error('Failed to update student:', error)
    }
  }

  const handleCourseToggle = (courseType: string, checked: boolean) => {
    setFormData(prev => {
      let newCourses: string[]
      if (checked) {
        newCourses = prev.courses.includes(courseType)
          ? prev.courses
          : [...prev.courses, courseType]
      } else {
        newCourses = prev.courses.filter(c => c !== courseType)
      }
      return { ...prev, courses: newCourses }
    })
  }

  if (!student) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Edit Student</h2>
          <button
            onClick={onClose}
            className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-gray-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Cohort</Label>
            <select
              value={formData.cohort}
              onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option>AY 2024-25</option>
              <option>AY 2023-24</option>
            </select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Courses</Label>
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <label className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  value="CBSE 9 Science"
                  checked={formData.courses.includes('CBSE 9 Science')}
                  onChange={(e) => handleCourseToggle('CBSE 9 Science', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <BookOpen className="h-4 w-4 text-red-500" />
                <span className="text-sm text-gray-700">CBSE 9 Science</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  value="CBSE 9 Math"
                  checked={formData.courses.includes('CBSE 9 Math')}
                  onChange={(e) => handleCourseToggle('CBSE 9 Math', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <Calculator className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-700">CBSE 9 Math</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}