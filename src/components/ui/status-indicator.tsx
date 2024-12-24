import { cn } from "@/lib/utils"

interface StatusIndicatorProps {
  status: boolean
}

export const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-2 h-2 rounded-full",
          status ? "bg-green-500" : "bg-red-500"
        )}
      />
      <span className="text-sm text-neutral-600">
        {status ? "Active" : "Inactive"}
      </span>
    </div>
  )
}