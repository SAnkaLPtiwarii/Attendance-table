import { create } from 'zustand'

// src/store/students.ts
interface Course {
  id: string
  type: string
  name: string
}

interface Student {
  id: string
  name: string
  cohort: string
  courses: Course[];
  dateJoined: string
  lastLogin: string
  status: boolean
  createdAt: string
  updatedAt: string
}

interface StudentState {
  students: Student[]
  loading: boolean
  error: string | null
  searchTerm: string
  fetchStudents: () => Promise<void>
  addStudent: (student: any) => Promise<void>
  updateStudent: (id: string, data: any) => Promise<void>
  deleteStudent: (id: string) => Promise<void>
  setSearchTerm: (term: string) => void
  toggleStatus: (id: string) => Promise<void>
  getFilteredStudents: () => Student[]
}

export const useStudentStore = create<StudentState>((set, get) => ({
  students: [],
  loading: false,
  error: null,
  searchTerm: '',

  getFilteredStudents: () => {
    const { students, searchTerm } = get()
    if (!searchTerm.trim()) return students

    const term = searchTerm.toLowerCase()
    return students.filter(student =>
      student.name.toLowerCase().includes(term) ||
      student.cohort.toLowerCase().includes(term) ||
      student.courses.some(course =>
        course.type.toLowerCase().includes(term)
      )
    )
  },

  fetchStudents: async () => {
    set({ loading: true })
    try {
      const response = await fetch('/api/students')
      const data = await response.json()
      set({ students: data, error: null })
    } catch (error) {
      set({ error: 'Failed to fetch students' })
    } finally {
      set({ loading: false })
    }
  },

  addStudent: async (student) => {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      })
      const newStudent = await response.json()
      set(state => ({
        students: [...state.students, newStudent]
      }))
    } catch (error) {
      set({ error: 'Failed to add student' })
    }
  },

  // students.ts
  updateStudent: async (id: string, data: any) => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          cohort: data.cohort,
          courses: data.courses // Make sure this is an array of strings
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update student')
      }

      const updatedStudent = await response.json()

      set(state => ({
        students: state.students.map(student =>
          student.id === id ? updatedStudent : student
        )
      }))
    } catch (error) {
      console.error('Failed to update student:', error)
      throw error
    }
  },

  toggleStatus: async (id) => {
    try {
      const student = get().students.find(s => s.id === id)
      if (!student) return

      const response = await fetch(`/api/students/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: !student.status })
      })

      if (!response.ok) throw new Error('Failed to toggle status')
      const updatedStudent = await response.json()

      set(state => ({
        students: state.students.map(s =>
          s.id === id ? updatedStudent : s
        ),
        error: null
      }))
    } catch (error) {
      console.error('Toggle status error:', error)
      set({ error: 'Failed to toggle status' })
    }
  },

  deleteStudent: async (id: string) => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check for 204 No Content or success status
      if (response.status === 204 || response.ok) {
        // Update local state without trying to parse response
        set(state => ({
          students: state.students.filter(student => student.id !== id),
          error: null
        }));
        return;
      }

      // Only try to parse error response if not 204
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete student');
      }
    } catch (error) {
      console.error('Delete error:', error);
      set(state => ({ ...state, error: 'Failed to delete student' }));
      throw error;
    }
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term })
  }
}))