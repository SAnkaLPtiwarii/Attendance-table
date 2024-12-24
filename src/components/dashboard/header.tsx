'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, User } from 'lucide-react'
import { Input } from '../ui/input'
import { useStudentStore } from '@/store/students'
import { useDebounce } from '@/hooks/use-debounce'
import { AddStudentModal } from './add-student-modal'
import { Button } from '../ui/button'

export function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)
  const { setSearchTerm: setStoreSearchTerm } = useStudentStore()

  useEffect(() => {
    setStoreSearchTerm(debouncedSearch)
  }, [debouncedSearch, setStoreSearchTerm])

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between w-full px-6 py-4 bg-white border-b backdrop-blur-sm bg-opacity-90">
      <div className="flex items-center flex-1 gap-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, cohort, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
            <option>AY 2024-25</option>
            <option>AY 2023-24</option>
          </select>
          <select className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
            <option>CBSE 9</option>
          </select>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <AddStudentModal />
        <div className="flex items-center gap-3 pl-6 border-l">
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium shadow-sm">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Adeline H. Dancy</span>
            <span className="text-xs text-gray-500">Administrator</span>
          </div>
        </div>
      </div>
    </div>
  )
}