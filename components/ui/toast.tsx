'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface ToastProps { message: string; type?: 'success' | 'error'; onClose: () => void; }

export const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
  React.useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={cn(
      'fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg px-5 py-3 text-white shadow-lg text-sm font-medium',
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    )}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-white/80 hover:text-white">✕</button>
    </div>
  );
};
