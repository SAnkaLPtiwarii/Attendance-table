import { BookOpen, Calculator } from 'lucide-react'

interface CourseBadgeProps {
  type: string
  className?: string
}

export const CourseBadge = ({ type, className = '' }: CourseBadgeProps) => {
  const getBadgeContent = () => {
    switch (type) {
      case 'CBSE 9 Science':
        return {
          icon: <BookOpen className="w-4 h-4 text-red-500" />,
          text: 'Science',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-100'
        }
      case 'CBSE 9 Math':
        return {
          icon: <Calculator className="w-4 h-4 text-blue-500" />,
          text: 'Math',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-100'
        }
      default:
        return null
    }
  }

  const content = getBadgeContent()
  if (!content) return null

  return (
    <div className={`
      flex items-center gap-1.5 px-2.5 py-1 rounded-full
      border ${content.borderColor} ${content.bgColor}
      ${className}
    `}>
      {content.icon}
      <span className={`text-xs font-medium ${content.textColor}`}>
        {content.text}
      </span>
    </div>
  )
}