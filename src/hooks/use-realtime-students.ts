// src/hooks/use-realtime-students.ts
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { useStudentStore } from '@/store/students'

export const useRealtimeStudents = () => {
  const fetchStudents = useStudentStore(state => state.fetchStudents)

  useEffect(() => {
    const channel = supabase
      .channel('students-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Student'
        },
        () => {
          fetchStudents()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchStudents])
}