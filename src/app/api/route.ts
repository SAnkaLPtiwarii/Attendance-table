// src/app/api/test/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()

    // Get database status
    const studentCount = await prisma.student.count()
    const courseCount = await prisma.course.count()

    return NextResponse.json({
      status: 'Connected',
      connectionTest: 'Successful',
      counts: {
        students: studentCount,
        courses: courseCount
      }
    })
  } catch (error) {
    console.error('Database Connection Error:', error)
    return NextResponse.json({
      status: 'Error',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}