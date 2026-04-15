'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface DialogProps { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode; }

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 w-full max-w-lg">{children}</div>
    </div>
  );
};

export const DialogContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bg-white rounded-xl shadow-xl p-6 mx-4 max-h-[90vh] overflow-y-auto', className)} {...props}>{children}</div>
);

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props} />
);

export const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn('text-xl font-semibold', className)} {...props} />
);

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex justify-end gap-2 mt-4', className)} {...props} />
);

export const DialogTrigger = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <span onClick={onClick}>{children}</span>
);
