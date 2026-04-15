import * as React from 'react';
import { cn } from '@/lib/utils';

export const Select = ({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={cn(
      'flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
      className
    )}
    style={{
      backgroundColor: 'hsl(var(--card))',
      color: 'hsl(var(--card-fg))',
      borderColor: 'hsl(var(--border))',
    }}
    {...props}
  >
    {children}
  </select>
);
