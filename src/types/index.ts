export interface Course {
  id: string
  type: string
  name: string
}

export interface Student {
  id: string
  name: string
  cohort: string
  courses: Course[]
  dateJoined: string
  lastLogin: string
  status: boolean
}