import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma, PrismaClient } from '@prisma/client'

type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>


// [id]/route.ts
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    console.log('Received update data:', body)

    // If it's a status toggle
    if (body.hasOwnProperty('status')) {
      const student = await prisma.student.update({
        where: { id: params.id },
        data: {
          status: body.status
        },
        include: {
          courses: true
        }
      })
      return NextResponse.json(student)
    }

    // For full update - Get unique courses
    const uniqueCourses = body.courses.filter((course: string, index: number) =>
      body.courses.indexOf(course) === index
    )

    // First find all existing courses
    const coursesToConnect = await Promise.all(
      uniqueCourses.map(async (courseName: string) => {
        const course = await prisma.course.findFirst({
          where: {
            name: courseName,
            type: courseName
          }
        })

        if (!course) {
          throw new Error(`Course not found: ${courseName}`)
        }

        return { id: course.id }
      })
    )

    // Update student
    const updatedStudent = await prisma.student.update({
      where: { id: params.id },
      data: {
        name: body.name,
        cohort: body.cohort,
        lastLogin: new Date(),
        courses: {
          set: [], // First clear all courses
          connect: coursesToConnect
        }
      },
      include: {
        courses: true
      }
    })

    return NextResponse.json(updatedStudent)
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if student exists
    const studentExists = await prisma.student.findUnique({
      where: { id: params.id }
    })

    if (!studentExists) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Delete student (courses will be deleted automatically due to cascade)
    await prisma.student.delete({
      where: {
        id: params.id
      }
    })

    // Return 204 No Content for successful deletion
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Delete error:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        )
      }
    }
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}