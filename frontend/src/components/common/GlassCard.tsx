import type { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
}

export function GlassCard({ children, className, dark, ...props }: GlassCardProps) {
  return (
    <div className={clsx(dark ? 'glass-dark' : 'glass', 'rounded-3xl p-6', className)} {...props}>
      {children}
    </div>
  );
}
