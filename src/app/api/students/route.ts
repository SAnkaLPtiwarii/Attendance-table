// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url)
//   const search = searchParams.get('search')

//   try {
//     const students = await prisma.student.findMany({
//       where: search ? {
//         OR: [
//           { name: { contains: search, mode: 'insensitive' } },
//           { cohort: { contains: search, mode: 'insensitive' } }
//         ]
//       } : undefined,
//       include: {
//         courses: true
//       },
//       orderBy: {
//         name: 'asc'
//       }
//     })
//     return NextResponse.json(students)
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// src/app/api/students/route.ts
export async function GET() {
  try {
    console.log('Fetching students...')
    const students = await prisma.student.findMany({
      include: {
        courses: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform the response to ensure dates are serialized properly
    const transformedStudents = students.map(student => ({
      ...student,
      dateJoined: student.dateJoined.toISOString(),
      lastLogin: student.lastLogin.toISOString(),
      createdAt: student.createdAt.toISOString(),
      updatedAt: student.updatedAt.toISOString(),
      courses: student.courses.map(course => ({
        id: course.id,
        name: course.name,
        type: course.type
      }))
    }))

    console.log('Transformed students:', JSON.stringify(transformedStudents, null, 2))
    return NextResponse.json(transformedStudents)
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

// src/app/api/students/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Creating new student with body:', body)

    // Default courses if none provided
    const coursesToCreate = body.courses?.length > 0 ? body.courses : ['CBSE 9 Math', 'CBSE 9 Science']

    const student = await prisma.student.create({
      data: {
        name: body.name,
        cohort: body.cohort,
        status: true,
        dateJoined: new Date(),
        lastLogin: new Date(),
        courses: {
          create: coursesToCreate.map((course: string) => ({
            name: course,
            type: course
          }))
        }
      },
      include: {
        courses: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      }
    })

    const transformedStudent = {
      ...student,
      dateJoined: student.dateJoined.toISOString(),
      lastLogin: student.lastLogin.toISOString(),
      createdAt: student.createdAt.toISOString(),
      updatedAt: student.updatedAt.toISOString()
    }

    console.log('Created student:', transformedStudent)
    return NextResponse.json(transformedStudent)
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    )
  }
}