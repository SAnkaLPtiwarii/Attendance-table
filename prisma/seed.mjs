import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Delete existing data
    await prisma.course.deleteMany()
    await prisma.student.deleteMany()

    // Create courses first
    const mathCourse = await prisma.course.create({
      data: {
        name: 'CBSE 9 Math',
        type: 'CBSE 9 Math'
      }
    })

    const scienceCourse = await prisma.course.create({
      data: {
        name: 'CBSE 9 Science',
        type: 'CBSE 9 Science'
      }
    })

    // Create students with course connections
    const students = [
      {
        name: 'Anshuman Kashyap',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: true,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Bansi Dadhaniya',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: true,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Chandrika Valotia',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: false,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Devang Dave',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: true,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Forum Bhatt',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: true,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Hritika Dattani',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: true,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Khushi Joshi',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: true,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Mansi Patel',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: false,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Nita Shah',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: true,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Priyanshu Shrivastava',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: false,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Shreya Singhalia',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: true,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Vatsal Trivedi',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: false,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      },
      {
        name: 'Ved Gupta',
        cohort: 'AY 2024-25',
        dateJoined: new Date('2024-11-17'),
        lastLogin: new Date('2024-11-17T16:16:00'),
        status: true,
        courses: {
          connect: [{ id: mathCourse.id }, { id: scienceCourse.id }]
        }
      }
    ]

    // Create each student
    for (const student of students) {
      const createdStudent = await prisma.student.create({
        data: student,
        include: {
          courses: true
        }
      })
      console.log(`Created student: ${createdStudent.name} with ${createdStudent.courses.length} courses`)
    }

    console.log('✅ Seed data created successfully')
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })