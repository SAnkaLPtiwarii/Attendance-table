'use client'

import { CheckCircle2, XCircle } from 'lucide-react'

interface StatusBadgeProps {
  id: string;
  status: boolean;
  showText?: boolean;
  onToggle?: (id: string) => Promise<void>;
}

export const StatusBadge = ({ id, status, showText = false, onToggle }: StatusBadgeProps) => {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggle) {
      await onToggle(id);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
        transition-all duration-200 ease-in-out
        ${status
          ? 'bg-green-50 text-green-700 hover:bg-green-100'
          : 'bg-red-50 text-red-700 hover:bg-red-100'
        }
      `}
    >
      {status ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <XCircle className="h-3.5 w-3.5 text-red-500" />
      )}
      {showText && (
        <span className={status ? 'text-green-700' : 'text-red-700'}>
          {status ? 'Active' : 'Inactive'}
        </span>
      )}
    </button>
  );
};