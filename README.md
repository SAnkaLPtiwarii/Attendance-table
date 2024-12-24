Student Dashboard
A modern, responsive student management dashboard built with Next.js, Prisma, and Supabase. This application allows administrators to manage student records, track courses, and monitor student status efficiently.
Features

👥 Student Management (CRUD operations)
📚 Course Assignment
🎯 Status Tracking
🔍 Search Functionality
📊 Responsive Design
🌐 Real-time Updates

Tech Stack

Frontend: Next.js 14, React
UI Components: shadcn/ui
State Management: Zustand
Database: Supabase (PostgreSQL)
ORM: Prisma
Styling: Tailwind CSS

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18 or higher)
npm or yarn
Git

Getting Started

Clone the repository:
https://github.com/SAnkaLPtiwarii/Attendance-table.git
cd student-dashboard

Install dependencies:
npm install

Setup environment variables:

DATABASE_URL=postgres://postgres.earihgchukczmrykuxzi:IXpvLLiYyC5DHLbF@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true

# Session Pooler (for migrations/schema)
DIRECT_URL=postgres://postgres.earihgchukczmrykuxzi:IXpvLLiYyC5DHLbF@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres

NEXT_PUBLIC_SUPABASE_URL=https://earihgchukczmrykuxzi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcmloZ2NodWtjem1yeWt1eHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTE4NDUsImV4cCI6MjA1MDE4Nzg0NX0.NkjTDslcn-oaGy5r1cPrbnWS0B8_2E38jt3YutGcjIc 

Run development server:
npm run dev 

LIVE DEMO:
https://attendance-table-sankalp.vercel.app/
