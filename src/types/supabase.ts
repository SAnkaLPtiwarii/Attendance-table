export type Database = {
  public: {
    Tables: {
      students: {
        Row: {
          id: string
          name: string
          cohort: string
          dateJoined: string
          lastLogin: string
          status: boolean
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          cohort: string
          dateJoined?: string
          lastLogin?: string
          status?: boolean
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          cohort?: string
          dateJoined?: string
          lastLogin?: string
          status?: boolean
          createdAt?: string
          updatedAt?: string
        }
      }
      courses: {
        Row: {
          id: string
          name: string
          type: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          createdAt?: string
          updatedAt?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}