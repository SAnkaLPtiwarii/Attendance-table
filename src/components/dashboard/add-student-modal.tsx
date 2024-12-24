// AddStudentModal.tsx
'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStudentStore } from '@/store/students'
import { BookOpen, Calculator, Plus, X } from 'lucide-react'
import { toast } from 'sonner'

export function AddStudentModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    cohort: 'AY 2024-25',
    courses: [] as string[]
  })

  const { addStudent } = useStudentStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addStudent({
        ...formData,
        status: true,
        dateJoined: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      })
      setIsOpen(false)
      toast.success('Student added successfully')
      setFormData({
        name: '',
        cohort: 'AY 2024-25',
        courses: []
      })
    } catch (error) {
      console.error('Failed to add student:', error)
      toast.error('Failed to add student')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Student
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add New Student</h2>
          <button
            onClick={() => setIsOpen(false)}
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
              placeholder="Enter student name"
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
                  checked={formData.courses.includes('CBSE 9 Science')}
                  onChange={(e) => {
                    const courses = e.target.checked
                      ? [...formData.courses, 'CBSE 9 Science']
                      : formData.courses.filter(c => c !== 'CBSE 9 Science')
                    setFormData({ ...formData, courses })
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <BookOpen className="h-4 w-4 text-red-500" />
                <span className="text-sm text-gray-700">CBSE 9 Science</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.courses.includes('CBSE 9 Math')}
                  onChange={(e) => {
                    const courses = e.target.checked
                      ? [...formData.courses, 'CBSE 9 Math']
                      : formData.courses.filter(c => c !== 'CBSE 9 Math')
                    setFormData({ ...formData, courses })
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <Calculator className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-700">CBSE 9 Math</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Student
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
